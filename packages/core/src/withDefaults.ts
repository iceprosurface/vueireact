import { shallowReactive, watchEffect } from "vue";

type NativeData = string | number | boolean | null | undefined
function getDefaultValue(value: any) {
  if (typeof value === 'function') {
    return value()
  }
  return value
}
export type OptionalKeysOf<Obj> = keyof {
  [Key
  in keyof Obj
  as Omit<Obj, Key> extends Obj ? Key : never
  ]: Obj[Key];
};
type PickOptionals<Obj> = Pick<
  Obj,
  OptionalKeysOf<Obj>
>;
export function withDefaults<T extends Record<string, any>, optionalT = PickOptionals<T>>(props: T, defaults: {
  [K in keyof optionalT]: optionalT[K] extends NativeData ? optionalT[K] : () => optionalT[K]
}): Required<T> {
  const defaultReactive = shallowReactive({})
  watchEffect(() => {
    const result = {}
    for (const key of [...Reflect.ownKeys(props), ...Reflect.ownKeys(defaults)]) {
      Reflect.set(result, key, Reflect.has(props, key) ? Reflect.get(props, key) : getDefaultValue(defaults[key]))
    }
    for (const key in defaultReactive) {
      Reflect.set(defaultReactive, key, getDefaultValue(defaults[key]))
    }
    for (const key in result) {
      Reflect.set(defaultReactive, key, result[key])
    }
  })
  return defaultReactive as any
}
