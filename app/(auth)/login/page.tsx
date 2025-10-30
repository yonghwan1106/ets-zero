export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-secondary px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left side - Branding & Features */}
        <div className="text-white space-y-8">
          {/* Logo & Title */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl">
                🚢
              </div>
              <h1 className="text-6xl font-bold">ETS-Zero</h1>
            </div>
            <p className="text-2xl text-white/90 font-medium mb-2">
              실시간 탄소배출권 연동 AI 운항 최적화
            </p>
            <p className="text-lg text-white/75">
              EU ETS 비용을 최소화하는 스마트 해운 솔루션
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white/90 mb-4">✨ 주요 기능</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">실시간 TCO 모니터링</h4>
                  <p className="text-sm text-white/75">연료비, ETS 비용, 운항 비용을 실시간 추적</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
                <span className="text-2xl">🤖</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">AI 기반 운항 최적화</h4>
                  <p className="text-sm text-white/75">RPM, 속도, 항로를 자동 최적화하여 비용 절감</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
                <span className="text-2xl">🎯</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">What-if 시뮬레이션</h4>
                  <p className="text-sm text-white/75">다양한 시나리오를 분석하고 최적의 전략 수립</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/15 transition-colors">
                <span className="text-2xl">⚡</span>
                <div>
                  <h4 className="font-semibold text-white mb-1">실시간 ETS 가격 연동</h4>
                  <p className="text-sm text-white/75">EU ETS 시장 가격을 실시간으로 반영한 의사결정</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">15-25%</div>
              <div className="text-sm text-white/75">비용 절감</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">실시간</div>
              <div className="text-sm text-white/75">TCO 추적</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white mb-1">AI 기반</div>
              <div className="text-sm text-white/75">자동 최적화</div>
            </div>
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">데모 체험하기</h2>
              <p className="text-gray-600">
                클릭 한 번으로 ETS-Zero의 모든 기능을 경험해보세요
              </p>
            </div>

            <form action="/api/auth/demo-login" method="POST">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-5 px-6 rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-lg flex items-center justify-center gap-3 mb-6"
              >
                <span className="text-3xl">🚀</span>
                <span>데모 계정으로 시작하기</span>
                <span className="text-xl">→</span>
              </button>
            </form>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Demo Version
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">✅</span>
                  <span>회원가입 없이 즉시 이용</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">✅</span>
                  <span>모든 기능 체험 가능</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-lg">✅</span>
                  <span>실제 데이터 기반 시뮬레이션</span>
                </div>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  데모 계정: demo@ets-zero.com
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              💡 실제 EU ETS 시장 데이터를 활용한 데모 환경입니다
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
