import Orb from './Orb.vue'
import { meta } from './meta'
import en from './locales/en.json'
import zhCN from './locales/zh-CN.json'

export { Orb, meta }
export type { OrbProps, OrbEngineConfig } from './types'

export const locales = {
  en,
  'zh-CN': zhCN,
}
