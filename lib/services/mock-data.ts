import type { User, Vessel, Voyage, VoyagePlan, VoyageTracking, MarketData, Alert } from '@/lib/types'

/**
 * Mock Data for ETS-Zero Demo
 */

// Users (1 demo account)
export const mockUsers: User[] = [
  {
    user_id: 'user-001',
    email: 'demo@ets-zero.com',
    password_hash: 'demo1234',
    name: '박철수',
    role: 'manager',
    organization: 'HMM',
    created_at: '2025-10-01T09:00:00Z',
  },
]

// Vessels (5 ships)
export const mockVessels: Vessel[] = [
  {
    vessel_id: 'vessel-001',
    vessel_name: 'HMM Seoul',
    imo_number: 'IMO9876543',
    vessel_type: 'container',
    gross_tonnage: 95000,
    deadweight: 100000,
    draft_design: 14.5,
    rpm_min: 10,
    rpm_max: 20,
    fuel_type: 'HFO',
    co2_emission_factor: 3.114,
    built_year: 2018,
    created_at: '2025-10-01T09:00:00Z',
  },
  {
    vessel_id: 'vessel-002',
    vessel_name: 'HMM Busan',
    imo_number: 'IMO9876544',
    vessel_type: 'container',
    gross_tonnage: 95000,
    deadweight: 100000,
    draft_design: 14.5,
    rpm_min: 10,
    rpm_max: 20,
    fuel_type: 'HFO',
    co2_emission_factor: 3.114,
    built_year: 2019,
    created_at: '2025-10-01T09:00:00Z',
  },
  {
    vessel_id: 'vessel-003',
    vessel_name: 'Korea Star',
    imo_number: 'IMO9876545',
    vessel_type: 'bulk',
    gross_tonnage: 75000,
    deadweight: 85000,
    draft_design: 13.0,
    rpm_min: 9,
    rpm_max: 18,
    fuel_type: 'MGO',
    co2_emission_factor: 3.206,
    built_year: 2015,
    created_at: '2025-10-01T09:00:00Z',
  },
  {
    vessel_id: 'vessel-004',
    vessel_name: 'Pacific Dream',
    imo_number: 'IMO9876546',
    vessel_type: 'tanker',
    gross_tonnage: 110000,
    deadweight: 120000,
    draft_design: 16.0,
    rpm_min: 11,
    rpm_max: 22,
    fuel_type: 'HFO',
    co2_emission_factor: 3.114,
    built_year: 2020,
    created_at: '2025-10-01T09:00:00Z',
  },
  {
    vessel_id: 'vessel-005',
    vessel_name: 'Asia Hope',
    imo_number: 'IMO9876547',
    vessel_type: 'container',
    gross_tonnage: 80000,
    deadweight: 90000,
    draft_design: 13.5,
    rpm_min: 10,
    rpm_max: 19,
    fuel_type: 'LNG',
    co2_emission_factor: 2.750,
    built_year: 2022,
    created_at: '2025-10-01T09:00:00Z',
  },
]

// Voyages (10 voyages with various statuses)
export const mockVoyages: Voyage[] = [
  // Planned
  {
    voyage_id: 'voyage-001',
    vessel_id: 'vessel-001',
    voyage_number: 'VOY-2025-001',
    departure_port: '부산항',
    departure_port_code: 'KRPUS',
    departure_lat: 35.1028,
    departure_lon: 129.0403,
    arrival_port: '로테르담항',
    arrival_port_code: 'NLRTM',
    arrival_lat: 51.9244,
    arrival_lon: 4.4777,
    distance_nm: 11000,
    departure_time_planned: '2025-11-15T09:00:00Z',
    arrival_time_planned: '2025-12-09T18:00:00Z',
    departure_time_actual: null,
    arrival_time_actual: null,
    cargo_weight: 50000,
    status: 'planned',
    selected_plan_id: 'plan-001-c',
    created_at: '2025-10-15T14:00:00Z',
  },
  // In Progress
  {
    voyage_id: 'voyage-002',
    vessel_id: 'vessel-002',
    voyage_number: 'VOY-2025-002',
    departure_port: '부산항',
    departure_port_code: 'KRPUS',
    departure_lat: 35.1028,
    departure_lon: 129.0403,
    arrival_port: '로스앤젤레스항',
    arrival_port_code: 'USLAX',
    arrival_lat: 33.7175,
    arrival_lon: -118.2711,
    departure_time_planned: '2025-11-10T10:00:00Z',
    arrival_time_planned: '2025-11-25T08:00:00Z',
    departure_time_actual: '2025-11-10T10:30:00Z',
    arrival_time_actual: null,
    cargo_weight: 60000,
    status: 'in_progress',
    selected_plan_id: 'plan-002-c',
    created_at: '2025-10-10T10:00:00Z',
  },
  {
    voyage_id: 'voyage-003',
    vessel_id: 'vessel-003',
    voyage_number: 'VOY-2025-003',
    departure_port: '광양항',
    departure_port_code: 'KRKWG',
    departure_lat: 34.9006,
    departure_lon: 127.7014,
    arrival_port: '싱가포르항',
    arrival_port_code: 'SGSIN',
    arrival_lat: 1.2644,
    arrival_lon: 103.8315,
    departure_time_planned: '2025-11-12T08:00:00Z',
    arrival_time_planned: '2025-11-22T16:00:00Z',
    departure_time_actual: '2025-11-12T08:15:00Z',
    arrival_time_actual: null,
    cargo_weight: 40000,
    status: 'in_progress',
    selected_plan_id: 'plan-003-c',
    created_at: '2025-10-12T08:00:00Z',
  },
  {
    voyage_id: 'voyage-004',
    vessel_id: 'vessel-004',
    voyage_number: 'VOY-2025-004',
    departure_port: '울산항',
    departure_port_code: 'KRUSN',
    departure_lat: 35.5011,
    departure_lon: 129.3879,
    arrival_port: '홍콩항',
    arrival_port_code: 'HKHKG',
    arrival_lat: 22.2855,
    arrival_lon: 114.1577,
    departure_time_planned: '2025-11-14T14:00:00Z',
    arrival_time_planned: '2025-11-20T10:00:00Z',
    departure_time_actual: '2025-11-14T14:20:00Z',
    arrival_time_actual: null,
    cargo_weight: 70000,
    status: 'in_progress',
    selected_plan_id: 'plan-004-c',
    created_at: '2025-10-14T12:00:00Z',
  },
  // Planned
  {
    voyage_id: 'voyage-005',
    vessel_id: 'vessel-005',
    voyage_number: 'VOY-2025-005',
    departure_port: '인천항',
    departure_port_code: 'KRINC',
    departure_lat: 37.4688,
    departure_lon: 126.6161,
    arrival_port: '상하이항',
    arrival_port_code: 'CNSHA',
    arrival_lat: 31.2304,
    arrival_lon: 121.4737,
    departure_time_planned: '2025-11-18T10:00:00Z',
    arrival_time_planned: '2025-11-20T18:00:00Z',
    departure_time_actual: null,
    arrival_time_actual: null,
    cargo_weight: 30000,
    status: 'planned',
    selected_plan_id: null,
    created_at: '2025-10-18T09:00:00Z',
  },
  // Completed
  {
    voyage_id: 'voyage-006',
    vessel_id: 'vessel-001',
    voyage_number: 'VOY-2025-006',
    departure_port: '부산항',
    departure_port_code: 'KRPUS',
    departure_lat: 35.1028,
    departure_lon: 129.0403,
    arrival_port: '로테르담항',
    arrival_port_code: 'NLRTM',
    arrival_lat: 51.9244,
    arrival_lon: 4.4777,
    departure_time_planned: '2025-10-01T09:00:00Z',
    arrival_time_planned: '2025-10-25T18:00:00Z',
    departure_time_actual: '2025-10-01T09:15:00Z',
    arrival_time_actual: '2025-10-25T16:30:00Z',
    cargo_weight: 50000,
    status: 'completed',
    selected_plan_id: 'plan-006-c',
    created_at: '2025-09-20T10:00:00Z',
  },
]

