import { h, TeleportProps, Teleport as VueTeleport } from "vue";
import { Children } from "../vue-jsx-runtime";

export const Teleport = (props: TeleportProps & {
  children: Children
}) => {
  return () => h(VueTeleport, props, props.children as any) as unknown as JSX.Element;
}
