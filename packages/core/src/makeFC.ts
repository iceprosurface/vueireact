import {defineComponent} from "vue";
import {ChildrenType, childrenTypeKey} from "./jsx-render.js";

export function makeFC<Props, SetupContext>(functionComponent: (props: Props, Ctx: SetupContext) => any): ReturnType<typeof defineComponent> {
  return defineComponent({
    name: functionComponent.name,
    inheritAttrs: false,
    props: {
      [childrenTypeKey]: {
        type: String,
        default: undefined
      }
    },
    setup(parentProps, ctx) {
      const attrs = ctx.attrs;
      const proxyProp = new Proxy(attrs, {
        get(target, prop) {
          if (prop === 'children') {
            switch (Reflect.get(parentProps, childrenTypeKey)) {
              case ChildrenType.Default:
                return ctx.slots?.default?.();
              case ChildrenType.Named:
                return ctx.slots;
              case ChildrenType.DefaultWithFunction:
                return ctx.slots?.default;
              default:
                return ctx.slots?.default?.();
            }
          }
          if (Reflect.has(target, prop)) {
            return Reflect.get(target, prop);
          }
          return Reflect.get(parentProps, prop);
        }
      });
      return functionComponent(proxyProp as any, ctx as any);
    }
  });
}
