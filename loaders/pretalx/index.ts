import { PretalxApiClient } from './client'

export * from './client'
export * from './exception'
export * from './pretalx-types'
export * from './types'
export * from './utils'

export const pretalxClient = new PretalxApiClient(
  2024,
  process.env.PRETALX_TOKEN,
)
