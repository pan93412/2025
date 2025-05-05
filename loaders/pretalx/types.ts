export interface MultiLingualString {
  'en': string
  'zh-tw': string
}

export type OptionalMultiLingualString = Partial<MultiLingualString>

export interface Room {
  id: number
  name: MultiLingualString
}

export interface Speaker {
  id: string
  name: MultiLingualString
  bio: OptionalMultiLingualString
  avatar: string
}

export type SessionType = MultiLingualString
