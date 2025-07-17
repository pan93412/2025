export type Locale = 'en' | 'zh-tw'
export type MessageKey =
  'time' | 'speaker' | 'room' | 'collaborativeNotes' | 'track' | 'abstract' | 'aboutSpeaker' | 'advertisement' | 'unknown' | 'community' | 'tags' | 'conference' | 'bookmarked' | 'mainTrack'

export const messages: Record<Locale, Record<MessageKey, string>> = {
  'en': {
    time: 'Time',
    speaker: 'Speaker',
    room: 'Room',
    collaborativeNotes: 'Collaborative Notes',
    track: 'Track',
    abstract: 'Abstract',
    aboutSpeaker: 'About the Speaker',
    advertisement: 'Advertisement',
    unknown: '(Unknown)',
    community: 'Community',
    tags: 'Tags',
    conference: 'Conference',
    bookmarked: 'Bookmarked',
    mainTrack: 'Main Track',
  },
  'zh-tw': {
    time: '時間',
    speaker: '講者',
    room: '位置',
    collaborativeNotes: '共筆',
    track: '軌次',
    abstract: '簡介',
    aboutSpeaker: '關於講者',
    advertisement: '廣告區塊',
    unknown: '（未知）',
    community: '社群',
    tags: '標籤',
    conference: '議程',
    bookmarked: '我的收藏',
    mainTrack: '主議程軌',
  },
}
