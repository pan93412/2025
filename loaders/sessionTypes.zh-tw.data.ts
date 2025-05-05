import type { LocalizedSessionType } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: LocalizedSessionType[]

export default defineLoader({
  async load(): Promise<LocalizedSessionType[]> {
    const sessionTypes = await pretalxClient.getSessionTypes()
    return Array.from(sessionTypes).map((sessionType) => ({
      ...sessionType,
      name: sessionType.name['zh-tw'],
    }))
  },
})
