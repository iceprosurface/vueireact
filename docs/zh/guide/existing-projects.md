# 在现有项目中使用

VueIReact 与 Vue 生态系统完全兼容，可以集成到现有项目中。

## 选项 1：使用 Vue 函数式组件的项目

对于使用 [Vue 风格函数式组件](https://vuejs.org/guide/extras/render-function#typing-functional-components) 的项目，应该使用 `@vueireact/vite-plugin-vueireact` 插件：

1. React 风格的组件应该使用以 `.fc.tsx` 结尾的文件名
2. 配置 Vite：

```ts
import vue from '@vitejs/plugin-vue'
import vueireact from '@vueireact/vite-plugin-vueireact'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    // 必须是第一个插件
    vueireact(),
    vue(), 
    vueJsx()
  ],
})
```

然后，按照[配置部分](./getting-started#2-配置-typescript)中描述的方式配置 TypeScript。

## 选项 2：在纯 Vue 项目中使用

只需按照[配置部分](./getting-started#2-配置-typescript)中描述的方式配置 TypeScript。

## 选项 3：在 `.vue` 文件中使用 React 风格的组件

```tsx
// App.fc.tsx
import { toVues } from '@vueireact/core'

function HelloWorld() {
  return () => <div>Hello World</div>
}

export default toVues({
  HelloWorld
})
```

```vue
<!-- SomeComponent.vue -->
<script lang="tsx">
import App from './App.fc';
const { HelloWorld } = App;
</script>
<template>
  <HelloWorld />
</template>
``` 