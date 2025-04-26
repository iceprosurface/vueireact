import { Directive } from 'vue';
import { toVue, withDirectives } from '@vueireact/core'

// 尚未完整支持指令，请使用官方提供的 withDirectives 兼容
const vTest: Directive = {
  mounted(el: HTMLElement) {
    el.style.background = 'red';
  }
}
function App() {
  return () => {
    const vnode = withDirectives(<button>click here</button>, [
      [vTest, ]
    ]);
    return <div>click directive</div>
  }
}

export default toVue(App);