<script setup lang="ts">
import { ref, computed } from 'vue'
import { Slider, ColorPicker, Toggle, SubTabs } from '@bg-effects/shared'
import zhCN from '../locales/zh-CN.json'
import en from '../locales/en.json'
import type { OrbProps } from '../types'

const props = defineProps<{
  lang?: 'zh-CN' | 'en'
}>()

const config = defineModel<OrbProps>('config', { required: true })

const activeTab = ref<'basic' | 'interaction' | 'background'>('basic')

defineExpose({
  activeTab,
})

const i18n: Record<string, any> = {
  'zh-CN': zhCN,
  'en': en,
}

const t = (path: string) => {
  const dict = i18n[props.lang || 'zh-CN']
  return path.split('.').reduce((obj: any, key) => obj?.[key], dict) || path
}

interface SubTabItem {
  id: string
  label: string
}

const subTabs = computed((): SubTabItem[] => [
  { id: 'basic', label: t('tabs.basic') },
  { id: 'interaction', label: t('tabs.interaction') },
  { id: 'background', label: t('tabs.background') },
])
</script>

<template>
  <div class="flex flex-col gap-6 text-white/90">
    <SubTabs v-model="activeTab" :tabs="subTabs" />

    <div class="flex flex-col gap-6 p-1 pointer-events-auto overflow-y-auto max-h-[400px] custom-scrollbar pr-2">
      <div v-if="activeTab === 'basic'" class="flex flex-col gap-6">
        <Slider
          v-model="config.hue"
          :label="t('labels.hue')"
          :min="0"
          :max="360"
          :step="1"
          suffix="°"
        />
        <Slider
          v-model="config.hoverIntensity"
          :label="t('labels.hoverIntensity')"
          :min="0"
          :max="1"
          :step="0.05"
        />
      </div>

      <div v-if="activeTab === 'interaction'" class="flex flex-col gap-6">
        <Toggle
          v-model="config.rotateOnHover"
          :label="t('labels.rotateOnHover')"
        />
        <Toggle
          v-model="config.forceHoverState"
          :label="t('labels.forceHoverState')"
        />
      </div>

      <div v-if="activeTab === 'background'" class="flex flex-col gap-6">
        <ColorPicker
          v-model="config.backgroundColor"
          :label="t('labels.backgroundColor')"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.2);
}
</style>
