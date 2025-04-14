# vueireact

Use react syntax in vue.

I like react syntax, but i use Vue more, but functional components in React are also sweet with Typescript, and vue was not pretter with Typescript, why not to use them together with some sweet syntax?

# How to use

```bash
npm install @vueireact/core
```


## settings

1. remove vue plugin in vite config

```diff
// vite.config.ts
import vue from '@vitejs/plugin-vue'

export default defineConfig({
-  plugins: [vue()],
+  plugins: [],
})
```

2. add ts config

```diff 
// tsconfig.json
{
  "compilerOptions": {
-   "jsx": "preserve",
-    "jsxImportSource": "@vueireact/core",
+   "jsx": "react-jsx",
+   "jsxImportSource": "@vueireact/core",
  }
}
```

## use functional components

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

register the component in main.ts

```ts
import { createApp } from 'vue'
import App from './App.tsx'

createApp({
  render() {
    // note: you should never use App directly in createApp, createApp will use as vue type functional component, instead of react type functional component
    return <App />
  }
}).mount('#app')
```

## generic component

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

