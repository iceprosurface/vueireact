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
  [K in keyof optionalT]: optionalT[K]
}): {
    [K in keyof T]: T[K];
  } {
  return new Proxy(props, {
    get(target, prop) {
      if (Reflect.has(target, prop)) {
        return Reflect.get(target, prop)
      }
      return Reflect.get(defaults, prop)
    },
  })
}
