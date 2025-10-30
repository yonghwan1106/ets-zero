require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

async function addSampleData() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  console.log('📊 Adding sample data to VoyageTracking, MarketData, and Alerts...\n');

  // 1. VoyageTracking 샘플 데이터
  console.log('1️⃣ Adding VoyageTracking data...');
  const voyageTrackingHeaders = [
    'tracking_id', 'voyage_id', 'timestamp', 'latitude', 'longitude',
    'speed_knots', 'rpm', 'foc_current_tons_per_hour', 'foc_cumulative_tons',
    'tco_cumulative_usd', 'weather_wind_speed', 'weather_wave_height'
  ];

  // voyage-002 (진행중)의 추적 데이터 생성
  const baseTime = new Date('2025-11-10T10:00:00Z');
  const voyageTrackingData = [];

  for (let i = 0; i < 10; i++) {
    const timestamp = new Date(baseTime.getTime() + i * 6 * 3600000); // 6시간 간격
    const progress = i / 20; // 50% 진행

    voyageTrackingData.push([
      `track-002-${String(i + 1).padStart(3, '0')}`,
      'voyage-002',
      timestamp.toISOString(),
      35.1028 + (33.7367 - 35.1028) * progress,  // 부산 -> LA 위도
      129.0403 + (-118.2700 - 129.0403) * progress, // 부산 -> LA 경도
      14.5 + Math.random() * 0.5,  // 속도
      14.5,                         // RPM
      3.2 + Math.random() * 0.3,   // 시간당 연료 소비
      (i + 1) * 19.2,               // 누적 연료
      (i + 1) * 11520,              // 누적 TCO
      15 + Math.random() * 10,      // 풍속
      2.0 + Math.random() * 1.5,   // 파고
    ]);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'VoyageTracking!A1:L11',
    valueInputOption: 'RAW',
    requestBody: { values: [voyageTrackingHeaders, ...voyageTrackingData] },
  });
  console.log('   ✅ Added 10 tracking records for voyage-002\n');

  // 2. MarketData 샘플 데이터
  console.log('2️⃣ Adding MarketData...');
  const marketDataHeaders = [
    'market_data_id', 'timestamp', 'data_type', 'value', 'currency', 'unit', 'region'
  ];

  const marketData = [];
  const now = new Date();

  // 최근 30일간의 ETS 가격
  for (let i = 0; i < 30; i++) {
    const date = new Date(now.getTime() - i * 24 * 3600000);
    marketData.push([
      `mkt-ets-${String(30 - i).padStart(3, '0')}`,
      date.toISOString(),
      'ets_price',
      68 + Math.random() * 6, // $68-74 사이
      'USD',
      'per_ton_co2',
      'EU',
    ]);
  }

  // 최근 30일간의 유가
  for (let i = 0; i < 30; i++) {
    const date = new Date(now.getTime() - i * 24 * 3600000);
    marketData.push([
      `mkt-fuel-${String(30 - i).padStart(3, '0')}`,
      date.toISOString(),
      'bunker_price',
      580 + Math.random() * 40, // $580-620 사이
      'USD',
      'per_ton',
      'Singapore',
    ]);
  }

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'MarketData!A1:G61',
    valueInputOption: 'RAW',
    requestBody: { values: [marketDataHeaders, ...marketData] },
  });
  console.log('   ✅ Added 60 market data records (30 days of ETS + fuel prices)\n');

  // 3. Alerts 샘플 데이터
  console.log('3️⃣ Adding Alerts...');
  const alertsHeaders = [
    'alert_id', 'voyage_id', 'alert_type', 'severity', 'message',
    'action_required', 'recommended_action', 'created_at',
    'acknowledged_at', 'acknowledged_by'
  ];

  const alerts = [
    [
      'alert-001',
      'voyage-002',
      'ets_spike',
      'warning',
      'ETS 가격이 $75로 상승했습니다 (전일 대비 +8%). 운항 비용 증가가 예상됩니다.',
      'TRUE',
      '속도를 13.5 RPM으로 낮춰 연료 소비를 줄이는 것을 권장합니다. 예상 절감액: $45,000',
      new Date(now.getTime() - 2 * 3600000).toISOString(),
      null,
      null,
    ],
    [
      'alert-002',
      'voyage-003',
      'weather_warning',
      'info',
      '48시간 내 항로 상에 강풍(풍속 25knots) 예보가 있습니다.',
      'FALSE',
      '현재 항로 유지. 속도 조정 불필요.',
      new Date(now.getTime() - 12 * 3600000).toISOString(),
      new Date(now.getTime() - 11 * 3600000).toISOString(),
      '박철수',
    ],
    [
      'alert-003',
      'voyage-004',
      'cost_overrun',
      'warning',
      '현재 TCO가 계획 대비 5% 초과했습니다 ($1,870,000 vs $1,780,000).',
      'TRUE',
      '남은 구간에서 RPM을 14.0으로 낮추면 최종 TCO를 계획 범위 내로 유지할 수 있습니다.',
      new Date(now.getTime() - 6 * 3600000).toISOString(),
      null,
      null,
    ],
    [
      'alert-004',
      'voyage-002',
      'eta_delay',
      'info',
      '기상 악화로 인해 ETA가 4시간 지연될 것으로 예상됩니다.',
      'TRUE',
      '도착 터미널에 지연 사실을 통보하고, 속도를 15.5 RPM로 높여 지연을 2시간으로 단축할 수 있습니다.',
      new Date(now.getTime() - 1 * 3600000).toISOString(),
      '',
      '',
    ],
  ];

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: 'Alerts!A1:J5',
    valueInputOption: 'RAW',
    requestBody: { values: [alertsHeaders, ...alerts] },
  });
  console.log('   ✅ Added 4 alert records\n');

  console.log('🎉 All sample data added successfully!');
  console.log('\n📌 Summary:');
  console.log('   - VoyageTracking: 10 records (voyage-002 tracking)');
  console.log('   - MarketData: 60 records (30 days of prices)');
  console.log('   - Alerts: 4 active alerts');
}

addSampleData()
  .then(() => process.exit(0))
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
