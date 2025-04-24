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
function createLoading() {
  const loading = document.createElement('div')
  loading.style.position = 'fixed'
  loading.style.top = '0'
  loading.style.left = '0'
  loading.style.width = '100%'
  loading.style.height = '100%'
  loading.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
  loading.style.zIndex = '1000'
  loading.style.display = 'flex'
  loading.style.justifyContent = 'center'
  loading.style.alignItems = 'center'
  loading.style.color = 'white'
  loading.style.fontSize = '24px'
  loading.style.fontWeight = 'bold'
  loading.style.backdropFilter = 'blur(10px)'
  loading.style.transition = 'opacity 0.3s ease-in-out'
  loading.style.opacity = '0'
  loading.style.pointerEvents = 'none'
  loading.innerHTML = 'ESBuild is loading...'
  document.body.appendChild(loading)
  return loading
}
const init = once(async () => {
  // global loading
  const loading = createLoading()
  loading.style.opacity = '1'
  await esbuild.initialize({
    worker: true,
    wasmURL: "https://unpkg.com/esbuild-wasm@0.25.3/esbuild.wasm",
  })
  loading.style.opacity = '0'
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
