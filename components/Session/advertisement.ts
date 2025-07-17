import { data as sponsorLevels } from '#loaders/sponsor-level.data.ts'
import { data as sponsorNews } from '#loaders/sponsor-news.data.ts'
import { data as sponsorData } from '#loaders/sponsor.data.ts'

export interface Advertisement {
  id: string
  horizontal: string
  vertical: string
  link: string
}

export function getAdvertisement(): Advertisement | null {
  // Get all publishable sponsor news
  const availableNews = sponsorNews.filter((news) => news.canPublish === 'Y')

  if (availableNews.length === 0) return null

  // Calculate weights for each news item based on sponsor level
  let totalWeight = 0
  const weightedNews = availableNews.map((news) => {
    // Find the sponsor for this news item
    const sponsor = sponsorData.sponsors.find((s) => s.id === news.sponsorId)

    if (!sponsor) return { news, weight: 0 }

    // Get the weight for this sponsor level
    const levelWeight = sponsorLevels.find((level) => level.level === sponsor.level)
    const baseWeight = levelWeight?.basicWeight || 1

    // Calculate final weight
    const specialWeight = Number.parseFloat(news.specialWeight) || 1
    const weight = baseWeight * specialWeight
    totalWeight += weight

    return { news, weight }
  }) // Remove items with 0 weight

  if (totalWeight === 0) return null

  // Select a random advertisement based on weights
  const random = Math.random() * totalWeight
  let currentWeight = 0

  for (const { news, weight } of weightedNews) {
    currentWeight += weight
    if (random <= currentWeight) {
      return {
        id: news.sponsorId,
        horizontal: news['image:horizontal'],
        vertical: news['image:vertical'],
        link: news.link,
      }
    }
  }

  // Throw null if no advertisement is found
  return null
}
