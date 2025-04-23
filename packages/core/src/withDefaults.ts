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
    for (const key in defaults) {
      const defaultValue = getDefaultValue(defaults[key]);
      if (!Reflect.has(props, key) || Reflect.get(props, key) === undefined) {
        Reflect.set(result, key, defaultValue)
      }
      // typeis boolean
      if (typeof defaultValue === 'boolean') {
        const currentValue = Reflect.get(props, key)
        if (currentValue === '') {
          Reflect.set(result, key, true)
        } else if (typeof currentValue === 'boolean') {
          Reflect.set(result, key, currentValue)
        } else {
          Reflect.set(result, key, defaultValue ?? false)
        }
      }
    }
    for (const key in result) {
      Reflect.set(defaultReactive, key, result[key])
    }
  })
  return defaultReactive as any
}
