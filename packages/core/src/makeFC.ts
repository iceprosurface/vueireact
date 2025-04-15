import { defineComponent } from "vue";
import { ChildrenType, childrenTypeKey } from "./jsx-render";
export function makeFC<Props, SetupContext>(functionComponent: (props: Props, Ctx: SetupContext) => any): ReturnType<typeof defineComponent> {
  return defineComponent({
    inheritAttrs: false,
    setup(parentProps, ctx) {
      const attrs = ctx.attrs;
      const proxyProp = new Proxy(attrs, {
        get(target, prop) {
          if (prop === 'children') {
            switch (attrs[childrenTypeKey]) {
              case ChildrenType.Default:
                return ctx.slots?.default?.();
              case ChildrenType.Named:
                return ctx.slots;
              default:
                return ctx.slots;
            }
          }
          if (Reflect.has(target, prop)) {
            return Reflect.get(target, prop);
          }
          return Reflect.get(parentProps, prop);
        }
      });
      const render = functionComponent(proxyProp as any, ctx as any);  
      return render;
    }
  });
}
