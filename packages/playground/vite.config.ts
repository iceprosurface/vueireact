import { defineConfig } from 'vite'
import vueireact from '@vueireact/vite-plugin-vueireact'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vueireact(),
    vueJsx(),
    vue(),
    Inspect()
  ],
})
