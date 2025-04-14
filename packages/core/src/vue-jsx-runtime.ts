/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import type { NativeElements, ReservedProps, VNode } from 'vue'

type JSXElementConstructor<P> = ((props: P, context: any) => () => JSX.Element) | {
  $props: P
}

type VueJSXElement<P = any, T extends string | JSXElementConstructor<P> = string | JSXElementConstructor<P>> = {
  type: T;
  $props: P;
  key: string | null;
}
declare global {
  namespace JSX {
    type ElementType = string | JSXElementConstructor<any>
    export interface Element extends VueJSXElement {
    }
    export interface ElementClass {
      $props: {}
    }
    export interface ElementAttributesProperty {
      $props: {}
    }
    export interface IntrinsicElements extends NativeElements {
      // allow arbitrary elements
      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      [name: string]: any
    }
    export interface IntrinsicAttributes extends ReservedProps {}
  }
}
