'use client'

import { useState } from 'react'

interface ReoptimizationAlertProps {
  voyageId: string
}

export function ReoptimizationAlert({ voyageId }: ReoptimizationAlertProps) {
  const [showAlert, setShowAlert] = useState(false)
  const [isSimulating, setIsSimulating] = useState(false)
  const [reoptResult, setReoptResult] = useState<any>(null)

  const handleSimulateEtsSpike = async () => {
    setIsSimulating(true)

    // Simulate ETS price spike
    await new Promise(resolve => setTimeout(resolve, 2000))

    setReoptResult({
      oldEtsPrice: 70,
      newEtsPrice: 80.5,
      oldRPM: 14.5,
      newRPM: 14.0,
      savings: 30000,
      delayHours: 7,
    })

    setShowAlert(true)
    setIsSimulating(false)
  }

  const handleAccept = () => {
    alert('재최적화 권고를 수락했습니다. 선장에게 RPM 조정 지시가 전달됩니다.')
    setShowAlert(false)
  }

  const handleDismiss = () => {
    setShowAlert(false)
  }

  return (
    <div className="mb-6">
      {/* Simulate Button */}
      {!showAlert && (
        <button
          onClick={handleSimulateEtsSpike}
          disabled={isSimulating}
          className="mb-4 px-4 py-2 bg-warning text-white rounded-lg hover:bg-warning/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSimulating ? '⏳ 시뮬레이션 중...' : '🔴 ETS 가격 급등 시뮬레이션'}
        </button>
      )}

      {/* Alert Banner */}
      {showAlert && reoptResult && (
        <div className="bg-red-50 border-2 border-red-500 rounded-xl p-6 shadow-lg animate-pulse-slow">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl">
              ⚠️
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                🔴 긴급: ETS 가격 급등 감지!
              </h3>
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">ETS 가격 변동</p>
                    <p className="font-bold text-red-600">
                      ${reoptResult.oldEtsPrice} → ${reoptResult.newEtsPrice} (+{((reoptResult.newEtsPrice - reoptResult.oldEtsPrice) / reoptResult.oldEtsPrice * 100).toFixed(0)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">추천 RPM 조정</p>
                    <p className="font-bold text-primary">
                      {reoptResult.oldRPM} → {reoptResult.newRPM} 노트
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">AI 재최적화 권고</p>
                <p className="text-sm text-gray-700">
                  현 RPM({reoptResult.oldRPM}노트) 유지 시 예상 TCO가 <strong className="text-red-600">${reoptResult.savings.toLocaleString()} 추가 발생</strong>합니다.
                  <br/>
                  즉시 RPM을 <strong className="text-primary">{reoptResult.newRPM}노트</strong>로 하향 조정 시,
                  도착이 <strong>{reoptResult.delayHours}시간 지연</strong>되지만 총비용을 <strong className="text-success">${reoptResult.savings.toLocaleString()} 절감</strong>할 수 있습니다.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-success text-white rounded-lg hover:bg-success/90 transition-colors font-semibold"
                >
                  ✓ 수락 (RPM 조정)
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  × 무시
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
