import type { AnswerReadable, RoomReadable, SpeakerReadable, SubmissionReadable, TrackReadable } from './oapi'

export const coscupSpeakerQuestionIdMap = {
  ZhName: 45,
  EnName: 46,
  ZhBio: 47,
  EnBio: 48,
} as const

export type PretalxAnswer = AnswerReadable
export type PretalxTalk = SubmissionReadable
export type PretalxSpeaker = SpeakerReadable
export type PretalxRoom = RoomReadable
export type PretalxTrack = TrackReadable

export const coscupSubmissionsQuestionIdMap = {
  Language: 269, // 中文, 英文, 其他
  LanguageOther: 300, // if 其他, then use this field
  EnTitle: 257, // 翻譯成英文的標題
  EnDesc: 259, // 翻譯成英文的摘要
  Difficulty: 270,
} as const
