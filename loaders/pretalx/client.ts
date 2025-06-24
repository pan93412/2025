import type { PretalxAnswer, PretalxRoom, PretalxSpeaker, PretalxTrack } from './pretalx-types'
import type { MultiLingualString, OptionalMultiLingualString, Room, SessionType, Speaker } from './types'
import { BadServerSideDataException } from './exception'
import { coscupSpeakerQuestionIdMap } from './pretalx-types'
import { formatMultiLingualString, getAnswer } from './utils'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

type SpeakerWithAnswers = Omit<PretalxSpeaker, 'answers'> & { answers: PretalxAnswer[] }

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

  async #getResources<T>(resource: string, expand?: string[]): Promise<T[]> {
    const authHeader = this.#token ? { Authorization: `Token ${this.#token}` } : undefined

    const url = new URL(`${this.#endpoint}/${resource}/`)
    if (expand) {
      for (const field of expand) {
        url.searchParams.append('expand', field)
      }
    }

    let next: string | null = url.toString()
    const results: T[] = []

    do {
      const response = await fetch(next, {
        headers: {
          ...authHeader,
          'Accept': 'application/json',
          'User-Agent': `coscup-website-client/${this.year}`,
        },
      })
      const data = await response.json() as PaginatedResponse<T>
      results.push(...data.results)
      next = data.next
    } while (next)

    return results
  }

  async getRooms(): Promise<Room[]> {
    const pretalxRooms = await this.#getResources<PretalxRoom>('rooms')

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
    const pretalxSpeakers = await this.#getResources<SpeakerWithAnswers>('speakers', ['answers'])

    return pretalxSpeakers.map((speaker) => {
      const chineseName = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.ZhName)
      const chineseBio = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.ZhBio)
      const englishName = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.EnName)
      const englishBio = getAnswer(speaker.answers, coscupSpeakerQuestionIdMap.EnBio)
      const generalBio = speaker.biography

      if (!speaker.avatar_url) {
        console.warn(`[BadServerSideDataWarning] Speaker ${speaker.code} has no avatar. We use placeholder instead.`)
      }

      return {
        id: speaker.code,
        avatar: speaker.avatar_url ??
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
    const pretalxTracks = await this.#getResources<PretalxTrack>('tracks')
    const sessionType = new Map<string, SessionType>()

    for (const track of pretalxTracks) {
      const name = formatMultiLingualString(track.name)
      if (!name) {
        throw new BadServerSideDataException(`Track ${track.id} has no valid name.`)
      }

      sessionType.set(name['zh-tw'], {
        id: name.en,
        name,
      } satisfies SessionType)
    }

    return new Set(sessionType.values())
  }
}
