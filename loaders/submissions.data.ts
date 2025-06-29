import type { Submission } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: Submission[]

export default defineLoader({
  async load(): Promise<typeof data> {
    return await pretalxClient.getSubmissions()
  },
})
