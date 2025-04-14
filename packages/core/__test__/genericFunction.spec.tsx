import { describe, it, expect } from "vitest";
import { toVue } from "../src/toVue";
import { mount } from "@vue/test-utils";
import { ref } from "vue";

describe('generic function', () => {
  it('should render generic function', () => {
    const GenericFunction = <T extends number,>(props: { data: T, onChange: (data: T) => void }) => {
      return () => <div onClick={() => props.onChange(props.data)}>{props.data}</div>
    }
    const wrapper = mount(toVue(() => {
      const data = ref(1)
      return () => <>
        <GenericFunction data={data.value} onChange={(_data) => {
          // here should be number
          data.value = _data
          // @ts-expect-error expect _data should not be string
          let a: string = _data
        }} />
      </>
    }))
    expect(wrapper.html()).toContain('1')
  })
})