// Voyage Plans
export const mockVoyagePlans: VoyagePlan[] = [
  // voyage-001 plans
  {
    plan_id: 'plan-001-a',
    voyage_id: 'voyage-001',
    plan_type: 'min_fuel',
    is_recommended: false,
    recommended_rpm: 13.5,
    estimated_duration_hours: 650,
    estimated_foc_tons: 2100,
    estimated_fuel_cost_usd: 1260000,
    estimated_ets_cost_usd: 459900,
    estimated_tco_usd: 1719900,
    route_waypoints: JSON.stringify([
      { lat: 35.1028, lon: 129.0403 },
      { lat: 51.9244, lon: 4.4777 }
    ]),
    ai_explanation: '최저 연료 소비 전략입니다. RPM을 13.5로 유지하여 연료 소비를 최소화하지만 항해 시간이 가장 깁니다.',
    market_ets_price: 70,
    market_fuel_price: 600,
    created_at: '2025-10-15T14:30:00Z',
  },
  {
    plan_id: 'plan-001-b',
    voyage_id: 'voyage-001',
    plan_type: 'min_time',
    is_recommended: false,
    recommended_rpm: 16.0,
    estimated_duration_hours: 540,
    estimated_foc_tons: 2850,
    estimated_fuel_cost_usd: 1710000,
    estimated_ets_cost_usd: 623700,
    estimated_tco_usd: 2333700,
    route_waypoints: JSON.stringify([
      { lat: 35.1028, lon: 129.0403 },
      { lat: 51.9244, lon: 4.4777 }
    ]),
    ai_explanation: '최단 시간 전략입니다. RPM을 16.0으로 높여 가장 빠르게 도착하지만 연료 소비와 탄소배출이 증가합니다.',
    market_ets_price: 70,
    market_fuel_price: 600,
    created_at: '2025-10-15T14:30:00Z',
  },
  {
    plan_id: 'plan-001-c',
    voyage_id: 'voyage-001',
    plan_type: 'min_tco',
    is_recommended: true,
    recommended_rpm: 14.5,
    estimated_duration_hours: 590,
    estimated_foc_tons: 2400,
    estimated_fuel_cost_usd: 1440000,
    estimated_ets_cost_usd: 524160,
    estimated_tco_usd: 1964160,
    route_waypoints: JSON.stringify([
      { lat: 35.1028, lon: 129.0403 },
      { lat: 51.9244, lon: 4.4777 }
    ]),
    ai_explanation: '최적 TCO 전략입니다. 연료비와 탄소배출권 비용을 균형있게 고려하여 총 운항 비용을 최소화합니다. 현재 ETS 가격($70/톤)과 유가($600/톤)를 감안할 때 가장 경제적인 선택입니다.',
    market_ets_price: 70,
    market_fuel_price: 600,
    created_at: '2025-10-15T14:30:00Z',
  },
]

// Get mock data by sheet name
export function getMockDataBySheet(sheetName: string): any[] {
  switch (sheetName) {
    case 'Users':
      return mockUsers
    case 'Vessels':
      return mockVessels
    case 'Voyages':
      return mockVoyages
    case 'VoyagePlans':
      return mockVoyagePlans
    default:
      return []
  }
}
