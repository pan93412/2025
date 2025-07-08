import type { LocalizedRoom, LocalizedSpeaker, LocalizedSubmission, LocalizedTrack } from './pretalx/types'

export interface SubmissionResponse extends Omit<LocalizedSubmission, 'room' | 'track' | 'speakers'> {
  room?: LocalizedRoom
  track?: LocalizedTrack
  speakers?: LocalizedSpeaker[]
}
