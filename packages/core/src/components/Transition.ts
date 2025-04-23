import { Transition as VueTransition, TransitionProps } from 'vue';
import { h } from 'vue';
import type { Children } from '../vue-jsx-runtime';
export const Transition = (props: TransitionProps & {
  children: Children
}) => {
  return (): JSX.Element => h(VueTransition, props, props.children as any) as unknown as JSX.Element;
};