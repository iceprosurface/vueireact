/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import type { NativeElements, Ref } from 'vue'

type JSXElementConstructor<P, C> = ((props: P, context: C) => () => JSX.Element) | {
  $props: P
}

type VueJSXElement<P = any, T extends string | JSXElementConstructor<P, any> = string | JSXElementConstructor<P, any>> = {
  type: T;
  $props: P;
  key: string | null;
}
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
    type LibraryManagedAttributes<C, P> = C extends JSXElementConstructor<infer U, { expose: infer Exposed }>
      ? P & {
        ref?: Ref<Exposed> | ((ref: Exposed) => void)
      }
      : P;
    export interface IntrinsicElements extends NativeElements {
      // allow arbitrary elements
      // @ts-ignore suppress ts:2374 = Duplicate string index signature.
      [name: string]: any
    }

    // ReservedProps
    export interface IntrinsicAttributes {
      key?: string;
    }
  }
}
