require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function checkVoyage002() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Voyages!A1:Z10',
  });

  const rows = result.data.values;
  const headers = rows[0];
  const voyage002 = rows.find(r => r[0] === 'voyage-002');

  console.log('Headers:', headers);
  console.log('Voyage-002 data:', voyage002);
  console.log('Progress (column K, index 10):', voyage002[10]);
}

checkVoyage002().catch(console.error);
