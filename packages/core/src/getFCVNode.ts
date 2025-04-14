import { makeFC } from "./makeFC";

const isInitializedSymbol = Symbol('isInitialized');
const ComponentSymbol = Symbol('Component');

function initComponent(tag: any) {
  Object.defineProperties(tag, {
    [isInitializedSymbol]: {
      value: true,
      writable: false,
      configurable: false,
    },
    [ComponentSymbol]: {
      value: makeFC(tag),
      writable: false,
      configurable: false,
    },
  });
}
export function getFCVNode(tag: any): any {
  const isInitialized = tag[isInitializedSymbol];
  if (!isInitialized) {
    initComponent(tag);
  }
  return tag[ComponentSymbol];
}

