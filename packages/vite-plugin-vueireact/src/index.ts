import { PluginOption } from "vite";
import { transform } from "esbuild";

const fileRegex = /\.fc.(jsx|tsx)$/;

export default function vueireactPlugin(): PluginOption {
  return {
    name: '@vueireact/vite-plugin-vueireact',
    async transform(src, id) {
      if (fileRegex.test(id)) {
        // TODO: resolve typescript config
        const result = await transform(src, {
          loader: 'tsx',
          sourcemap: true,
          tsconfigRaw: {
            compilerOptions: {
              "jsx": "react-jsx",
              "jsxImportSource": "@vueireact/core",
            },
          },
        });
        return {
          code: result.code,
          map: result.map, 
        }
      }
    },
  }
}