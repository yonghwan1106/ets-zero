import { GoogleSheetsService } from '@/lib/services/google-sheets'
import type { Voyage, Vessel, VoyagePlan } from '@/lib/types'
import { WhatIfSimulator } from '@/components/voyage/whatif-simulator'
import Link from 'next/link'

interface SimulatePageProps {
  params: Promise<{ id: string }>
}

async function getSimulationData(voyageId: string) {
  const voyages = await GoogleSheetsService.getRows<Voyage>('Voyages')
  const voyage = voyages.find(v => v.voyage_id === voyageId)

  if (!voyage) {
    return null
  }

  const vessels = await GoogleSheetsService.getRows<Vessel>('Vessels')
  const vessel = vessels.find(v => v.vessel_id === voyage.vessel_id)

  const plans = await GoogleSheetsService.getRows<VoyagePlan>('VoyagePlans')
  const selectedPlan = plans.find(p => p.plan_id === voyage.selected_plan_id)

  return { voyage, vessel, selectedPlan }
}

export default async function SimulatePage({ params }: SimulatePageProps) {
  const { id } = await params
  const data = await getSimulationData(id)

  if (!data) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-800">항해를 찾을 수 없습니다.</p>
          <Link href="/voyages" className="text-red-600 hover:text-red-800 underline mt-2 inline-block">
            ← 항해 목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  const { voyage, vessel, selectedPlan } = data

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href={`/voyages/${id}/monitor`} className="text-primary hover:text-primary/80 text-sm mb-2 inline-block">
          ← 모니터링으로 돌아가기
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">What-if 시뮬레이션</h1>
          <p className="text-gray-600 mt-1">
            {voyage.voyage_number} - {vessel?.vessel_name}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            다양한 시나리오를 시뮬레이션하여 TCO 변화와 최적 대응 전략을 확인하세요.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
        <div className="flex gap-4">
          <span className="text-3xl">💡</span>
          <div>
            <h3 className="font-bold text-blue-900 mb-2">시뮬레이션 안내</h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>• ETS 가격, 유가, RPM 등의 변수를 조정하여 TCO 변화를 예측할 수 있습니다.</li>
              <li>• AI가 각 시나리오에 대한 최적 대응 방안을 제시합니다.</li>
              <li>• 실제 운항 계획에는 영향을 주지 않는 안전한 시뮬레이션입니다.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Simulator Component */}
      <WhatIfSimulator
        voyage={voyage}
        vessel={vessel}
        selectedPlan={selectedPlan}
      />
    </div>
  )
}
