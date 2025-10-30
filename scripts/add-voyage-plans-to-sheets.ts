import 'dotenv/config'
import { GoogleSheetsService } from '../lib/services/google-sheets'
import type { VoyagePlan } from '../lib/types'

// Voyage plans for voyage-001
const voyagePlans: VoyagePlan[] = [
  {
    plan_id: 'plan-001-a',
    voyage_id: 'voyage-001',
    plan_type: 'min_fuel',
    is_recommended: false,
    recommended_rpm: 13.5,
    estimated_duration_hours: 650,
    estimated_foc_tons: 2100,
    estimated_fuel_cost_usd: 1260000,
    estimated_ets_cost_usd: 459900,
    estimated_tco_usd: 1719900,
    route_waypoints: JSON.stringify([
      { lat: 35.1028, lon: 129.0403 },
      { lat: 51.9244, lon: 4.4777 }
    ]),
    ai_explanation: '최저 연료 소비 전략입니다. RPM을 13.5로 유지하여 연료 소비를 최소화하지만 항해 시간이 가장 깁니다.',
    market_ets_price: 70,
    market_fuel_price: 600,
    created_at: new Date().toISOString(),
  },
  {
    plan_id: 'plan-001-b',
    voyage_id: 'voyage-001',
    plan_type: 'min_time',
    is_recommended: false,
    recommended_rpm: 16.0,
    estimated_duration_hours: 540,
    estimated_foc_tons: 2850,
    estimated_fuel_cost_usd: 1710000,
    estimated_ets_cost_usd: 623700,
    estimated_tco_usd: 2333700,
    route_waypoints: JSON.stringify([
      { lat: 35.1028, lon: 129.0403 },
      { lat: 51.9244, lon: 4.4777 }
    ]),
    ai_explanation: '최단 시간 전략입니다. RPM을 16.0으로 높여 가장 빠르게 도착하지만 연료 소비와 탄소배출이 증가합니다.',
    market_ets_price: 70,
    market_fuel_price: 600,
    created_at: new Date().toISOString(),
  },
  {
    plan_id: 'plan-001-c',
    voyage_id: 'voyage-001',
    plan_type: 'min_tco',
    is_recommended: true,
    recommended_rpm: 14.5,
    estimated_duration_hours: 590,
    estimated_foc_tons: 2400,
    estimated_fuel_cost_usd: 1440000,
    estimated_ets_cost_usd: 524160,
    estimated_tco_usd: 1964160,
    route_waypoints: JSON.stringify([
      { lat: 35.1028, lon: 129.0403 },
      { lat: 51.9244, lon: 4.4777 }
    ]),
    ai_explanation: '최적 TCO 전략입니다. 연료비와 탄소배출권 비용을 균형있게 고려하여 총 운항 비용을 최소화합니다. 현재 ETS 가격($70/톤)과 유가($600/톤)를 감안할 때 가장 경제적인 선택입니다.',
    market_ets_price: 70,
    market_fuel_price: 600,
    created_at: new Date().toISOString(),
  },
]

async function addVoyagePlansToSheets() {
  console.log('🚀 Starting to add voyage plans to Google Sheets...\n')

  try {
    // Check if VoyagePlans sheet exists and has data
    const existingPlans = await GoogleSheetsService.getRows<VoyagePlan>('VoyagePlans')
    console.log(`Found ${existingPlans.length} existing plans in Google Sheets`)

    // Check if voyage-001 plans already exist
    const voyage001Plans = existingPlans.filter(p => p.voyage_id === 'voyage-001')
    if (voyage001Plans.length > 0) {
      console.log(`\n⚠️  voyage-001 already has ${voyage001Plans.length} plans:`)
      voyage001Plans.forEach(plan => {
        console.log(`  - ${plan.plan_id}: ${plan.plan_type}`)
      })
      console.log('\nSkipping insertion to avoid duplicates.')
      console.log('If you want to re-add, please delete existing plans first.')
      return
    }

    // Add each plan
    console.log('\n📝 Adding 3 voyage plans for voyage-001...')
    for (const plan of voyagePlans) {
      console.log(`  Adding ${plan.plan_id} (${plan.plan_type})...`)
      await GoogleSheetsService.addRow('VoyagePlans', plan)
    }

    console.log('\n✅ Successfully added all voyage plans!')

    // Update voyage-001 to use the recommended plan
    console.log('\n🔄 Updating voyage-001 to use recommended plan (plan-001-c)...')
    await GoogleSheetsService.updateRow('Voyages', 'voyage_id', 'voyage-001', {
      selected_plan_id: 'plan-001-c',
      distance_nm: 11000,
    })

    console.log('✅ Updated voyage-001 with selected_plan_id!')

    // Verify
    console.log('\n🔍 Verifying...')
    const updatedPlans = await GoogleSheetsService.getRows<VoyagePlan>('VoyagePlans')
    const voyage001PlansAfter = updatedPlans.filter(p => p.voyage_id === 'voyage-001')
    console.log(`✅ voyage-001 now has ${voyage001PlansAfter.length} plans`)

    const voyages = await GoogleSheetsService.getRows('Voyages')
    const voyage001 = voyages.find((v: any) => v.voyage_id === 'voyage-001')
    console.log(`✅ voyage-001 selected_plan_id: ${(voyage001 as any)?.selected_plan_id}`)

    console.log('\n🎉 All done! You can now test the monitoring and simulation pages.')

  } catch (error) {
    console.error('❌ Error adding voyage plans:', error)
    throw error
  }
}

addVoyagePlansToSheets()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
