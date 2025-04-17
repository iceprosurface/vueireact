import * as esbuild from 'esbuild-wasm'
function once<T>(fn: () => Promise<T>) {
  let result: Promise<T> | undefined
  return async () => {
    if (!result) {
      result = fn()
    }
    return result
  }
}
const init = once(async () => {
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm/esbuild.wasm",
  })
})
export async function transformJSX(src: string) {
  await init()
  const result = await esbuild.transform(src, {
    loader: 'tsx',
    jsx: 'automatic',
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
    jsxImportSource: '@vueireact/core',
  })
  return result.code
}
