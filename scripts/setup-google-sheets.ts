import { google } from 'googleapis'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function setupGoogleSheets() {
  try {
    // Check environment variables
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
      console.error('❌ GOOGLE_SERVICE_ACCOUNT_JSON not found in environment')
      process.exit(1)
    }

    if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
      console.error('❌ GOOGLE_SHEETS_SPREADSHEET_ID not found in environment')
      process.exit(1)
    }

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON)
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID

    console.log('🔐 Authenticating with Google Sheets API...')

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const authClient = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: authClient as any })

    console.log('📊 Fetching spreadsheet information...')

    // Get current spreadsheet info
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId,
    })

    console.log('\n📋 Current sheets:')
    spreadsheet.data.sheets?.forEach((sheet) => {
      console.log(`  - ${sheet.properties?.title} (ID: ${sheet.properties?.sheetId})`)
    })

    // Required sheet names
    const requiredSheets = ['Users', 'Vessels', 'Voyages', 'VoyagePlans', 'VoyageTracking', 'MarketData', 'Alerts']
    const currentSheets = spreadsheet.data.sheets || []
    const currentSheetNames = currentSheets.map(s => s.properties?.title || '')

    console.log('\n🔧 Setting up sheets...')

    const requests: any[] = []

    // Rename or create sheets
    for (let i = 0; i < requiredSheets.length; i++) {
      const requiredName = requiredSheets[i]

      if (currentSheets[i]) {
        // Rename existing sheet
        const currentName = currentSheets[i].properties?.title
        if (currentName !== requiredName) {
          console.log(`  ✏️  Renaming "${currentName}" → "${requiredName}"`)
          requests.push({
            updateSheetProperties: {
              properties: {
                sheetId: currentSheets[i].properties?.sheetId,
                title: requiredName,
              },
              fields: 'title',
            },
          })
        } else {
          console.log(`  ✅ "${requiredName}" already exists`)
        }
      } else {
        // Create new sheet
        console.log(`  ➕ Creating "${requiredName}"`)
        requests.push({
          addSheet: {
            properties: {
              title: requiredName,
            },
          },
        })
      }
    }

    // Execute batch update if there are requests
    if (requests.length > 0) {
      console.log('\n🚀 Applying changes...')
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests,
        },
      })
      console.log('✅ Changes applied successfully!')
    } else {
      console.log('\n✅ All sheets are already set up correctly!')
    }

    console.log('\n📝 Next steps:')
    console.log('  1. Add headers to each sheet')
    console.log('  2. Add data rows (or use mock data)')
    console.log('  3. Restart your development server')

    console.log('\n🎉 Setup complete!')

  } catch (error) {
    console.error('❌ Error setting up Google Sheets:', error)
    process.exit(1)
  }
}

// Run the setup
setupGoogleSheets()
