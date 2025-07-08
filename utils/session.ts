export interface SessionSchedule {
  startTime: number
  duration: number
  topPosition?: number
  height?: number
}

export function formatSessionTime(
  scheduleInfo: SessionSchedule | undefined,
  fallbackText: string = '時間待定',
): string {
  if (!scheduleInfo) return fallbackText

  const startHour = Math.floor(scheduleInfo.startTime)
  const startMinute = Math.round((scheduleInfo.startTime % 1) * 60)
  const endTime = scheduleInfo.startTime + scheduleInfo.duration
  const endHour = Math.floor(endTime)
  const endMinute = Math.round((endTime % 1) * 60)

  const formatTime = (hour: number, minute: number) => {
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }

  return `${formatTime(startHour, startMinute)} ~ ${formatTime(endHour, endMinute)}`
}
