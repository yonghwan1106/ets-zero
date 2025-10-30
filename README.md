# ETS-Zero - AI 운항 최적화 플랫폼

실시간 탄소배출권(ETS) 가격을 연동하여 총 운항비용(TCO)을 최소화하는 AI 기반 해운 운항 최적화 플랫폼

## 🚀 프로젝트 개요

ETS-Zero는 해운업계의 새로운 핵심 비용인 '탄소배출권' 비용을 실시간으로 반영하여, 연료비와 탄소배출권 비용을 동시에 최적화하는 차세대 AI 운항 솔루션입니다.

### 주요 기능

- ✅ **데모 계정 원클릭 로그인** - 클릭 한 번으로 즉시 체험
- 🎯 **AI 운항 계획 수립** - 3가지 최적화 옵션 제시 (최저 연료, 최단 시간, TCO 최적)
- 📍 **실시간 운항 모니터링** - Naver Maps 기반 선박 위치 추적
- 🔮 **What-if 시뮬레이션** - 시장 변동 시나리오 분석
- 📊 **대시보드** - KPI 카드, 차트, 알림 시스템

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router, Server Components)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 4.0
- **Database**: Google Sheets API v4 (데모용)
- **AI**: Claude Sonnet 4.0 API (Anthropic)
- **Maps**: Naver Maps JavaScript API v3
- **Deployment**: Vercel (GitHub 자동 배포)

## 📦 설치 및 실행

### 1. 프로젝트 클론

\`\`\`bash
git clone https://github.com/your-org/ets-zero.git
cd ets-zero
\`\`\`

### 2. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 3. 환경 변수 설정

\`.env.local\` 파일을 생성하고 다음 내용을 추가하세요:

\`\`\`env
# Next.js
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Google Sheets API (선택)
# GOOGLE_SERVICE_ACCOUNT_JSON=...
# GOOGLE_SHEETS_SPREADSHEET_ID=...

# Claude AI API (선택)
# ANTHROPIC_API_KEY=sk-ant-...

# Naver Maps API (선택)
# NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=...
\`\`\`

### 4. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 애플리케이션을 확인하세요.

## 🎮 데모 계정

**이메일**: \`demo@ets-zero.com\`
**비밀번호**: \`demo1234\`

또는 로그인 페이지에서 **"🚀 데모 계정으로 시작하기"** 버튼을 클릭하세요.

## 📁 프로젝트 구조

\`\`\`
ets-zero/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # 인증 라우트 그룹
│   │   └── login/                # 로그인 페이지
│   ├── (dashboard)/              # 대시보드 라우트 그룹
│   │   └── dashboard/            # 메인 대시보드
│   ├── api/                      # API Routes
│   │   └── auth/                 # 인증 API
│   ├── globals.css               # 전역 스타일
│   ├── layout.tsx                # Root Layout
│   └── page.tsx                  # 홈 (리다이렉트)
├── components/                   # React 컴포넌트
├── lib/                          # 유틸리티 & 서비스
├── public/                       # 정적 파일
├── docs/                         # 문서
│   ├── proposal.md               # 아이디어 기획서
│   └── prd.md                    # 제품요구정의서
├── next.config.ts                # Next.js 설정
├── tailwind.config.ts            # Tailwind CSS 설정
└── tsconfig.json                 # TypeScript 설정
\`\`\`

## 🚀 배포

### Vercel 배포 (권장)

1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 프로젝트 import
3. 환경 변수 설정
4. 자동 배포 완료!

\`\`\`bash
# 또는 Vercel CLI 사용
npm install -g vercel
vercel
\`\`\`

## 📝 개발 로드맵

- [x] Week 1: 프로젝트 설정 & 기본 구조
  - [x] Next.js 15 프로젝트 생성
  - [x] Tailwind CSS 설정
  - [x] 로그인 페이지
  - [x] 대시보드 페이지
- [ ] Week 2: 대시보드 & 선박/항해 관리
- [ ] Week 3: 운항 계획 수립 & AI 최적화
- [ ] Week 4: 실시간 모니터링 & 시뮬레이션

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면 Pull Request를 보내주세요!

## 📄 라이센스

ISC

## 📧 문의

- **GitHub Issues**: [https://github.com/your-org/ets-zero/issues](https://github.com/your-org/ets-zero/issues)
- **Email**: dev@ets-zero.com

---

**Made with ❤️ for Korean Maritime Industry**
