import { DefineComponent } from "vue";
import { makeFC } from "./makeFC.js";

type TransformPropsToVue<Props extends Record<string, any>, Children = Props['children']> = new (...args: any[]) => {
  $props: Omit<Props, 'children'>
  $slots: Children extends () => JSX.Element ? {
    default: () => JSX.Element
  } : Children extends Record<string, any> ? Children : () => Children
}
export function toVue<Props extends Record<string, any>, SetupContext>(component: (props: Props, ctx: SetupContext) => () => JSX.Element):
  TransformPropsToVue<Props> {
  return makeFC(component) as any;
}
export function toVues<FCRecord extends Record<string, (props: any, ctx: any) => () => JSX.Element>>(components: FCRecord): {
  [K in keyof FCRecord]: FCRecord[K] extends (props: infer P, ctx: any) => () => JSX.Element ? TransformPropsToVue<P> : never
} {
  return {
    ...Object.fromEntries(Object.entries(components).map(([key, value]) => [key, toVue(value)])) as any,
  }
}
