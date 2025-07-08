import type { SubmissionResponse } from './types'
import { defineLoader } from 'vitepress'
import { extractLocalizedStructure, pretalxClient } from './pretalx'

export declare const data: SubmissionResponse[]

export default defineLoader({
  async load(): Promise<typeof data> {
    const submissions = await pretalxClient.getAllSubmissions()
    const allRooms = toMapById(await pretalxClient.getRooms())
    const allSpeakers = toMapByCode(await pretalxClient.getSpeakers())
    const allTracks = toMapById(await pretalxClient.getTracks())

    return submissions.map((submission) => {
      const room = submission.room ? allRooms.get(submission.room) : undefined
      const speakers = submission.speakers.map((speaker) => allSpeakers.get(speaker)).filter((speaker) => speaker !== undefined)
      const track = submission.track ? allTracks.get(submission.track) : undefined

      const localizedRoom = room ? extractLocalizedStructure(room, 'zh-tw') : undefined
      const localizedSpeakers = extractLocalizedStructure(speakers, 'zh-tw')
      const localizedTrack = track ? extractLocalizedStructure(track, 'zh-tw') : undefined

      return ({
        ...extractLocalizedStructure(submission, 'zh-tw'),
        room: localizedRoom,
        speakers: localizedSpeakers,
        track: localizedTrack,
      } satisfies SubmissionResponse)
    })
  },
})

function toMapById<R extends { id: number }>(data: R[]): Map<number, R> {
  return new Map(data.map((item) => [item.id, item]))
}

function toMapByCode<R extends { code: string }>(data: R[]): Map<string, R> {
  return new Map(data.map((item) => [item.code, item]))
}
