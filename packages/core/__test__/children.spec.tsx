import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { toVue } from "../src";

describe("children", () => {
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
});


