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

## Next Steps

For information on integrating VueIReact with existing projects, check out the [Using in Existing Projects](./existing-projects) guide.
