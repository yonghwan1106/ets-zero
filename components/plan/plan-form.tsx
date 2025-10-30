'use client'

import { useState } from 'react'
import type { Vessel, Voyage } from '@/lib/types'

interface PlanFormProps {
  vessels: Vessel[]
  plannedVoyages: Voyage[]
}

export function PlanForm({ vessels, plannedVoyages }: PlanFormProps) {
  const [selectedVoyage, setSelectedVoyage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [plans, setPlans] = useState<any>(null)
  const [error, setError] = useState<string>('')

  const handleGeneratePlans = async () => {
    if (!selectedVoyage) {
      setError('항해를 선택해주세요')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/plan/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ voyageId: selectedVoyage }),
      })

      if (!response.ok) {
        throw new Error('계획 생성에 실패했습니다')
      }

      const data = await response.json()
      setPlans(data.plans)
    } catch (err) {
      setError(err instanceof Error ? err.message : '오류가 발생했습니다')
    } finally {
      setIsLoading(false)
    }
  }

  const voyage = plannedVoyages.find(v => v.voyage_id === selectedVoyage)
  const vessel = voyage ? vessels.find(v => v.vessel_id === voyage.vessel_id) : null

  return (
    <div>
      {/* Voyage Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          계획할 항해 선택
        </label>
        <select
          value={selectedVoyage}
          onChange={(e) => setSelectedVoyage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">항해를 선택하세요</option>
          {plannedVoyages.map((voyage) => {
            const v = vessels.find(vs => vs.vessel_id === voyage.vessel_id)
            return (
              <option key={voyage.voyage_id} value={voyage.voyage_id}>
                {voyage.voyage_number} - {v?.vessel_name} ({voyage.departure_port} → {voyage.arrival_port})
              </option>
            )
          })}
        </select>
      </div>

      {/* Voyage Details */}
      {voyage && vessel && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">선택한 항해 정보</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-600">선박명</p>
              <p className="font-medium text-gray-900">{vessel.vessel_name}</p>
            </div>
            <div>
              <p className="text-gray-600">출발항</p>
              <p className="font-medium text-gray-900">{voyage.departure_port}</p>
            </div>
            <div>
              <p className="text-gray-600">도착항</p>
              <p className="font-medium text-gray-900">{voyage.arrival_port}</p>
            </div>
            <div>
              <p className="text-gray-600">화물중량</p>
              <p className="font-medium text-gray-900">{voyage.cargo_weight.toLocaleString()} tons</p>
            </div>
            <div>
              <p className="text-gray-600">선종</p>
              <p className="font-medium text-gray-900">
                {vessel.vessel_type === 'container' ? '컨테이너' :
                 vessel.vessel_type === 'bulk' ? '벌크' : '탱커'}
              </p>
            </div>
            <div>
              <p className="text-gray-600">총톤수</p>
              <p className="font-medium text-gray-900">{vessel.gross_tonnage.toLocaleString()} GT</p>
            </div>
            <div>
              <p className="text-gray-600">연료 타입</p>
              <p className="font-medium text-gray-900">{vessel.fuel_type}</p>
            </div>
            <div>
              <p className="text-gray-600">출발 예정</p>
              <p className="font-medium text-gray-900">
                {new Date(voyage.departure_time_planned).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={handleGeneratePlans}
        disabled={!selectedVoyage || isLoading}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span>
            AI가 최적 계획을 생성하는 중...
          </span>
        ) : (
          '🤖 AI 최적 계획 생성'
        )}
      </button>

      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Generated Plans */}
      {plans && (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">생성된 최적 계획</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Min Fuel Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">⛽ 최저 연료</h4>
                {plans.minFuel.is_recommended && (
                  <span className="px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                    권장
                  </span>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">권장 RPM</span>
                  <span className="font-semibold">{plans.minFuel.recommended_rpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 소요시간</span>
                  <span className="font-semibold">{plans.minFuel.estimated_duration_hours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연료 소비량</span>
                  <span className="font-semibold">{plans.minFuel.estimated_foc_tons.toFixed(1)} tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연료 비용</span>
                  <span className="font-semibold">${plans.minFuel.estimated_fuel_cost_usd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETS 비용</span>
                  <span className="font-semibold">${plans.minFuel.estimated_ets_cost_usd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">총 TCO</span>
                  <span className="font-bold text-primary">${plans.minFuel.estimated_tco_usd.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">{plans.minFuel.ai_explanation}</p>
              </div>
            </div>

            {/* Min Time Plan */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-secondary transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">⏱️ 최단 시간</h4>
                {plans.minTime.is_recommended && (
                  <span className="px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                    권장
                  </span>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">권장 RPM</span>
                  <span className="font-semibold">{plans.minTime.recommended_rpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 소요시간</span>
                  <span className="font-semibold">{plans.minTime.estimated_duration_hours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연료 소비량</span>
                  <span className="font-semibold">{plans.minTime.estimated_foc_tons.toFixed(1)} tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연료 비용</span>
                  <span className="font-semibold">${plans.minTime.estimated_fuel_cost_usd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETS 비용</span>
                  <span className="font-semibold">${plans.minTime.estimated_ets_cost_usd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">총 TCO</span>
                  <span className="font-bold text-secondary">${plans.minTime.estimated_tco_usd.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">{plans.minTime.ai_explanation}</p>
              </div>
            </div>

            {/* Min TCO Plan */}
            <div className="bg-white border-2 border-success rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-900">💰 TCO 최적</h4>
                {plans.minTCO.is_recommended && (
                  <span className="px-2 py-1 bg-success/10 text-success text-xs font-semibold rounded-full">
                    ⭐ 권장
                  </span>
                )}
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">권장 RPM</span>
                  <span className="font-semibold">{plans.minTCO.recommended_rpm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">예상 소요시간</span>
                  <span className="font-semibold">{plans.minTCO.estimated_duration_hours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연료 소비량</span>
                  <span className="font-semibold">{plans.minTCO.estimated_foc_tons.toFixed(1)} tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">연료 비용</span>
                  <span className="font-semibold">${plans.minTCO.estimated_fuel_cost_usd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETS 비용</span>
                  <span className="font-semibold">${plans.minTCO.estimated_ets_cost_usd.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-900 font-semibold">총 TCO</span>
                  <span className="font-bold text-success">${plans.minTCO.estimated_tco_usd.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-600">{plans.minTCO.ai_explanation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
