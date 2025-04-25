import { ref } from "vue";
import { Alert } from 'ant-design-vue';

export function HelloWorld(props: {
  name: string, onClick: () => void; children: {
    named: () => JSX.Element
  }
}) {
  return () => <>
    {props.children.named()}
    <Alert type="success"></Alert>
  </>;
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
