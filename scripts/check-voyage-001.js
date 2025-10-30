require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function checkVoyage001() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  // Get voyage-001 data
  const result = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Voyages!A:Z',
  });

  const rows = result.data.values;
  const headers = rows[0];
  const voyage001 = rows.find(r => r[0] === 'voyage-001');

  console.log('\n=== Voyage-001 Data ===');
  console.log('Headers:', headers.slice(0, 20).join(', '));
  console.log('\nVoyage-001:', voyage001.slice(0, 20));

  // Check times
  const depPlannedIdx = headers.indexOf('departure_time_planned');
  const arrPlannedIdx = headers.indexOf('arrival_time_planned');
  const depActualIdx = headers.indexOf('departure_time_actual');
  const statusIdx = headers.indexOf('status');
  const selectedPlanIdx = headers.indexOf('selected_plan_id');

  console.log('\n=== Time Info ===');
  console.log('Status:', voyage001[statusIdx]);
  console.log('Selected Plan ID:', voyage001[selectedPlanIdx]);
  console.log('departure_time_planned:', voyage001[depPlannedIdx]);
  console.log('arrival_time_planned:', voyage001[arrPlannedIdx]);
  console.log('departure_time_actual:', voyage001[depActualIdx]);

  // Check if voyage has started
  const now = Date.now();
  const depTime = new Date(voyage001[depPlannedIdx]).getTime();
  const arrTime = new Date(voyage001[arrPlannedIdx]).getTime();

  console.log('\n=== Progress Calculation ===');
  console.log('Now:', new Date(now).toISOString());
  console.log('Departure:', new Date(depTime).toISOString());
  console.log('Arrival:', new Date(arrTime).toISOString());
  console.log('Has departed?', now > depTime);
  console.log('Has arrived?', now > arrTime);

  const progress = (now - depTime) / (arrTime - depTime);
  console.log('Progress:', (progress * 100).toFixed(2) + '%');

  // Check VoyagePlan
  const plansResult = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'VoyagePlans!A:M',
  });

  const planRows = plansResult.data.values;
  const planHeaders = planRows[0];
  const voyage001Plan = planRows.find(r => r[0] === voyage001[selectedPlanIdx]);

  console.log('\n=== VoyagePlan Info ===');
  console.log('Plan found?', !!voyage001Plan);
  if (voyage001Plan) {
    console.log('Plan ID:', voyage001Plan[0]);
    console.log('Plan data:', voyage001Plan);
  }

  // Check VoyageTracking
  const trackingResult = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'VoyageTracking!A:Z',
  });

  const trackingRows = trackingResult.data.values;
  const trackingForVoyage = trackingRows.filter(r => r[1] === 'voyage-001');

  console.log('\n=== VoyageTracking Info ===');
  console.log('Tracking records found:', trackingForVoyage.length - 1); // -1 for header
}

checkVoyage001().catch(console.error);
