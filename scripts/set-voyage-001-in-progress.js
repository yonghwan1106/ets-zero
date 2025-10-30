require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function setVoyage001InProgress() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('📊 Setting voyage-001 to 50% progress (in_progress)...\n');

  // Voyage-001 is 25-day journey (600 hours)
  // To be at 50% now (2025-10-30), we need:
  // - Departure: 12.5 days ago = 2025-10-18T00:00:00Z
  // - Arrival: 12.5 days from now = 2025-11-12T00:00:00Z

  const now = new Date('2025-10-30T12:00:00Z');
  const daysHalf = 12.5;

  const departureTime = new Date(now.getTime() - (daysHalf * 24 * 60 * 60 * 1000));
  const arrivalTime = new Date(now.getTime() + (daysHalf * 24 * 60 * 60 * 1000));

  console.log('Calculated times:');
  console.log('  Departure:', departureTime.toISOString());
  console.log('  Now:', now.toISOString());
  console.log('  Arrival:', arrivalTime.toISOString());
  console.log('  Progress: 50%\n');

  // Get voyage-001 row
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Voyages!A:Z',
  });

  const rows = result.data.values;
  const headers = rows[0];
  const voyageIndex = rows.findIndex(r => r[0] === 'voyage-001');

  if (voyageIndex === -1) {
    console.error('❌ voyage-001 not found');
    process.exit(1);
  }

  // Find column indices
  const depTimePlannedIdx = headers.indexOf('departure_time_planned');
  const arrTimePlannedIdx = headers.indexOf('arrival_time_planned');
  const depTimeActualIdx = headers.indexOf('departure_time_actual');
  const statusIdx = headers.indexOf('status');

  console.log(`Found voyage-001 at row ${voyageIndex + 1}`);
  console.log(`Updating columns: ${depTimePlannedIdx + 1}, ${arrTimePlannedIdx + 1}, ${depTimeActualIdx + 1}, ${statusIdx + 1}\n`);

  // Update the times and status
  await sheets.spreadsheets.values.batchUpdate({
    spreadsheetId,
    requestBody: {
      valueInputOption: 'RAW',
      data: [
        {
          range: `Voyages!${String.fromCharCode(65 + depTimePlannedIdx)}${voyageIndex + 1}`,
          values: [[departureTime.toISOString()]]
        },
        {
          range: `Voyages!${String.fromCharCode(65 + arrTimePlannedIdx)}${voyageIndex + 1}`,
          values: [[arrivalTime.toISOString()]]
        },
        {
          range: `Voyages!${String.fromCharCode(65 + depTimeActualIdx)}${voyageIndex + 1}`,
          values: [[departureTime.toISOString()]]
        },
        {
          range: `Voyages!${String.fromCharCode(65 + statusIdx)}${voyageIndex + 1}`,
          values: [['in_progress']]
        }
      ]
    }
  });

  console.log('✅ Updated voyage-001 successfully!');
  console.log('   - Status: in_progress');
  console.log('   - Progress will now show as 50%');
  console.log('   - Ship marker will be positioned in mid-route');
  console.log('   - TCO and speed charts will show data');
}

setVoyage001InProgress()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
