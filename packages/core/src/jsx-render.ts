import { h, mergeProps } from "vue";
import { getFCVNode } from "./getFCVNode";

export const jsxs = (tag: any, props: any) => {
  let component = tag
  if (typeof tag === 'function') {
    component = getFCVNode(tag);
  }
  const { children, ...rest } = props;
  return h(component, mergeProps(rest), children);
};
export const jsx = (tag: any, props: any) => {
  let component = tag
  if (typeof tag === 'function') {
    component = getFCVNode(tag);
  }
  const { children, ...rest } = props;
  return h(component, mergeProps(rest), children);
};
