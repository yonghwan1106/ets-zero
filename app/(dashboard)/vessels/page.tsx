import { GoogleSheetsService } from '@/lib/services/google-sheets'
import type { Vessel } from '@/lib/types'
import Link from 'next/link'

async function getVessels() {
  return await GoogleSheetsService.getRows<Vessel>('Vessels')
}

export default async function VesselsPage() {
  const vessels = await getVessels()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">선박 관리</h1>
              <p className="text-sm text-gray-600">등록된 선박 목록 및 상세 정보</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">총 선박</h3>
              <span className="text-2xl">🚢</span>
            </div>
            <p className="text-3xl font-bold text-primary">{vessels.length}척</p>
            <p className="text-xs text-gray-500 mt-2">등록된 전체 선박</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">컨테이너선</h3>
              <span className="text-2xl">📦</span>
            </div>
            <p className="text-3xl font-bold text-primary">
              {vessels.filter(v => v.vessel_type === 'container').length}척
            </p>
            <p className="text-xs text-gray-500 mt-2">Container 선박</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">평균 톤수</h3>
              <span className="text-2xl">⚓</span>
            </div>
            <p className="text-3xl font-bold text-primary">
              {Math.round(vessels.reduce((sum, v) => sum + v.gross_tonnage, 0) / vessels.length / 1000)}K
            </p>
            <p className="text-xs text-gray-500 mt-2">Gross Tonnage</p>
          </div>
        </div>

        {/* Vessels Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">선박 목록</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선박명
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IMO 번호
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    선종
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    총톤수
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    재화중량톤
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    연료
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    건조년도
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {vessels.map((vessel) => (
                  <tr key={vessel.vessel_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">{vessel.vessel_name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{vessel.imo_number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vessel.vessel_type === 'container' ? 'bg-blue-100 text-blue-800' :
                        vessel.vessel_type === 'bulk' ? 'bg-amber-100 text-amber-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {vessel.vessel_type === 'container' ? '컨테이너' :
                         vessel.vessel_type === 'bulk' ? '벌크' : '탱커'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {vessel.gross_tonnage.toLocaleString()} GT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {vessel.deadweight.toLocaleString()} DWT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        vessel.fuel_type === 'LNG' ? 'bg-green-100 text-green-800' :
                        vessel.fuel_type === 'MGO' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {vessel.fuel_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {vessel.built_year}년
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
