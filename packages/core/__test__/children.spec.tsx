import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { jsx, toVue } from "../src";
import { ref, nextTick } from "vue";

describe("children", () => {
  it('should be able to render base type', async () => {
    const data = ref<any>('hello')
    const Child = (props: {
      children: any
    }) => {
      return () => <div>{props.children}</div>;
    };
    const wrapper = mount(toVue(() => {
      return () => <Child>{data.value}</Child>
    }))
    expect(wrapper.html()).toBe('<div>hello</div>')
    data.value = 1;
    await nextTick()
    expect(wrapper.html()).toBe('<div>1</div>')
    data.value = true
    await nextTick()
    expect(wrapper.html()).toBe('<div>\n  <!---->\n</div>')
    data.value = false
    await nextTick()
    expect(wrapper.html()).toBe('<div></div>')
    data.value = null
    await nextTick()
    expect(wrapper.html()).toBe('<div></div>')
    data.value = undefined
    await nextTick()
    expect(wrapper.html()).toBe('<div></div>')

  })
  it("should be able to render children", () => {
    const Child = (props: {
      children: JSX.Element
    }) => {
      return () => <div>{
        props.children
      }</div>;
    };

    const Parent = () => {
      return () => <div>
        <Child>
          <div>Hello</div>
        </Child>
      </div>;
    };
    const wrapper = mount(toVue(Parent));
    expect(wrapper.html()).toContain('Hello')
  });
  it('default with function', () => {
    const Child = (props: {
      children: () => JSX.Element
    }) => {
      return () => <div>{props.children()}</div>;
    };
    const Parent = () => {
      return () => <div>
        <Child>
          {() => <div>Hello</div>}
        </Child>
      </div>;
    };
    const wrapper = mount(toVue(Parent));
    expect(wrapper.html()).toContain('Hello')
  })
  it('named slot', () => {
    const Child = (props: {
      children: {
        named: () => JSX.Element
      }
    }) => {
      return () => <div>{props.children.named()}</div>;
    };
    const Parent = () => {
      return () => <div>
        <Child>
          {
            {
              named: () => <div>Hello</div>,
            }
          }
        </Child>
      </div>;
    };
    const wrapper = mount(toVue(Parent));
    expect(wrapper.html()).toContain('Hello')
  })
  it('no props can be passed', () => {
    const element = jsx('div')
    expect(element).toBeDefined()
  })
});


