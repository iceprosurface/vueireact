import { mount } from "@vue/test-utils"
import { describe, it, expect } from "vitest"
import { toVue } from "../src/toVue"


describe('fragment', () => {
  it('should render fragment', () => {
    const ChildWithFragment = () => {
      return () => <>
        <div>1</div>
        <div>2</div>
      </>
    }
    const wrapper = mount(toVue(ChildWithFragment))
    expect(wrapper.html()).toContain('1')
    expect(wrapper.html()).toContain('2')
  })
})
