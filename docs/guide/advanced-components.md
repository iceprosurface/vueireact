# Advanced Component Patterns

VueIReact supports various advanced component patterns that give you flexibility in your application design.

## Generic Components

```tsx
function GenericComponent<T>(props: {
  list: T[];
  handleItemClick: (item: T) => void;
}) {
  return () => <div>
    {props.list.map((item) => <div onClick={() => props.handleItemClick(item)}>{item}</div>)}
  </div>
}
```

## Exposing Instance Properties

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
```

## Using Slots

### Default Slot

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
```

### Named Slots

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
```

## Using in Existing Projects

VueIReact is fully compatible with the Vue ecosystem and can be integrated into existing projects.

### Option 1: Project with Vue Functional Components

For projects that use Vue-style functional components, use the `@vueireact/vite-plugin-vueireact` plugin:

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

### Option 2: Using in Pure Vue Projects

Just configure TypeScript as described in the Configuration section.

### Option 3: Using React-style Components in `.vue` Files

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