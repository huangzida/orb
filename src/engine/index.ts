import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl'
import type { OrbEngineConfig } from '../types'
import fragmentShader from './shaders/fragment.glsl?raw'
import vertexShader from './shaders/vertex.glsl?raw'
import { hexToRgbNormalized } from '@bg-effects/shared'

export class OrbEngine {
  renderer: Renderer
  gl: any
  program: Program
  mesh: Mesh
  raf: number = 0
  container: HTMLElement
  private ro?: ResizeObserver
  private t0: number = performance.now()
  private _isPaused = false
  private pausedTime = 0
  private pauseStartTime = 0
  private config: OrbEngineConfig
  private targetHover = 0
  private currentRot = 0
  private lastTime = 0
  private rotationSpeed = 0.3

  private handlePointerMove = (event: PointerEvent) => {
    const rect = this.container.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const size = Math.min(rect.width, rect.height)
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const uvX = ((x - centerX) / size) * 2.0
    const uvY = ((y - centerY) / size) * 2.0
    this.targetHover = Math.sqrt(uvX * uvX + uvY * uvY) < 0.8 ? 1 : 0
  }

  private handlePointerLeave = () => {
    this.targetHover = 0
  }

  get isPaused() {
    return this._isPaused
  }

  constructor(container: HTMLElement, config: OrbEngineConfig) {
    this.container = container
    this.config = config

    this.renderer = new Renderer({ alpha: true, premultipliedAlpha: false })
    this.gl = this.renderer.gl
    this.gl.clearColor(0, 0, 0, 0)
    this.container.appendChild(this.gl.canvas)

    const geometry = new Triangle(this.gl)
    const background = this.resolveBackgroundColor(config.backgroundColor)

    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Vec3(this.gl.canvas.width, this.gl.canvas.height, this.gl.canvas.width / this.gl.canvas.height),
        },
        hue: { value: config.hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: config.hoverIntensity },
        backgroundColor: { value: background },
      },
    })

    this.mesh = new Mesh(this.gl, { geometry, program: this.program })

    this.ro = new ResizeObserver(() => this.resize())
    this.ro.observe(this.container)
    this.resize()

    this.container.addEventListener('pointermove', this.handlePointerMove)
    this.container.addEventListener('pointerleave', this.handlePointerLeave)

    this.loop(this.t0)
  }

  private resolveBackgroundColor(color: string) {
    const normalized = color[0] === '#' ? hexToRgbNormalized(color) : [0, 0, 0]
    return new Vec3(normalized[0], normalized[1], normalized[2])
  }

  private loop = (time: number) => {
    this.raf = requestAnimationFrame(this.loop)
    if (this._isPaused) return

    const rawSeconds = (time - this.t0 - this.pausedTime) * 0.001
    const dt = this.lastTime ? (time - this.lastTime) * 0.001 : 0
    this.lastTime = time
    this.program.uniforms.iTime.value = rawSeconds

    const effectiveHover = this.config.forceHoverState ? 1 : this.targetHover
    this.program.uniforms.hover.value += (effectiveHover - this.program.uniforms.hover.value) * 0.1

    if (this.config.rotateOnHover && effectiveHover > 0.5) {
      this.currentRot += dt * this.rotationSpeed
      this.program.uniforms.rot.value = this.currentRot
    }

    this.renderer.render({ scene: this.mesh })
  }

  resize() {
    const width = Math.max(1, Math.floor(this.container.clientWidth))
    const height = Math.max(1, Math.floor(this.container.clientHeight))
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.renderer.setSize(width * dpr, height * dpr)
    this.gl.canvas.style.width = `${width}px`
    this.gl.canvas.style.height = `${height}px`
    this.program.uniforms.iResolution.value.set(this.gl.canvas.width, this.gl.canvas.height, this.gl.canvas.width / this.gl.canvas.height)
  }

  updateConfig(config: Partial<OrbEngineConfig>) {
    this.config = { ...this.config, ...config }
    if (typeof this.config.hue === 'number')
      this.program.uniforms.hue.value = this.config.hue
    if (typeof this.config.hoverIntensity === 'number')
      this.program.uniforms.hoverIntensity.value = this.config.hoverIntensity
    if (typeof this.config.backgroundColor === 'string')
      this.program.uniforms.backgroundColor.value = this.resolveBackgroundColor(this.config.backgroundColor)
  }

  pause() {
    if (!this._isPaused) {
      this._isPaused = true
      this.pauseStartTime = performance.now()
    }
  }

  resume() {
    if (this._isPaused) {
      this._isPaused = false
      this.pausedTime += performance.now() - this.pauseStartTime
    }
  }

  restart() {
    this.pausedTime = 0
    this.pauseStartTime = 0
    this.t0 = performance.now()
  }

  destroy() {
    if (this.raf) cancelAnimationFrame(this.raf)
    if (this.ro) this.ro.disconnect()
    this.container.removeEventListener('pointermove', this.handlePointerMove)
    this.container.removeEventListener('pointerleave', this.handlePointerLeave)
    if (this.container?.contains(this.gl.canvas))
      this.container.removeChild(this.gl.canvas)
    this.gl.getExtension('WEBGL_lose_context')?.loseContext()
  }
}

export default OrbEngine
