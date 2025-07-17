import { defineLoader, loadEnv } from 'vitepress'

// API 設定
const env = loadEnv('', process.cwd())
const SHEET_ID = env.VITE_SHEET_ID
const SPONSOR_LEVELS_SHEET_NAME = env.VITE_SPONSOR_LEVELS_SHEET_NAME
const API_KEY = env.VITE_API_KEY

interface SpreadsheetData {
  values: string[][]
}

export interface SponsorLevel {
  level: string
  basicWeight: number
}

async function fetchSponsorLevels(): Promise<SponsorLevel[]> {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SPONSOR_LEVELS_SHEET_NAME}?key=${API_KEY}`
    const response = await fetch(url)
    const data: SpreadsheetData = await response.json()

    if (!data.values) throw new Error('No data found in the spreadsheet')

    // First row is the header, subsequent rows are the data
    const [_, ...values] = data.values

    // Map the data to the SponsorLevel interface
    const sponsorLevels = values.map((row) => ({
      level: row[0],
      basicWeight: Number.parseFloat(row[1]),
    }))

    return sponsorLevels
  } catch (error) {
    console.error('Error fetching sponsor levels:', error)
    return []
  }
}

export declare const data: SponsorLevel[]

export default defineLoader({
  async load(): Promise<SponsorLevel[]> {
    const sponsorLevels = await fetchSponsorLevels()

    return sponsorLevels
  },
})
