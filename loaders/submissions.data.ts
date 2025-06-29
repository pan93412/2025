import type { Submission } from './pretalx/types'
import { defineLoader } from 'vitepress'

export declare const data: Submission[]

export default defineLoader({
  async load(): Promise<typeof data> {
    return []
  },
})
