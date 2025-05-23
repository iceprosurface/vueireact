import { computed, version as currentVersion, ref } from 'vue'

export function useVueImportMap(
  defaults: {
    runtimeDev?: string | (() => string)
    runtimeProd?: string | (() => string)
    serverRenderer?: string | (() => string)
    vueVersion?: string | null
  } = {},
) {
  function normalizeDefaults(defaults?: string | (() => string)) {
    if (!defaults) return
    return typeof defaults === 'string' ? defaults : defaults()
  }

  const productionMode = ref(false)
  const vueVersion = ref<string | null>(defaults.vueVersion || null)
  const host = 'https://cdn.jsdelivr.net/npm'
  const importMap = computed<ImportMap>(() => {
    const vue =
      (!vueVersion.value &&
        normalizeDefaults(
          productionMode.value ? defaults.runtimeProd : defaults.runtimeDev,
        )) ||
      `${host}/@vue/runtime-dom@${vueVersion.value || currentVersion
      }/dist/runtime-dom.esm-browser${productionMode.value ? `.prod` : ``}.js`
    const serverRenderer =
      (!vueVersion.value && normalizeDefaults(defaults.serverRenderer)) ||
      `${host}/@vue/server-renderer@${vueVersion.value || currentVersion
      }/dist/server-renderer.esm-browser.js`
    const vueireactVersion = VITE_APP_CORE_VERSION
    return {
      imports: {
        vue,
        'vue/server-renderer': serverRenderer,
        '@vueireact/core': `${host}/@vueireact/core@${vueireactVersion}/dist/index.js`,
        '@vueireact/core/jsx-runtime': `${host}/@vueireact/core@${vueireactVersion}/dist/jsx-runtime.js`,
        'ts-pattern': `${host}/ts-pattern@latest/dist/index.js`,
        'ant-design-vue': `${host}/ant-design-vue@4.2.6/dist/antd.esm.min.js`,
      },
    }
  })

  return {
    productionMode,
    importMap,
    vueVersion,
    defaultVersion: currentVersion,
  }
}

export interface ImportMap {
  imports?: Record<string, string | undefined>
  scopes?: Record<string, Record<string, string>>
}

export function mergeImportMap(a: ImportMap, b: ImportMap): ImportMap {
  return {
    imports: { ...a.imports, ...b.imports },
    scopes: { ...a.scopes, ...b.scopes },
  }
}
