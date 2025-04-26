import { withModifiers } from "vue"
import { toVue } from "@vueireact/core"
function App() {

  return () => <div onClick={() => {
    alert('parent clicked')
  }}>
    <button
      onClick={
        withModifiers(
          () => {
            alert('button clicked')
          },
          ['stop']
        )
      }
    >
      click here
    </button>
  </div>
}

export default toVue(App)
