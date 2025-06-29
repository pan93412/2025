import type { RoomReadable, RoomsListData, SpeakersListData, SubmissionsListData, TracksListData } from './oapi'
import type { PretalxAnswer, PretalxSpeaker, PretalxTalk, PretalxTrack } from './pretalx-types'
import type { MultiLingualString, OptionalMultiLingualString, Room, SessionType, Speaker, Submission } from './types'
import { BadServerSideDataException } from './exception'
import { createClient } from './oapi/client'
import { coscupSessionQuestionIdMap } from './pretalx-types'
import { formatMultiLingualString, getAnswer } from './utils'

interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

type SpeakerWithAnswers = Omit<PretalxSpeaker, 'answers'> & { answers: PretalxAnswer[] }
type SubmissionWithAnswers = Omit<PretalxTalk, 'answers'> & { answers: PretalxAnswer[] }

export class PretalxApiClient {
  #client: ReturnType<typeof createClient>
  #year: number
  #token: string | undefined

  constructor(
    public readonly year: number,
    token: string | undefined = undefined,
  ) {
    this.#year = year
    this.#client = createClient({
      baseUrl: `https://pretalx.coscup.org`,
      headers: {
        ...(this.#token ? { Authorization: `Token ${token}` } : undefined),
        'User-Agent': `coscup-website-client/${this.year}`,
      },
    })
  }

  get event() {
    return `coscup-${this.#year}`
  }

  async #getPaginatedResources<T>(url: string): Promise<T[]> {
    const resources: T[] = []
    const baseUrl = this.#client.getConfig().baseUrl ?? ''
    let next = url

    while (true) {
      const response = await this.#client.get<PaginatedResponse<T>>({
        url: next,
      })
      if (!response.data) {
        throw new BadServerSideDataException(`No data found for this URL: ${next}`)
      }

      resources.push(...response.data.results)

      if (!response.data.next) {
        break
      }

      next = response.data.next.replace(baseUrl, '')
    }

    return resources
  }

  async getRooms(): Promise<Room[]> {
    const url = this.#client.buildUrl<RoomsListData>({
      url: '/api/events/{event}/rooms/',
      path: {
        event: this.event,
      },
      query: {
        limit: 100,
        offset: 0,
      },
    })

    const rooms = await this.#getPaginatedResources<RoomReadable>(url)

    return rooms.map((room) => {
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
    const url = this.#client.buildUrl<SpeakersListData>({
      url: '/api/events/{event}/speakers/',
      path: {
        event: this.event,
      },
      query: {
        expand: ['answers'],
        page_size: 100,
        page: 1,
      },
    })

    const speakers = await this.#getPaginatedResources<SpeakerWithAnswers>(url)

    return speakers.map((speaker) => {
      return {
        id: speaker.code,
        avatar: speaker.avatar_url ??
          `https://avatar.iran.liara.run/username?username=${speaker.code}`,
        name: speaker.name,
        bio: speaker.biography ?? undefined,
      } satisfies Speaker
    })
  }

  async getSessionTypes(): Promise<Set<SessionType>> {
    const url = this.#client.buildUrl<TracksListData>({
      url: '/api/events/{event}/tracks/',
      path: {
        event: this.event,
      },
      query: {
        page_size: 100,
        page: 1,
      },
    })

    const pretalxTracks = await this.#getPaginatedResources<PretalxTrack>(url)
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

  async getSubmissions(): Promise<Submission[]> {
    const url = this.#client.buildUrl<SubmissionsListData>({
      url: '/api/events/{event}/submissions/',
      path: {
        event: this.event,
      },
      query: {
        expand: ['answers'],
        page_size: 100,
        page: 1,
      },
    })
    const submissions = await this.#getPaginatedResources<SubmissionWithAnswers>(url)

    return submissions.map((submission) => {
      const enTitle = getAnswer(submission.answers, coscupSessionQuestionIdMap.EnTitle)
      const enDesc = getAnswer(submission.answers, coscupSessionQuestionIdMap.EnDesc)

      return {
        id: submission.code,
        title: {
          'zh-tw': submission.title,
          'en': enTitle ?? submission.title,
        } satisfies MultiLingualString,
        description: {
          'zh-tw': submission.description ?? undefined,
          'en': enDesc ?? submission.description ?? undefined,
        } satisfies OptionalMultiLingualString,
      } satisfies Submission
    })
  }
}
