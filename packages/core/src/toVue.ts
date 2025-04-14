import { DefineComponent, defineComponent } from "vue";

export function toVue<Props, SetupContext>(component: (props: Props, ctx: SetupContext) => () => JSX.Element): DefineComponent<Props, SetupContext> {
  return defineComponent({
    setup(props, ctx) {
      const render = component(props as any, ctx as any);
      return render;
    }
  }) as any;
}
