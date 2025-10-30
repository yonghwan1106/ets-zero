# ETS-Zero 제품요구정의서 (Product Requirements Document)

**문서 버전**: 2.0
**작성일**: 2025-10-30
**제품명**: ETS-Zero - 실시간 탄소배출권 연동 AI 운항 최적화 플랫폼
**대상**: 해운사 운항 관리팀
**기술 스택**: Next.js 15, Vercel, Google Sheets, Claude API, Naver Maps API

---

## 목차
1. [제품 개요](#1-제품-개요)
2. [기술 스택 및 아키텍처](#2-기술-스택-및-아키텍처)
3. [데이터 구조 (Google Sheets)](#3-데이터-구조-google-sheets)
4. [사용자 페르소나 및 사용자 스토리](#4-사용자-페르소나-및-사용자-스토리)
5. [기능 요구사항 (MVP)](#5-기능-요구사항-mvp)
6. [UI/UX 요구사항](#6-uiux-요구사항)
7. [API 설계](#7-api-설계)
8. [데모 계정 및 목업 데이터](#8-데모-계정-및-목업-데이터)
9. [배포 및 CI/CD](#9-배포-및-cicd)
10. [개발 로드맵](#10-개발-로드맵)
11. [위험 요소 및 대응](#11-위험-요소-및-대응)

---

## 1. 제품 개요

### 1.1 제품 비전
ETS-Zero는 실시간 탄소배출권(ETS) 가격과 연료비를 통합하여 총 운항비용(TCO)을 최소화하는 AI 기반 해운 운항 최적화 플랫폼입니다.

### 1.2 핵심 가치 제안
- **실시간 TCO 최적화**: 연료비 + 탄소배출권 비용을 동시에 고려한 최적 운항 계획
- **동적 재최적화**: 운항 중 시장 변동에 따른 즉각적인 대응 및 비용 절감
- **투명한 의사결정**: AI 추천 근거를 명확히 제시하여 신뢰도 확보
- **규제 리스크 관리**: EU ETS, IMO CII 등 탄소 규제 자동 대응

### 1.3 MVP 범위 (데모 버전)
본 PRD는 **데모/PoC 버전**을 목표로 합니다.

#### In-Scope
- Next.js 15 기반 반응형 웹 애플리케이션
- 데모 계정 원클릭 로그인
- Google Sheets 기반 데이터 관리 (선박, 항해, 시장 데이터)
- Claude Sonnet 4.0 API를 활용한 AI 운항 최적화
- Naver Maps API를 활용한 항로 시각화
- 실시간 운항 모니터링 대시보드
- What-if 시뮬레이션
- 충분한 목업 데이터 (최소 5척 선박, 10개 항해 데이터)

#### Out-of-Scope (향후 버전)
- 실제 외부 API 연동 (ETS, 유가, 기상, AIS) → 목업 데이터로 대체
- 모바일 네이티브 앱
- 다중 조직(Multi-tenancy) 지원
- 실시간 알림 (푸시, SMS)
- 결제 시스템

### 1.4 목표 및 성공 지표
- **개발 기간**: 4주 (1개월)
- **배포**: Vercel 자동 배포 (main 브랜치 푸시 시)
- **데모 완성도**: 주요 3가지 시나리오 완전 작동
  1. 운항 계획 수립 (3개 옵션 비교)
  2. 실시간 모니터링 및 동적 재최적화
  3. What-if 시뮬레이션

---

## 2. 기술 스택 및 아키텍처

### 2.1 기술 스택

#### 프론트엔드 & 백엔드
- **프레임워크**: Next.js 15 (App Router)
  - React 19
  - TypeScript 5.7+
  - Server Components + Client Components
  - Server Actions (API Routes 대신)
- **스타일링**: Tailwind CSS 4.0
  - shadcn/ui (UI 컴포넌트 라이브러리)
  - Radix UI (Headless UI)
- **상태 관리**:
  - Zustand (클라이언트 상태)
  - React Server Components (서버 상태)
- **차트 & 시각화**:
  - Recharts (대시보드 차트)
  - Naver Maps JavaScript API v3 (항로 지도)
- **폼 관리**: React Hook Form + Zod (Validation)
- **날짜/시간**: date-fns
- **애니메이션**: Framer Motion

#### 데이터베이스
- **Google Sheets API v4**
  - 선박 정보 (Vessels)
  - 항해 정보 (Voyages)
  - 운항 계획 (Voyage Plans)
  - 시장 데이터 (Market Data)
  - 사용자 정보 (Users)
  - 실시간 추적 데이터 (Tracking)
  - 알림 (Alerts)

#### AI
- **Claude Sonnet 4.0 API** (Anthropic)
  - 운항 최적화 계산
  - AI 추천 근거 생성 (Explainable AI)
  - What-if 시뮬레이션 분석

#### 지도
- **Naver Maps API**
  - 항로 시각화 (Polyline)
  - 선박 위치 마커
  - 항구 위치 표시

#### 배포 & 인프라
- **호스팅**: Vercel
  - 자동 배포 (GitHub 연동)
  - Edge Functions
  - 환경 변수 관리
- **버전 관리**: GitHub
  - GitHub Actions (CI/CD)
- **모니터링**: Vercel Analytics

#### 인증 (간소화)
- **데모 계정 로그인**: 하드코딩된 데모 계정
  - 이메일: `demo@ets-zero.com`
  - 비밀번호: `demo1234`
- **세션 관리**: Next.js Cookies + JWT (간소화)

### 2.2 시스템 아키텍처

```
┌─────────────────────────────────────────────────────────────────┐
│                     Client (Browser)                             │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Next.js 15 App (Server Components + Client Components)   │ │
│  │  - Dashboard                                               │ │
│  │  - Voyage Planning                                         │ │
│  │  - Real-time Monitoring                                    │ │
│  │  - What-if Simulation                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTPS
┌─────────────────────────────────────────────────────────────────┐
│                 Next.js 15 Server (Vercel)                       │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  App Router (/app)                                         │ │
│  │  - Server Components (Data Fetching)                       │ │
│  │  - Server Actions (Mutations)                              │ │
│  │  - API Routes (/api) - 필요시                              │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Services Layer                                            │ │
│  │  - GoogleSheetsService (데이터 CRUD)                       │ │
│  │  - ClaudeAIService (최적화 계산)                           │ │
│  │  - NaverMapsService (항로 데이터)                          │ │
│  │  - AuthService (데모 로그인)                               │ │
│  └────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              ↕
┌─────────────────────────────────────────────────────────────────┐
│                     External Services                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │ Google       │  │ Claude API   │  │ Naver Maps API       │  │
│  │ Sheets API   │  │ (Anthropic)  │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 폴더 구조

```
ets-zero/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # 인증 관련 라우트 그룹
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/              # 대시보드 라우트 그룹
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── vessels/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── voyages/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/
│   │   │       ├── page.tsx
│   │   │       ├── monitor/page.tsx
│   │   │       └── simulate/page.tsx
│   │   ├── reports/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/                      # API Routes (필요시)
│   │   └── health/route.ts
│   ├── layout.tsx                # Root Layout
│   ├── page.tsx                  # Home (리다이렉트)
│   └── globals.css
├── components/                   # React 컴포넌트
│   ├── ui/                       # shadcn/ui 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── layout/                   # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   ├── dashboard/                # 대시보드 컴포넌트
│   │   ├── kpi-cards.tsx
│   │   ├── market-chart.tsx
│   │   ├── voyages-table.tsx
│   │   └── alerts-list.tsx
│   ├── voyages/                  # 항해 관련 컴포넌트
│   │   ├── voyage-form.tsx
│   │   ├── optimization-options.tsx
│   │   ├── route-map.tsx
│   │   ├── real-time-monitor.tsx
│   │   └── simulation-panel.tsx
│   └── common/                   # 공통 컴포넌트
│       ├── loading-spinner.tsx
│       ├── error-boundary.tsx
│       └── demo-badge.tsx
├── lib/                          # 유틸리티 & 서비스
│   ├── services/
│   │   ├── google-sheets.ts      # Google Sheets API 래퍼
│   │   ├── claude-ai.ts          # Claude API 래퍼
│   │   ├── naver-maps.ts         # Naver Maps 유틸리티
│   │   └── auth.ts               # 인증 서비스
│   ├── utils/
│   │   ├── calculations.ts       # TCO 계산 로직
│   │   ├── formatters.ts         # 데이터 포맷팅
│   │   └── validators.ts         # Zod 스키마
│   ├── hooks/
│   │   ├── use-voyages.ts
│   │   ├── use-vessels.ts
│   │   └── use-market-data.ts
│   ├── stores/                   # Zustand 스토어
│   │   └── auth-store.ts
│   ├── constants/
│   │   └── index.ts              # 상수 정의
│   └── types/
│       └── index.ts              # TypeScript 타입 정의
├── public/                       # 정적 파일
│   ├── images/
│   └── icons/
├── docs/                         # 문서
│   ├── proposal.md
│   └── prd.md (this file)
├── scripts/                      # 스크립트
│   └── setup-demo-data.ts        # 목업 데이터 생성 스크립트
├── .env.local.example            # 환경 변수 예시
├── .env.local                    # 환경 변수 (gitignore)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 3. 데이터 구조 (Google Sheets)

Google Sheets를 데이터베이스로 사용합니다. 각 시트는 하나의 테이블(엔티티)을 나타냅니다.

### 3.1 Google Sheets 설정

#### Spreadsheet 구조
하나의 Google Sheets 파일 내에 여러 시트(탭)로 구분:

**Spreadsheet 이름**: `ETS-Zero-DB`

**시트 목록**:
1. Users
2. Vessels
3. Voyages
4. VoyagePlans
5. VoyageTracking
6. MarketData
7. Alerts

### 3.2 시트별 스키마

#### 3.2.1 Users 시트
사용자 정보 (데모에서는 1개 계정만)

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| user_id | string | UUID | `user-001` |
| email | string | 이메일 | `demo@ets-zero.com` |
| password_hash | string | 비밀번호 해시 (데모에서는 평문) | `demo1234` |
| name | string | 사용자 이름 | `박철수` |
| role | string | 역할 (admin, manager, viewer) | `manager` |
| organization | string | 소속 | `HMM` |
| created_at | string | 생성일 (ISO 8601) | `2025-10-01T09:00:00Z` |

**데모 데이터**: 1행 (헤더 제외)

#### 3.2.2 Vessels 시트
선박 정보

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| vessel_id | string | UUID | `vessel-001` |
| vessel_name | string | 선박명 | `HMM Seoul` |
| imo_number | string | IMO 번호 | `IMO9876543` |
| vessel_type | string | 선종 (container, bulk, tanker) | `container` |
| gross_tonnage | number | 총톤수 (톤) | `95000` |
| deadweight | number | 재화중량톤 (톤) | `100000` |
| draft_design | number | 설계 흘수 (m) | `14.5` |
| rpm_min | number | 최소 RPM (노트) | `10` |
| rpm_max | number | 최대 RPM (노트) | `20` |
| fuel_type | string | 연료 타입 (HFO, MGO, LNG) | `HFO` |
| co2_emission_factor | number | CO2 배출 계수 (톤 CO2/톤 연료) | `3.114` |
| built_year | number | 건조 연도 | `2018` |
| created_at | string | 생성일 | `2025-10-01T09:00:00Z` |

**데모 데이터**: 5행 (5척 선박)

#### 3.2.3 Voyages 시트
항해 정보

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| voyage_id | string | UUID | `voyage-001` |
| vessel_id | string | FK (Vessels) | `vessel-001` |
| voyage_number | string | 항차 번호 | `VOY-2025-001` |
| departure_port | string | 출발 항구 | `부산항` |
| departure_port_code | string | 항구 코드 | `KRPUS` |
| departure_lat | number | 출발 위도 | `35.1028` |
| departure_lon | number | 출발 경도 | `129.0403` |
| arrival_port | string | 도착 항구 | `로테르담항` |
| arrival_port_code | string | 항구 코드 | `NLRTM` |
| arrival_lat | number | 도착 위도 | `51.9244` |
| arrival_lon | number | 도착 경도 | `4.4777` |
| departure_time_planned | string | 예상 출항 일시 | `2025-11-15T09:00:00Z` |
| arrival_time_planned | string | 예상 도착 일시 | `2025-12-09T18:00:00Z` |
| departure_time_actual | string | 실제 출항 일시 (nullable) | `2025-11-15T10:30:00Z` |
| arrival_time_actual | string | 실제 도착 일시 (nullable) | `null` |
| cargo_weight | number | 화물 중량 (톤) | `50000` |
| status | string | 상태 (planned, in_progress, completed, cancelled) | `in_progress` |
| selected_plan_id | string | 선택된 운항 계획 ID (nullable) | `plan-001-c` |
| created_at | string | 생성일 | `2025-10-15T14:00:00Z` |

**데모 데이터**: 10행 (10개 항해, 다양한 상태)

#### 3.2.4 VoyagePlans 시트
운항 계획 (AI가 생성한 옵션들)

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| plan_id | string | UUID | `plan-001-a` |
| voyage_id | string | FK (Voyages) | `voyage-001` |
| plan_type | string | 계획 유형 (min_fuel, min_time, min_tco) | `min_tco` |
| is_recommended | boolean | AI 추천 여부 | `true` |
| recommended_rpm | number | 추천 RPM (노트) | `14.5` |
| estimated_duration_hours | number | 예상 항해 시간 (시간) | `576` |
| estimated_foc_tons | number | 예상 연료 소모량 (톤) | `2650` |
| estimated_fuel_cost_usd | number | 예상 연료비 (USD) | `1590000` |
| estimated_ets_cost_usd | number | 예상 탄소배출권 비용 (USD) | `584325` |
| estimated_tco_usd | number | 예상 총 운항비용 (USD) | `2174325` |
| route_waypoints | string | 항로 경유점 (JSON 문자열) | `[{lat:35.1,lon:129.0,time:"..."}]` |
| ai_explanation | string | AI 추천 근거 | `현재 ETS 가격($70/톤)이...` |
| market_ets_price | number | 계산 시점 ETS 가격 (USD/톤 CO2) | `70.0` |
| market_fuel_price | number | 계산 시점 연료 가격 (USD/톤) | `600.0` |
| created_at | string | 생성일 | `2025-10-15T15:00:00Z` |

**데모 데이터**: 각 항해당 3개 플랜 (A: min_fuel, B: min_time, C: min_tco) → 30행

#### 3.2.5 VoyageTracking 시트
실시간 추적 데이터 (시뮬레이션)

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| tracking_id | string | UUID | `track-001-001` |
| voyage_id | string | FK (Voyages) | `voyage-001` |
| timestamp | string | 기록 시각 (ISO 8601) | `2025-11-20T14:30:00Z` |
| latitude | number | 위도 | `20.5678` |
| longitude | number | 경도 | `65.1234` |
| speed_knots | number | 속도 (노트) | `14.2` |
| rpm | number | RPM | `14.5` |
| foc_current_tons_per_hour | number | 현재 시간당 연료 소모량 (톤/시) | `4.5` |
| foc_cumulative_tons | number | 누적 연료 소모량 (톤) | `1200` |
| tco_cumulative_usd | number | 누적 TCO (USD) | `980000` |
| weather_wind_speed | number | 풍속 (m/s) | `12.5` |
| weather_wave_height | number | 파고 (m) | `2.5` |

**데모 데이터**: 운항 중인 항해에 대해 시간별 추적 데이터 (예: voyage-001에 대해 100행)

#### 3.2.6 MarketData 시트
시장 데이터 (ETS 가격, 유가)

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| market_data_id | string | UUID | `market-001` |
| timestamp | string | 기록 시각 | `2025-10-30T00:00:00Z` |
| data_type | string | 데이터 유형 (ets_price, bunker_price) | `ets_price` |
| value | number | 가격 | `70.0` |
| currency | string | 통화 | `USD` |
| unit | string | 단위 | `per_ton_CO2` |
| region | string | 지역 (nullable) | `EU` |

**데모 데이터**: 최근 90일간 일별 ETS 가격 및 유가 데이터 (180행)

#### 3.2.7 Alerts 시트
알림 데이터

| 열 이름 | 타입 | 설명 | 예시 |
|---------|------|------|------|
| alert_id | string | UUID | `alert-001` |
| voyage_id | string | FK (Voyages) | `voyage-001` |
| alert_type | string | 알림 유형 (ets_spike, cost_overrun, eta_delay, weather_warning) | `ets_spike` |
| severity | string | 심각도 (info, warning, critical) | `critical` |
| message | string | 알림 메시지 | `ETS 가격이 15% 급등했습니다!` |
| action_required | boolean | 조치 필요 여부 | `true` |
| recommended_action | string | 추천 조치 | `RPM을 14.5에서 14.0으로 낮추세요...` |
| created_at | string | 생성일 | `2025-11-20T14:35:00Z` |
| acknowledged_at | string | 확인 일시 (nullable) | `null` |
| acknowledged_by | string | 확인자 (FK Users, nullable) | `null` |

**데모 데이터**: 10행 (다양한 알림 시나리오)

### 3.3 Google Sheets API 접근

#### 인증 방식
- **Service Account** 사용
  - Google Cloud Console에서 서비스 계정 생성
  - JSON 키 파일 다운로드
  - 환경 변수에 저장 (`GOOGLE_SERVICE_ACCOUNT_JSON`)
  - Google Sheets 파일을 서비스 계정 이메일과 공유 (편집 권한)

#### API 래퍼 (lib/services/google-sheets.ts)
```typescript
// 예시 인터페이스
interface GoogleSheetsService {
  getRows<T>(sheetName: string): Promise<T[]>;
  getRowById<T>(sheetName: string, id: string, idColumn: string): Promise<T | null>;
  addRow<T>(sheetName: string, data: T): Promise<void>;
  updateRow<T>(sheetName: string, id: string, idColumn: string, data: Partial<T>): Promise<void>;
  deleteRow(sheetName: string, id: string, idColumn: string): Promise<void>;
}
```

---

## 4. 사용자 페르소나 및 사용자 스토리

### 4.1 주요 페르소나 (데모 버전)

#### Persona: 운항 관리자 (Primary User)
- **이름**: 박철수 부장
- **소속**: HMM 운항관리팀
- **역할**: 운항 계획 수립 및 비용 관리
- **Pain Points**:
  - 유가와 탄소가격 동시 변동으로 의사결정 복잡도 증가
  - 운항 중 예기치 못한 비용 발생
  - AI 추천의 신뢰도 확보 필요

### 4.2 핵심 사용자 스토리 (MVP)

#### Epic 1: 데모 로그인
- **US-01**: 사용자로서, 메인 페이지에서 "데모 계정으로 시작하기" 버튼을 클릭하면 자동으로 로그인되어 대시보드로 이동하고 싶다.

#### Epic 2: 운항 계획 수립
- **US-02**: 운항 관리자로서, 출항 전 선박과 항로를 선택하면 AI가 3가지 운항 옵션(최저 연료, 최단 시간, TCO 최적)을 제시하고, 각 옵션의 비용 breakdown과 AI 추천 근거를 명확히 보고 싶다.
- **US-03**: 운항 관리자로서, 추천된 운항 계획을 선택하면 Naver Maps에서 항로가 시각화되고, 구간별 RPM 정보를 확인하고 싶다.

#### Epic 3: 실시간 운항 모니터링
- **US-04**: 운항 관리자로서, 현재 운항 중인 선박의 실시간 위치, 속도, 누적 TCO를 대시보드에서 한눈에 보고 싶다.
- **US-05**: 운항 관리자로서, ETS 가격이 급변할 때 시스템이 자동으로 재최적화를 수행하고, 대응 방안(RPM 조정)을 추천받고 싶다.

#### Epic 4: What-if 시뮬레이션
- **US-06**: 운항 관리자로서, "ETS 가격이 10% 상승하면?" 같은 가상 시나리오를 시뮬레이션하여 TCO 변화와 최적 대응 전략을 확인하고 싶다.

#### Epic 5: 대시보드
- **US-07**: 운항 관리자로서, 로그인 후 메인 대시보드에서 현재 운항 중인 선박 수, 금월 TCO 절감액, 최근 ETS/유가 차트, 긴급 알림을 한눈에 보고 싶다.

---

## 5. 기능 요구사항 (MVP)

### 5.1 인증 (Authentication)

#### FR-101: 데모 계정 원클릭 로그인
- **기능**: 메인 페이지에 "데모 계정으로 시작하기" 버튼 제공
- **동작**:
  1. 버튼 클릭 시 자동으로 `demo@ets-zero.com` 계정으로 로그인
  2. JWT 토큰 생성 및 쿠키 저장
  3. `/dashboard` 페이지로 리다이렉트
- **UI**:
  - 큰 Primary 버튼 (메인 화면 중앙)
  - 버튼 텍스트: "🚀 데모 계정으로 시작하기"
  - 로딩 애니메이션 (로그인 중)

#### FR-102: 로그아웃
- **기능**: 헤더에 로그아웃 버튼
- **동작**: 쿠키 삭제 후 로그인 페이지로 리다이렉트

### 5.2 대시보드 (Dashboard)

#### FR-201: 메인 대시보드
- **기능**: 운항 현황 및 주요 지표 시각화
- **구성 요소**:
  1. **KPI 카드** (4개, 가로 배치):
     - 운항 중 선박 수
     - 금월 총 TCO
     - 금월 TCO 절감액 (목표 대비 %)
     - 긴급 알림 수
  2. **시장 데이터 차트** (2개):
     - ETS 가격 변동 (최근 30일, 라인 차트)
     - 유가 변동 (최근 30일, 라인 차트)
  3. **운항 중 선박 테이블**:
     - 컬럼: 선박명, 항로, 현재 위치, 속도, ETA, TCO 상태 (예산 대비), 액션
     - 각 행 클릭 시 선박 상세 페이지로 이동
  4. **최근 알림 목록** (최근 5개):
     - 알림 타입 아이콘, 메시지, 시간, "상세보기" 버튼

#### FR-202: 대시보드 실시간 업데이트 (시뮬레이션)
- **기능**: 5초마다 VoyageTracking 데이터 갱신 (시뮬레이션)
- **구현**: React Query (Server Components에서는 주기적 revalidation)

### 5.3 선박 관리 (Vessels)

#### FR-301: 선박 목록 조회
- **기능**: 등록된 모든 선박 목록 표시 (테이블)
- **컬럼**: 선박명, IMO 번호, 선종, 총톤수, 건조 연도, 상태
- **액션**: 선박 클릭 시 상세 페이지

#### FR-302: 선박 상세 조회
- **기능**: 선박 정보 카드 + 해당 선박의 최근 항해 이력
- **정보**: 모든 선박 제원 표시

### 5.4 운항 계획 수립 (Voyage Planning)

#### FR-401: 새 항해 생성 및 최적화 요청
- **UI Flow**: 3단계 마법사 (Wizard)

**Step 1: 항해 정보 입력**
- 선박 선택 (드롭다운)
- 출발 항구 (자동완성 검색 또는 드롭다운)
- 도착 항구 (자동완성 검색 또는 드롭다운)
- 예상 출항 일시 (날짜/시간 피커)
- 화물 적재량 (선택, 숫자 입력)
- "다음" 버튼

**Step 2: 최적화 옵션 설정**
- 최적화 목표 선택:
  - ☑ TCO 최적 (기본 선택, 추천)
  - ☑ 최저 연료 소모
  - ☑ 최단 시간
- 제약 조건 (선택):
  - 최대 항해 일수
  - RPM 범위
- "최적화 실행" 버튼

**Step 3: 결과 비교 및 선택**
- 3개 옵션 카드 (가로 배치):
  - **옵션 A: 최저 연료**
  - **옵션 B: 최단 시간**
  - **옵션 C: TCO 최적** (⭐ 추천 배지)
- 각 카드 정보:
  - 항해 일수
  - 예상 FOC (톤)
  - 연료비 (USD)
  - 탄소배출권 비용 (USD)
  - **총 운항비용 (TCO)** (강조)
  - "상세보기" 버튼
- 선택된 옵션 상세 (카드 클릭 시):
  - **Naver Maps 항로 시각화**
    - 출발 항구 마커 (A)
    - 도착 항구 마커 (B)
    - 항로 Polyline (파란 선)
  - **AI 추천 근거** (텍스트):
    - "현재 ETS 가격($70/톤)이 상대적으로 높아, 속도를 약간 낮춰 탄소 배출을 줄이는 것이 TCO 절감에 유리합니다. 예상 절감액: $369,225 (옵션 B 대비)"
  - **비용 Breakdown** (파이 차트):
    - 연료비 vs 탄소배출권 비용 비율
  - **구간별 RPM 테이블** (선택):
    - 구간, 거리 (NM), RPM, 예상 시간
- "운항 계획 확정" 버튼

#### FR-402: Claude AI 최적화 엔진 연동
- **입력**:
  - 선박 제원 (Vessels 시트)
  - 항로 정보 (출발/도착 항구, 거리)
  - 현재 시장 데이터 (ETS 가격, 유가)
  - 날씨 시뮬레이션 (목업 데이터)
- **Claude API 프롬프트 설계**:
  ```
  당신은 해운 운항 최적화 AI입니다. 다음 정보를 바탕으로 3가지 운항 옵션을 계산하세요:

  [선박 정보]
  - 선박명: {vessel_name}
  - 총톤수: {gross_tonnage}
  - RPM 범위: {rpm_min} ~ {rpm_max}
  - 연료 타입: {fuel_type}
  - CO2 배출 계수: {co2_emission_factor}

  [항로 정보]
  - 출발: {departure_port}
  - 도착: {arrival_port}
  - 거리: {distance_nm} NM

  [시장 데이터]
  - 현재 유가: ${fuel_price}/톤
  - 현재 ETS 가격: ${ets_price}/톤 CO2

  [요청]
  다음 3가지 옵션을 계산하여 JSON으로 반환하세요:
  1. 최저 연료 소모 (min_fuel)
  2. 최단 시간 (min_time)
  3. TCO 최적 (min_tco)

  각 옵션에 대해 다음을 포함하세요:
  - recommended_rpm
  - estimated_duration_hours
  - estimated_foc_tons
  - estimated_fuel_cost_usd
  - estimated_ets_cost_usd
  - estimated_tco_usd
  - ai_explanation (한국어, 200자 이내, TCO 최적 옵션에 대한 추천 근거)

  응답 형식:
  {
    "options": [
      { "plan_type": "min_fuel", ... },
      { "plan_type": "min_time", ... },
      { "plan_type": "min_tco", "is_recommended": true, ... }
    ]
  }
  ```
- **출력**: VoyagePlans 시트에 3개 행 추가

### 5.5 실시간 운항 모니터링 (Real-time Monitoring)

#### FR-501: 선박 상세 / 실시간 모니터링 페이지
- **URL**: `/voyages/[id]/monitor`
- **레이아웃**: 2-column

**좌측 (60%): 지도 & 주요 지표**
- **Naver Maps**:
  - 실시간 선박 위치 마커 (아이콘: 🚢)
  - 계획 항로 (파란 선)
  - 실제 항로 (초록 선)
  - 출발/도착 항구 마커
- **주요 지표 카드** (지도 위 오버레이):
  - 현재 위치 (위도/경도)
  - 현재 속도 (노트)
  - 현재 RPM
  - ETA (예상 도착 시간)
  - 계획 대비 상태:
    - ✅ 예산 내 (On Track)
    - ⚠️ 예산 +$XX,XXX 초과
    - ✅ 절감 -$XX,XXX

**우측 (40%): 차트 & 알림**
- **탭 네비게이션**:
  - 탭 1: TCO 추이 (누적, 계획 vs 실제, 라인 차트)
  - 탭 2: 속도 추이 (시간별, 계획 vs 실제, 라인 차트)
  - 탭 3: FOC 추이 (누적, 계획 vs 실제)
- **이 항해 관련 알림 목록**:
  - 최근 5개 알림 표시
  - 알림 타입 아이콘, 메시지, 시간
  - "모두 보기" 버튼

#### FR-502: 동적 재최적화 시뮬레이션
- **트리거**: ETS 가격 15% 급등 시뮬레이션 (버튼으로 트리거 가능)
- **동작**:
  1. 현재 항해 상태 (위치, 잔여 거리) 가져오기
  2. 새로운 ETS 가격 적용하여 Claude AI 재최적화 요청
  3. 재최적화 결과 표시:
     - 새로운 추천 RPM
     - TCO 영향 (절감액 또는 추가 비용)
     - ETA 영향 (지연 시간)
     - AI 설명
  4. Alert 시트에 새 알림 추가
  5. 모니터링 페이지에 팝업 또는 배너로 알림 표시
- **UI**:
  - 🔴 긴급 알림 배너:
    - "ETS 가격 15% 급등! 재최적화 권고"
    - "추천: RPM 14.5 → 14.0 (예상 절감: $30,000, 도착 7시간 지연)"
    - "수락" / "무시" 버튼

### 5.6 What-if 시뮬레이션 (Simulation)

#### FR-601: 시뮬레이션 실행
- **URL**: `/voyages/[id]/simulate`
- **UI**:

**Step 1: 시나리오 설정**
- 기준 항해: 현재 항해 자동 선택
- 시나리오 변수 조정:
  - **ETS 가격 변동**: 슬라이더 (-20% ~ +20%)
  - **유가 변동**: 슬라이더 (-20% ~ +20%)
  - **RPM 변경**: 입력 (±2 노트)
- "시뮬레이션 실행" 버튼

**Step 2: 결과 비교**
- **비교 테이블**:
  - 열: 시나리오명, 항해 일수, FOC, 연료비, 탄소비용, TCO
  - 행:
    - Baseline (현재 계획)
    - Scenario 1 (ETS +15%)
    - Scenario 2 (Fuel +10%)
    - ...
  - TCO 차이 강조 (색상 코딩: 🟢 절감, 🔴 증가)
- **TCO 비교 막대 차트**
- **AI 분석 텍스트**:
  - "ETS 가격이 15% 상승할 경우, RPM을 14.0으로 낮추면 $75,000의 추가 비용을 방지할 수 있습니다."

### 5.7 항로 시각화 (Naver Maps)

#### FR-701: Naver Maps 통합
- **사용 시나리오**:
  1. 운항 계획 수립 시 항로 시각화
  2. 실시간 모니터링 시 선박 위치 및 항로 표시
- **기능**:
  - 출발/도착 항구 마커
  - 항로 Polyline (계획: 파란색, 실제: 초록색)
  - 선박 현재 위치 커스텀 마커 (아이콘: 🚢, 회전 가능)
  - 지도 컨트롤 (확대/축소, 지도/위성 전환)
- **구현**:
  - Next.js에서 Naver Maps JavaScript API v3 로드
  - 클라이언트 컴포넌트로 구현
  - `lib/services/naver-maps.ts`에 유틸리티 함수

### 5.8 리포트 (Reports) - 간소화 버전

#### FR-801: 항해 요약 리포트 (단순 테이블)
- **URL**: `/reports`
- **기능**: 완료된 항해 목록 및 TCO 절감 실적
- **테이블 컬럼**:
  - 항차 번호
  - 선박명
  - 항로
  - 출항/도착 일시
  - 계획 TCO
  - 실제 TCO
  - 절감액 (계획 대비)
  - 절감률 (%)
- **하단**: 총 절감액 표시 (Sum)

---

## 6. UI/UX 요구사항

### 6.1 디자인 원칙
1. **명확성**: 복잡한 데이터를 단순하고 이해하기 쉽게 표현
2. **효율성**: 최소 클릭으로 주요 작업 완료
3. **신뢰성**: AI 추천의 근거를 투명하게 제시
4. **일관성**: 전체 플랫폼에서 동일한 UI 패턴 사용

### 6.2 디자인 시스템 (shadcn/ui + Tailwind CSS)

#### 색상 팔레트
- **Primary**: 네이비 블루 (`#1A3A52`) - 해운업 이미지
- **Secondary**: 청록색 (`#00BCD4`) - 혁신, 기술
- **Success**: 초록색 (`#4CAF50`) - 절감, 목표 달성
- **Warning**: 주황색 (`#FF9800`) - 경고
- **Error**: 빨간색 (`#F44336`) - 비용 초과, 오류
- **Neutral**: 회색 계열 (`gray-100`, `gray-200`, `gray-800`)
- **Background**: `white`, `gray-50`

#### 타이포그래피 (Tailwind + Next.js Font)
- **제목**: `font-bold text-2xl ~ text-4xl`
- **본문**: `font-normal text-sm ~ text-base`
- **캡션**: `font-light text-xs`
- **한글 폰트**: Noto Sans KR (next/font/google)

#### 컴포넌트 (shadcn/ui)
- Button (Primary, Secondary, Outline, Ghost)
- Card
- Table (Data Table with sorting)
- Dialog (Modal)
- Tabs
- Select (Dropdown)
- Input, Textarea
- Badge
- Alert
- Tooltip
- Skeleton (로딩 상태)

### 6.3 주요 화면 와이어프레임

#### 6.3.1 로그인 페이지 (`/login`)
```
┌───────────────────────────────────────────────────────────────┐
│                                                                 │
│                         [ETS-Zero Logo]                         │
│                                                                 │
│             실시간 탄소배출권 연동 AI 운항 최적화               │
│                                                                 │
│                                                                 │
│        ┌─────────────────────────────────────────────┐        │
│        │                                               │        │
│        │   🚀  데모 계정으로 시작하기  [버튼]         │        │
│        │                                               │        │
│        └─────────────────────────────────────────────┘        │
│                                                                 │
│                  (데모 배지: 🟢 Demo Version)                  │
│                                                                 │
└───────────────────────────────────────────────────────────────┘
```

#### 6.3.2 메인 대시보드 (`/dashboard`)
```
┌─────────────────────────────────────────────────────────────────┐
│ [Header: 로고 | 네비게이션 | 알림 | 프로필]                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [KPI Cards - 4개, 가로 배치]                                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐          │
│  │운항 중    │ │금월 TCO  │ │TCO 절감액│ │긴급 알림│          │
│  │선박: 3척  │ │$5.2M     │ │-$450K    │ │2건      │          │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘          │
│                                                                   │
│  [시장 데이터 차트 - 2개, 가로 배치]                             │
│  ┌───────────────────────┐  ┌───────────────────────┐          │
│  │ ETS 가격 변동 (30일)  │  │ 유가 변동 (30일)       │          │
│  │ [Line Chart]          │  │ [Line Chart]           │          │
│  └───────────────────────┘  └───────────────────────┘          │
│                                                                   │
│  [운항 중 선박 테이블]                                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 선박명 | 항로 | 위치 | 속도 | ETA | TCO 상태 | 액션     │   │
│  │ HMM Seoul | 부산→로테르담 | ... | 14.2kt | ... | ✅ | [보기] │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│  [최근 알림 목록 (5개)]                                          │
│  🔴 ETS 가격 15% 급등 - voyage-001 (2분 전)                      │
│  ⚠️ FOC 예산 5% 초과 - voyage-003 (1시간 전)                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.3.3 운항 계획 수립 (`/voyages/new`)
```
Step 3: 결과 비교 및 선택

┌─────────────────────────────────────────────────────────────────┐
│  [3개 옵션 카드 - 가로 배치]                                      │
│                                                                   │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐            │
│  │옵션 A      │  │옵션 B      │  │옵션 C ⭐추천    │            │
│  │최저 연료   │  │최단 시간   │  │TCO 최적        │            │
│  │            │  │            │  │                │            │
│  │24일        │  │21일        │  │23일            │            │
│  │2500톤 FOC  │  │3100톤 FOC  │  │2650톤 FOC      │            │
│  │            │  │            │  │                │            │
│  │TCO:        │  │TCO:        │  │TCO:            │            │
│  │$2,051,250  │  │$2,543,550  │  │$2,174,325      │            │
│  │            │  │            │  │                │            │
│  │[선택]      │  │[선택]      │  │[선택됨]        │            │
│  └────────────┘  └────────────┘  └────────────────┘            │
│                                                                   │
│  [선택된 옵션 상세]                                               │
│  ┌──────────────────────┐  ┌────────────────────────────┐      │
│  │ Naver Maps           │  │ AI 추천 근거               │      │
│  │ [지도 with 항로]     │  │ 현재 ETS 가격이...         │      │
│  │                      │  │                            │      │
│  │                      │  │ [비용 Breakdown 파이차트]  │      │
│  └──────────────────────┘  └────────────────────────────┘      │
│                                                                   │
│                               [운항 계획 확정 버튼]              │
└─────────────────────────────────────────────────────────────────┘
```

#### 6.3.4 실시간 모니터링 (`/voyages/[id]/monitor`)
```
┌─────────────────────────────────────────────────────────────────┐
│  [좌측 60%: 지도]              │  [우측 40%: 차트 & 알림]       │
│  ┌───────────────────────────┐ │  ┌───────────────────────┐   │
│  │ Naver Maps                │ │  │ [Tabs: TCO/속도/FOC]  │   │
│  │                           │ │  │ [Line Chart]          │   │
│  │  🚢 (현재 위치)           │ │  │                       │   │
│  │  --- (계획 항로)          │ │  │                       │   │
│  │  === (실제 항로)          │ │  └───────────────────────┘   │
│  │                           │ │                               │
│  │  [주요 지표 오버레이]     │ │  [이 항해 알림 목록]          │
│  │  위치: 20.5678, 65.1234   │ │  🔴 ETS 가격 급등!            │
│  │  속도: 14.2kt             │ │  ⚠️ FOC 예산 초과            │
│  │  RPM: 14.5                │ │                               │
│  │  ETA: 11/28 18:00         │ │  [재최적화 실행 버튼]         │
│  │  상태: ✅ 예산 내          │ │                               │
│  └───────────────────────────┘ │                               │
│                                                                   │
│  [긴급 알림 배너 (조건부 표시)]                                  │
│  🔴 ETS 가격 15% 급등! RPM 14.5→14.0 권고 (절감: $30K) [수락]   │
└─────────────────────────────────────────────────────────────────┘
```

### 6.4 반응형 디자인
- **Desktop**: 1280px 이상 (기본 타겟)
- **Tablet**: 768px ~ 1279px (레이아웃 조정, 2-column → 1-column)
- **Mobile**: 767px 이하 (스택 레이아웃, 간소화된 네비게이션)

### 6.5 로딩 & 에러 상태
- **로딩**: Skeleton 컴포넌트 사용 (shadcn/ui)
- **에러**: Error Boundary + 친절한 에러 메시지
  - 예: "데이터를 불러오는 중 문제가 발생했습니다. 새로고침을 시도해주세요."

### 6.6 데모 배지
- **위치**: 헤더 우측 상단
- **디자인**: `🟢 Demo Version` (Badge 컴포넌트)
- **툴팁**: "이것은 데모 버전입니다. 실제 API가 아닌 목업 데이터를 사용합니다."

---

## 7. API 설계

### 7.1 API 구조 (Next.js 15 App Router)

#### 7.1.1 Server Actions (주요 사용)
Next.js 15에서는 Server Actions를 사용하여 데이터 mutation 수행.

**예시**: `app/actions/voyages.ts`
```typescript
'use server'

import { revalidatePath } from 'next/cache'
import { GoogleSheetsService } from '@/lib/services/google-sheets'
import { ClaudeAIService } from '@/lib/services/claude-ai'

export async function createVoyageAndOptimize(formData: FormData) {
  // 1. 폼 데이터 파싱
  // 2. Voyages 시트에 새 항해 추가
  // 3. Claude AI 최적화 요청
  // 4. VoyagePlans 시트에 3개 플랜 추가
  // 5. revalidatePath('/voyages')
  // 6. return { voyageId, plans }
}

export async function selectVoyagePlan(voyageId: string, planId: string) {
  // 1. Voyages 시트 업데이트 (selected_plan_id)
  // 2. revalidatePath(`/voyages/${voyageId}`)
}

export async function triggerReoptimization(voyageId: string) {
  // 1. 현재 항해 상태 가져오기
  // 2. ETS 가격 급등 시뮬레이션
  // 3. Claude AI 재최적화 요청
  // 4. VoyagePlans 시트에 새 플랜 추가
  // 5. Alerts 시트에 알림 추가
  // 6. revalidatePath(`/voyages/${voyageId}/monitor`)
  // 7. return { newPlan, alert }
}

export async function runSimulation(voyageId: string, scenarios: Scenario[]) {
  // 1. 기준 항해 데이터 가져오기
  // 2. 각 시나리오에 대해 Claude AI 시뮬레이션 요청
  // 3. return { baseline, scenarioResults }
}
```

#### 7.1.2 Server Components에서 데이터 페칭
```typescript
// app/dashboard/page.tsx
import { GoogleSheetsService } from '@/lib/services/google-sheets'

export default async function DashboardPage() {
  const voyages = await GoogleSheetsService.getRows<Voyage>('Voyages')
  const inProgressVoyages = voyages.filter(v => v.status === 'in_progress')
  const marketData = await GoogleSheetsService.getRows<MarketData>('MarketData')
  const alerts = await GoogleSheetsService.getRows<Alert>('Alerts')

  return (
    <div>
      <KPICards voyages={inProgressVoyages} />
      <MarketCharts data={marketData} />
      <VoyagesTable voyages={inProgressVoyages} />
      <AlertsList alerts={alerts} />
    </div>
  )
}
```

#### 7.1.3 API Routes (필요시, 외부 연동용)
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() })
}

// app/api/webhooks/naver-maps/route.ts (필요시)
export async function POST(request: Request) {
  // Naver Maps 콜백 처리
}
```

### 7.2 주요 서비스 모듈

#### 7.2.1 GoogleSheetsService (`lib/services/google-sheets.ts`)
```typescript
import { google } from 'googleapis'

export class GoogleSheetsService {
  private static sheets = google.sheets('v4')
  private static auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  private static spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!

  static async getRows<T>(sheetName: string): Promise<T[]> {
    // A1 notation으로 모든 행 가져오기
    // 첫 행(헤더)을 키로, 나머지 행을 값으로 변환
  }

  static async getRowById<T>(sheetName: string, id: string, idColumn: string = 'A'): Promise<T | null> {
    // 특정 ID로 행 조회
  }

  static async addRow<T>(sheetName: string, data: T): Promise<void> {
    // 새 행 추가
  }

  static async updateRow<T>(sheetName: string, id: string, idColumn: string, data: Partial<T>): Promise<void> {
    // 행 업데이트
  }

  static async deleteRow(sheetName: string, id: string, idColumn: string): Promise<void> {
    // 행 삭제
  }
}
```

#### 7.2.2 ClaudeAIService (`lib/services/claude-ai.ts`)
```typescript
import Anthropic from '@anthropic-ai/sdk'

export class ClaudeAIService {
  private static client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY!,
  })

  static async optimizeVoyage(input: OptimizationInput): Promise<OptimizationOutput> {
    const prompt = this.buildOptimizationPrompt(input)

    const message = await this.client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        { role: 'user', content: prompt }
      ],
    })

    // JSON 파싱 및 반환
    const content = message.content[0].text
    return JSON.parse(content)
  }

  static async reoptimize(input: ReoptimizationInput): Promise<ReoptimizationOutput> {
    // 재최적화 프롬프트
  }

  static async simulate(input: SimulationInput): Promise<SimulationOutput> {
    // 시뮬레이션 프롬프트
  }

  private static buildOptimizationPrompt(input: OptimizationInput): string {
    // 프롬프트 구성 (섹션 5.4 FR-402 참조)
  }
}
```

#### 7.2.3 NaverMapsService (`lib/services/naver-maps.ts`)
```typescript
export class NaverMapsService {
  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Haversine 공식으로 거리 계산 (NM)
  }

  static generateRouteWaypoints(departure: Port, arrival: Port, rpm: number): Waypoint[] {
    // 간단한 Great Circle 경로 생성 (시뮬레이션)
    // 실제로는 항로 최적화 알고리즘 필요
  }
}

// 클라이언트 컴포넌트에서 Naver Maps API 직접 사용
```

---

## 8. 데모 계정 및 목업 데이터

### 8.1 데모 계정
- **이메일**: `demo@ets-zero.com`
- **비밀번호**: `demo1234` (평문, 데모 전용)
- **이름**: `박철수`
- **역할**: `manager`
- **소속**: `HMM`

### 8.2 목업 데이터 상세

#### 8.2.1 선박 데이터 (Vessels) - 5척

| vessel_id | vessel_name | imo_number | vessel_type | gross_tonnage | deadweight | draft_design | rpm_min | rpm_max | fuel_type | co2_emission_factor | built_year |
|-----------|-------------|------------|-------------|---------------|------------|--------------|---------|---------|-----------|---------------------|------------|
| vessel-001 | HMM Seoul | IMO9876543 | container | 95000 | 100000 | 14.5 | 10 | 20 | HFO | 3.114 | 2018 |
| vessel-002 | HMM Busan | IMO9876544 | container | 95000 | 100000 | 14.5 | 10 | 20 | HFO | 3.114 | 2019 |
| vessel-003 | Korea Star | IMO9876545 | bulk | 75000 | 85000 | 13.0 | 9 | 18 | MGO | 3.206 | 2015 |
| vessel-004 | Pacific Dream | IMO9876546 | tanker | 110000 | 120000 | 16.0 | 11 | 22 | HFO | 3.114 | 2020 |
| vessel-005 | Asia Hope | IMO9876547 | container | 80000 | 90000 | 13.5 | 10 | 19 | LNG | 2.750 | 2022 |

#### 8.2.2 항해 데이터 (Voyages) - 10개

주요 항로:
1. 부산 → 로테르담 (컨테이너)
2. 부산 → 로스앤젤레스 (컨테이너)
3. 광양 → 싱가포르 (벌크)
4. 울산 → 홍콩 (탱커)
5. 인천 → 상하이 (컨테이너)

상태 분포:
- `in_progress`: 3개 (실시간 모니터링 대상)
- `planned`: 4개 (계획 단계)
- `completed`: 3개 (완료, 리포트용)

**주요 항해 예시**:

**voyage-001** (데모 시나리오 1: 운항 계획 수립)
- vessel_id: vessel-001 (HMM Seoul)
- 항로: 부산 → 로테르담
- 거리: ~11,000 NM
- 출항: 2025-11-15
- 상태: planned
- selected_plan_id: null (사용자가 선택할 예정)

**voyage-002** (데모 시나리오 2: 실시간 모니터링)
- vessel_id: vessel-002 (HMM Busan)
- 항로: 부산 → 로스앤젤레스
- 거리: ~5,500 NM
- 출항: 2025-11-10 (실제 출항 완료)
- 상태: in_progress (현재 태평양 항해 중)
- selected_plan_id: plan-002-c (TCO 최적 플랜 선택됨)
- 추적 데이터: 100행 (시간별 위치, 속도, FOC, TCO)

**voyage-003** (데모 시나리오 3: 완료된 항해, 리포트용)
- vessel_id: vessel-001 (HMM Seoul)
- 항로: 부산 → 로테르담
- 상태: completed
- 실제 TCO: $2,150,000 (계획: $2,174,325)
- 절감액: -$24,325 (1.1% 절감)

#### 8.2.3 운항 계획 데이터 (VoyagePlans) - 30개
각 항해당 3개 플랜 (A, B, C)

**voyage-001 플랜 예시** (proposal.md 표 참조):

| plan_id | voyage_id | plan_type | is_recommended | recommended_rpm | estimated_duration_hours | estimated_foc_tons | estimated_fuel_cost_usd | estimated_ets_cost_usd | estimated_tco_usd | ai_explanation |
|---------|-----------|-----------|----------------|-----------------|--------------------------|--------------------|-----------------------|------------------------|-------------------|----------------|
| plan-001-a | voyage-001 | min_fuel | false | 13.0 | 600 | 2500 | 1500000 | 551250 | 2051250 | 연료 소모를 최소화한 플랜입니다. |
| plan-001-b | voyage-001 | min_time | false | 17.0 | 504 | 3100 | 1860000 | 683550 | 2543550 | 항해 시간을 최소화한 플랜입니다. |
| plan-001-c | voyage-001 | min_tco | true | 14.5 | 552 | 2650 | 1590000 | 584325 | 2174325 | 현재 ETS 가격($70/톤)이 상대적으로 높아, 속도를 약간 낮춰 탄소 배출을 줄이는 것이 TCO 절감에 유리합니다. 옵션 B 대비 $369,225 절감 가능합니다. |

#### 8.2.4 실시간 추적 데이터 (VoyageTracking)
**voyage-002**에 대해 시간별 추적 데이터 생성 (100행)

- 출항 시각: 2025-11-10T10:00:00Z
- 현재 시각: 2025-11-20T14:30:00Z (약 10일 경과)
- 위치: 부산 → 태평양 중앙 → 로스앤젤레스 (Great Circle 경로)
- 속도: 계획 RPM 14.5 ± 0.5 (날씨 영향 시뮬레이션)
- 누적 FOC: 1200톤 (계획: 1250톤, 4% 절감 중)
- 누적 TCO: $980,000 (계획: $1,000,000)

**시뮬레이션 로직**:
- 1시간마다 1개 tracking 레코드 생성
- 위치: Great Circle 경로를 따라 일정하게 이동
- 속도: 기본 14.5노트, 랜덤 변동 ±0.3
- FOC: 속도와 날씨에 따라 변동
- 날씨: 랜덤 생성 (풍속 5~20 m/s, 파고 1~4 m)

#### 8.2.5 시장 데이터 (MarketData) - 180행
최근 90일간 일별 데이터

**ETS 가격** (90행):
- 기간: 2025-08-01 ~ 2025-10-30
- 초기 가격: $65/톤 CO2
- 현재 가격: $70/톤 CO2
- 변동: ±5% 랜덤 변동, 전반적 상승 트렌드 (+7.7%)

**유가** (90행):
- 기간: 2025-08-01 ~ 2025-10-30
- 초기 가격: $580/톤
- 현재 가격: $600/톤
- 변동: ±3% 랜덤 변동, 완만한 상승 트렌드 (+3.4%)

#### 8.2.6 알림 데이터 (Alerts) - 10개

**주요 알림 시나리오**:

1. **ETS 가격 급등 알림** (voyage-002, critical):
   - 메시지: "ETS 가격이 15% 급등했습니다! ($70 → $80.5)"
   - 추천 조치: "RPM을 14.5에서 14.0으로 낮추면 $30,000 절감 가능합니다. (도착 7시간 지연)"
   - 생성 시각: 2025-11-20T14:35:00Z

2. **FOC 예산 초과 경고** (voyage-004, warning):
   - 메시지: "누적 연료 소모량이 계획 대비 5% 초과했습니다."
   - 추천 조치: "RPM을 1노트 낮춰 예산 범위 내로 조정하세요."

3. **날씨 경고** (voyage-002, info):
   - 메시지: "48시간 내 항로에 악천후가 예상됩니다. (풍속 25m/s)"
   - 추천 조치: "속도를 10% 낮추고 안전 항해를 우선하세요."

### 8.3 목업 데이터 생성 스크립트

#### `scripts/setup-demo-data.ts`
```typescript
import { google } from 'googleapis'

async function setupDemoData() {
  // 1. Google Sheets 연결
  // 2. 각 시트에 헤더 추가
  // 3. 목업 데이터 배치 삽입
  //    - Users: 1행
  //    - Vessels: 5행
  //    - Voyages: 10행
  //    - VoyagePlans: 30행
  //    - VoyageTracking: 100행 (voyage-002)
  //    - MarketData: 180행
  //    - Alerts: 10행
  console.log('데모 데이터 생성 완료!')
}

setupDemoData()
```

**실행**: `npx tsx scripts/setup-demo-data.ts`

---

## 9. 배포 및 CI/CD

### 9.1 Vercel 배포 설정

#### 9.1.1 GitHub 연동
1. GitHub 리포지토리 생성: `ets-zero`
2. Vercel 프로젝트 생성 및 GitHub 리포지토리 연결
3. 자동 배포 설정:
   - `main` 브랜치 푸시 시 프로덕션 배포
   - `dev` 브랜치 푸시 시 프리뷰 배포

#### 9.1.2 환경 변수 설정 (Vercel Dashboard)
```
# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
GOOGLE_SHEETS_SPREADSHEET_ID=1abc...xyz

# Claude AI API
ANTHROPIC_API_KEY=sk-ant-...

# Naver Maps API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=abc123...
NEXT_PUBLIC_NAVER_MAP_API_KEY=xyz789...

# Authentication (간소화)
JWT_SECRET=your-jwt-secret-key

# Next.js
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://ets-zero.vercel.app
```

#### 9.1.3 Vercel 프로젝트 설정
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (자동)
- **Install Command**: `npm install`

### 9.2 CI/CD 파이프라인 (GitHub Actions)

#### `.github/workflows/ci.yml`
```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  lint-and-typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
```

### 9.3 배포 URL
- **프로덕션**: `https://ets-zero.vercel.app`
- **프리뷰**: `https://ets-zero-<branch>-<hash>.vercel.app`

### 9.4 모니터링
- **Vercel Analytics**: 트래픽, 성능 모니터링
- **Vercel Logs**: 서버 로그 확인
- **Vercel Speed Insights**: 웹 성능 지표 (Core Web Vitals)

---

## 10. 개발 로드맵

### 10.1 1주차 (Week 1): 프로젝트 설정 & 기본 구조
**목표**: 프로젝트 초기화, 디자인 시스템, 레이아웃

- **Day 1-2**:
  - Next.js 15 프로젝트 생성
  - Tailwind CSS, shadcn/ui 설치 및 설정
  - 디자인 시스템 구축 (색상, 타이포그래피, 컴포넌트)
  - Git 리포지토리 생성 및 Vercel 연동
- **Day 3-4**:
  - Google Sheets API 설정 (서비스 계정, 스프레드시트 생성)
  - `GoogleSheetsService` 구현 (lib/services/google-sheets.ts)
  - 목업 데이터 생성 스크립트 작성 및 실행 (scripts/setup-demo-data.ts)
- **Day 5-7**:
  - 기본 레이아웃 컴포넌트 (Header, Sidebar, Footer)
  - 로그인 페이지 (데모 계정 버튼)
  - 인증 서비스 (AuthService, JWT)
  - 대시보드 라우팅 설정

**완료 기준**: 로그인 → 대시보드 빈 페이지 이동 작동

### 10.2 2주차 (Week 2): 대시보드 & 선박/항해 관리
**목표**: 대시보드 구현, 선박 목록, 항해 목록

- **Day 8-10**:
  - 대시보드 페이지 구현:
    - KPI 카드 (목업 데이터 표시)
    - 시장 데이터 차트 (Recharts, MarketData 시트)
    - 운항 중 선박 테이블 (Voyages 시트, status=in_progress)
    - 최근 알림 목록 (Alerts 시트)
  - Server Components로 데이터 페칭
- **Day 11-12**:
  - 선박 관리 페이지:
    - 선박 목록 (Vessels 시트)
    - 선박 상세 페이지 (vessel_id 기준)
- **Day 13-14**:
  - 항해 목록 페이지 (Voyages 시트)
  - 항해 상세 페이지 (기본 정보)

**완료 기준**: 대시보드 주요 위젯 작동, 선박/항해 목록 조회 가능

### 10.3 3주차 (Week 3): 운항 계획 수립 & AI 최적화
**목표**: Claude AI 연동, 운항 계획 수립 Flow

- **Day 15-16**:
  - Claude AI API 연동 (`ClaudeAIService`)
  - 최적화 프롬프트 작성 및 테스트
  - 응답 JSON 파싱 및 검증
- **Day 17-19**:
  - 운항 계획 수립 마법사 (3단계):
    - Step 1: 항해 정보 입력 폼
    - Step 2: 최적화 옵션 설정
    - Step 3: 결과 비교 및 선택
  - Server Action: `createVoyageAndOptimize`
  - VoyagePlans 시트에 데이터 저장
- **Day 20-21**:
  - Naver Maps API 연동:
    - 항로 시각화 컴포넌트 (RouteMap)
    - 출발/도착 항구 마커
    - 항로 Polyline
  - 옵션 선택 UI (카드, AI 추천 근거 표시)

**완료 기준**: 새 항해 생성 → AI 최적화 → 3개 옵션 비교 → 선택 → 저장 완료

### 10.4 4주차 (Week 4): 실시간 모니터링 & What-if 시뮬레이션
**목표**: 실시간 모니터링 페이지, 동적 재최적화, 시뮬레이션

- **Day 22-24**:
  - 실시간 모니터링 페이지:
    - Naver Maps 선박 위치 표시 (VoyageTracking 데이터)
    - 주요 지표 카드 (위치, 속도, RPM, ETA, TCO 상태)
    - 차트 (TCO/속도/FOC 추이, Recharts)
    - 알림 목록
  - Server Action: `triggerReoptimization` (ETS 가격 급등 시뮬레이션)
  - 재최적화 알림 배너 UI
- **Day 25-26**:
  - What-if 시뮬레이션 페이지:
    - 시나리오 설정 UI (슬라이더, 입력)
    - Server Action: `runSimulation`
    - 결과 비교 테이블 & 차트
    - AI 분석 텍스트
- **Day 27-28**:
  - 리포트 페이지 (간소화):
    - 완료된 항해 테이블
    - TCO 절감 실적 요약
  - 전체 테스트 & 버그 수정:
    - E2E 시나리오 테스트 (3가지 주요 시나리오)
    - 반응형 디자인 검증
    - 성능 최적화 (이미지, 코드 스플리팅)
  - 문서 작성:
    - README.md (프로젝트 소개, 설치 방법, 데모 계정)
    - 배포 가이드

**완료 기준**:
- 3가지 주요 시나리오 완전 작동:
  1. 운항 계획 수립 (3개 옵션 비교)
  2. 실시간 모니터링 및 동적 재최적화
  3. What-if 시뮬레이션
- Vercel 프로덕션 배포 완료
- 데모 계정으로 모든 기능 확인 가능

---

## 11. 위험 요소 및 대응

### 11.1 기술적 위험

#### 위험 1: Google Sheets API 성능 제약
- **설명**: Google Sheets는 데이터베이스가 아니므로 대량 데이터 조회 시 느릴 수 있음
- **가능성**: 중
- **영향**: 중
- **대응 방안**:
  - 데모 버전에서는 데이터 양 제한 (최대 500행)
  - API 호출 최소화 (Server Components에서 캐싱)
  - Next.js revalidation 활용 (5분 간격)
  - 향후 PostgreSQL/MongoDB로 마이그레이션 고려

#### 위험 2: Claude API 응답 시간 지연
- **설명**: Claude API 응답 시간이 10초 이상 소요될 수 있음
- **가능성**: 중
- **영향**: 중 (사용자 경험 저하)
- **대응 방안**:
  - 로딩 UI (Skeleton, 진행 상황 표시)
  - 응답 시간 최적화 (프롬프트 간소화, max_tokens 제한)
  - 타임아웃 설정 (30초)
  - 에러 핸들링 (재시도 로직)

#### 위험 3: Naver Maps API 제약
- **설명**: 무료 플랜 제한 (일일 API 호출 수)
- **가능성**: 낮 (데모 사용량 적음)
- **영향**: 낮
- **대응 방안**:
  - 지도 로드 최소화 (필요한 페이지만)
  - 지도 캐싱 (동일 항로 재사용)
  - 제한 초과 시 정적 이미지로 대체 고려

### 11.2 비즈니스 위험

#### 위험 4: 목업 데이터의 현실성 부족
- **설명**: 목업 데이터가 실제와 차이가 커서 데모 신뢰도 하락
- **가능성**: 중
- **영향**: 중
- **대응 방안**:
  - 실제 해운 데이터 참조 (공개 데이터, 논문)
  - 도메인 전문가 리뷰 (가능 시)
  - "데모 버전" 배지로 명확히 표시

#### 위험 5: 데모 계정 보안 이슈
- **설명**: 데모 계정이 공개되어 악의적 사용 가능
- **가능성**: 낮 (내부 데모)
- **영향**: 낮
- **대응 방안**:
  - 프로덕션 환경에서는 Rate Limiting
  - Vercel 환경 변수로 데모 모드 제어
  - 향후 실제 인증 시스템 구현 시 데모 계정 비활성화

### 11.3 일정 위험

#### 위험 6: 개발 일정 지연
- **설명**: 4주 내 완료하지 못할 가능성
- **가능성**: 중
- **영향**: 고 (데모 준비 실패)
- **대응 방안**:
  - 주차별 마일스톤 엄수
  - 우선순위 조정 (MVP 핵심 기능 먼저)
  - Phase 2 기능 과감히 제외 (리포트 간소화, 알림 간소화)
  - 버퍼 타임 확보 (4주차 후반)

---

## 부록

### A. 용어 정의
- **TCO (Total Cost of Ownership)**: 총 운항비용 = 연료비 + 탄소배출권 비용
- **FOC (Fuel Oil Consumption)**: 연료 소모량 (톤)
- **ETS (Emission Trading System)**: 탄소배출권 거래제
- **RPM**: 선박 속도 (노트, Revolutions Per Minute의 약자지만 여기서는 속도 의미)
- **CII (Carbon Intensity Indicator)**: 탄소집약도 지표 (IMO 규제)
- **NM (Nautical Mile)**: 해리 (거리 단위, 1 NM = 1.852 km)

### B. 환경 변수 설정 가이드

#### `.env.local.example`
```
# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account","project_id":"...","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"...@....iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
GOOGLE_SHEETS_SPREADSHEET_ID=your-spreadsheet-id

# Claude AI API
ANTHROPIC_API_KEY=sk-ant-api03-your-api-key

# Naver Maps API
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=your-naver-map-client-id

# Authentication
JWT_SECRET=your-jwt-secret-key-minimum-32-characters

# Next.js
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### C. Google Sheets 설정 가이드

1. **Google Cloud Console**:
   - 프로젝트 생성
   - Google Sheets API 활성화
   - 서비스 계정 생성 (IAM)
   - JSON 키 파일 다운로드

2. **Google Sheets**:
   - 새 스프레드시트 생성: "ETS-Zero-DB"
   - 서비스 계정 이메일과 공유 (편집자 권한)
   - 스프레드시트 ID 복사 (URL에서 확인)

3. **시트 생성** (7개):
   - Users, Vessels, Voyages, VoyagePlans, VoyageTracking, MarketData, Alerts

4. **목업 데이터 생성**:
   - `npx tsx scripts/setup-demo-data.ts` 실행

### D. Naver Maps API 설정 가이드

1. **Naver Cloud Platform**:
   - 콘솔 로그인
   - AI·NAVER API > Maps > Web Dynamic Map 활용 신청
   - 애플리케이션 등록 (웹 서비스 URL 등록)
   - Client ID 발급

2. **환경 변수 설정**:
   - `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`에 Client ID 저장

3. **Next.js에서 사용**:
   ```typescript
   // app/layout.tsx
   <Script src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`} />
   ```

### E. Claude API 설정 가이드

1. **Anthropic Console**:
   - 계정 생성/로그인
   - API Key 생성
   - 결제 정보 등록 (사용량 기반 과금)

2. **환경 변수 설정**:
   - `ANTHROPIC_API_KEY`에 API 키 저장

3. **사용량 예상** (데모 버전):
   - 운항 계획 수립: 1회당 ~2,000 토큰 (입력 + 출력)
   - 재최적화: 1회당 ~1,500 토큰
   - 시뮬레이션: 1회당 ~2,500 토큰
   - **월 예상 비용**: $10 미만 (데모 사용량 기준)

### F. 참고 자료
- Next.js 15 문서: https://nextjs.org/docs
- shadcn/ui 문서: https://ui.shadcn.com
- Google Sheets API: https://developers.google.com/sheets/api
- Claude API: https://docs.anthropic.com/
- Naver Maps API: https://navermaps.github.io/maps.js.ncp/

### G. 문의 및 지원
- **GitHub Issues**: https://github.com/your-org/ets-zero/issues
- **이메일**: dev@ets-zero.com

---

**문서 종료**

*이 PRD는 ETS-Zero 데모 버전 개발의 기본 지침이며, 개발 과정에서 지속적으로 업데이트됩니다.*

**최종 업데이트**: 2025-10-30
**버전**: 2.0 (Next.js 15, Google Sheets, Claude AI, Naver Maps 기반)
