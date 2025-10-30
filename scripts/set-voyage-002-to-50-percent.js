require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function setVoyage002To50Percent() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('📊 Setting voyage-002 to 50% progress...\n');

  // Calculate times for 50% progress
  // Total journey: 15 days (360 hours)
  // To be at 50% now (2025-10-30), we need:
  // - Departure: 7.5 days ago = 2025-10-22T12:00:00Z
  // - Arrival: 7.5 days from now = 2025-11-07T12:00:00Z

  const now = new Date('2025-10-30T12:00:00Z');
  const daysHalf = 7.5;

  const departureTime = new Date(now.getTime() - (daysHalf * 24 * 60 * 60 * 1000));
  const arrivalTime = new Date(now.getTime() + (daysHalf * 24 * 60 * 60 * 1000));

  console.log('Calculated times:');
  console.log('  Departure:', departureTime.toISOString());
  console.log('  Now:', now.toISOString());
  console.log('  Arrival:', arrivalTime.toISOString());
  console.log('  Progress: 50%\n');

  // Get voyage-002 row
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Voyages!A:Z',
  });

  const rows = result.data.values;
  const headers = rows[0];
  const voyageIndex = rows.findIndex(r => r[0] === 'voyage-002');

  if (voyageIndex === -1) {
    console.error('❌ voyage-002 not found');
    process.exit(1);
  }

  // Find column indices
  const depTimePlannedIdx = headers.indexOf('departure_time_planned');
  const arrTimePlannedIdx = headers.indexOf('arrival_time_planned');
  const depTimeActualIdx = headers.indexOf('departure_time_actual');

  console.log(`Found voyage-002 at row ${voyageIndex + 1}`);
  console.log(`Updating columns: ${depTimePlannedIdx + 1}, ${arrTimePlannedIdx + 1}, ${depTimeActualIdx + 1}\n`);

  // Update the times
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
        }
      ]
    }
  });

  console.log('✅ Updated voyage-002 times successfully!');
  console.log('   - Progress will now show as 50%');
  console.log('   - Green actual route line will extend halfway across the Pacific');
  console.log('   - Ship marker will be positioned in mid-Pacific');
}

setVoyage002To50Percent()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
