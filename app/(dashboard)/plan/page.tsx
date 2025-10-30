import { GoogleSheetsService } from '@/lib/services/google-sheets'
import type { Vessel, Voyage } from '@/lib/types'
import Link from 'next/link'
import { PlanForm } from '@/components/plan/plan-form'

async function getPlanData() {
  const vessels = await GoogleSheetsService.getRows<Vessel>('Vessels')
  const voyages = await GoogleSheetsService.getRows<Voyage>('Voyages')

  // Filter only planned voyages
  const plannedVoyages = voyages.filter(v => v.status === 'planned')

  return { vessels, plannedVoyages }
}

export default async function PlanPage() {
  const { vessels, plannedVoyages } = await getPlanData()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">운항 계획 수립</h1>
              <p className="text-sm text-gray-600">AI 기반 최적 항해 계획 생성</p>
            </div>
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-lg transition-colors"
            >
              ← 대시보드로
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">AI 운항 최적화</h2>
          <p className="text-white/90 mb-6">
            Claude AI가 실시간 탄소배출권(ETS) 가격과 연료비를 분석하여
            3가지 최적화 옵션을 제시합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">⛽ 최저 연료 소비</h3>
              <p className="text-sm text-white/80">
                연료 소비량을 최소화하는 RPM과 항로
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">⏱️ 최단 시간</h3>
              <p className="text-sm text-white/80">
                도착 시간을 단축하는 최적 항로
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">💰 TCO 최적화</h3>
              <p className="text-sm text-white/80">
                연료비 + ETS 비용을 최소화 (권장)
              </p>
            </div>
          </div>
        </div>

        {/* Plan Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">항해 정보 입력</h2>
          <PlanForm vessels={vessels} plannedVoyages={plannedVoyages} />
        </div>
      </main>
    </div>
  )
}
