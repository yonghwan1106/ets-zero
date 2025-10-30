import { google } from 'googleapis'
import * as dotenv from 'dotenv'
import { mockUsers, mockVessels, mockVoyages } from '../lib/services/mock-data'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function populateGoogleSheets() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!)
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!

    console.log('🔐 Authenticating with Google Sheets API...')

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })

    const authClient = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: authClient as any })

    console.log('📊 Populating sheets with data...\n')

    // Users sheet
    console.log('👥 Adding Users data...')
    const usersHeaders = ['user_id', 'email', 'password_hash', 'name', 'role', 'organization', 'created_at']
    const usersData = mockUsers.map(u => [
      u.user_id, u.email, u.password_hash, u.name, u.role, u.organization, u.created_at
    ])

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Users!A1:G1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [usersHeaders],
      },
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Users!A2:G',
      valueInputOption: 'RAW',
      requestBody: {
        values: usersData,
      },
    })
    console.log(`  ✅ Added ${usersData.length} users`)

    // Vessels sheet
    console.log('🚢 Adding Vessels data...')
    const vesselsHeaders = [
      'vessel_id', 'vessel_name', 'imo_number', 'vessel_type', 'gross_tonnage',
      'deadweight', 'draft_design', 'rpm_min', 'rpm_max', 'fuel_type',
      'co2_emission_factor', 'built_year', 'created_at'
    ]
    const vesselsData = mockVessels.map(v => [
      v.vessel_id, v.vessel_name, v.imo_number, v.vessel_type, v.gross_tonnage,
      v.deadweight, v.draft_design, v.rpm_min, v.rpm_max, v.fuel_type,
      v.co2_emission_factor, v.built_year, v.created_at
    ])

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Vessels!A1:M1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [vesselsHeaders],
      },
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Vessels!A2:M',
      valueInputOption: 'RAW',
      requestBody: {
        values: vesselsData,
      },
    })
    console.log(`  ✅ Added ${vesselsData.length} vessels`)

    // Voyages sheet
    console.log('⚓ Adding Voyages data...')
    const voyagesHeaders = [
      'voyage_id', 'vessel_id', 'voyage_number', 'departure_port', 'departure_port_code',
      'departure_lat', 'departure_lon', 'arrival_port', 'arrival_port_code',
      'arrival_lat', 'arrival_lon', 'departure_time_planned', 'arrival_time_planned',
      'departure_time_actual', 'arrival_time_actual', 'cargo_weight', 'status',
      'selected_plan_id', 'created_at'
    ]
    const voyagesData = mockVoyages.map(v => [
      v.voyage_id, v.vessel_id, v.voyage_number, v.departure_port, v.departure_port_code,
      v.departure_lat, v.departure_lon, v.arrival_port, v.arrival_port_code,
      v.arrival_lat, v.arrival_lon, v.departure_time_planned, v.arrival_time_planned,
      v.departure_time_actual || '', v.arrival_time_actual || '', v.cargo_weight, v.status,
      v.selected_plan_id || '', v.created_at
    ])

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: 'Voyages!A1:S1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [voyagesHeaders],
      },
    })

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Voyages!A2:S',
      valueInputOption: 'RAW',
      requestBody: {
        values: voyagesData,
      },
    })
    console.log(`  ✅ Added ${voyagesData.length} voyages`)

    console.log('\n🎉 All data populated successfully!')
    console.log('📝 Restart your development server to use real Google Sheets data')

  } catch (error) {
    console.error('❌ Error populating Google Sheets:', error)
    process.exit(1)
  }
}

// Run the population
populateGoogleSheets()
