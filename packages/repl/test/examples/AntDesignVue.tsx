import { ref } from 'vue'
import { toVue } from '@vueireact/core'
import { Input } from 'ant-design-vue'
function Welcome() {
  const msg = ref('Hello World!')

  return () => (
    <div>
      <h1>{msg.value}</h1>
      <Input
        value={msg.value}
        onChange={(e) => msg.value = (e.target as HTMLInputElement).value}
      />
    </div>
  )
}

export default toVue(Welcome)
