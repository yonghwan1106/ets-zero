// User Types
export interface User {
  user_id: string
  email: string
  password_hash: string
  name: string
  role: 'admin' | 'manager' | 'viewer'
  organization: string
  created_at: string
}

// Vessel Types
export interface Vessel {
  vessel_id: string
  vessel_name: string
  imo_number: string
  vessel_type: 'container' | 'bulk' | 'tanker'
  gross_tonnage: number
  deadweight: number
  draft_design: number
  rpm_min: number
  rpm_max: number
  fuel_type: 'HFO' | 'MGO' | 'LNG'
  co2_emission_factor: number
  built_year: number
  created_at: string
}

// Voyage Types
export interface Voyage {
  voyage_id: string
  vessel_id: string
  voyage_number: string
  departure_port: string
  departure_port_code: string
  departure_lat: number
  departure_lon: number
  arrival_port: string
  arrival_port_code: string
  arrival_lat: number
  arrival_lon: number
  distance_nm?: number // Optional: distance in nautical miles
  departure_time_planned: string
  arrival_time_planned: string
  departure_time_actual: string | null
  arrival_time_actual: string | null
  cargo_weight: number
  status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
  selected_plan_id: string | null
  created_at: string
}

// Voyage Plan Types
export interface VoyagePlan {
  plan_id: string
  voyage_id: string
  plan_type: 'min_fuel' | 'min_time' | 'min_tco'
  is_recommended: boolean
  recommended_rpm: number
  estimated_duration_hours: number
  estimated_foc_tons: number
  estimated_fuel_cost_usd: number
  estimated_ets_cost_usd: number
  estimated_tco_usd: number
  route_waypoints: string // JSON string
  ai_explanation: string
  market_ets_price: number
  market_fuel_price: number
  created_at: string
}

// Voyage Tracking Types
export interface VoyageTracking {
  tracking_id: string
  voyage_id: string
  timestamp: string
  latitude: number
  longitude: number
  speed_knots: number
  rpm: number
  foc_current_tons_per_hour: number
  foc_cumulative_tons: number
  tco_cumulative_usd: number
  weather_wind_speed: number
  weather_wave_height: number
}

// Market Data Types
export interface MarketData {
  market_data_id: string
  timestamp: string
  data_type: 'ets_price' | 'bunker_price'
  value: number
  currency: string
  unit: string
  region: string | null
}

// Alert Types
export interface Alert {
  alert_id: string
  voyage_id: string
  alert_type: 'ets_spike' | 'cost_overrun' | 'eta_delay' | 'weather_warning'
  severity: 'info' | 'warning' | 'critical'
  message: string
  action_required: boolean
  recommended_action: string | null
  created_at: string
  acknowledged_at: string | null
  acknowledged_by: string | null
}

// Waypoint Type (for route visualization)
export interface Waypoint {
  lat: number
  lon: number
  time?: string
  rpm?: number
}
