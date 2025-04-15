import { DefineComponent } from "vue";
import { makeFC } from "./makeFC";

export function toVue<Props, SetupContext>(component: (props: Props, ctx: SetupContext) => () => JSX.Element): DefineComponent<Props, SetupContext> {
  return makeFC(component) as any;
}
export function toVues<FCRecord extends Record<string, (props: any, ctx: any) => () => JSX.Element>>(components: FCRecord): {
  [K in keyof FCRecord]: FCRecord[K] extends (props: infer P, ctx: any) => () => JSX.Element ? DefineComponent<Omit<P, 'children'>, any> : never
} {
  return {
    ...Object.fromEntries(Object.entries(components).map(([key, value]) => [key, toVue(value)])) as any,
  }
}
