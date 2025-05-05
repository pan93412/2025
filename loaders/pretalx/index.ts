import { conference } from '#data/conference.ts'
import { PretalxApiClient } from './client'

export * from './client'
export * from './exception'
export * from './pretalx-types'
export * from './types'
export * from './utils'

export const pretalxClient = new PretalxApiClient(
  conference.year,
  process.env.PRETALX_TOKEN,
)
