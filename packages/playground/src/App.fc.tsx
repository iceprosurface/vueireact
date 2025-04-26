import { ref } from "vue";
import { Button } from 'ant-design-vue';

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
    {vnode}
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
  return () => <HelloWorld name={name.value} onClick={handleClick}>
    {
      {
        named: () => <div>Hello1</div>,
      }
    }
  </HelloWorld>;
}

export default App;
