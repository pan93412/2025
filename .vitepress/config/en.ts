import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/en' },
      { text: 'Event', link: '/en/event' },
      { text: 'About', link: '/en/about' },
      { text: 'Sessions', link: '/en/sessions' },
      { text: 'Sponsor', link: '/en/sponsor' },
      { text: 'Staff', link: '/en/staff' },
    ],
    sidebar: {},
    socialLinks: [
      { icon: 'github', link: 'https://github.com/COSCUP' },
    ],
  },
})
