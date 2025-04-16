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

### 1. Remove Vue plugin from Vite config (Optional)

```js
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [], // Remove vue() from here
})
```

### 2. Configure TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@vueireact/core"
  }
}
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
