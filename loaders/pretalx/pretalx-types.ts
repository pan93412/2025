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

export const coscupSessionQuestionIdMap = {
  Language: 216,
  ZhDesc: 0,
  EnTitle: 257, // 翻譯成英文的標題
  EnDesc: 259, // 翻譯成英文的摘要
  Tags: 220,
  Qa: 0,
  Slide: 0,
  Record: 2098,
} as const
