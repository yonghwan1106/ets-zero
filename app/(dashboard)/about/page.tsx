export default function AboutPage() {
  return (
    <div>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg p-12 text-white mb-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">ETS-Zero</h2>
            <p className="text-xl text-white/90 mb-6">
              실시간 탄소배출권(ETS) 가격을 연동하여 총 운항비용(TCO)을 최소화하는 AI 기반 해운 운항 최적화 플랫폼
            </p>
            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">🎯 AI 기반 최적화</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">💰 비용 절감</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-sm">🌍 탄소 중립</span>
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

        {/* Solution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">💡 우리의 솔루션</h3>
          <p className="text-gray-700 mb-6">
            ETS-Zero는 Claude AI를 활용하여 연료비와 탄소배출권 비용을 동시에 고려한 최적의 운항 계획을 자동으로 생성합니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg p-6">
              <div className="text-3xl mb-3">🤖</div>
              <h4 className="font-bold text-gray-900 mb-2">AI 기반 3가지 최적화 옵션</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>최저 연료 소비:</strong> 연료 소비량을 최소화하는 저속 운항</li>
                <li>• <strong>최단 시간:</strong> 도착 시간을 단축하는 고속 운항</li>
                <li>• <strong>TCO 최적화:</strong> 연료비 + ETS 비용을 최소화 (권장)</li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-success/5 to-primary/5 rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="font-bold text-gray-900 mb-2">실시간 데이터 기반 의사결정</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Google Sheets 연동으로 선박/항해 데이터 관리</li>
                <li>• 실시간 ETS 가격 및 연료 가격 반영</li>
                <li>• Naver Maps로 항로 시각화 및 모니터링</li>
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

        {/* Impact */}
        <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-xl border border-success/20 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">🎯 기대 효과</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">8-15%</div>
              <div className="text-sm font-semibold text-gray-900">TCO 절감</div>
              <div className="text-xs text-gray-600">연료비 + ETS 비용</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">30%</div>
              <div className="text-sm font-semibold text-gray-900">의사결정 시간 단축</div>
              <div className="text-xs text-gray-600">AI 자동 최적화</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">100%</div>
              <div className="text-sm font-semibold text-gray-900">ETS 규제 준수</div>
              <div className="text-xs text-gray-600">실시간 탄소 관리</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
