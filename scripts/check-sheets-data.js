require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function checkSheets() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('📊 Checking VoyageTracking data...');
  const tracking = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'VoyageTracking!A1:L11',
  });
  console.log('VoyageTracking rows:', tracking.data.values?.length || 0);

  console.log('\n📊 Checking Alerts data...');
  const alerts = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Alerts!A1:J5',
  });
  console.log('Alerts rows:', alerts.data.values?.length || 0);
  if (alerts.data.values && alerts.data.values.length > 1) {
    console.log('\nAlert details:');
    alerts.data.values.slice(1).forEach((row, i) => {
      console.log(`  Alert ${i+1}: ${row[0]} - voyage: ${row[1]} - type: ${row[2]} - acknowledged: ${row[8] || 'null'}`);
    });
  }

  console.log('\n📊 Checking voyage-002 specific alerts...');
  const voyage002Alerts = alerts.data.values?.slice(1).filter(row => row[1] === 'voyage-002' && !row[8]);
  console.log('Active alerts for voyage-002:', voyage002Alerts?.length || 0);
}

checkSheets().catch(console.error);
