import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vueireact",
  description: "Vue-IReact is a library that allows you to use React type syntax in Vue.",
  
  locales: {
    root: {
      label: 'English',
      lang: 'en'
    },
    zh: {
      label: '中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: 'Vue-IReact 是一个允许你在 Vue 中使用 React 类型语法的库。',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '指南', link: '/zh/guide/getting-started' }
        ],
        sidebar: [
          {
            text: '指南',
            items: [
              { text: '开始使用', link: '/zh/guide/getting-started' },
              { text: '高级组件', link: '/zh/guide/advanced-components' },
              { text: '在现有项目中使用', link: '/zh/guide/existing-projects' },
              { text: '路线图', link: '/zh/guide/roadmap' }
            ]
          }
        ],
        socialLinks: [
          { icon: 'github', link: 'https://github.com/iceprosurface/vueireact' }
        ]
      }
    }
  },
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Repl', link: 'https://vueireact-repl.vercel.app/' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Advanced Components', link: '/guide/advanced-components' },
          { text: 'Using in Existing Projects', link: '/guide/existing-projects' },
          { text: 'Roadmap', link: '/guide/roadmap' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/iceprosurface/vueireact' }
    ]
  }
})
