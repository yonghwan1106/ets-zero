'use client'

import { useState } from 'react'
import type { Voyage, Vessel, VoyagePlan } from '@/lib/types'

interface WhatIfSimulatorProps {
  voyage: Voyage
  vessel: Vessel | undefined
  selectedPlan: VoyagePlan | undefined
}

export function WhatIfSimulator({ voyage, vessel, selectedPlan }: WhatIfSimulatorProps) {
  const [etsChange, setEtsChange] = useState(0)
  const [fuelChange, setFuelChange] = useState(0)
  const [rpmChange, setRpmChange] = useState(0)
  const [simulationResult, setSimulationResult] = useState<any>(null)
  const [isSimulating, setIsSimulating] = useState(false)

  if (!selectedPlan) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <p className="text-yellow-800">선택된 운항 계획이 없습니다.</p>
      </div>
    )
  }

  const baseEtsPrice = 70
  const baseFuelPrice = 600
  const baseRPM = selectedPlan.recommended_rpm

  const newEtsPrice = baseEtsPrice * (1 + etsChange / 100)
  const newFuelPrice = baseFuelPrice * (1 + fuelChange / 100)
  const newRPM = baseRPM + rpmChange

  const handleSimulate = async () => {
    setIsSimulating(true)

    // Simulate AI calculation
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Calculate new TCO based on changes
    const baseFuelCost = selectedPlan.estimated_fuel_cost_usd
    const baseEtsCost = selectedPlan.estimated_ets_cost_usd
    const baseTCO = selectedPlan.estimated_tco_usd

    // RPM affects both fuel consumption and time
    const rpmFactor = newRPM / baseRPM
    const fuelFactor = Math.pow(rpmFactor, 2.7) // Fuel consumption increases exponentially with speed
    const timeFactor = 1 / rpmFactor // Time decreases linearly with speed

    const newFuelCost = baseFuelCost * (newFuelPrice / baseFuelPrice) * fuelFactor
    const newEtsCost = baseEtsCost * (newEtsPrice / baseEtsPrice) * fuelFactor
    const newTCO = newFuelCost + newEtsCost

    const tcoChange = newTCO - baseTCO
    const tcoChangePercent = ((newTCO - baseTCO) / baseTCO * 100).toFixed(1)

    const baseDuration = selectedPlan.estimated_duration_hours || 500
    const newDuration = baseDuration * timeFactor
    const durationChange = newDuration - baseDuration

    // Generate AI recommendation
    let recommendation = ''
    if (tcoChange < -10000) {
      recommendation = `현재 시뮬레이션 조건에서 TCO를 $${Math.abs(tcoChange).toLocaleString()} 절감할 수 있습니다. ${durationChange > 0 ? `다만 도착이 ${Math.abs(durationChange).toFixed(0)}시간 지연될 수 있습니다.` : ''} 비용 절감 효과가 크므로 이 전략을 고려해보시기 바랍니다.`
    } else if (tcoChange > 10000) {
      recommendation = `현재 시뮬레이션 조건에서 TCO가 $${Math.abs(tcoChange).toLocaleString()} 증가합니다. ${durationChange < 0 ? `도착 시간은 ${Math.abs(durationChange).toFixed(0)}시간 단축되지만,` : ''} 비용 증가폭이 크므로 이 전략은 권장하지 않습니다.`
    } else {
      recommendation = `현재 시뮬레이션 조건에서 TCO 변화가 크지 않습니다. 기존 계획을 유지하는 것이 적절합니다.`
    }

    setSimulationResult({
      baseScenario: {
        etsPrice: baseEtsPrice,
        fuelPrice: baseFuelPrice,
        rpm: baseRPM.toFixed(1),
        duration: baseDuration.toFixed(0),
        fuelCost: baseFuelCost,
        etsCost: baseEtsCost,
        tco: baseTCO,
      },
      newScenario: {
        etsPrice: newEtsPrice.toFixed(1),
        fuelPrice: newFuelPrice.toFixed(0),
        rpm: newRPM.toFixed(1),
        duration: newDuration.toFixed(0),
        fuelCost: Math.round(newFuelCost),
        etsCost: Math.round(newEtsCost),
        tco: Math.round(newTCO),
      },
      changes: {
        tco: Math.round(tcoChange),
        tcoPercent: tcoChangePercent,
        duration: durationChange.toFixed(1),
      },
      recommendation,
    })

    setIsSimulating(false)
  }

  const handleReset = () => {
    setEtsChange(0)
    setFuelChange(0)
    setRpmChange(0)
    setSimulationResult(null)
  }

  return (
    <div className="space-y-6">
      {/* Scenario Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-6">시나리오 변수 설정</h2>

        <div className="space-y-6">
          {/* ETS Price Change */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">ETS 가격 변동</label>
              <span className="text-sm font-mono text-primary">
                ${baseEtsPrice} → ${newEtsPrice.toFixed(1)} ({etsChange >= 0 ? '+' : ''}{etsChange}%)
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={etsChange}
              onChange={(e) => setEtsChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-20%</span>
              <span>0%</span>
              <span>+20%</span>
            </div>
          </div>

          {/* Fuel Price Change */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">유가 변동</label>
              <span className="text-sm font-mono text-primary">
                ${baseFuelPrice} → ${newFuelPrice.toFixed(0)} ({fuelChange >= 0 ? '+' : ''}{fuelChange}%)
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="20"
              step="5"
              value={fuelChange}
              onChange={(e) => setFuelChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-20%</span>
              <span>0%</span>
              <span>+20%</span>
            </div>
          </div>

          {/* RPM Change */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-gray-700">RPM 변경</label>
              <span className="text-sm font-mono text-primary">
                {baseRPM.toFixed(1)} → {newRPM.toFixed(1)} ({rpmChange >= 0 ? '+' : ''}{rpmChange.toFixed(1)} 노트)
              </span>
            </div>
            <input
              type="range"
              min="-2"
              max="2"
              step="0.5"
              value={rpmChange}
              onChange={(e) => setRpmChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>-2.0</span>
              <span>0.0</span>
              <span>+2.0</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={handleSimulate}
            disabled={isSimulating}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSimulating ? '⏳ 시뮬레이션 중...' : '🚀 시뮬레이션 실행'}
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            ↺ 초기화
          </button>
        </div>
      </div>

      {/* Simulation Results */}
      {simulationResult && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">시뮬레이션 결과</h2>

          {/* Comparison Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">항목</th>
                  <th className="px-4 py-3 text-right">기준 시나리오</th>
                  <th className="px-4 py-3 text-right">새 시나리오</th>
                  <th className="px-4 py-3 text-right font-bold">변화</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-semibold">ETS 가격</td>
                  <td className="px-4 py-3 text-right">${simulationResult.baseScenario.etsPrice}/톤</td>
                  <td className="px-4 py-3 text-right">${simulationResult.newScenario.etsPrice}/톤</td>
                  <td className="px-4 py-3 text-right text-gray-600">{etsChange >= 0 ? '+' : ''}{etsChange}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">유가</td>
                  <td className="px-4 py-3 text-right">${simulationResult.baseScenario.fuelPrice}/톤</td>
                  <td className="px-4 py-3 text-right">${simulationResult.newScenario.fuelPrice}/톤</td>
                  <td className="px-4 py-3 text-right text-gray-600">{fuelChange >= 0 ? '+' : ''}{fuelChange}%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">RPM</td>
                  <td className="px-4 py-3 text-right">{simulationResult.baseScenario.rpm} 노트</td>
                  <td className="px-4 py-3 text-right">{simulationResult.newScenario.rpm} 노트</td>
                  <td className="px-4 py-3 text-right text-gray-600">{rpmChange >= 0 ? '+' : ''}{rpmChange.toFixed(1)}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">항해 시간</td>
                  <td className="px-4 py-3 text-right">{simulationResult.baseScenario.duration}시간</td>
                  <td className="px-4 py-3 text-right">{simulationResult.newScenario.duration}시간</td>
                  <td className={`px-4 py-3 text-right font-bold ${Number(simulationResult.changes.duration) < 0 ? 'text-success' : 'text-warning'}`}>
                    {Number(simulationResult.changes.duration) >= 0 ? '+' : ''}{simulationResult.changes.duration}시간
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-semibold">연료비</td>
                  <td className="px-4 py-3 text-right">${simulationResult.baseScenario.fuelCost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">${simulationResult.newScenario.fuelCost.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-right font-bold ${simulationResult.newScenario.fuelCost < simulationResult.baseScenario.fuelCost ? 'text-success' : 'text-warning'}`}>
                    ${(simulationResult.newScenario.fuelCost - simulationResult.baseScenario.fuelCost).toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-4 py-3 font-semibold">탄소배출권</td>
                  <td className="px-4 py-3 text-right">${simulationResult.baseScenario.etsCost.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">${simulationResult.newScenario.etsCost.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-right font-bold ${simulationResult.newScenario.etsCost < simulationResult.baseScenario.etsCost ? 'text-success' : 'text-warning'}`}>
                    ${(simulationResult.newScenario.etsCost - simulationResult.baseScenario.etsCost).toLocaleString()}
                  </td>
                </tr>
                <tr className="bg-primary/5 font-bold">
                  <td className="px-4 py-3">총 운항비용 (TCO)</td>
                  <td className="px-4 py-3 text-right">${simulationResult.baseScenario.tco.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">${simulationResult.newScenario.tco.toLocaleString()}</td>
                  <td className={`px-4 py-3 text-right text-lg ${simulationResult.changes.tco < 0 ? 'text-success' : 'text-error'}`}>
                    ${simulationResult.changes.tco.toLocaleString()}
                    <span className="text-sm ml-2">({simulationResult.changes.tcoPercent}%)</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* AI Recommendation */}
          <div className={`rounded-lg p-6 ${simulationResult.changes.tco < 0 ? 'bg-success/10 border border-success/30' : 'bg-warning/10 border border-warning/30'}`}>
            <div className="flex gap-4">
              <span className="text-3xl">{simulationResult.changes.tco < 0 ? '✅' : '⚠️'}</span>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">AI 추천</h3>
                <p className="text-sm text-gray-700">{simulationResult.recommendation}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
