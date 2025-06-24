import type { components } from './schema'
import type { MultiLingualString } from './types'
import { createHash } from 'node:crypto'

type PretalxMultiLingualString = components['schemas']['Question']['question']

export function formatMultiLingualString(input: PretalxMultiLingualString): MultiLingualString | undefined {
  if (!input) {
    return undefined
  }
  const en = input.en
  const zhTw = input['zh-tw']

  if (en === undefined && zhTw === undefined) {
    return undefined
  }

  return {
    'en': (en ?? zhTw)!,
    'zh-tw': (zhTw ?? en)!,
  }
}

type PretalxAnswer = components['schemas']['Answer']

export function getAnswer(answers: PretalxAnswer[], questionId: number): string | undefined {
  const answer = answers.find((answer) => answer.question === questionId)?.answer
  if (!answer || answer === '-') {
    return undefined
  }

  return answer
}

export function generateGravatarUrl(email: string): string {
  const emailHash = createHash('md5').update(email).digest('hex')

  return `https://www.gravatar.com/avatar/${emailHash}?s=1024&d=identicon&r=g`
}
