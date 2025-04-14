# VueIReact

[![npm version](https://img.shields.io/npm/v/vueireact-core.svg)](https://www.npmjs.com/package/vueireact-core)
[![license](https://img.shields.io/npm/l/vueireact-core.svg)](https://github.com/vueireact/vueireact/blob/main/LICENSE)

A lightweight library for writing Vue applications using React syntax.

I appreciate React's syntax, though I primarily use Vue. React's functional components work beautifully with TypeScript, whereas Vue historically hasn't been as elegant with TypeScript. Why not combine the best of both worlds with a sweet syntax?

## Features

- ✨ Use familiar React functional component syntax
- 🔄 Seamless integration with Vue's reactivity system
- 🧩 Type safety with perfect TypeScript support
- 🛠️ Compatible with the Vue ecosystem

## Installation

```bash
npm install vueireact-core
```

## Configuration

### 1. Remove Vue plugin from Vite config

```diff
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
-  plugins: [vue()],
+  plugins: [],
})
```

### 2. Configure TypeScript

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

## Usage Examples

### Basic Functional Component

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
    // Note: Never use App directly in createApp
    // createApp will treat it as a Vue type functional component, not a React type functional component
    return <App />
  }
}).mount('#app')
```

### Generic Component

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

### Exposing Component Instance Properties and Methods

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
    {/* This will throw an error */}
    <ExposeFeature ref={notMatch} />
  </>
}
export default App;
```

## Contributing

Issues and PRs are welcome to improve this project.

## License

[MIT](LICENSE)