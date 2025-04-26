import { getTsConfig, ReplStore } from "../../src/store"
import HelloWorld from "./HelloWorld?raw"
import GenericComponentWithChildrenLimited from "./GenericComponentWithChildrenLimited?raw"
import DefaultNamedSlot from "./DefaultNamedSlot?raw"
import HandlingUserInput from "./HandlingUserInput?raw"
import AttributeBindings from "./AttributeBindings?raw"
import ConditionalsAndLoops from "./ConditionalsAndLoops?raw"
import FormBindings from "./FormBindings?raw"
import AntDesignVue from "./AntDesignVue?raw"
function createExample(name: string, code: string, store: ReplStore) {
  return {
    name,
    setCode: () => {
      store.setFiles({
        'tsconfig.json': getTsConfig(),
        'src/App.tsx': code
      }, 'src/App.tsx')
    }
  }
}
export const useExamples = (store: ReplStore) => [
  createExample('Hello World', HelloWorld, store),
  createExample('Generic Component with children limited', GenericComponentWithChildrenLimited, store),
  createExample('defaultNamedSlot', DefaultNamedSlot, store),
  createExample('Handling User Input', HandlingUserInput, store),
  createExample('Attribute Bindings', AttributeBindings, store),
  createExample('Conditionals and Loops', ConditionalsAndLoops, store),
  createExample('Form Bindings', FormBindings, store),
  createExample('Ant Design Vue', AntDesignVue, store),
]