import { h, mergeProps, Fragment as VueFragment } from "vue";
import { getFCVNode } from "./getFCVNode.js";
export type RenderType = (tag: any, props: any) => JSX.Element;
export const childrenTypeKey = 'normalizedChildrenType';
export const enum ChildrenType {
  Default = 'default',
  Named = 'named',
  Unknown = 'unknown'
}
function normalizeChildren(children: any): {
  type: ChildrenType
  value: any
} {
  if (Array.isArray(children)) {
    return {
      type: ChildrenType.Default,
      value: {
        default: () => children
      }
    }
  }
  // is record
  if (typeof children === 'object' && children !== null) {
    return {
      type: ChildrenType.Named,
      value: children
    }
  }
  return {
    type: ChildrenType.Unknown,
    value: children
  }
}
export const jsx: RenderType = (tag: any, props: any): JSX.Element => {
  let component = tag
  if (typeof tag === 'function') {
    component = getFCVNode(tag);
  }
  const { children, ...rest } = props;
  const mergedProps = mergeProps(rest);
  if (component === Fragment) {
    return h(component, mergedProps, children) as unknown as JSX.Element;
  }
  if (children) {
    const normalizedChildren = normalizeChildren(children);
    mergedProps[childrenTypeKey] = normalizedChildren.type;
    return h(component, mergedProps, normalizedChildren.value) as unknown as JSX.Element;
  }
  return h(component, mergedProps) as unknown as JSX.Element;
};
export const jsxs: RenderType = jsx;

export const Fragment = VueFragment as unknown as (setting: { children: JSX.Element[] | JSX.Element }) => JSX.Element;