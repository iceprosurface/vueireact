import { h, isVNode, mergeProps, Fragment as VueFragment } from "vue";
import { getFCVNode } from "./getFCVNode.js";
import { Children } from "./vue-jsx-runtime";
export type RenderType = (tag: any, props: any, key: string) => JSX.Element;
export const childrenTypeKey = 'normalizedChildrenType';
export const enum ChildrenType {
  Default = 'default',
  Named = 'named',
  Unknown = 'unknown',
  DefaultWithFunction = 'defaultWithFunction'
}
function normalizeChildren(children: any): {
  type: ChildrenType
  value: any
} {
  if (typeof children === 'function') {
    return {
      type: ChildrenType.DefaultWithFunction,
      value: {
        default: children
      }
    }
  }
  if (Array.isArray(children) || isVNode(children)) {
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
    value: {
      default: () => children
    }
  }
}
export const jsx: RenderType = (tag: any, props?: any, key?: string): JSX.Element => {
  let component = tag
  if (typeof component === 'string') {
    // string is a component name
    // maybe a built-in component or html element
    // use default render
    const { children, ...rest } = props || {};
    return h(component, { ...rest, key }, children) as unknown as JSX.Element;
  }
  if (typeof tag === 'function') {
    component = getFCVNode(tag);
  }
  const { children, ...rest } = props || {};
  const mergedProps = mergeProps(rest);
  if (key) {
    mergedProps.key = key;
  }
  if (component === Fragment) {
    return h(component, mergedProps, children) as unknown as JSX.Element;
  }
  if (children) {
    const normalizedChildren = normalizeChildren(children);
    if (typeof component !== 'string') {
      mergedProps[childrenTypeKey] = normalizedChildren.type;
    }
    return h(component, mergedProps, normalizedChildren.value) as unknown as JSX.Element;
  }
  return h(component, mergedProps) as unknown as JSX.Element;
};
export const jsxs: RenderType = jsx;

export const Fragment = VueFragment as unknown as (setting: { children: Children }) => JSX.Element;
