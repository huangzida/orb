import type { EffectMeta } from '@bg-effects/core'
import type { OrbProps } from './types'
import { generateRandomPalette, rand } from '@bg-effects/shared'

export const meta: EffectMeta<OrbProps> = {
  id: 'orb',
  name: {
    en: 'Orb',
    'zh-CN': '光球',
  },
  category: 'abstract',
  version: '1.0.0',
  defaultConfig: {
    debug: false,
    lang: 'zh-CN',
    hue: 0,
    hoverIntensity: 0.2,
    rotateOnHover: true,
    forceHoverState: false,
    backgroundColor: '#000000',
  },
  randomize: (current, tab?) => {
    const result = { ...current }
    const palette = generateRandomPalette(1)

    if (!tab) {
      result.hue = rand(0, 360, 0)
      result.hoverIntensity = rand(0, 1)
      result.backgroundColor = palette[0]
      return result
    }

    if (tab === 'basic') {
      result.hue = rand(0, 360, 0)
      result.hoverIntensity = rand(0, 1)
      return result
    }

    if (tab === 'interaction') {
      result.rotateOnHover = Math.random() > 0.5
      result.forceHoverState = Math.random() > 0.5
      return result
    }

    if (tab === 'background') {
      result.backgroundColor = palette[0]
      return result
    }

    return result
  },
  presets: [
    {
      id: 'orb_midnight',
      name: { en: 'Midnight Core', 'zh-CN': '午夜核心' },
      config: {
        hue: 220,
        hoverIntensity: 0.3,
        rotateOnHover: true,
        forceHoverState: false,
        backgroundColor: '#05070f',
      },
    },
    {
      id: 'orb_nebula',
      name: { en: 'Nebula Glow', 'zh-CN': '星云光晕' },
      config: {
        hue: 310,
        hoverIntensity: 0.6,
        rotateOnHover: true,
        forceHoverState: true,
        backgroundColor: '#0b0613',
      },
    },
    {
      id: 'orb_sunrise',
      name: { en: 'Sunrise Pulse', 'zh-CN': '日出脉冲' },
      config: {
        hue: 30,
        hoverIntensity: 0.4,
        rotateOnHover: false,
        forceHoverState: true,
        backgroundColor: '#120a03',
      },
    },
  ],
}
