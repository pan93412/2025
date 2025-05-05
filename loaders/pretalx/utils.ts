import type { PretalxAnswer, PretalxMultiLingualString } from './pretalx-types'
import type { MultiLingualString } from './types'
import { createHash } from 'node:crypto'

export function formatMultiLingualString(input: PretalxMultiLingualString): MultiLingualString | undefined {
  if (input.en === undefined && input['zh-tw'] === undefined) {
    return undefined
  }

  return {
    'en': (input.en ?? input['zh-tw'])!,
    'zh-tw': (input['zh-tw'] ?? input.en)!,
  }
}

export function getAnswer(answers: PretalxAnswer[], questionId: number): string | undefined {
  const answer = answers.find((answer) => answer.question.id === questionId)?.answer
  if (!answer || answer === '-') {
    return undefined
  }

  return answer
}

export function generateGravatarUrl(email: string): string {
  const emailHash = createHash('md5').update(email).digest('hex')

  return `https://www.gravatar.com/avatar/${emailHash}?s=1024&d=identicon&r=g`
}
