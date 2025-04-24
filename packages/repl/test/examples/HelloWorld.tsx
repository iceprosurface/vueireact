import { ref } from 'vue'
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
