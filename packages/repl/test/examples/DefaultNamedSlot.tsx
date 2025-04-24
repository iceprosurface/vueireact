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
