import type { z } from 'zod'
import type { MultiLingualString, OptionalMultiLingualString, Room, SessionType, Speaker } from './types'
import { BadServerSideDataException } from './exception'
import { coscupSpeakerQuestionIdMap, createResponseSchema, PretalxRoomSchema, PretalxSpeakerSchema, PretalxTalkSchema } from './pretalx-types'
import { formatMultiLingualString, generateGravatarUrl, getAnswer } from './utils'

const resources = {
  talks: PretalxTalkSchema,
  rooms: PretalxRoomSchema,
  speakers: PretalxSpeakerSchema,
} as const

export type Resource = keyof typeof resources
export type ResourceType<R extends Resource> = z.infer<(typeof resources)[R]>

export class PretalxApiClient {
  #endpoint: string
  #token: string | undefined

  constructor(
    public readonly year: number,
    token: string | undefined = undefined,
  ) {
    this.#endpoint = `https://pretalx.coscup.org/api/events/coscup-${year}`
    this.#token = token
  }

  async getResources<R extends Resource>(resource: R): Promise<ResourceType<R>[]> {
    const responseSchema = createResponseSchema(resources[resource] as z.ZodType<ResourceType<R>>)

    const authHeader = this.#token ? { Authorization: `Token ${this.#token}` } : undefined
    const response = await fetch(`${this.#endpoint}/${resource}`, {
      headers: {
        ...authHeader,
        'Accept': 'application/json',
        'User-Agent': `coscup-website-client/${this.year}`,
      },
    })
    let data = responseSchema.parse(await response.json())

    const results: ResourceType<R>[] = []

    do {
      results.push(...data.results)

      if (data.next) {
        const response = await fetch(data.next)
        data = responseSchema.parse(await response.json())
      }
    } while (data.next)

    return results
  }

  async getRooms(): Promise<Room[]> {
    const pretalxRooms = await this.getResources('rooms')

    return pretalxRooms.map((room) => {
      const name = formatMultiLingualString(room.name)
      if (!name) {
        throw new BadServerSideDataException(`Room ${room.id} has empty name.`)
      }

      return {
        id: room.id.toString(),
        name,
      } satisfies Room
    })
  }

  async getSpeakers(): Promise<Speaker[]> {
    const pretalxSpeakers = await this.getResources('speakers')

    return pretalxSpeakers.map((speaker) => {
      const chineseName = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.ZhName)
      const chineseBio = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.ZhBio)
      const englishName = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.EnName)
      const englishBio = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.EnBio)
      const generalBio = speaker.biography

      if (!speaker.avatar && !speaker.email) {
        console.warn(`[BadServerSideDataWarning] Speaker ${speaker.code} has no avatar and email. We use placeholder instead.`)
      }

      return {
        id: speaker.code,
        avatar: speaker.avatar ??
          (speaker.email ? generateGravatarUrl(speaker.email) : undefined) ??
          `https://avatar.iran.liara.run/username?username=${speaker.code}`,
        name: {
          'zh-tw': chineseName ?? englishName ?? speaker.name,
          'en': englishName ?? chineseName ?? speaker.name,
        } satisfies MultiLingualString,
        bio: {
          'zh-tw': chineseBio ?? englishBio ?? generalBio ?? undefined,
          'en': englishBio ?? chineseBio ?? generalBio ?? undefined,
        } satisfies OptionalMultiLingualString,
      } satisfies Speaker
    })
  }

  async getSessionTypes(): Promise<Set<SessionType>> {
    const sessionType = new Map<string, SessionType>()
    const pretalxTalks = await this.getResources('talks')

    for (const talk of pretalxTalks) {
      const track = talk.track
      if (!track) {
        continue
      }

      const trackChineseName = track['zh-tw'] ?? track.en
      const trackEnglishName = track.en ?? track['zh-tw']

      if (!trackChineseName || !trackEnglishName) {
        throw new BadServerSideDataException(`The talk ${talk.code} ("${talk.title}") has an track name that does not have any valid name.`)
      }

      sessionType.set(trackChineseName, {
        id: trackEnglishName,
        name: {
          'zh-tw': trackChineseName,
          'en': trackEnglishName,
        } satisfies MultiLingualString,
      } satisfies SessionType)
    }

    return new Set(sessionType.values())
  }
}
