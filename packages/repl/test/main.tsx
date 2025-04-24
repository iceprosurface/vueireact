/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { createApp, h, ref, watchEffect } from 'vue'
import { type OutputModes, Repl, useStore, useVueImportMap } from '../src'
// @ts-ignore
import MonacoEditor from '../src/editor/MonacoEditor'
// @ts-ignore
import styles from './main.module.css'
import './global.css'
import { useExamples } from './examples/index'

const window = globalThis.window as any
window.process = { env: {} }

const App = {
  setup() {
    const query = new URLSearchParams(location.search)
    const { importMap: builtinImportMap, vueVersion } = useVueImportMap({
      runtimeDev: import.meta.env.PROD
        ? undefined
        : `${location.origin}/src/vue-dev-proxy`,
      serverRenderer: import.meta.env.PROD
        ? undefined
        : `${location.origin}/src/vue-server-renderer-dev-proxy`,
    })
    const store = (window.store = useStore(
      {
        builtinImportMap,
        vueVersion,
        showOutput: ref(query.has('so')),
        outputMode: ref((query.get('om') as OutputModes) || 'preview'),
      },
      location.hash,
    ))
    console.info(store)

    watchEffect(() => history.replaceState({}, '', store.serialize()))
    const theme = ref<'light' | 'dark'>('dark')
    window.theme = theme
    const previewTheme = ref(false)
    window.previewTheme = previewTheme
    const examples = useExamples(store)
    const examplesVisible = ref(false)
    return () => <div class={styles.app}>
      <nav class={styles.nav}>
        <h1>
          <span>Vue Function Component Playground</span>
        </h1>
        <div class={styles.navRight}>
          <span>core: {VITE_APP_CORE_VERSION}</span>
          <div class={styles.dropdownExamples}>
            <button class={styles.examplesButton} onClick={() => examplesVisible.value = !examplesVisible.value}>Examples</button>
            <ul class={styles.examples} style={{ display: examplesVisible.value ? 'block' : 'none' }}>
              {
                examples.map(
                  example => <li class={styles.example} onClick={() => {
                    example.setCode()
                    examplesVisible.value = false
                  }} >
                    <span>{example.name}</span>
                  </li>
                )
              }
            </ul>
          </div>
        </div>
      </nav >
      <Repl {...{
        store,
        theme: theme.value,
        previewTheme: previewTheme.value,
        editor: MonacoEditor,
        // layout: 'vertical',
        ssr: false,
        // showCompileOutput: false,
        // showImportMap: false
        editorOptions: {
          autoSaveText: '💾',
          monacoOptions: {
            // wordWrap: 'on',
          },
        },
        // autoSave: false,
        style: {
          flex: 1,
        }
      }
      } />
    </div >
  },
}

createApp(App).mount('#app')
