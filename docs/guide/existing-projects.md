# Using in Existing Projects

VueIReact is fully compatible with the Vue ecosystem and can be integrated into existing projects.

## Option 1: Project with Vue Functional Components

For projects that use [Vue-style functional components](https://vuejs.org/guide/extras/render-function#typing-functional-components), should use the `@vueireact/vite-plugin-vueireact` plugin:

1. React-style components should have filenames ending with `.fc.tsx`
2. Configure Vite:

```ts
import vue from '@vitejs/plugin-vue'
import vueireact from '@vueireact/vite-plugin-vueireact'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [
    // must be the first plugin
    vueireact(),
    vue(), 
    vueJsx()
  ],
})
```

then, Just configure TypeScript as described in the [Configuration section](./getting-started#2-configure-typescript).

## Option 2: Using in Pure Vue Projects

Just configure TypeScript as described in the [Configuration section](./getting-started#2-configure-typescript).

## Option 3: Using React-style Components in `.vue` Files

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