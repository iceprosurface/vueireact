import { h, SuspenseProps, Suspense as VueSuspense } from "vue";
import { Children } from "../vue-jsx-runtime";

export const Suspense = (props: SuspenseProps & {
  children: Children
}) => {
  return () => h(VueSuspense, props, props.children as any) as unknown as JSX.Element;
}