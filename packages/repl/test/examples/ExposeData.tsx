import { toVue, defineExpose, useRef } from '@vueireact/core'
function RefComponent(props: {},
  ctx: {
    expose: {
      refresh: () => void
    }
  }
) {
  defineExpose(ctx, {
    refresh: () => console.log('ctx')
  })
  return () => (<div/>)
}

function App() {
  const refComponent = useRef(RefComponent)
  return () => (
    <div>
      <RefComponent ref={refComponent}></RefComponent>
    </div>
  )
}

export default toVue(App)
