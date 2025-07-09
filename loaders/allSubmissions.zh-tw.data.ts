import type { SubmissionResponse } from './types'
import { defineLoader } from 'vitepress'
import { BadServerSideDataException, extractLocalizedStructure, pretalxClient } from './pretalx'

export declare const data: SubmissionResponse[]

export default defineLoader({
  async load(): Promise<typeof data> {
    const submissions = await pretalxClient.getAllSubmissions()
    const allRooms = toMapById(await pretalxClient.getRooms())
    const allSpeakers = toMapByCode(await pretalxClient.getSpeakers())
    const allTracks = toMapById(await pretalxClient.getTracks())

    return submissions.map((submission) => {
      const room = allRooms.get(submission.room)
      const speakers = submission.speakers.map((speaker) => allSpeakers.get(speaker)).filter((speaker) => speaker !== undefined)
      const track = allTracks.get(submission.track)

      if (!room) {
        throw new BadServerSideDataException(`Room ${submission.room} not found`)
      }

      if (!track) {
        throw new BadServerSideDataException(`Track ${submission.track} not found`)
      }

      const localizedRoom = extractLocalizedStructure(room, 'zh-tw')
      const localizedSpeakers = extractLocalizedStructure(speakers, 'zh-tw')
      const localizedTrack = extractLocalizedStructure(track, 'zh-tw')

      return ({
        ...extractLocalizedStructure(submission, 'zh-tw'),
        room: localizedRoom,
        speakers: localizedSpeakers,
        track: localizedTrack,
        start: submission.start,
        end: submission.end,
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
