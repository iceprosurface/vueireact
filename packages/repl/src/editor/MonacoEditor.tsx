import { toVue } from '@vueireact/core'
import { Monaco } from '../monaco/Monaco'
import type { EditorProps } from '../types'

function MonacoEditor(props: EditorProps) {
  const onChange = (code: string) => {
    props.onChange?.(code)
  }

  return () => <Monaco
    filename={props.filename}
    value={props.value}
    readonly={props.readonly}
    mode={props.mode}
    onChange={onChange}
  />
}

export default toVue(MonacoEditor)    