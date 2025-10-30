import { GoogleSheetsService } from '@/lib/services/google-sheets'
import type { Voyage, Vessel, VoyagePlan } from '@/lib/types'
import { GoogleMapMonitor } from '@/components/voyage/google-map-monitor'
import { VoyageMetrics } from '@/components/voyage/voyage-metrics'
import { ReoptimizationAlert } from '@/components/voyage/reoptimization-alert'
import Link from 'next/link'

interface MonitorPageProps {
  params: Promise<{ id: string }>
}

async function getVoyageMonitorData(voyageId: string) {
  const voyages = await GoogleSheetsService.getRows<Voyage>('Voyages')
  const voyage = voyages.find(v => v.voyage_id === voyageId)

  if (!voyage) {
    return null
  }

  const vessels = await GoogleSheetsService.getRows<Vessel>('Vessels')
  const vessel = vessels.find(v => v.vessel_id === voyage.vessel_id)

  const plans = await GoogleSheetsService.getRows<VoyagePlan>('VoyagePlans')
  const selectedPlan = plans.find(p => p.plan_id === voyage.selected_plan_id)

  // Get tracking data for this voyage
  const allTracking = await GoogleSheetsService.getRows('VoyageTracking')
  const tracking = allTracking.filter((t: any) => t.voyage_id === voyageId)

  // Get alerts for this voyage
  const allAlerts = await GoogleSheetsService.getRows('Alerts')
  const alerts = allAlerts.filter((a: any) => a.voyage_id === voyageId && !a.acknowledged_at)

  return { voyage, vessel, selectedPlan, tracking, alerts }
}

export default async function VoyageMonitorPage({ params }: MonitorPageProps) {
  const { id } = await params
  const data = await getVoyageMonitorData(id)

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

  const { voyage, vessel, selectedPlan, tracking, alerts } = data

  // Calculate current status (simulated)
  const departureTime = new Date(voyage.departure_time_planned).getTime()
  const arrivalTime = new Date(voyage.arrival_time_planned).getTime()
  const now = Date.now()
  const totalDuration = arrivalTime - departureTime
  const elapsed = now - departureTime
  const progress = Math.min(Math.max(elapsed / totalDuration, 0), 1)

  // Simulate current position (interpolate between departure and arrival)
  const departureCoords = getPortCoordinates(voyage.departure_port_code)
  const arrivalCoords = getPortCoordinates(voyage.arrival_port_code)

  const currentLat = departureCoords.lat + (arrivalCoords.lat - departureCoords.lat) * progress
  const currentLng = departureCoords.lng + (arrivalCoords.lng - departureCoords.lng) * progress

  // Simulate current speed and RPM
  const currentSpeed = selectedPlan ? selectedPlan.recommended_rpm * 0.9 : 14.5
  const currentRPM = selectedPlan?.recommended_rpm || 14.5

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/voyages" className="text-primary hover:text-primary/80 text-sm mb-2 inline-block">
          ← 항해 목록으로
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">실시간 운항 모니터링</h1>
            <p className="text-gray-600 mt-1">
              {voyage.voyage_number} - {vessel?.vessel_name}
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/voyages/${id}/simulate`}
              className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
            >
              What-if 시뮬레이션
            </Link>
          </div>
        </div>
      </div>

      {/* Re-optimization Alert (conditional) */}
      {voyage.status === 'in_progress' && (
        <ReoptimizationAlert voyageId={id} />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Map & Metrics (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Naver Maps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <GoogleMapMonitor
              departurePort={{
                name: voyage.departure_port,
                code: voyage.departure_port_code,
                coordinates: departureCoords,
              }}
              arrivalPort={{
                name: voyage.arrival_port,
                code: voyage.arrival_port_code,
                coordinates: arrivalCoords,
              }}
              currentPosition={{ lat: currentLat, lng: currentLng }}
              vesselName={vessel?.vessel_name || 'Unknown'}
            />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">현재 속도</p>
              <p className="text-2xl font-bold text-gray-900">{currentSpeed.toFixed(1)}</p>
              <p className="text-xs text-gray-500">노트</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">현재 RPM</p>
              <p className="text-2xl font-bold text-gray-900">{currentRPM.toFixed(1)}</p>
              <p className="text-xs text-gray-500">권장: {selectedPlan?.recommended_rpm.toFixed(1)}</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">진행률</p>
              <p className="text-2xl font-bold text-gray-900">{(progress * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500">{Math.round(progress * (voyage.distance_nm || 0))} / {voyage.distance_nm} NM</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-xs text-gray-500 mb-1">ETA</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(voyage.arrival_time_planned).toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(voyage.arrival_time_planned).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Charts & Details (1/3 width) */}
        <div className="space-y-6">
          <VoyageMetrics
            voyage={voyage}
            selectedPlan={selectedPlan}
            progress={progress}
            tracking={tracking}
          />

          {/* Active Alerts */}
          {alerts && alerts.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">활성 알림</h3>
              <div className="space-y-3">
                {alerts.map((alert: any) => (
                  <div
                    key={alert.alert_id}
                    className={`p-4 rounded-lg border-l-4 ${
                      alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                      alert.severity === 'warning' ? 'bg-yellow-50 border-yellow-500' :
                      'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {alert.alert_type === 'ets_spike' ? '📈' :
                         alert.alert_type === 'cost_overrun' ? '💰' :
                         alert.alert_type === 'eta_delay' ? '⏰' :
                         '⚠️'}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-gray-900 mb-1">
                          {alert.alert_type === 'ets_spike' ? 'ETS 가격 급등' :
                           alert.alert_type === 'cost_overrun' ? '비용 초과' :
                           alert.alert_type === 'eta_delay' ? 'ETA 지연' :
                           alert.alert_type === 'weather_warning' ? '기상 경보' :
                           '알림'}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">{alert.message}</p>
                        {alert.action_required && alert.recommended_action && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs font-medium text-gray-700">💡 권장 조치:</p>
                            <p className="text-xs text-gray-600 mt-1">{alert.recommended_action}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to get port coordinates
function getPortCoordinates(portCode: string): { lat: number; lng: number } {
  const ports: Record<string, { lat: number; lng: number }> = {
    'KRPUS': { lat: 35.1028, lng: 129.0403 }, // 부산
    'NLRTM': { lat: 51.9225, lng: 4.4792 },   // 로테르담
    'USLA': { lat: 33.7367, lng: -118.2700 }, // LA
    'SGSIN': { lat: 1.2644, lng: 103.8220 },  // 싱가포르
    'CNSHA': { lat: 31.2304, lng: 121.4737 }, // 상하이
    'JPYOK': { lat: 35.4437, lng: 139.6380 }, // 요코하마
  }

  return ports[portCode] || { lat: 35.1028, lng: 129.0403 }
}
