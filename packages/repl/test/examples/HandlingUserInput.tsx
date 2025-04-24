import { toVue } from '@vueireact/core'
import { ref } from 'vue'
function App() {
  const message = ref('Hello World!')
  function reverseMessage() {
    message.value = message.value.split('').reverse().join('')
  }
  return () => (
    <div>
      <h1>{message.value}</h1>
      <button onClick={reverseMessage}>Reverse Message</button>
      <button onClick={() => message.value += '!'}>Append "!"</button>
    </div>
  )

}
export default toVue(App)