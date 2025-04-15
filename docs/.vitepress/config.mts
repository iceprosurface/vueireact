import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vueireact",
  description: "Vue-IReact is a library that allows you to use React type syntax in Vue.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Advanced Components', link: '/guide/advanced-components' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/iceprosurface/vueireact' }
    ]
  }
})
