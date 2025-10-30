import { google } from 'googleapis'

export class GoogleSheetsService {
  private static sheetsClient: any = null
  private static spreadsheetId: string = process.env.GOOGLE_SHEETS_SPREADSHEET_ID || ''

  /**
   * Initialize Google Sheets API client
   */
  private static async getClient() {
    if (this.sheetsClient) {
      return this.sheetsClient
    }

    try {
      // For demo mode without Google Sheets
      if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        console.warn('Google Sheets API not configured - using mock data')
        return null
      }

      const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)

      const auth = new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })

      const authClient = await auth.getClient()
      this.sheetsClient = google.sheets({ version: 'v4', auth: authClient as any })

      return this.sheetsClient
    } catch (error) {
      console.error('Failed to initialize Google Sheets client:', error)
      return null
    }
  }

  /**
   * Get all rows from a sheet
   */
  static async getRows<T>(sheetName: string): Promise<T[]> {
    const client = await this.getClient()

    // Mock data mode
    if (!client) {
      return this.getMockData<T>(sheetName)
    }

    try {
      const response = await client.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:ZZ`,
      })

      const rows = response.data.values || []
      if (rows.length === 0) {
        return []
      }

      // First row is headers
      const headers = rows[0]
      const data = rows.slice(1).map((row: any[]) => {
        const obj: any = {}
        headers.forEach((header: string, index: number) => {
          obj[header] = row[index] || null
        })
        return obj as T
      })

      return data
    } catch (error) {
      // Fallback to mock data when Google Sheets is not available
      console.warn(`Using mock data for ${sheetName} (Google Sheets not available)`)
      return this.getMockData<T>(sheetName)
    }
  }

  /**
   * Get a single row by ID
   */
  static async getRowById<T>(
    sheetName: string,
    id: string,
    idColumn: string = 'A'
  ): Promise<T | null> {
    const rows = await this.getRows<T>(sheetName)
    const idKey = idColumn === 'A' ? Object.keys(rows[0] || {})[0] : idColumn
    return rows.find((row: any) => row[idKey] === id) || null
  }

  /**
   * Add a new row to a sheet
   */
  static async addRow<T>(sheetName: string, data: T): Promise<void> {
    const client = await this.getClient()

    if (!client) {
      console.log('Mock mode: Would add row to', sheetName, data)
      return
    }

    try {
      // Get headers first
      const headersResponse = await client.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A1:ZZ1`,
      })

      const headers = headersResponse.data.values?.[0] || []
      const values = headers.map((header: string) => (data as any)[header] || '')

      await client.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:ZZ`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [values],
        },
      })
    } catch (error) {
      console.error(`Error adding row to ${sheetName}:`, error)
      throw error
    }
  }

  /**
   * Update a row by ID
   */
  static async updateRow<T>(
    sheetName: string,
    id: string,
    idColumn: string,
    data: Partial<T>
  ): Promise<void> {
    const client = await this.getClient()

    if (!client) {
      console.log('Mock mode: Would update row in', sheetName, id, data)
      return
    }

    try {
      const allRows = await client.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:ZZ`,
      })

      const rows = allRows.data.values || []
      if (rows.length === 0) return

      const headers = rows[0]
      const idColIndex = headers.indexOf(idColumn)
      if (idColIndex === -1) return

      const rowIndex = rows.findIndex((row: any[], index: number) =>
        index > 0 && row[idColIndex] === id
      )

      if (rowIndex === -1) return

      // Update the row
      const updatedRow = [...rows[rowIndex]]
      headers.forEach((header: string, index: number) => {
        if (data.hasOwnProperty(header)) {
          updatedRow[index] = (data as any)[header]
        }
      })

      await client.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A${rowIndex + 1}:ZZ${rowIndex + 1}`,
        valueInputOption: 'RAW',
        requestBody: {
          values: [updatedRow],
        },
      })
    } catch (error) {
      console.error(`Error updating row in ${sheetName}:`, error)
      throw error
    }
  }

  /**
   * Delete a row by ID
   */
  static async deleteRow(
    sheetName: string,
    id: string,
    idColumn: string
  ): Promise<void> {
    const client = await this.getClient()

    if (!client) {
      console.log('Mock mode: Would delete row from', sheetName, id)
      return
    }

    try {
      const allRows = await client.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!A:ZZ`,
      })

      const rows = allRows.data.values || []
      if (rows.length === 0) return

      const headers = rows[0]
      const idColIndex = headers.indexOf(idColumn)
      if (idColIndex === -1) return

      const rowIndex = rows.findIndex((row: any[], index: number) =>
        index > 0 && row[idColIndex] === id
      )

      if (rowIndex === -1) return

      // Get sheet ID
      const spreadsheet = await client.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      })

      const sheet = spreadsheet.data.sheets?.find(
        (s: any) => s.properties?.title === sheetName
      )

      if (!sheet) return

      await client.spreadsheets.batchUpdate({
        spreadsheetId: this.spreadsheetId,
        requestBody: {
          requests: [
            {
              deleteDimension: {
                range: {
                  sheetId: sheet.properties?.sheetId,
                  dimension: 'ROWS',
                  startIndex: rowIndex,
                  endIndex: rowIndex + 1,
                },
              },
            },
          ],
        },
      })
    } catch (error) {
      console.error(`Error deleting row from ${sheetName}:`, error)
      throw error
    }
  }

  /**
   * Get mock data for demo mode
   */
  private static getMockData<T>(sheetName: string): T[] {
    const { getMockDataBySheet } = require('./mock-data')
    const data = getMockDataBySheet(sheetName)
    console.log(`Returning ${data.length} mock records for ${sheetName}`)
    return data as T[]
  }
}
