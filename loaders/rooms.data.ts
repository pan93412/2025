import type { Room } from './pretalx/types'
import { defineLoader } from 'vitepress'
import { pretalxClient } from './pretalx'

export declare const data: Room[]

export default defineLoader({
  async load(): Promise<Room[]> {
    const rooms = await pretalxClient.getRooms()
    return rooms
  },
})
