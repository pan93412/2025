import type { LocalizedRoom } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: LocalizedRoom[]

export default defineLoader({
  async load(): Promise<LocalizedRoom[]> {
    const rooms = await pretalxClient.getRooms()
    return rooms.map((room) => ({
      ...room,
      name: room.name.en,
    }))
  },
})
