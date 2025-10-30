import { GoogleSheetsService } from '@/lib/services/google-sheets'
import type { Vessel, Voyage } from '@/lib/types'
import Link from 'next/link'

async function getVoyagesData() {
  const voyages = await GoogleSheetsService.getRows<Voyage>('Voyages')
  const vessels = await GoogleSheetsService.getRows<Vessel>('Vessels')

  return { voyages, vessels }
}

export default async function VoyagesPage() {
  const { voyages, vessels } = await getVoyagesData()

  // Create vessel map for quick lookup
  const vesselMap = new Map(vessels.map(v => [v.vessel_id, v]))

  return (
    <div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">전체 항해</h3>
              <span className="text-2xl">🗺️</span>
            </div>
            <p className="text-3xl font-bold text-primary">{voyages.length}건</p>
            <p className="text-xs text-gray-500 mt-2">총 항해 수</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">계획됨</h3>
              <span className="text-2xl">📋</span>
            </div>
            <p className="text-3xl font-bold text-gray-600">
              {voyages.filter(v => v.status === 'planned').length}건
            </p>
            <p className="text-xs text-gray-500 mt-2">Planned</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">진행중</h3>
              <span className="text-2xl">🚢</span>
            </div>
            <p className="text-3xl font-bold text-secondary">
              {voyages.filter(v => v.status === 'in_progress').length}건
            </p>
            <p className="text-xs text-secondary mt-2">In Progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">완료됨</h3>
              <span className="text-2xl">✅</span>
            </div>
            <p className="text-3xl font-bold text-success">
              {voyages.filter(v => v.status === 'completed').length}건
            </p>
            <p className="text-xs text-success mt-2">Completed</p>
          </div>
        </div>

        {/* Voyages Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">항해 목록</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    항해번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선박
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    출발항
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    도착항
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    출발시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    도착시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    화물중량
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {voyages.map((voyage) => {
                  const vessel = vesselMap.get(voyage.vessel_id)
                  const departureDate = new Date(voyage.departure_time_planned).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                  const arrivalDate = new Date(voyage.arrival_time_planned).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })

                  return (
                    <tr key={voyage.voyage_id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          <Link href={`/voyages/${voyage.voyage_id}/monitor`} className="text-primary hover:text-primary/80 hover:underline flex items-center gap-1">
                            <span className="text-primary">→</span>
                            {voyage.voyage_number}
                          </Link>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{vessel?.vessel_name || 'Unknown'}</div>
                        <div className="text-xs text-gray-500">{vessel?.imo_number || ''}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{voyage.departure_port}</div>
                        <div className="text-xs text-gray-500">{voyage.departure_port_code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{voyage.arrival_port}</div>
                        <div className="text-xs text-gray-500">{voyage.arrival_port_code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {departureDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {arrivalDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {voyage.cargo_weight.toLocaleString()} tons
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          voyage.status === 'planned' ? 'bg-gray-100 text-gray-800' :
                          voyage.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          voyage.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {voyage.status === 'planned' ? '계획됨' :
                           voyage.status === 'in_progress' ? '진행중' :
                           voyage.status === 'completed' ? '완료됨' : '취소됨'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
