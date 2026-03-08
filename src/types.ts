export interface OrbProps {
  debug?: boolean
  lang?: 'zh-CN' | 'en'
  className?: string
  hue?: number
  hoverIntensity?: number
  rotateOnHover?: boolean
  forceHoverState?: boolean
  backgroundColor?: string
}

export interface OrbEngineConfig {
  hue: number
  hoverIntensity: number
  rotateOnHover: boolean
  forceHoverState: boolean
  backgroundColor: string
}
