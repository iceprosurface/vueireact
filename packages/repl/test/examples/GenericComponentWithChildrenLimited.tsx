import { ref } from 'vue'
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
