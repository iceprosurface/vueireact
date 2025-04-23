import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import fs from 'node:fs'
import path from 'node:path'

const runtimeCoreVersion = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../core/package.json'), 'utf-8')).version

export default defineConfig({
  plugins: [vue()],
  define: {
    VITE_APP_CORE_VERSION: JSON.stringify(runtimeCoreVersion),
  },
  resolve: {
    alias: {
      '@vue/compiler-dom': '@vue/compiler-dom/dist/compiler-dom.cjs.js',
      '@vue/compiler-core': '@vue/compiler-core/dist/compiler-core.cjs.js',
    },
  },
  build: {
    commonjsOptions: {
      ignore: ['typescript'],
    },
  },
  worker: {
    format: 'es',
    plugins: () => [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
    ],
  },
})
