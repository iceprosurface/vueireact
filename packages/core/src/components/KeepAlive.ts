import { h, KeepAliveProps, KeepAlive as VueKeepAlive } from "vue";
import { Children } from "../vue-jsx-runtime";


export const KeepAlive = (props: KeepAliveProps & {
  children: Children
}) => {
  return () => h(VueKeepAlive, props, props.children as any) as unknown as JSX.Element;
}