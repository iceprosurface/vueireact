# 开始使用 VueIReact

VueIReact 是一个轻量级库，允许你使用 React 语法编写 Vue 应用程序。它结合了 React 的函数式组件方法和 Vue 的响应式系统。

## 为什么选择 VueIReact？

React 的函数式组件与 TypeScript 配合得非常好，而 Vue 在历史上与 TypeScript 的配合并不那么优雅。VueIReact 让你能够通过优雅的语法将两者的优点结合起来。

## 特性

- ✨ 使用熟悉的 React 函数式组件语法
- 🔄 与 Vue 的响应式系统无缝集成
- 🧩 完美的 TypeScript 支持，确保类型安全
- 🛠️ 与 Vue 生态系统完全兼容

## 安装

```bash
npm install @vueireact/core
```

## 配置

VueIReact 是一个完全的 typescript 库，他没有任何编译魔法，所以你可以使用任何你喜欢的构建工具来集成到你的项目。

### 1. 配置 TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@vueireact/core"
  }
}
```

### 1.1 构建工具

你可以使用任何你喜欢的构建工具，但是你需要确保他完全支持 typescript jsx 的转换。

以下构建工具被推荐，并且不需要任何除开 `tsconfig.json` 的配置：

- [esbuild](https://esbuild.github.io/)
- [vite](https://vite.dev/)
- [swc](https://swc.rs/)
- [tsup](https://tsup.egoist.dev/)
- [tsdown](https://tsdown.dev/)
- [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

### 1.2 从 Vite 配置中移除 Vue 插件（可选）

```js
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [], // 从这里移除 vue()
})
```

## 基本用法

### 简单组件

```tsx
import { ref } from 'vue'

function HelloWorld(props: { name: string, handleClick: () => void }) {
  return () => <div onClick={props.handleClick}>Hello {props.name}</div>;
}

function App() {
  const name = ref('World');
  const handleClick = () => {
    name.value = 'Vueireact';
  }
  return () => <HelloWorld name={name.value} handleClick={handleClick} />;
}

export default App;
```

### 使用 withDefaults

```tsx
import { withDefaults } from '@vueireact/core'

function Button(props: {
  size: 'small' | 'medium' | 'large',
  color?: string,
}) {
  const { size, color } = withDefaults(props, {
    color: 'blue',
  })
  return () => <button style={{ color }}>{size} Button</button>
}
```

### 在 main.ts 中注册组件

```ts
import { createApp } from 'vue'
import App from './App.tsx'

createApp({
  render() {
    // 重要：永远不要在 createApp 中直接使用 App
    // createApp 会将其视为 Vue 类型的函数式组件，而不是 React 类型
    return <App />
  }
}).mount('#app')
```

## 下一步

要了解高级组件模式和在现有项目中使用 VueIReact，请查看[高级组件](./advanced-components)指南。 