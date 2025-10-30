import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

async function getUser() {
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  if (!session) {
    redirect('/login')
  }

  try {
    const user = JSON.parse(Buffer.from(session.value, 'base64').toString())
    return user
  } catch {
    redirect('/login')
  }
}

export default async function DashboardPage() {
  const user = await getUser()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">ETS-Zero</h1>
              <p className="text-sm text-gray-600">실시간 AI 운항 최적화</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-success rounded-full"></span>
                Demo Version
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">{user.organization}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">운항 중 선박</h3>
              <span className="text-2xl">🚢</span>
            </div>
            <p className="text-3xl font-bold text-primary">3척</p>
            <p className="text-xs text-gray-500 mt-2">실시간 모니터링</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">금월 TCO</h3>
              <span className="text-2xl">💰</span>
            </div>
            <p className="text-3xl font-bold text-primary">$5.2M</p>
            <p className="text-xs text-gray-500 mt-2">총 운항비용</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">TCO 절감액</h3>
              <span className="text-2xl">📉</span>
            </div>
            <p className="text-3xl font-bold text-success">-$450K</p>
            <p className="text-xs text-success mt-2">목표 대비 -8.7%</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">긴급 알림</h3>
              <span className="text-2xl">🔔</span>
            </div>
            <p className="text-3xl font-bold text-warning">2건</p>
            <p className="text-xs text-warning mt-2">조치 필요</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl shadow-lg p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">
            환영합니다, {user.name} 부장님! 👋
          </h2>
          <p className="text-white/90 text-lg mb-6">
            ETS-Zero 데모 버전에 오신 것을 환영합니다.
            실시간 탄소배출권 가격을 반영한 AI 운항 최적화를 경험해보세요.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📋 운항 계획 수립</h3>
              <p className="text-sm text-white/80">
                3가지 최적화 옵션을 AI가 제안합니다
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">📍 실시간 모니터링</h3>
              <p className="text-sm text-white/80">
                선박 위치와 TCO를 실시간으로 추적합니다
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="font-semibold mb-2">🔮 What-if 시뮬레이션</h3>
              <p className="text-sm text-white/80">
                시장 변동 시나리오를 분석합니다
              </p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🚢</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">선박 관리</h3>
            <p className="text-sm text-gray-600 mb-4">
              등록된 선박 5척의 정보를 확인하세요
            </p>
            <p className="text-sm text-primary font-medium">바로가기 →</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">운항 현황</h3>
            <p className="text-sm text-gray-600 mb-4">
              현재 진행 중인 항해 3건을 모니터링하세요
            </p>
            <p className="text-sm text-primary font-medium">바로가기 →</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">📈</div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">리포트</h3>
            <p className="text-sm text-gray-600 mb-4">
              TCO 절감 실적과 분석 보고서를 확인하세요
            </p>
            <p className="text-sm text-primary font-medium">바로가기 →</p>
          </div>
        </div>
      </main>
    </div>
  )
}
