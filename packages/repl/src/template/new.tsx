import type { Children } from '@vueireact/core'
function New(props: {
  children: Children
}) {
  return () => (
    <div>
      {props.children}
    </div>
  )
}