require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function addPlans() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('🔍 Checking existing VoyagePlans...');

  // Get existing VoyagePlans
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'VoyagePlans!A:A',
  });

  console.log('Existing rows:', existing.data.values?.length || 0);

  // Check if voyage-001 plans exist
  const hasVoyage001 = existing.data.values?.some(row =>
    row[0] && row[0].includes('plan-001')
  );

  if (hasVoyage001) {
    console.log('⚠️  voyage-001 plans already exist!');
    return;
  }

  console.log('📝 Adding 3 voyage plans for voyage-001...');

  // Add the 3 plans
  const plans = [
    ['plan-001-a', 'voyage-001', 'min_fuel', 'FALSE', 13.5, 650, 2100, 1260000, 459900, 1719900,
     JSON.stringify([{lat:35.1028,lon:129.0403},{lat:51.9244,lon:4.4777}]),
     '최저 연료 소비 전략입니다. RPM을 13.5로 유지하여 연료 소비를 최소화하지만 항해 시간이 가장 깁니다.',
     70, 600, new Date().toISOString()],
    ['plan-001-b', 'voyage-001', 'min_time', 'FALSE', 16.0, 540, 2850, 1710000, 623700, 2333700,
     JSON.stringify([{lat:35.1028,lon:129.0403},{lat:51.9244,lon:4.4777}]),
     '최단 시간 전략입니다. RPM을 16.0으로 높여 가장 빠르게 도착하지만 연료 소비와 탄소배출이 증가합니다.',
     70, 600, new Date().toISOString()],
    ['plan-001-c', 'voyage-001', 'min_tco', 'TRUE', 14.5, 590, 2400, 1440000, 524160, 1964160,
     JSON.stringify([{lat:35.1028,lon:129.0403},{lat:51.9244,lon:4.4777}]),
     '최적 TCO 전략입니다. 연료비와 탄소배출권 비용을 균형있게 고려하여 총 운항 비용을 최소화합니다.',
     70, 600, new Date().toISOString()],
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: 'VoyagePlans!A:O',
    valueInputOption: 'RAW',
    requestBody: { values: plans },
  });

  console.log('✅ Added 3 voyage plans!');

  console.log('🔄 Updating voyage-001...');

  // Update voyage-001
  const voyages = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'Voyages!A:R',
  });

  const rows = voyages.data.values;
  const headers = rows[0];
  const voyageRowIndex = rows.findIndex((r, i) => i > 0 && r[0] === 'voyage-001');

  if (voyageRowIndex > 0) {
    const planIdCol = headers.indexOf('selected_plan_id');
    const distanceCol = headers.indexOf('distance_nm');

    rows[voyageRowIndex][planIdCol] = 'plan-001-c';
    if (distanceCol >= 0) {
      rows[voyageRowIndex][distanceCol] = 11000;
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Voyages!A${voyageRowIndex + 1}:R${voyageRowIndex + 1}`,
      valueInputOption: 'RAW',
      requestBody: { values: [rows[voyageRowIndex]] },
    });

    console.log('✅ Updated voyage-001 with plan-001-c!');
  }

  console.log('\n🎉 All done!');
}

addPlans().then(() => process.exit(0)).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
