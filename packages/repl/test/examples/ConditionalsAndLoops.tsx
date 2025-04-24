import { toVue } from '@vueireact/core'
import { match, P } from 'ts-pattern';
import { ref } from 'vue'
function App() {

  const show = ref(true)
  const list = ref([1, 2, 3])
  return () => {
    
    return (
      <>
        <button onClick={() => show.value = !show.value}>Toggle List</button>
        <button onClick={() => list.value.push(list.value.length + 1)}>Push Number</button>
        <button onClick={() => list.value.pop()}>Pop Number</button>
        <button onClick={() => list.value.reverse()}>Reverse List</button>
        {
          match({
            show: show.value,
            list: list.value,
          })
          .with({ show: true, list: P.when((v) => v.length > 0) }, () => (
            <ul>
              {list.value.map(item => (
                <li>{item}</li>
              ))}
            </ul>
          ))
          .with({ show: false, list: P.when((v) => v.length > 0) }, () => (
            <p>List is not empty, but hidden.</p>
          ))
          .otherwise(() => (
            <p>List is empty.</p>
          ))
        }
      </>
    )
  }
}
export default toVue(App)