import { ref } from "vue";
import { Button, Input } from 'ant-design-vue';
import { toVue } from "@vueireact/core";

export function HelloWorld(props: {
  name: string, onClick: () => void; children: {
    named: () => JSX.Element
  }
}) {
  const value = ref('')
  return () => {
    const children = props.children;
    const vnode = children.named()
    const span = <span>1111</span>;
    return <>
      <div>1
        {vnode}
      </div>
      <Button type="primary" onClick={props.onClick}>
        {span}
      </Button>
      {value.value}
      <Input value={value.value} onChange={(e) => value.value = (e.target as HTMLInputElement).value} />
    </>;
  };
}
function Welcome() {
  const msg = ref('Hello World!')

  return () => (
    <div>
      <h1>{msg.value}</h1>
      <Input
        value={msg.value}
        onInput={(e) => msg.value = (e.target as HTMLInputElement).value}
      />
    </div>
  )
}

function App() {
  const name = ref('World');
  const handleClick = () => {
    name.value = 'Vue3';
  }
  return () => <div><HelloWorld name={name.value} onClick={handleClick}>
    {
      {
        named: () => <div>Hello1</div>,
      }
    }
  </HelloWorld>
    <Welcome />
  </div>;
}

export default toVue(App);
