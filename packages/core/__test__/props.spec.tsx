import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { toVue } from '../src/toVue'
import { nextTick, reactive, ref } from 'vue'

describe('props', () => {
  it('props should pass to component', () => {
    function Child(props: { name: string, dataWithDefault: string }) {
      return () => <div>{props.name}({props.dataWithDefault})</div>
    }
    function Parent() {
      return () => <Child name="test" dataWithDefault="default" />
    }
    const wrapper = mount(toVue(Parent))
    expect(wrapper.html()).toContain('test(default)')
  })
  
})

describe('props should reactive', () => {
  it('pass ref / reactive props', async () => {
    const count1 = ref(0)
    const count2 = reactive({ count: 0 })
    function Child(props: { count1: number, count2: number }) {
      return () => <div>{props.count1} {props.count2}</div>
    }
    const Parent = () => {
      return () => <Child count1={count1.value} count2={count2.count} />
    }
    const wrapper = mount(toVue(Parent))
    expect(wrapper.text()).toContain('0 0')
    count1.value = 1
    count2.count = 1
    await nextTick()
    expect(wrapper.text()).toContain('1 1')
    count1.value = 2
    count2.count = 2
    await nextTick()
    expect(wrapper.text()).toContain('2 2')
  })

  it('pass function props', () => {
    const fn = vi.fn()
    function Child(props: { onDivClick: (n: number) => void }) {
      return () => <div onClick={() => props.onDivClick(1)}>Click me</div>
    }
    const Parent = () => {
      // cannot pass onClick, because it will pass to child's div
      return () => <Child onDivClick={fn} />
    }
    const wrapper = mount(toVue(Parent))
    wrapper.find('div').trigger('click')
    expect(fn).toHaveBeenCalledWith(1)
    expect(fn).toHaveBeenCalledTimes(1)
  })
})