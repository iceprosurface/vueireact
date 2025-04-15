# VueIReact

[![npm version](https://img.shields.io/npm/v/vueireact-core.svg)](https://www.npmjs.com/package/vueireact-core)
[![license](https://img.shields.io/npm/l/vueireact-core.svg)](https://github.com/vueireact/vueireact/blob/main/LICENSE)

简体中文 | [English](./readme.md)

一个使用React语法编写Vue应用的轻量级库。

我很欣赏React的语法，而我更多的主要使用Vue。React的函数式组件与TypeScript配合得非常好，而Vue在过去与TypeScript的配合并不那么优雅。为什么不结合两者的优点，创造一个优雅的语法呢？

## 特性

- ✨ 使用熟悉的React函数式组件语法
- 🔄 与Vue的响应式系统无缝集成
- 🧩 完美的TypeScript支持，确保类型安全
- 🛠️ 兼容Vue生态系统

## 安装

```bash
npm install vueireact-core
```

## 配置

### 1. 从Vite配置中移除Vue插件

```diff
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
-  plugins: [vue()],
+  plugins: [],
})
```

### 2. 配置TypeScript

```diff 
// tsconfig.json
{
  "compilerOptions": {
-   "jsx": "preserve",
-    "jsxImportSource": "vueireact-core",
+   "jsx": "react-jsx",
+   "jsxImportSource": "vueireact-core",
  }
}
```

## 使用示例

### 基本函数式组件

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

### 在main.ts中注册组件

```ts
import { createApp } from 'vue'
import App from './App.tsx'

createApp({
  render() {
    // 注意：永远不要在createApp中直接使用App
    // createApp会将其视为Vue类型的函数组件，而不是React类型的函数组件
    return <App />
  }
}).mount('#app')
```

### 泛型组件

```tsx
function GenericComponent<T>(props: {
  list: T[];
  handleItemClick: (item: T) => void;
}) {
  return () => <div>
    {props.list.map((item) => <div onClick={() => props.handleItemClick(item)}>{item}</div>)}
  </div>
}

function App() {
  const list = ref([1, 2, 3]);
  const handleItemClick = (item: number) => {
    console.log(item);
  }
  return () => <GenericComponent list={list.value} handleItemClick={handleItemClick} /> 
}

export default App;
```

### 暴露组件实例属性和方法

```tsx
function ExposeFeature(_: any, ctx: {
  expose: {
    name: string
  }
}) {
  const name = ref('ExposeFeature')
  defineExpose(ctx, {
    name
  })
  return () => <div>{name.value}</div>
}

function App() {
  const instance = useRef(ExposeFeature)
  const notMatch = ref(false)
  return () => <>
    <ExposeFeature ref={instance} />
    {/* 这将抛出错误 */}
    <ExposeFeature ref={notMatch} />
  </>
}
export default App;
```

### 默认插槽

```tsx
function DefaultSlot(props: {
  children: JSX.Element[]
}) {
  return () => <div>{props.children}</div>
}

function App() {
  return () => <DefaultSlot>
    <div>Hello</div>
  </DefaultSlot>
}
export default App;
```

### 命名插槽

```tsx 
function NamedSlot(props: {
  children: {
    named: () => JSX.Element
  }
}) {
  return () => <div>{props.children.named()}</div>
}

function App() {
  return () => <NamedSlot>
    {
      {
        named: () => <div>Hello</div>,
      }
    }
  </NamedSlot>
}
export default App;
```

## 在现有项目中使用

vueireact-core 完全兼容 Vue 生态系统，所以你可以在现有项目中使用它。

### 1. 项目中有 Vue 类型的函数式组件

vueireact-core 无法确定使用的是哪种写法的函数式组件，所以我们需要使用 'vite-plugin-vueireact' 来转换代码。

在这种情况下，任何 React 写法的 Vue 函数式组件都应该以 `.fc.tsx` 结尾

```tsx
import { HelloWorld } from './App.fc';
```

### 1.1 配置 Vite

```ts
import vue from '@vitejs/plugin-vue'
import vueireact from 'vite-plugin-vueireact'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [
    // 必须放置在第一个
    vueireact(),
    vue(), 
    vueJsx()
  ],
})
```

### 1.2 配置 TypeScript

```ts
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "vueireact-core",
  }
}
```

### 2. 项目是完全 Vue 类型

在这种情况下，你可以直接使用 tsconfig 配置，不需要配置 vite

```ts 
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "vueireact-core",
  }
}
```

### 3. 在 `.vue` 文件中使用 React 写法的 Vue 函数式组件

```tsx
import { toVues } from 'vueireact-core'
function HelloWorld() {
  return () => <div>Hello World</div>
}
export default toVues({
  HelloWorld
})
```

```vue
<script lang="tsx">
import App from './App.fc';
const { HelloWorld } = App;
</script>
<template>
  <HelloWorld />
</template>
```

## Contribution

欢迎提出问题和PR来改进这个项目。

## LICENSE

[MIT](LICENSE)