# 现存的问题

## 1. 无法同 vue 提供的 defineAsyncComponent 使用

由于 vue 官方的 defineAsyncComponent 导出的也是一个 `函数`，对于 `@vueireact/core` 来说，无法正确识别，将会在 0.3.0 版本中尝试提供解决方案。


## 2. 部分内置组件类型错误

+ Transition 组件
+ KeepAlive 组件
+ Suspense 组件
+ Teleport 组件

这些组件都从 `@vueireact/core` 中导出对应的正确类型，使用方式同 vue 官方的组件一致。