import type { MultiLanguageString } from './oapi'
import type { PretalxAnswer } from './pretalx-types'
import type { MultiLingualString, OptionalMultiLingualString } from './types'
import { createHash } from 'node:crypto'

type PretalxMultiLingualString = MultiLanguageString

export function formatMultiLingualString(input: PretalxMultiLingualString): MultiLingualString | undefined {
  if (!input) {
    return undefined
  }
  const en = input.en
  const zhTw = input['zh-tw']

  if (en === undefined && zhTw === undefined) {
    return undefined
  }

  return {
    'en': (en ?? zhTw)!,
    'zh-tw': (zhTw ?? en)!,
  }
}

export function getAnswer(answers: PretalxAnswer[], questionId: number): string | undefined {
  const answer = answers.find((answer) => answer.question === questionId)?.answer
  if (!answer || answer === '-') {
    return undefined
  }

  return answer
}

export function generateGravatarUrl(email: string): string {
  const emailHash = createHash('md5').update(email).digest('hex')

  return `https://www.gravatar.com/avatar/${emailHash}?s=1024&d=identicon&r=g`
}

export function getNextOffset(url: string): number | undefined {
  const urlObject = new URL(url)
  const offset = urlObject.searchParams.get('offset')
  if (!offset) {
    return undefined
  }

  return Number.parseInt(offset, 10)
}

// Type helpers for extractLocalizedStructure
type SupportedLocales = 'en' | 'zh-tw'

// Extract the localized version of a multilingual string or return the original type
type ExtractLocalized<T, Locale extends SupportedLocales> =
  T extends MultiLingualString ? string
    : T extends OptionalMultiLingualString ? string | undefined
      : T extends MultiLanguageString ? string
        : T extends (MultiLanguageString | null) ? string | null
          : T extends (MultiLanguageString | undefined) ? string | undefined
            : T extends Array<infer U> ? Array<ExtractLocalized<U, Locale>>
              : T extends object ? { [K in keyof T]: ExtractLocalized<T[K], Locale> }
                : T

// Main type transformation
type LocalizedStructure<T, Locale extends SupportedLocales> = {
  [K in keyof T]: ExtractLocalized<T[K], Locale>
}

/**
 * Extracts localized strings from a structure containing multilingual fields.
 *
 * This function recursively traverses an object and converts any multilingual string
 * fields to their localized equivalent based on the specified locale.
 *
 * @param input - The input object containing multilingual fields
 * @param locale - The target locale ('en' or 'zh-tw')
 * @returns A new object with the same structure but multilingual fields replaced with localized strings
 *
 * @example
 * ```typescript
 * const room = { id: 1, name: { en: 'Main Hall', 'zh-tw': '主會場' } }
 * const localizedRoom = extractLocalizedStructure(room, 'zh-tw')
 * // Result: { id: 1, name: '主會場' }
 * ```
 */
export function extractLocalizedStructure<T, Locale extends SupportedLocales>(
  input: T,
  locale: Locale,
): LocalizedStructure<T, Locale> {
  if (input === null || input === undefined) {
    return input as LocalizedStructure<T, Locale>
  }

  // Handle primitive types
  if (typeof input !== 'object') {
    return input as LocalizedStructure<T, Locale>
  }

  // Handle arrays
  if (Array.isArray(input)) {
    return input.map((item) => extractLocalizedStructure(item, locale)) as LocalizedStructure<T, Locale>
  }

  // Handle multilingual string objects
  if (isMultiLingualStringLike(input)) {
    const multiLingualString = input as Record<string, string>
    // Use the requested locale, fall back to the other locale if not available
    const localizedValue = multiLingualString[locale] ??
      multiLingualString[locale === 'en' ? 'zh-tw' : 'en'] ??
      Object.values(multiLingualString)[0]
    return localizedValue as LocalizedStructure<T, Locale>
  }

  // Handle regular objects by recursively processing each property
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(input as Record<string, any>)) {
    result[key] = extractLocalizedStructure(value, locale)
  }

  return result as LocalizedStructure<T, Locale>
}

/**
 * Type guard to check if an object is a multilingual string-like structure.
 * This checks for objects that have string keys and string values, which is
 * the pattern used by MultiLanguageString, MultiLingualString, etc.
 */
function isMultiLingualStringLike(obj: any): boolean {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return false
  }

  const keys = Object.keys(obj)

  // Must have at least one key
  if (keys.length === 0) {
    return false
  }

  // All values must be strings
  const allValuesAreStrings = Object.values(obj).every((value) =>
    typeof value === 'string',
  )

  // Check if it has multilingual-like keys (en, zh-tw, etc.)
  const hasMultilingualKeys = keys.some((key) =>
    key === 'en' || key === 'zh-tw' || key.includes('-'),
  )

  return allValuesAreStrings && hasMultilingualKeys
}
