import type { Speaker } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: Speaker[]

export default defineLoader({
  async load(): Promise<Speaker[]> {
    const speakers = await pretalxClient.getSpeakers()
    return speakers
  },
})
