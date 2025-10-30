import Link from 'next/link'
import { GoogleSheetsService } from '@/lib/services/google-sheets'
import type { Vessel, Voyage } from '@/lib/types'
import { VoyageStatusChart } from '@/components/dashboard/voyage-status-chart'
import { VesselTypeChart } from '@/components/dashboard/vessel-type-chart'

async function getDashboardData() {
  const vessels = await GoogleSheetsService.getRows<Vessel>('Vessels')
  const voyages = await GoogleSheetsService.getRows<Voyage>('Voyages')

  // Calculate KPIs from real data
  const inProgressVoyages = voyages.filter(v => v.status === 'in_progress')
  const completedVoyages = voyages.filter(v => v.status === 'completed')
  const plannedVoyages = voyages.filter(v => v.status === 'planned')

  // Calculate vessel type counts
  const containerVessels = vessels.filter(v => v.vessel_type === 'container').length
  const bulkVessels = vessels.filter(v => v.vessel_type === 'bulk').length
  const tankerVessels = vessels.filter(v => v.vessel_type === 'tanker').length

  return {
    vessels,
    voyages,
    inProgressVoyages,
    completedVoyages,
    plannedVoyages,
    containerVessels,
    bulkVessels,
    tankerVessels,
  }
}

export default async function DashboardPage() {
  const { vessels, voyages, inProgressVoyages, completedVoyages, plannedVoyages, containerVessels, bulkVessels, tankerVessels } = await getDashboardData()

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">운항 중 선박</h3>
              <span className="text-2xl">🚢</span>
            </div>
            <p className="text-3xl font-bold text-primary">{inProgressVoyages.length}척</p>
            <p className="text-xs text-gray-500 mt-2">실시간 모니터링</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">총 선박</h3>
              <span className="text-2xl">⚓</span>
            </div>
            <p className="text-3xl font-bold text-primary">{vessels.length}척</p>
            <p className="text-xs text-gray-500 mt-2">등록된 전체 선박</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">완료된 항해</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-success">{completedVoyages.length}건</p>
            <p className="text-xs text-success mt-2">성공적으로 완료</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">전체 항해</h3>
              <span className="text-2xl">🗺️</span>
            </div>
            <p className="text-3xl font-bold text-primary">{voyages.length}건</p>
            <p className="text-xs text-gray-500 mt-2">계획+진행+완료</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">항해 현황</h2>
            <VoyageStatusChart
              planned={plannedVoyages.length}
              inProgress={inProgressVoyages.length}
              completed={completedVoyages.length}
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">선박 종류별 분포</h2>
            <VesselTypeChart
              container={containerVessels}
              bulk={bulkVessels}
              tanker={tankerVessels}
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/vessels" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🚢</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">선박 관리</h3>
            <p className="text-sm text-gray-600 mb-4">
              등록된 선박 {vessels.length}척의 정보를 확인하세요
            </p>
            <p className="text-sm text-primary font-medium">바로가기 →</p>
          </Link>

          <Link href="/voyages" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">운항 현황</h3>
            <p className="text-sm text-gray-600 mb-4">
              현재 진행 중인 항해 {inProgressVoyages.length}건을 모니터링하세요
            </p>
            <p className="text-sm text-primary font-medium">바로가기 →</p>
          </Link>

          <Link href="/plan" className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">운항 계획</h3>
            <p className="text-sm text-gray-600 mb-4">
              AI가 최적의 항해 계획을 생성합니다
            </p>
            <p className="text-sm text-primary font-medium">바로가기 →</p>
          </Link>
        </div>
      </main>
    </div>
  )
}
