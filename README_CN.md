# @bg-effects/orb

[English](./README.md) | [简体中文](./README_CN.md)

基于 OGL 和 Vue 构建的高性能 Orb 背景特效。

[在线演示](https://huangzida.github.io/orb/)

---

### 特性

- 🚀 **高性能**: 基于 OGL (轻量级 WebGL 库) 构建，运行流畅。
- 🎨 **优雅设计**: 精美的发光 Orb 效果，支持交互式悬停状态。
- 🛠️ **调试模式**: 内置可视化调试面板，方便实时调整效果。
- 📦 **开箱即用**: 作为 Vue 组件，简单配置即可使用。

### 安装

```bash
pnpm add @bg-effects/orb ogl
```

> **注意**: `ogl` 是 peer dependency，需要手动安装。

### 使用

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

### 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `hue` | `number` | `200` | 基础色调 (0-360) |
| `hoverIntensity` | `number` | `0.5` | 悬停效果强度 |
| `rotateOnHover` | `boolean` | `true` | 悬停时是否旋转 |
| `forceHoverState` | `boolean` | `false` | 强制进入悬停动画状态 |
| `backgroundColor` | `string` | `'#000000'` | 背景颜色 |
| `debug` | `boolean` | `false` | 是否开启调试面板 |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | 界面语言 |
| `className` | `string` | `''` | 容器的额外 CSS 类名 |

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

### 许可

MIT
