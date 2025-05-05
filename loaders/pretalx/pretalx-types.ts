import { z } from 'zod'

export const PretalxMultiLingualStringSchema = z.object({
  'en': z.string().optional(),
  'zh-tw': z.string().optional(),
})

export type PretalxMultiLingualString = z.infer<typeof PretalxMultiLingualStringSchema>

export const PretalxQuestionSchema = z.object({
  id: z.number(),
  question: PretalxMultiLingualStringSchema,
  required: z.boolean(),
  target: z.string(),
  options: z.unknown().array(),
})

export type PretalxQuestion = z.infer<typeof PretalxQuestionSchema>

export const PretalxAnswerSchema = z.object({
  id: z.number(),
  question: PretalxQuestionSchema,
  answer: z.string(),
  answer_file: z.string().nullable(),
  submission: z.string(),
  person: z.unknown().nullable(),
  options: z.array(z.object({
    answer: z.object({
      en: z.string(),
    }),
  })),
})

export type PretalxAnswer = z.infer<typeof PretalxAnswerSchema>

export const PretalxSlotSchema = z.object({
  start: z.string(),
  end: z.string(),
  room: z.union([
    z.object({
      room_id: z.number().optional(),
    }),
    PretalxMultiLingualStringSchema,
  ]),
})

export type PretalxSlot = z.infer<typeof PretalxSlotSchema>

export const PretalxSpeakerReferenceSchema = z.object({
  name: z.string(),
  code: z.string(),
  biography: z.string().nullable(),
  email: z.string().optional(),
})

export type PretalxSpeakerReference = z.infer<typeof PretalxSpeakerReferenceSchema>

export const PretalxTalkSchema = z.object({
  code: z.string(),
  speakers: PretalxSpeakerReferenceSchema.array(),
  title: z.string(),
  submission_type: z.object({
    en: z.string(),
  }),
  track: PretalxMultiLingualStringSchema.nullable(),
  track_id: z.number().optional(),
  state: z.enum(['submitted', 'accepted', 'rejected', 'confirmed']),
  abstract: z.string(),
  description: z.string(),
  duration: z.number().nullable(),
  do_not_record: z.boolean(),
  is_featured: z.boolean(),
  content_locale: z.string(),
  slot: PretalxSlotSchema,
  answers: PretalxAnswerSchema.array(),
  tags: z.string().array().optional(),
})

export type PretalxTalk = z.infer<typeof PretalxTalkSchema>

export const PretalxRoomSchema = z.object({
  id: z.number(),
  name: PretalxMultiLingualStringSchema,
})

export type PretalxRoom = z.infer<typeof PretalxRoomSchema>

export const PretalxSpeakerSchema = z.object({
  code: z.string(),
  name: z.string(),
  biography: z.string().nullable(),
  submissions: z.string().array(),
  avatar: z.string(),
  email: z.string().optional(),
  answers: PretalxAnswerSchema.array(),
})

export type PretalxSpeaker = z.infer<typeof PretalxSpeakerSchema>

export function createResponseSchema<T>(schema: z.ZodSchema<T>) {
  return z.object({
    count: z.number(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: schema.array(),
  })
}

export type PretalxResponse<T> = z.infer<ReturnType<typeof createResponseSchema<T>>>

export const coscupSessionQuestionIdMap = {
  Language: 216,
  ZhDesc: 0,
  EnTitle: 173,
  EnDesc: 175,
  Tags: 220,
  Qa: 0,
  Slide: 0,
  Record: 2098,
} as const

export const coscupSpeakerQuestionIdMap = {
  ZhName: 0,
  ZhBio: 0,
  EnName: 0,
  EnBio: 174,
} as const
