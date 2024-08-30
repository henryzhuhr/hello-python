import { defineConfig } from 'vitepress'
import { DefaultTheme } from 'vitepress/theme'

/**
 * 侧边栏配置
 */
const sidebar: DefaultTheme.Sidebar = [
  {
    collapsed: false,
    text: '开始',
    items: [
      { text: '简介', link: '/' },
      { text: '环境准备', link: '/starter' },
    ]
  },
  {
    collapsed: false,
    text: 'Python 基础',
    items: [
      { text: '迭代器和可迭代对象', link: '/base/iterator' },
    ]
  },
  {
    collapsed: false,
    text: 'Python 内置库',
    items: [
      { text: 'argparse', link: '/pythonlib/argparse/argparse' },
      { text: 'collections', link: '/pythonlib/collections/collections' },
    ]
  },
  {
    collapsed: false,
    text: 'Python 测试框架',
    items: [
      { text: 'Python 测试框架 Pytest', link: '/test/pytest/pytest' },
    ]
  },
  {
    collapsed: false,
    text: '第三方库',
    items: [
      { text: 'tqdm', link: '/3rdparty/tqdm/tqdm' },
    ]
  },
]

/**
 * 主题配置 https://vitepress.dev/reference/default-theme-config
 */
const themeConfig: DefaultTheme.Config = {
  logo: '/icons/python.svg',
  sidebar: sidebar,
  socialLinks: [
    { icon: 'github', link: 'https://github.com/henryzhuhr/hello-python' }
  ],
  darkModeSwitchLabel: '外观',          // 用于自定义深色模式开关标签
  lightModeSwitchTitle: '切换到浅色模式', // 用于自定义悬停时显示的浅色模式开关标题
  darkModeSwitchTitle: '切换到深色模式',  // 用于自定义悬停时显示的深色模式开关标题
  returnToTopLabel: '返回顶部',          // 用于自定义返回顶部按钮的标题
  langMenuLabel: '选择语言',             // 用于自定义语言选择菜单的标题
  externalLinkIcon: true,
  docFooter: {
    prev: '⏪️ 上一页',
    next: '下一页 ⏩️'
  },
  footer: {
    message: 'Powered By <a href="https://vitepress.dev/">Vitepress</a>',
    copyright: `All rights reserved © 2024-${new Date().getFullYear()} <a href="https://github.com/henryzhuhr?tab=repositories">henryzhuhr</a>`
  },
  outline: {
    label: '页面导航'
  },
  lastUpdated: {
    text: '⏰ 内容最后更新于',
    formatOptions: {
      dateStyle: 'short',
      timeStyle: 'medium'
    }
  },
  search: {   // 本地搜索: https://vitepress.dev/zh/reference/default-theme-search#local-search
    provider: 'local',
  },
}

/**
 * 站点配置 https://vitepress.dev/reference/site-config
 */
export default defineConfig({
  base: '/hello-python/',
  title: "Hello Python ",
  description: "Python Learning Log",
  srcDir: 'docs',
  themeConfig: themeConfig,
  vite: {// Vite 配置选项
    publicDir: '../.vitepress/public', // 相对于 docs 目录
  },
})
