import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  langPrefix: 'ht-',
})

export function markdownToHtml(markdown: string, lang: string) {
  return md.render(markdown, { lang })
}
