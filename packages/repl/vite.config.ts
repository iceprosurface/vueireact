import { type Plugin, mergeConfig } from 'vite'
import dts from 'vite-plugin-dts'
import base from './vite.preview.config'
import fs from 'node:fs'
import path from 'node:path'
// read current @vue/runtime-core version
const runtimeCoreVersion = JSON.parse(fs.readFileSync(path.resolve(__dirname, './package.json'), 'utf-8')).version

const genStub: Plugin = {
  name: 'gen-stub',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'ssr-stub.js',
      source: `module.exports = {}`,
    })
  },
}

/**
 * Patch generated entries and import their corresponding CSS files.
 * Also normalize MonacoEditor.css
 */
const patchCssFiles: Plugin = {
  name: 'patch-css',
  apply: 'build',
  writeBundle() {
    //  inject css imports to the files
    const outDir = path.resolve('dist')
    ;['vue-repl', 'monaco-editor'].forEach((file) => {
      const filePath = path.resolve(outDir, file + '.js')
      const content = fs.readFileSync(filePath, 'utf-8')
      fs.writeFileSync(filePath, `import './${file}.css'\n${content}`)
    })
  },
}

export default mergeConfig(base, {
  plugins: [
    dts({
      rollupTypes: true,
    }),
    genStub,
    patchCssFiles,
  ],
  optimizeDeps: {
    // avoid late discovered deps
    include: [
      'typescript',
      'monaco-editor/esm/vs/editor/editor.worker',
      'vue/server-renderer',
    ],
  },
  base: './',
  define: {
    VITE_APP_CORE_VERSION: JSON.stringify(runtimeCoreVersion),
  },
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: {
        'vue-repl': './src/index.ts',
        core: './src/core.ts',
        'monaco-editor': './src/editor/MonacoEditor.tsx',
      },
      formats: ['es'],
      fileName: () => '[name].js',
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
      external: ['vue', 'vue/compiler-sfc'],
    },
  },
})
