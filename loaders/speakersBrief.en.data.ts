import type { LocalizedBriefSpeaker } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: LocalizedBriefSpeaker[]

export default defineLoader({
  async load(): Promise<LocalizedBriefSpeaker[]> {
    const speakers = await pretalxClient.getSpeakers()
    return speakers.map((speaker) => ({
      id: speaker.id,
      name: speaker.name,
      avatar: speaker.avatar,
    }))
  },
})
