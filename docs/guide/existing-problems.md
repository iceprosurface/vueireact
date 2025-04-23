# Existing Problems

## 1. Cannot Use Vue's defineAsyncComponent

Since Vue's official defineAsyncComponent also exports a `function`, `@vueireact/core` cannot correctly identify it. A solution will be attempted in version 0.3.0.

## 2. Type Errors with Some Built-in Components

+ Transition component
+ KeepAlive component  
+ Suspense component
+ Teleport component

These components are exported from `@vueireact/core` with the correct types, and their usage is consistent with Vue's official components.