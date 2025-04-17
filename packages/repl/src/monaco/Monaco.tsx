import {
  computed,
  inject,
  onBeforeUnmount,
  onMounted,
  onWatcherCleanup,
  ref,
  shallowRef,
  watch,
} from 'vue'
import * as monaco from 'monaco-editor-core'
import { initMonaco } from './env'
import { getOrCreateModel } from './utils'
import { type EditorMode, injectKeyProps } from '../types'
import { registerHighlighter } from './highlight'
import { useStyleTag, useMagicKeys, whenever } from '@vueuse/core'
import { toVue, withDefaults } from '@vueireact/core';
function MonacoFC(_props: {
  filename: string
  value?: string
  readonly?: boolean
  mode?: EditorMode
  onChange?: (value: string) => void
}) {

  const props = withDefaults(
    _props,
    {
      readonly: false,
      value: '',
      mode: 'js',
    },
  )

  const containerRef = ref<HTMLDivElement>()
  const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()
  const {
    store,
    autoSave,
    theme: replTheme,
    editorOptions,
  } = inject(injectKeyProps)!

  initMonaco(store.value)

  const lang = computed(() => (props.mode === 'css' ? 'css' : 'javascript'))

  let editorInstance: monaco.editor.IStandaloneCodeEditor
  function emitChangeEvent() {
    props.onChange?.(editorInstance.getValue())
  }

  onMounted(() => {
    const theme = registerHighlighter()
    if (!containerRef.value) {
      throw new Error('Cannot find containerRef')
    }
    editorInstance = monaco.editor.create(containerRef.value, {
      ...(props.readonly
        ? { value: props.value, language: lang.value }
        : { model: null }),
      fontSize: 13,
      tabSize: 2,
      theme: replTheme.value === 'light' ? theme.light : theme.dark,
      readOnly: props.readonly,
      automaticLayout: true,
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false,
      },
      inlineSuggest: {
        enabled: false,
      },
      fixedOverflowWidgets: true,
      ...editorOptions.value.monacoOptions,
    })
    editor.value = editorInstance

    // Support for semantic highlighting
    const t = (editorInstance as any)._themeService._theme
    t.semanticHighlighting = true
    t.getTokenStyleMetadata = (
      type: string,
      modifiers: string[],
      _language: string,
    ) => {
      const _readonly = modifiers.includes('readonly')
      switch (type) {
        case 'function':
        case 'method':
          return { foreground: 12 }
        case 'class':
          return { foreground: 11 }
        case 'variable':
        case 'property':
          return { foreground: _readonly ? 19 : 9 }
        default:
          return { foreground: 0 }
      }
    }

    watch(
      () => props.value,
      (value) => {
        if (editorInstance.getValue() === value) return
        editorInstance.setValue(value || '')
      },
      { immediate: true },
    )

    watch(lang, (lang) =>
      monaco.editor.setModelLanguage(editorInstance.getModel()!, lang),
    )

    if (!props.readonly) {
      watch(
        () => props.filename,
        (_, oldFilename) => {
          if (!editorInstance) return
          const file = store.value.files[props.filename]
          if (!file) return null
          const model = getOrCreateModel(
            monaco.Uri.parse(`file:///${props.filename}`),
            file.language,
            file.code,
          )

          const oldFile = oldFilename ? store.value.files[oldFilename] : null
          if (oldFile) {
            oldFile.editorViewState = editorInstance.saveViewState()
          }

          editorInstance.setModel(model)

          if (file.editorViewState) {
            editorInstance.restoreViewState(file.editorViewState)
            editorInstance.focus()
          }
        },
        { immediate: true },
      )
    }

    editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // ignore save event
    })

    watch(
      autoSave,
      (autoSave) => {
        if (autoSave) {
          const disposable =
            editorInstance.onDidChangeModelContent(emitChangeEvent)
          onWatcherCleanup(() => disposable.dispose())
        }
      },
      { immediate: true },
    )

    // update theme
    watch(replTheme, (n) => {
      editorInstance.updateOptions({
        theme: n === 'light' ? theme.light : theme.dark,
      })
    })
  })

  onBeforeUnmount(() => {
    editor.value?.dispose()
  })
  useStyleTag(`.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
`, {})
  const { current } = useMagicKeys({
    target: computed(() => containerRef.value ?? document.body),
  })
  whenever(() => [
    // ctrl + s
    current.has('ctrl') && current.has('s'), 
    // meta + s
    current.has('meta') && current.has('s')
  ].some(Boolean), () => {
      emitChangeEvent()
    })
  return () => (<div ref={containerRef} class="editor" />)
}


export const Monaco = toVue(MonacoFC)