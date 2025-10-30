export default function AboutPage() {
  return (
    <div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg p-12 text-white mb-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold mb-4">ETS-Zero</h2>
            <p className="text-xl text-white/90 mb-2">
              실시간 탄소배출권(ETS) 가격을 연동하여 총 운항비용(TCO)을 최소화하는 AI 기반 해운 운항 최적화 플랫폼
            </p>
            <p className="text-lg text-white/80 mb-6 italic">
              "기존 '연료 효율' 중심을 넘어, '총비용 효율'로의 패러다임 전환"
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">🎯 AI 기반 최적화</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">💰 TCO 5-8% 절감</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">🌍 탄소 중립</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">⚡ 실시간 동적 최적화</span>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 해결하고자 하는 문제</h3>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              해운 업계는 2024년부터 EU ETS(탄소배출권 거래제) 의무화로 인해 새로운 비용 구조에 직면했습니다.
              기존의 연료비 최적화만으로는 더 이상 총 운항비용(TCO)을 최소화할 수 없게 되었습니다.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl mb-2">⚠️</div>
                <h4 className="font-semibold text-red-900 mb-2">ETS 비용 급증</h4>
                <p className="text-sm text-red-700">
                  탄소배출권 가격이 $85/톤까지 상승하며 운항비의 15-30% 차지
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-semibold text-yellow-900 mb-2">복잡한 최적화</h4>
                <p className="text-sm text-yellow-700">
                  연료비와 ETS 비용의 트레이드오프 관계를 고려한 의사결정 필요
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl mb-2">⏰</div>
                <h4 className="font-semibold text-blue-900 mb-2">실시간 대응</h4>
                <p className="text-sm text-blue-700">
                  변동하는 ETS 가격에 맞춰 실시간으로 운항 계획 조정 필요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Innovation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 핵심 혁신: 3가지 차별점</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">1. 최적화 목표(KPI)의 재정의</h4>
              <p className="text-gray-700 mb-3">
                기존 솔루션의 목표는 <code className="bg-gray-100 px-2 py-1 rounded">Min(Cost) = Fuel_Price × FOC</code>였습니다.
              </p>
              <p className="text-gray-700 mb-2">
                ETS-Zero는 이를 근본적으로 재정의합니다:
              </p>
              <div className="bg-primary/5 p-4 rounded-lg">
                <code className="text-primary font-mono">
                  Min(TCO) = (Fuel_Price × FOC) + (ETS_Price × CO2_Factor × FOC)
                </code>
              </div>
            </div>

            <div className="border-l-4 border-secondary pl-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">2. 정적 계획에서 동적 대응으로</h4>
              <p className="text-gray-700 mb-2">
                선박이 20일간 항해하는 동안 ETS 가격은 수십 번 변동합니다. ETS-Zero는:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>출항 전:</strong> 3가지 최적화 옵션 제시 (최저 연료 / 최단 시간 / TCO 최적)</li>
                <li>• <strong>운항 중:</strong> 시장 변수 실시간 감지 및 동적 재최적화 제안</li>
                <li>• <strong>도착 시:</strong> 실제 비용 분석 및 다음 항해를 위한 학습</li>
              </ul>
            </div>

            <div className="border-l-4 border-success pl-4">
              <h4 className="font-bold text-lg text-gray-900 mb-2">3. Physics-informed AI 기반 선박 성능 모델</h4>
              <p className="text-gray-700">
                단순 데이터 학습을 넘어, 선박의 유체역학 등 물리법칙과 실제 운항 데이터를 결합한
                그레이박스(Gray-box) 모델로 선박 노후화, 날씨 민감도 등을 반영한 고정밀 예측을 제공합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Real Scenario */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">📖 실제 사용 시나리오</h3>

          <div className="bg-white rounded-lg p-6 mb-6">
            <h4 className="font-bold text-lg text-gray-900 mb-3">시나리오 1: 운항 계획 수립 (출항 전)</h4>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 mb-2">
                <strong>상황:</strong> 박철수 부장(HMM 운항관리팀)이 '부산 → 로테르담' 항로의 운항 계획을 수립합니다.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">옵션</th>
                    <th className="px-4 py-2 text-right">항해 일수</th>
                    <th className="px-4 py-2 text-right">연료비</th>
                    <th className="px-4 py-2 text-right">탄소세</th>
                    <th className="px-4 py-2 text-right font-bold">총 운항비용</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-4 py-3">A: 최저 연료</td>
                    <td className="px-4 py-3 text-right">24일</td>
                    <td className="px-4 py-3 text-right">$1,500,000</td>
                    <td className="px-4 py-3 text-right">$551,250</td>
                    <td className="px-4 py-3 text-right font-bold">$2,051,250</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3">B: 최단 시간</td>
                    <td className="px-4 py-3 text-right">21일</td>
                    <td className="px-4 py-3 text-right">$1,860,000</td>
                    <td className="px-4 py-3 text-right">$683,550</td>
                    <td className="px-4 py-3 text-right font-bold">$2,543,550</td>
                  </tr>
                  <tr className="bg-success/5">
                    <td className="px-4 py-3 font-bold text-success">C: ETS-Zero 최적</td>
                    <td className="px-4 py-3 text-right">23일</td>
                    <td className="px-4 py-3 text-right">$1,590,000</td>
                    <td className="px-4 py-3 text-right">$584,325</td>
                    <td className="px-4 py-3 text-right font-bold text-success">$2,174,325</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 bg-success/10 border border-success/30 rounded-lg p-4">
              <p className="text-sm text-gray-900">
                <strong>결과:</strong> 박 부장이 'C 옵션' 선택 시, B안 대비 <strong className="text-success">$369,225 절감</strong> 효과
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6">
            <h4 className="font-bold text-lg text-gray-900 mb-3">시나리오 2: 동적 리스크 대응 (운항 중)</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center text-warning font-bold">!</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">긴급 상황 발생</p>
                  <p className="text-sm text-gray-700">인도양 통과 중 EU 정책 발표로 ETS 가격 15% 급등 ($70 → $80.5)</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">AI</div>
                <div className="flex-1">
                  <div className="bg-primary/5 border border-primary/30 rounded-lg p-3">
                    <p className="text-sm font-semibold text-primary mb-1">ETS-Zero 실시간 알림</p>
                    <p className="text-xs text-gray-700">
                      "ETS 가격 15% 급등! 현 RPM 유지 시 예상 TCO $45,000 추가 발생.
                      즉시 RPM 하향 조정(15.5노트) 시, 도착 7시간 지연되나 총비용 <strong className="text-success">$30,000 절감</strong> 가능."
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-success/20 rounded-full flex items-center justify-center text-success font-bold">✓</div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">의사결정 및 결과</p>
                  <p className="text-sm text-gray-700">박 부장이 AI 권고 수락, 실시간 시장 변동에 대응하여 손실 최소화</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Architecture */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🏗️ 솔루션 아키텍처</h3>
          <p className="text-gray-700 mb-6">
            ETS-Zero는 3-Layer 아키텍처 및 다중 에이전트 AI 시스템을 기반으로 합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-gray-900 mb-3">Layer 1: 데이터 수집</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>시장 데이터:</strong> 실시간 유가, EU ETS 가격 API</li>
                <li>• <strong>환경 데이터:</strong> 기상 예보 (풍향, 파고, 해류)</li>
                <li>• <strong>선박 데이터:</strong> AIS 위치, IoT 센서 (RPM, FOC)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="font-bold text-gray-900 mb-3">Layer 2: AI 엔진</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Agent 1:</strong> 선박 성능 모델 (Digital Twin)</li>
                <li>• <strong>Agent 2:</strong> 시장 분석 에이전트</li>
                <li>• <strong>Agent 3:</strong> 최적화 에이전트 (RL/GA)</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="text-3xl mb-3">💻</div>
              <h4 className="font-bold text-gray-900 mb-3">Layer 3: 사용자 대시보드</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>추천 RPM:</strong> TCO 최소화 운항 속도</li>
                <li>• <strong>비용 시각화:</strong> 실시간 TCO 모니터링</li>
                <li>• <strong>What-if:</strong> 시나리오 시뮬레이션</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">✨ 주요 기능</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                  🚢
                </div>
                <h4 className="font-semibold text-gray-900">선박 관리</h4>
              </div>
              <p className="text-sm text-gray-600">
                선박 정보, 사양, 연료 타입, CO2 배출 계수 등을 체계적으로 관리
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-2xl">
                  📋
                </div>
                <h4 className="font-semibold text-gray-900">항해 관리</h4>
              </div>
              <p className="text-sm text-gray-600">
                항해 계획, 진행 상황, 완료 이력을 한눈에 확인하고 관리
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center text-2xl">
                  🤖
                </div>
                <h4 className="font-semibold text-gray-900">AI 운항 계획</h4>
              </div>
              <p className="text-sm text-gray-600">
                Claude AI가 3가지 최적화 계획을 생성하고 상세한 비용 분석 제공
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center text-2xl">
                  📊
                </div>
                <h4 className="font-semibold text-gray-900">대시보드</h4>
              </div>
              <p className="text-sm text-gray-600">
                KPI 카드와 차트로 운항 현황과 성과를 실시간 모니터링
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-2xl">
                  🗺️
                </div>
                <h4 className="font-semibold text-gray-900">항로 시각화</h4>
              </div>
              <p className="text-sm text-gray-600">
                Naver Maps로 선박 위치와 예상 항로를 지도에 표시
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center text-2xl">
                  💰
                </div>
                <h4 className="font-semibold text-gray-900">비용 절감</h4>
              </div>
              <p className="text-sm text-gray-600">
                AI 최적화를 통해 평균 8-15%의 TCO 절감 효과 달성
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ 기술 스택</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">⚛️</div>
              <div className="font-semibold text-gray-900">Next.js 15</div>
              <div className="text-xs text-gray-600">App Router</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-semibold text-gray-900">Tailwind CSS</div>
              <div className="text-xs text-gray-600">v4.0</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🤖</div>
              <div className="font-semibold text-gray-900">Claude AI</div>
              <div className="text-xs text-gray-600">Sonnet 4.0</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">📊</div>
              <div className="font-semibold text-gray-900">Google Sheets</div>
              <div className="text-xs text-gray-600">API v4</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🗺️</div>
              <div className="font-semibold text-gray-900">Naver Maps</div>
              <div className="text-xs text-gray-600">API v3</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">📈</div>
              <div className="font-semibold text-gray-900">Recharts</div>
              <div className="text-xs text-gray-600">Data Viz</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">🚀</div>
              <div className="font-semibold text-gray-900">Vercel</div>
              <div className="text-xs text-gray-600">Deployment</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-3xl mb-2">📝</div>
              <div className="font-semibold text-gray-900">TypeScript</div>
              <div className="text-xs text-gray-600">5.7+</div>
            </div>
          </div>
        </div>

        {/* Competitive Comparison */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🆚 기존 솔루션과의 차별성</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-bold">비교 기준</th>
                  <th className="px-4 py-3 text-left">기존 솔루션</th>
                  <th className="px-4 py-3 text-left bg-primary/5">ETS-Zero (본 제안)</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-semibold">핵심 가치</td>
                  <td className="px-4 py-3 text-gray-600">연료 효율 (Fuel Efficiency)</td>
                  <td className="px-4 py-3 bg-primary/5 font-semibold text-primary">총비용 효율 (Total Cost Efficiency)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">최적화 목표</td>
                  <td className="px-4 py-3 text-gray-600">연료 소모량(FOC) 최소화</td>
                  <td className="px-4 py-3 bg-primary/5 font-semibold text-primary">총 운항비용 (Fuel + Carbon) 최소화</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">주요 변수</td>
                  <td className="px-4 py-3 text-gray-600">유가, 날씨, 해류</td>
                  <td className="px-4 py-3 bg-primary/5 font-semibold text-primary">유가, 날씨, 해류 + 실시간 ETS 가격</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">운영 방식</td>
                  <td className="px-4 py-3 text-gray-600">출항 전 정적 계획 (Static)</td>
                  <td className="px-4 py-3 bg-primary/5 font-semibold text-primary">출항 전 + 운항 중 동적 재최적화 (Dynamic)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">규제 대응</td>
                  <td className="px-4 py-3 text-gray-600">CII 등급 모니터링 (사후적)</td>
                  <td className="px-4 py-3 bg-primary/5 font-semibold text-primary">ETS 비용 최소화 (선제적) + CII 관리</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold">핵심 메시지</td>
                  <td className="px-4 py-3 text-gray-600">"연료비를 아껴 드립니다"</td>
                  <td className="px-4 py-3 bg-primary/5 font-semibold text-primary">"변동하는 모든 비용으로부터 수익성을 지켜 드립니다"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Impact */}
        <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-xl border border-success/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 기대 효과</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">5-8%</div>
              <div className="text-sm font-semibold text-gray-900">TCO 추가 절감</div>
              <div className="text-xs text-gray-600">기존 솔루션 대비</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30%</div>
              <div className="text-sm font-semibold text-gray-900">의사결정 시간 단축</div>
              <div className="text-xs text-gray-600">AI 자동 최적화</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">Zero</div>
              <div className="text-sm font-semibold text-gray-900">규제 리스크</div>
              <div className="text-xs text-gray-600">벌금 및 운항 제한</div>
            </div>
          </div>

          <div className="bg-white/50 rounded-lg p-6">
            <h4 className="font-bold text-gray-900 mb-3">정량적 효과 예시</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>비용 절감:</strong> 총 운항비용(연료비+탄소세) 5~8% 추가 절감</li>
              <li>• <strong>리스크 최소화:</strong> ETS 가격 변동성에 따른 재무 리스크 최소화</li>
              <li>• <strong>규제 대응:</strong> 벌금(톤당 €100) 및 운항 제한 리스크 'Zero'화</li>
            </ul>

            <h4 className="font-bold text-gray-900 mb-3 mt-4">정성적 효과</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>패러다임 전환:</strong> '친환경=비용'에서 '친환경=경제적 최적화'로</li>
              <li>• <strong>경쟁력 강화:</strong> 데이터 기반 투명한 의사결정으로 K-해운 ESG 경쟁력 향상</li>
              <li>• <strong>지속가능성:</strong> 탄소 배출 감축과 수익성 개선의 동시 달성</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  )
}
