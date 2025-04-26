import { ref } from "vue";
import { Button } from 'ant-design-vue';
import { toVue } from "@vueireact/core";

export function HelloWorld(props: {
  name: string, onClick: () => void; children: {
    named: () => JSX.Element
  }
}) {
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
  </>;
  };
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
</HelloWorld></div>;
}

export default toVue(App);
