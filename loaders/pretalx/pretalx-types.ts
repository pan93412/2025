import type { components } from './schema'

export const coscupSpeakerQuestionIdMap = {
  ZhName: 45,
  EnName: 46,
  ZhBio: 47,
  EnBio: 48,
} as const

export type PretalxAnswer = components['schemas']['Answer']
export type PretalxTalk = components['schemas']['Submission']
export type PretalxSpeaker = components['schemas']['Speaker']
export type PretalxRoom = components['schemas']['Room']
export type PretalxTrack = components['schemas']['Track']
export type PretalxSubmission = components['schemas']['Submission']

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
