require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function updateVoyage002Progress() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('📊 Updating voyage-002 progress to 50%...\n');

  // Get all voyages to find voyage-002 row
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Voyages!A:K',
  });

  const rows = result.data.values;
  const headers = rows[0];
  const voyageIndex = rows.findIndex(row => row[0] === 'voyage-002');

  if (voyageIndex === -1) {
    console.error('❌ voyage-002 not found');
    process.exit(1);
  }

  console.log(`Found voyage-002 at row ${voyageIndex + 1}`);

  // Update progress to 50% (column K is index 10)
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Voyages!K${voyageIndex + 1}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [[0.5]]
    }
  });

  console.log('✅ Updated voyage-002 progress to 50%');
  console.log('   - Now the actual route (green line) will show 50% of the journey');
  console.log('   - TCO metrics will reflect 50% completion');
}

updateVoyage002Progress()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
