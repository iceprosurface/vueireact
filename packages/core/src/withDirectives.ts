import { DirectiveArguments, VNode, withDirectives as withDirectivesVue } from 'vue';
export function withDirectives<T extends JSX.Element>(element: T, arg: DirectiveArguments): T {
  return withDirectivesVue(element as any, arg);
}