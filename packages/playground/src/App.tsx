import { ref } from "vue";

function HelloWorld(props: {
  name: string, onClick: () => void; children: {
    named: () => JSX.Element
  }
}) {
  return () => <>{props.children.named()}</>;
}
function App() {
  const name = ref('World');
  const handleClick = () => {
    name.value = 'Vueireact';
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
