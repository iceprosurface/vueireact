import { defineComponent } from "vue";
export function makeFC<Props, SetupContext>(functionComponent: (props: Props, Ctx: SetupContext) => any) {
  return defineComponent({
    setup(_, ctx) {
      const attrs = ctx.attrs;
      const render = functionComponent(attrs as any, ctx as any);  
      return render;
    }
  });
}
