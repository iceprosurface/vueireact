import { ref, Ref } from "vue"

export function defineExpose<T extends Record<string, any>>(ctx: {
  expose: T
}, value: {
  [K in keyof T]: T[K] | Ref<T[K]>
}): void {
  const expose = (ctx as any).expose;
  if (expose && typeof expose === 'function') {
    expose(value)
  } else {
    console.error('ctx expose not work as expected')
  }
}

export function useRef<T extends Record<string, any>>(fc: (_: any, ctx: {
  expose: T
}) => () => JSX.Element): Ref<T> {
  return ref() as any
}