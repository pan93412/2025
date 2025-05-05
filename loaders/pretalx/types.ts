export interface MultiLingualString {
  'en': string
  'zh-tw': string
}

export type OptionalMultiLingualString = Partial<MultiLingualString>

export interface Room {
  id: string
  name: MultiLingualString
}

export interface Speaker {
  id: string
  name: MultiLingualString
  bio: OptionalMultiLingualString
  avatar: string
}

export interface SessionType {
  id: string
  name: MultiLingualString
}
