import type { SessionType } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: SessionType[]

export default defineLoader({
  async load(): Promise<SessionType[]> {
    const sessionTypes = await pretalxClient.getSessionTypes()
    return Array.from(sessionTypes)
  },
})
