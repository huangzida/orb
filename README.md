# @bg-effects/orb

[English](./README.md) | [简体中文](./README_CN.md)

A high-performance orb background effect built with OGL and Vue.

[Live Demo](https://huangzida.github.io/orb/)

---

### Features

- 🚀 **High Performance**: Built with OGL (a lightweight WebGL library) for smooth rendering.
- 🎨 **Elegant Design**: A beautiful, glowing orb effect with interactive hover states.
- 🛠️ **Debug Mode**: Built-in visual debug panel for real-time adjustments.
- 📦 **Ready to Use**: Easy-to-use Vue component with simple configuration.

### Installation

```bash
pnpm add @bg-effects/orb ogl
```

> **Note**: `ogl` is a peer dependency and needs to be installed manually.

### Usage

```vue
<script setup>
import { Orb } from '@bg-effects/orb'
</script>

<template>
  <div style="width: 100vw; height: 100vh; background: #000;">
    <Orb 
      :hue="200"
      :hover-intensity="0.5"
      rotate-on-hover
    />
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `hue` | `number` | `200` | Base color hue (0-360) |
| `hoverIntensity` | `number` | `0.5` | Intensity of the hover effect |
| `rotateOnHover` | `boolean` | `true` | Whether to rotate the orb on hover |
| `forceHoverState` | `boolean` | `false` | Force the hover state animation |
| `backgroundColor` | `string` | `'#000000'` | Background color |
| `debug` | `boolean` | `false` | Enable debug panel |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | UI language |
| `className` | `string` | `''` | Additional CSS class for the container |

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### License

MIT
