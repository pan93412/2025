import type { LocalizedSpeaker } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: LocalizedSpeaker[]

export default defineLoader({
  async load(): Promise<LocalizedSpeaker[]> {
    const speakers = await pretalxClient.getSpeakers()
    return speakers.map((speaker) => ({
      ...speaker,
      name: speaker.name.en,
      bio: speaker.bio?.en,
    }))
  },
})
