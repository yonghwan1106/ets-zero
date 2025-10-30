require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function addVoyage002Plan() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('📊 Adding voyage plan for voyage-002...\n');

  // Get existing headers
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'VoyagePlans!A1:M1',
  });

  const headers = existing.data.values?.[0] || [
    'plan_id',
    'voyage_id',
    'optimization_type',
    'recommended_rpm',
    'estimated_duration_hours',
    'estimated_fuel_consumption_tons',
    'estimated_fuel_cost_usd',
    'estimated_co2_emissions_tons',
    'estimated_ets_cost_usd',
    'estimated_tco_usd',
    'estimated_eta',
    'is_recommended',
    'created_at'
  ];

  // Add plan for voyage-002
  const plan = [
    'plan-002-a',
    'voyage-002',
    'min_tco',
    14.5,
    600,
    3200,
    1920000,
    9600,
    672000,
    2592000,
    '2025-11-25T08:00:00Z',
    'TRUE',
    new Date().toISOString()
  ];

  // Append the new plan
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'VoyagePlans!A:M',
    valueInputOption: 'RAW',
    requestBody: {
      values: [plan]
    }
  });

  console.log('✅ Added voyage plan for voyage-002');
  console.log('   - plan_id: plan-002-a');
  console.log('   - optimization_type: min_tco');
  console.log('   - estimated_tco_usd: $2,592,000');
  console.log('   - recommended_rpm: 14.5');
}

addVoyage002Plan()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
