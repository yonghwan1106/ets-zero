import 'dotenv/config'
import { GoogleSheetsService } from '../lib/services/google-sheets'

async function updateVoyagePlan() {
  // Get all voyages
  const voyages = await GoogleSheetsService.getRows('Voyages')
  console.log('Current voyages:', voyages)

  // Get all plans
  const plans = await GoogleSheetsService.getRows<any>('VoyagePlans')
  console.log('\nAvailable plans for voyage-001:')
  const voyage001Plans = plans.filter((p: any) => p.voyage_id === 'voyage-001')
  voyage001Plans.forEach((plan: any) => {
    console.log(`  - ${plan.plan_id}: ${plan.plan_type} (TCO: $${plan.estimated_tco_usd})`)
  })

  // Find voyage-001
  const voyage001 = voyages.find((v: any) => v.voyage_id === 'voyage-001')
  if (!voyage001) {
    console.error('voyage-001 not found!')
    return
  }

  console.log('\nCurrent voyage-001 selected_plan_id:', (voyage001 as any).selected_plan_id)

  // Find recommended plan
  const recommendedPlan = voyage001Plans.find((p: any) => p.is_recommended === true || p.is_recommended === 'TRUE')

  if (recommendedPlan) {
    console.log(`\nUpdating voyage-001 to use recommended plan: ${recommendedPlan.plan_id}`)

    // Update the voyage
    await GoogleSheetsService.updateRow('Voyages', 'voyage_id', 'voyage-001', {
      selected_plan_id: recommendedPlan.plan_id
    })

    console.log('✅ Updated successfully!')
  } else {
    console.log('\nNo recommended plan found. Using first plan.')
    if (voyage001Plans.length > 0) {
      await GoogleSheetsService.updateRow('Voyages', 'voyage_id', 'voyage-001', {
        selected_plan_id: voyage001Plans[0].plan_id
      })
      console.log(`✅ Updated to use plan: ${voyage001Plans[0].plan_id}`)
    }
  }

  // Verify
  const updatedVoyages = await GoogleSheetsService.getRows('Voyages')
  const updatedVoyage = updatedVoyages.find((v: any) => v.voyage_id === 'voyage-001')
  console.log('\nFinal voyage-001 selected_plan_id:', (updatedVoyage as any)?.selected_plan_id)
}

updateVoyagePlan()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error:', error)
    process.exit(1)
  })
