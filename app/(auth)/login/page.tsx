export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-secondary px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">ETS-Zero</h1>
          <p className="text-white/90 text-lg">
            실시간 탄소배출권 연동 AI 운항 최적화
          </p>
        </div>

        {/* Demo Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form action="/api/auth/demo-login" method="POST">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 px-6 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 text-lg flex items-center justify-center gap-2"
            >
              <span className="text-2xl">🚀</span>
              데모 계정으로 시작하기
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
                <span className="font-semibold">Demo Version</span>
              </span>
            </div>
            <p className="text-xs text-gray-500 text-center mt-2">
              목업 데이터를 사용한 데모 버전입니다
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-white/75 text-sm">
            데모 계정: demo@ets-zero.com
          </p>
        </div>
      </div>
    </div>
  )
}
