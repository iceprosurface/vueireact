import type { Component, ComputedRef, InjectionKey, ToRefs } from 'vue'
import type { Props } from './Repl'

export type EditorMode = 'js' | 'css' | 'ssr'
export interface EditorProps {
  value: string
  filename: string
  readonly?: boolean
  mode?: EditorMode
  onChange?: (code: string) => void
}
export type EditorComponentType = Component<EditorProps>

export type OutputModes = 'preview' | EditorMode

export const injectKeyProps: InjectionKey<
  ToRefs<Required<Props & { autoSave: boolean }>>
> = Symbol('props')
export const injectKeyPreviewRef: InjectionKey<
  ComputedRef<HTMLDivElement | null>
> = Symbol('preview-ref')
