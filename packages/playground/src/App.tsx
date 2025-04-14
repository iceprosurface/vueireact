import { ref } from "vue";

function HelloWorld(props: { name: string, onClick: () => void }) {
  return () =>
    <>
      <div onClick={props.onClick}>Hello {props.name}</div>
    </>;
}
function App() {
  const name = ref('World');
  const handleClick = () => {
    name.value = 'Vueireact';
  }
  return () => <HelloWorld name={name.value} onClick={handleClick} />;
}

export default App;
