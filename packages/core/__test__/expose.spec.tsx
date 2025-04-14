import { describe, it, expect } from "vitest";
import { defineExpose, useRef } from "../src/defineExpose";
import { toVue } from "../src/toVue";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
describe('expose', () => {
  it('ref should expose as direct value, and can update', async () => {
    const test = ref('test')
    const ExposeFeature = (props: {}, ctx: {
      expose: {
        name: string
      }
    }) => {
      defineExpose(ctx, {
        name: test
      })
      return () => <div>{test.value}</div>
    }
    const Parent = () => {
      const instance = useRef(ExposeFeature)
      const notMatch = ref(false)
      return () => <>
        <ExposeFeature ref={instance} />
        {/** @ts-expect-error ref not match */}
        <ExposeFeature ref={notMatch} />
      </>
    }
    const wrapper = mount(toVue(Parent))
    expect(wrapper.html()).toContain('test')
    test.value = 'test2'
    await nextTick()
    expect(wrapper.html()).toContain('test2')
  })
  it('expose function should work', async () => {
    const ExposeFeature = (props: {}, ctx: {
      expose: {
        changeName: (name: string) => void
      }
    }) => {
      const name = ref('ExposeFeature')
      defineExpose(ctx, {
        changeName: (newName: string) => {
          name.value = newName
        }
      })
      return () => <div>{name.value}</div>
    }
    const Parent = () => {
      const instance = useRef(ExposeFeature)
      return () => <>
        <ExposeFeature ref={instance} />
        <button onClick={() => instance.value.changeName('test2')}>change name</button>
      </>
    }
    const wrapper = mount(toVue(Parent))
    expect(wrapper.html()).toContain('ExposeFeature')
    wrapper.find('button').trigger('click')
    await nextTick()
    expect(wrapper.html()).toContain('test2')
  })
})