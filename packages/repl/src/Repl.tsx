import SplitPane from './SplitPane'
import Output from './output/Output.vue'
import { withDefaults, defineExpose, toVue } from '@vueireact/core'
import { type Store, useStore } from './store'
import { computed, provide, shallowRef, toRefs } from 'vue'
import {
  type EditorComponentType,
  injectKeyPreviewRef,
  injectKeyProps,
} from './types'
import EditorContainer from './editor/EditorContainer.vue'
import type * as monaco from 'monaco-editor-core'
import './Repl.css'
import { useVModel } from '@vueuse/core'

export interface Props {
  theme?: 'dark' | 'light'
  previewTheme?: boolean
  editor: EditorComponentType
  store?: Store
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  showTsConfig?: boolean
  clearConsole?: boolean
  layout?: 'horizontal' | 'vertical'
  layoutReverse?: boolean
  ssr?: boolean
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    placeholderHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
    showRuntimeError?: boolean
    showRuntimeWarning?: boolean
  }
  editorOptions?: {
    showErrorText?: string | false
    autoSaveText?: string | false
    monacoOptions?: monaco.editor.IStandaloneEditorConstructionOptions
  }
  splitPaneOptions?: {
    codeTogglerText?: string
    outputTogglerText?: string
  }
}

function Repl(_props: Props & {
  modelValue?: boolean
  'onUpdate:modelValue'?: (value: boolean) => void
}, ctx: {
  expose: {
    reload: () => void
  }
}) {

  const props = withDefaults(_props, {
    theme: 'light',
    previewTheme: false,
    store: () => useStore(),
    autoResize: true,
    showCompileOutput: true,
    showImportMap: true,
    showTsConfig: true,
    clearConsole: true,
    layoutReverse: false,
    ssr: false,
    layout: 'horizontal',
    previewOptions: () => ({}),
    editorOptions: () => ({}),
    splitPaneOptions: () => ({}),
    modelValue: true,
  })

  const autoSave = useVModel(props, 'modelValue', (event, value) => {
    props['onUpdate:modelValue']?.(value)
  })

  if (!props.editor) {
    throw new Error('The "editor" prop is now required.')
  }

  const outputRef = shallowRef<any>()

  props.store.init()

  const editorSlotName = computed(() => (props.layoutReverse ? 'right' : 'left'))
  const outputSlotName = computed(() => (props.layoutReverse ? 'left' : 'right'))

  provide(injectKeyProps, {
    ...toRefs(props),
    autoSave,
  })
  provide(
    injectKeyPreviewRef,
    computed(() => outputRef.value?.previewRef?.container ?? null),
  )

  /**
   * Reload the preview iframe
   */
  function reload() {
    outputRef.value?.reload()
  }

  defineExpose(ctx,{ reload })
  return () => (<div class="vue-repl">
    <SplitPane layout={props.layout}>
      {
        {
          [editorSlotName.value]: () => <EditorContainer editorComponent={props.editor} />,
          [outputSlotName.value]: () => <Output ref={outputRef} editorComponent={props.editor} showCompileOutput={props.showCompileOutput} ssr={!!props.ssr} />
        }
      }
    </SplitPane>
  </div>)
}

export default toVue(Repl)