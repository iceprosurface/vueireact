import { ref, watch } from 'vue'
import type { CompilerError } from 'vue/compiler-sfc'
import './Message.css';
import { toVue, Transition } from '@vueireact/core';

function Message(props: {
  err?: string | Error | false
  warn?: string | Error
}) {

  const dismissed = ref(false)

  watch(
    () => [props.err, props.warn],
    () => {
      dismissed.value = false
    },
  )

  function formatMessage(err: string | Error): string {
    if (typeof err === 'string') {
      return err
    } else {
      let msg = err.message
      const loc = (err as CompilerError).loc
      if (loc && loc.start) {
        msg = `(${loc.start.line}:${loc.start.column}) ` + msg
      }
      return msg
    }
  }
  function onDismiss() {
    dismissed.value = true
  }
  return () => <Transition name="fade">
    {
      !dismissed.value && (props.err || props.warn) && (<div
        class={props.err ? 'msg err' : 'msg warn'}
      >
        <pre>{formatMessage(props.err || props.warn!)}</pre>
        <button class="dismiss" onClick={onDismiss}>✕</button>
      </div>)
    }

  </Transition>
}

export default toVue(Message);