import { Ref, ref } from 'vue'
import { toVue } from '@vueireact/core'

function App() {
const text = ref('Edit me')
const checked = ref(true)
const checkedNames = ref(['Jack'])
const picked = ref('One')
const selected = ref('A')
const multiSelected = ref(['A'])
function bindInput<T>(data: Ref<T>) {
  return (e: Event) => data.value = (e.target as HTMLInputElement).value as T
}
function bindCheckbox(data: Ref<string[]>) {
  return (e: Event) => {
    const target = e.target as HTMLInputElement
    if (target.checked) {
      data.value.push(target.value)
    } else {
      data.value = data.value.filter(v => v !== target.value)
    }
  }
}
function bindMultiSelect(data: Ref<string[]>) {
  return (e: Event) => {
    const target = e.target as HTMLSelectElement
    data.value = Array.from(target.selectedOptions, option => option.value)
  }
}
return () => (
  <>
    <h2>Text Input</h2>
    <input value={text.value} onChange={bindInput(text)} />
    <p>{text.value}</p>

    <h2>Checkbox</h2>
    <input type="checkbox" id="checkbox" checked={checked.value} onChange={bindInput(checked)} />
    <label for="checkbox">Checked: {checked.value}</label>

    <h2>Multi Checkbox</h2>
    <input type="checkbox" id="jack" value="Jack" checked={checkedNames.value.includes('Jack')} onChange={bindCheckbox(checkedNames)} />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" checked={checkedNames.value.includes('John')} onChange={bindCheckbox(checkedNames)} />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" checked={checkedNames.value.includes('Mike')} onChange={bindCheckbox(checkedNames)} />
    <label for="mike">Mike</label>
    <p>Checked names: {checkedNames.value.join(', ')}</p>

    <h2>Radio</h2>
    <input type="radio" id="one" value="One" checked={picked.value === 'One'} onChange={bindInput(picked)} />
    <label for="one">One</label>
    <br />
    <input type="radio" id="two" value="Two" checked={picked.value === 'Two'} onChange={bindInput(picked)} />
    <label for="two">Two</label>
    <p>Picked: {picked.value}</p>

  <h2>Select</h2>
    <select value={selected.value} onChange={bindInput(selected)}>
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>Selected: {selected.value}</p>

    <h2>Multi Select</h2>
    <select value={multiSelected.value} multiple style={{ width: '100px' }} onChange={bindMultiSelect(multiSelected)}>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <p>Selected: {multiSelected.value.join(', ')}</p>
  </>
)
}

export default toVue(App)