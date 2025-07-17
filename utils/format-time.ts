export function formatTimeRange(startAt: string | Date, endAt: string | Date, withDate: boolean = false) {
  const startDate = new Date(startAt)
  const endDate = new Date(endAt)

  const dateString = withDate
    ? startDate.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        timeZone: 'Asia/Taipei',
      })
    : ''
  const startTimeString = startDate.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Taipei',
  })
  const endTimeString = endDate.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Taipei',
  })

  return `${dateString} ${startTimeString} ~ ${endTimeString}`.trim()
}
