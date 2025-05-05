export interface MultiLingualString {
  'en': string
  'zh-tw': string
}

export type OptionalMultiLingualString = Partial<MultiLingualString>

export interface Room {
  id: string
  name: MultiLingualString
}

export interface LocalizedRoom {
  id: string
  name: string
}

export interface Speaker {
  id: string
  name: MultiLingualString
  bio: OptionalMultiLingualString
  avatar: string
}

export interface LocalizedSpeaker {
  id: string
  name: string
  bio?: string
  avatar: string
}

export interface SessionType {
  id: string
  name: MultiLingualString
}

export interface LocalizedSessionType {
  id: string
  name: string
}
