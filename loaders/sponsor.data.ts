import { defineLoader, loadEnv } from 'vitepress'

// API 設定
const env = loadEnv('', process.cwd())
const SHEET_ID = env.VITE_SHEET_ID
const SHEET_NAME = env.VITE_SHEET_NAME
const API_KEY = env.VITE_API_KEY

interface SpreadsheetData {
  values: string[][]
}

interface Sponsor {
  'id': string
  'image': string
  'name:zh-TW': string
  'name:en': string
  'intro:zh-TW': string
  'intro:en': string
  'link': string
  'level': string
}

type GroupedSponsors = Record<string, Sponsor[]>

// 定義贊助商等級
export const sponsorLevels = [
  'gold',
  'silver',
  'bronze',
  'friend',
  'over-seas',
  'co-promotion-partner',
  'co-host',
  'co-organizer',
  'special-thanks',
]

// 轉換 Google Drive 圖片 URL
async function getDriveImageBase64(shareUrl: string): Promise<string> {
  const fileIdMatch = shareUrl.match(/(?:\/d\/|id=)([^/?]+)/)
  const fileId = fileIdMatch ? fileIdMatch[1] : null
  const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
  const response = await fetch(directUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch image from Google Drive: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  return `data:${response.headers.get('content-type') || 'image/jpeg'};base64,${buffer.toString('base64')}`
}

// 取得 Google Sheets 資料
async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`
    const response = await fetch(url)
    const data: SpreadsheetData = await response.json()

    if (!data.values) throw new Error('No data found in the spreadsheet')

    // First row is the header, subsequent rows are the data
    const [headers, ...values] = data.values

    // Map the data to the Sponsor interface
    const sponsors = values.map((row) =>
      headers.reduce((obj, key, i) => ({
        ...obj,
        [key]: row[i] || '',
      }), {} as Sponsor),
    )

    // Replace image URLs with actual image content
    return Promise.all(sponsors.map(async (sponsor) => ({
      ...sponsor,
      image: await getDriveImageBase64(sponsor.image),
    })))
  } catch (error) {
    console.error('Error fetching sponsors:', error)
    return []
  }
}

// 根據等級分類贊助商
function groupSponsorsByLevel(sponsors: Sponsor[]): GroupedSponsors {
  return sponsors.reduce((acc, sponsor) => {
    const level = sponsor.level || 'unknown'
    if (!acc[level]) acc[level] = []
    acc[level].push(sponsor)
    return acc
  }, {} as GroupedSponsors)
}

interface SponsorData {
  sponsors: Sponsor[]
  sponsorLevels: string[]
  groupedSponsors: GroupedSponsors
}

export declare const data: SponsorData

export default defineLoader({
  async load(): Promise<SponsorData> {
    const sponsors = await fetchSponsors()
    const groupedSponsors = groupSponsorsByLevel(sponsors)

    return {
      sponsors,
      sponsorLevels,
      groupedSponsors,
    }
  },
})
