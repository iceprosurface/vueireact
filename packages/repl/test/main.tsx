/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { createApp, h, ref, watchEffect } from 'vue'
import { type OutputModes, Repl, useStore, useVueImportMap } from '../src'
// @ts-ignore
import MonacoEditor from '../src/editor/MonacoEditor'
// @ts-ignore
import styles from './main.module.css'
import './global.css'
import { getTsConfig } from '../src/store'

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
    const examples = [
      {
        name: 'Hello World',
        setCode: () => {
          store.setFiles({
            'tsconfig.json': getTsConfig(),
            'src/App.tsx': `import { ref } from 'vue'
import { toVue } from '@vueireact/core'
function Welcome() {
  const msg = ref('Hello World!')
  
  return () => (
    <div>
      <h1>{msg.value}</h1>
      <input 
        value={msg.value} 
        onInput={(e) => msg.value = (e.target as HTMLInputElement).value} 
      />
    </div>
  )
}

export default toVue(Welcome)
`
          }, 'src/App.tsx')
        }
      },
      {
        name: 'Generic Component with children limited',
        setCode: () => {
          store.setFiles({
            'tsconfig.json': getTsConfig(),
            'src/App.tsx': `import { ref } from 'vue'
import { toVue } from '@vueireact/core'
function GenericComponent<T>(props: {
    list: T[]
    onListChange: (list: T[]) => void
    children: {
      item: (item: T, index: number) => JSX.Element;
    }
}) {
  return () => (
    <div>
      <h1>{
        props.list.map((item, index) => (props.children.item(item, index)))
      }</h1>
    </div>
  )
}

function App() {
  const list = ref([1, 2, 3]);
  function addOneToListItem(index: number) {
    const current = list.value[index]
    list.value.splice(index, 1, current + 1)

  }
  function addItem() {
    list.value.push(list.value.length + 1)
  }
  return () => (
    <div>
      <GenericComponent
        list={list.value} 
        onListChange={(v) => list.value = v} 
      >
        {
          {
            item: (item, index) => <div onClick={() => addOneToListItem(index)}>{item}</div>
          }
        }
      </GenericComponent>
      <button onClick={addItem}>Add</button>
    </div>
  )
}

export default toVue(App)
`
          }, 'src/App.tsx')
        }
      },
      {
        name: "defaultNamedSlot",
        setCode: () => {
          store.setFiles({
            'tsconfig.json': getTsConfig(),
            'src/App.tsx': `import { ref } from 'vue'
import { toVue } from '@vueireact/core'
const ComponentWithNameSlot = (props: {
    children: (name: string) => JSX.Element
}) => {
  return () => (
    <div>
      <h1>{props.children('John')}</h1>
    </div>
  )
}
const App = () => {
  return () => (
    <div>
      <ComponentWithNameSlot>
        {(name: string) => <h1>{name}</h1>}
      </ComponentWithNameSlot>
    </div>
  )
}

export default toVue(App)
`
          }, 'src/App.tsx')
        }
      }
    ]
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
                  example => <li class={styles.example} onClick={() => example.setCode()} >
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
