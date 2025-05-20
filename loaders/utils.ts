interface GoogleSheetResponse {
  majorDimension: string
  range: string
  values: string[][]
}

/**
 * Fetch a sheet from a Google Sheet and return the data as an array of objects.
 * @param options Options for fetching a Google Sheet.
 * @param options.sheetId The ID of the Google Sheet.
 * @param options.sheetName The name of the sheet within the Google Sheet.
 * @param options.apiKey The API key for accessing the Google Sheets API.
 * @template SheetRow The type of the objects in the returned array.
 * @returns A promise that resolves to an array of objects representing the data in the sheet.
 */
export async function getGoogleSheet<SheetRow extends Record<string, string>>({
  sheetId,
  sheetName,
  apiKey,
}: {
  sheetId: string
  sheetName: string
  apiKey: string
}): Promise<SheetRow[]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`
  const response = await fetch(url)
  const data: GoogleSheetResponse = await response.json()

  if (!data.values) throw new Error(`No data found in the ${sheetName} sheet`)

  // First row is the header, subsequent rows are the data
  const [headers, ...values] = data.values

  const result = values.map((row) =>
    headers.reduce((obj, key, i) => {
      obj[key] = row[i] || ''
      return obj
    }, {} as Record<string, string>),
  ) as SheetRow[]

  return result
}
