# Getting Started with VueIReact

VueIReact is a lightweight library that allows you to write Vue applications using React syntax. It combines React's functional component approach with Vue's reactivity system.

## Why VueIReact?

React's functional components work beautifully with TypeScript, while Vue historically hasn't been as elegant with TypeScript. VueIReact lets you combine the best of both worlds with an elegant syntax.

## Features

- ✨ Use familiar React functional component syntax
- 🔄 Seamless integration with Vue's reactivity system
- 🧩 Type safety with perfect TypeScript support
- 🛠️ Compatible with the Vue ecosystem

## Installation

```bash
npm install @vueireact/core
```

## Configuration

VueIReact is a fully typescript library, and not have any compiler magic, so that it's easy to integrate with any build tool you like.


### 1. Configure TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@vueireact/core"
  }
}
```

### 1.1 build tools

you can use any build tool you like, but you need to ensure that fully support typescript jsx transform.

following build tools are recommended without any configuration except for `tsconfig.json`:

- [esbuild](https://esbuild.github.io/)
- [vite](https://vite.dev/)
- [swc](https://swc.rs/)
- [tsup](https://tsup.egoist.dev/)
- [tsdown](https://tsdown.dev/)
- [tsc](https://www.typescriptlang.org/docs/handbook/compiler-options.html)


### 2. Remove Vue plugin from Vite config (Optional)

```js
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [], // Remove vue() from here
})
```

## Basic Usage

### Simple Component

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

### Using withDefaults

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

### Register Component in main.ts

```ts
import { createApp } from 'vue'
import App from './App.tsx'

createApp({
  render() {
    // Important: Never use App directly in createApp
    // createApp will treat it as a Vue type functional component, not a React type
    return <App />
  }
}).mount('#app')
```

## Next Steps

To learn about advanced component patterns and using VueIReact in existing projects, check out the [Advanced Components](./advanced-components) guide.
