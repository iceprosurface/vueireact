/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import type { IntrinsicElementAttributes, Ref, ReservedProps } from 'vue'

type JSXElementConstructor<P, C> = ((props: P, context: C) => () => JSX.Element) | (
  new (...args: any[]) => {
    $props: P
  }
) | {
  [key: string]: () => JSX.Element
}
type VueJSXElement<P = any, T extends string | JSXElementConstructor<P, any> = string | JSXElementConstructor<P, any>> = {
  type: T;
  $props: P;
  key: string | null;
}
type JsxChild = JSX.Element[] | JSX.Element | string | number | boolean | null | undefined;
type JsxChildren = Array<JsxChild>;
export type Children = JsxChildren | JsxChild;
export interface GlobalDirectives {

}

type NativeElements = {
  [K in keyof IntrinsicElementAttributes]: IntrinsicElementAttributes[K] & ReservedProps & {
    children?: Children;
  } & GlobalDirectives;
};
declare global {
  namespace JSX {
    type ElementType = string | JSXElementConstructor<any, any>
    export interface Element extends VueJSXElement {
    }
    export interface ElementClass {
      $props: {}
    }
    export interface ElementAttributesProperty {
      $props: {}
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    type LibraryManagedAttributes<C, P> = C extends JSXElementConstructor<infer U, { expose: infer Exposed }>
      ? U & {
        ref?: Ref<Exposed> | ((ref: Exposed) => void);
      } & ('children' extends keyof U ? {} : { children?: Children })
      : P;
    export interface IntrinsicElements extends NativeElements {
      // allow arbitrary elements
      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      [name: string]: any
    }

    // ReservedProps
    export interface IntrinsicAttributes extends GlobalDirectives {
      key?: string;
    }
  }
}
