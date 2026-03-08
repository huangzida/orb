<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { DebugShell } from '@bg-effects/debug-ui'
import { defu } from 'defu'
import { meta } from './meta'
import type { OrbProps, OrbEngineConfig } from './types'
import OrbEngine from './engine'
import ConfigPanel from './ui/ConfigPanel.vue'

const props = defineProps<OrbProps>()

const config = ref<OrbProps>(defu(props, meta.defaultConfig) as OrbProps)
const internalLang = ref<'zh-CN' | 'en'>(config.value.lang || 'zh-CN')

watch(() => props, (newProps) => {
  if (!props.debug) {
    config.value = defu(newProps, meta.defaultConfig) as OrbProps
  }
}, { deep: true })

const configPanelRef = ref<any>(null)
const containerRef = ref<HTMLElement | null>(null)
let engine: OrbEngine | null = null

const engineInterface = computed(() => ({
  pause: () => engine?.pause(),
  resume: () => engine?.resume(),
  restart: () => engine?.restart(),
}))

const handleRandomize = () => {
  if (meta.randomize) {
    const currentTab = configPanelRef.value?.activeTab
    const tabValue = typeof currentTab === 'object' && currentTab?.value ? currentTab.value : currentTab
    const randomized = meta.randomize(config.value, tabValue)
    config.value = {
      ...randomized,
      debug: config.value.debug,
      lang: config.value.lang,
    }
  }
}

const effectiveConfig = computed(() => (props.debug ? config.value : props))

const resolveEngineConfig = (source: OrbProps): OrbEngineConfig => ({
  hue: source.hue ?? meta.defaultConfig.hue,
  hoverIntensity: source.hoverIntensity ?? meta.defaultConfig.hoverIntensity,
  rotateOnHover: source.rotateOnHover ?? meta.defaultConfig.rotateOnHover,
  forceHoverState: source.forceHoverState ?? meta.defaultConfig.forceHoverState,
  backgroundColor: source.backgroundColor ?? meta.defaultConfig.backgroundColor,
})

watch(effectiveConfig, (newConfig) => {
  if (!engine) return
  engine.updateConfig(resolveEngineConfig(defu(newConfig, meta.defaultConfig) as OrbProps))
}, { deep: true })

onMounted(() => {
  if (!containerRef.value) return
  const resolved = defu(effectiveConfig.value, meta.defaultConfig) as OrbProps
  engine = new OrbEngine(containerRef.value, resolveEngineConfig(resolved))
})

onUnmounted(() => {
  engine?.destroy()
  engine = null
})
</script>

<template>
  <div ref="containerRef" :class="['relative w-full h-full overflow-hidden', className]">
    <DebugShell
      v-if="debug"
      v-model:config="config"
      v-model:lang="internalLang"
      :meta="meta"
      :engine="engineInterface"
      @randomize="handleRandomize"
    >
      <template #settings>
        <ConfigPanel
          ref="configPanelRef"
          v-model:config="config"
          :lang="internalLang"
        />
      </template>
    </DebugShell>
  </div>
</template>
