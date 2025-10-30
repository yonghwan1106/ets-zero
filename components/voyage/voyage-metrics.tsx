'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { Voyage, VoyagePlan } from '@/lib/types'

interface VoyageMetricsProps {
  voyage: Voyage
  selectedPlan: VoyagePlan | undefined
  progress: number
  tracking?: any[]
}

export function VoyageMetrics({ voyage, selectedPlan, progress, tracking }: VoyageMetricsProps) {
  // Use real tracking data if available, otherwise generate simulated data
  const trackingData = tracking && tracking.length > 0
    ? formatTrackingData(tracking, selectedPlan)
    : generateTrackingData(selectedPlan, progress)

  const budgetStatus = progress < 0.8 ? 'on_track' : 'warning'

  return (
    <div className="space-y-6">
      {/* TCO Status Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">TCO 현황</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-sm text-gray-600">계획 대비</span>
              <span className={`text-sm font-semibold ${
                budgetStatus === 'on_track' ? 'text-success' : 'text-warning'
              }`}>
                {budgetStatus === 'on_track' ? '✅ 예산 내' : '⚠️ 주의'}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  budgetStatus === 'on_track' ? 'bg-success' : 'bg-warning'
                }`}
                style={{ width: `${Math.min(progress * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">계획 TCO</p>
              <p className="text-lg font-bold text-gray-900">
                ${selectedPlan?.estimated_tco_usd.toLocaleString() || 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500">누적 TCO</p>
              <p className="text-lg font-bold text-primary">
                ${selectedPlan ? Math.round(selectedPlan.estimated_tco_usd * progress).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t">
            <p className="text-xs text-gray-500 mb-2">비용 분해</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">연료비</span>
                <span className="font-semibold">
                  ${selectedPlan ? Math.round(selectedPlan.estimated_fuel_cost_usd * progress).toLocaleString() : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">탄소배출권</span>
                <span className="font-semibold">
                  ${selectedPlan ? Math.round(selectedPlan.estimated_ets_cost_usd * progress).toLocaleString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TCO Trend Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">TCO 추이</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trackingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: '시간 (hr)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: 'TCO (USD)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="planned"
              stroke="#00bcd4"
              strokeWidth={2}
              dot={false}
              name="계획"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="#4caf50"
              strokeWidth={2}
              dot={false}
              name="실제"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Speed Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">속도 추이</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={trackingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="hour"
              label={{ value: '시간 (hr)', position: 'insideBottom', offset: -5 }}
            />
            <YAxis
              label={{ value: '속도 (knots)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#1a3a52"
              strokeWidth={2}
              dot={false}
              name="속도"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-900 mb-4">최근 알림</h3>
        <div className="space-y-3">
          {voyage.status === 'in_progress' ? (
            <>
              <div className="flex gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-xl">ℹ️</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-900">운항 순조</p>
                  <p className="text-xs text-blue-700">계획대로 운항 중입니다.</p>
                  <p className="text-xs text-blue-600 mt-1">방금 전</p>
                </div>
              </div>
              <div className="flex gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <span className="text-xl">📊</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">TCO 업데이트</p>
                  <p className="text-xs text-gray-700">누적 TCO가 계획 범위 내에 있습니다.</p>
                  <p className="text-xs text-gray-600 mt-1">2시간 전</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              현재 활성 알림이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

function generateTrackingData(plan: VoyagePlan | undefined, progress: number) {
  if (!plan) return []

  const hours = Math.round((plan.estimated_duration_hours || 500) * progress)
  const data = []

  for (let i = 0; i <= hours; i += Math.max(1, Math.round(hours / 20))) {
    const t = i / (plan.estimated_duration_hours || 500)
    const baseActual = plan.estimated_tco_usd * t
    const noise = (Math.random() - 0.5) * plan.estimated_tco_usd * 0.02

    data.push({
      hour: i,
      planned: Math.round(plan.estimated_tco_usd * t),
      actual: Math.round(baseActual + noise),
      speed: plan.recommended_rpm * (0.9 + Math.random() * 0.2),
    })
  }

  return data
}

function formatTrackingData(tracking: any[], plan: VoyagePlan | undefined) {
  if (!tracking || tracking.length === 0 || !plan) return []

  // Sort tracking data by timestamp
  const sortedTracking = [...tracking].sort((a, b) =>
    new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  )

  // Convert tracking data to chart format
  return sortedTracking.map((record, index) => {
    const hour = index * 6 // Assuming 6-hour intervals
    const plannedTCO = plan.estimated_tco_usd * (hour / (plan.estimated_duration_hours || 500))

    return {
      hour,
      planned: Math.round(plannedTCO),
      actual: Math.round(record.tco_cumulative_usd || 0),
      speed: record.speed_knots || 0,
    }
  })
}
