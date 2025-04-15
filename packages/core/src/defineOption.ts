import { Directive } from "vue";


export const FcOptionSymbol: unique symbol = Symbol('fcOption');
// props`s emit must start with 'on'
type NormalizeEmitFromProps<Props> = keyof Props extends `on${infer Rest}` ? LowercaseFirstLetter<Rest> : never;
type LowercaseFirstLetter<T extends string> = T extends `${infer Rest}${infer Last}` ? `${Lowercase<Rest>}${Last}` : T;
/**
 * @deprecated WIP dont use this
 */
export function defineOption<Props, SetupContext extends {
  [key: string]: Directive
}>(fc: (
  props: Props,
  ctx: SetupContext
) => () => JSX.Element, validOptions: {
  props: keyof Props,
  /**
   * @deprecated emit type was not support very well, please use props[emitName] instead
   */
  emit: NormalizeEmitFromProps<Props>[]
  directives: SetupContext['directives']
}): void {
  Object.defineProperty(fc, FcOptionSymbol, {
    value: validOptions,
    writable: false,
    enumerable: false,
    configurable: false
  });
}