import { h, mergeProps, Fragment } from "vue";
import { getFCVNode } from "./getFCVNode";
export type RenderType = (tag: any, props: any) => JSX.Element;
export const jsxs: RenderType = (tag: any, props: any): JSX.Element => {
  let component = tag
  if (typeof tag === 'function') {
    component = getFCVNode(tag);
  }
  const { children, ...rest } = props;
  const mergedProps = mergeProps(rest);
  return h(component, mergedProps, children) as unknown as JSX.Element;
};
export const jsx: RenderType = (tag: any, props: any): JSX.Element => {
  let component = tag
  if (typeof tag === 'function') {
    component = getFCVNode(tag);
  }
  const { children, ...rest } = props;
  const mergedProps = mergeProps(rest);
  return h(component, mergedProps, children) as unknown as JSX.Element;
};

export { Fragment }