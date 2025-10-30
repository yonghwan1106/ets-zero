import Anthropic from '@anthropic-ai/sdk'
import type { Vessel, Voyage } from '@/lib/types'

export class ClaudeAIService {
  private static client: Anthropic | null = null

  private static getClient() {
    if (this.client) {
      return this.client
    }

    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey || apiKey === 'sk-ant-api03-your-api-key') {
      console.warn('Claude AI API not configured - using mock AI responses')
      return null
    }

    this.client = new Anthropic({
      apiKey: apiKey,
    })

    return this.client
  }

  /**
   * Generate voyage optimization plans using Claude AI
   */
  static async generateVoyagePlans(voyage: Voyage, vessel: Vessel) {
    const client = this.getClient()

    // If no API key, return mock data
    if (!client) {
      return this.generateMockPlans(voyage, vessel)
    }

    try {
      const prompt = this.buildPrompt(voyage, vessel)

      const message = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      })

      const content = message.content[0]
      if (content.type === 'text') {
        return JSON.parse(content.text)
      }

      throw new Error('Invalid response from Claude AI')
    } catch (error) {
      console.error('Error calling Claude AI:', error)
      // Fallback to mock data on error
      return this.generateMockPlans(voyage, vessel)
    }
  }

  /**
   * Build prompt for Claude AI
   */
  private static buildPrompt(voyage: Voyage, vessel: Vessel): string {
    return `당신은 해운 업계의 운항 최적화 전문가입니다. 다음 항해에 대해 3가지 최적화 계획을 생성해주세요.

**선박 정보:**
- 선박명: ${vessel.vessel_name}
- 총톤수: ${vessel.gross_tonnage} GT
- 재화중량톤: ${vessel.deadweight} DWT
- 연료 타입: ${vessel.fuel_type}
- CO2 배출 계수: ${vessel.co2_emission_factor}
- RPM 범위: ${vessel.rpm_min} ~ ${vessel.rpm_max}

**항해 정보:**
- 출발항: ${voyage.departure_port} (${voyage.departure_port_code})
- 도착항: ${voyage.arrival_port} (${voyage.arrival_port_code})
- 화물 중량: ${voyage.cargo_weight} tons
- 출발 예정: ${voyage.departure_time_planned}
- 도착 예정: ${voyage.arrival_time_planned}

**시장 정보:**
- 연료 가격(${vessel.fuel_type}): $650/ton
- ETS 탄소배출권 가격: $85/ton CO2

다음 3가지 최적화 계획을 생성하고, 각 계획에 대해 다음 정보를 포함해주세요:
1. **최저 연료 소비 (min_fuel)**: 연료 소비를 최소화
2. **최단 시간 (min_time)**: 항해 시간을 최소화
3. **TCO 최적화 (min_tco)**: 연료비 + ETS 비용을 최소화 (권장)

응답은 반드시 다음 JSON 형식으로 작성해주세요:

\`\`\`json
{
  "minFuel": {
    "recommended_rpm": 숫자,
    "estimated_duration_hours": 숫자,
    "estimated_foc_tons": 숫자,
    "estimated_fuel_cost_usd": 숫자,
    "estimated_ets_cost_usd": 숫자,
    "estimated_tco_usd": 숫자,
    "is_recommended": false,
    "ai_explanation": "1-2문장 설명"
  },
  "minTime": {
    "recommended_rpm": 숫자,
    "estimated_duration_hours": 숫자,
    "estimated_foc_tons": 숫자,
    "estimated_fuel_cost_usd": 숫자,
    "estimated_ets_cost_usd": 숫자,
    "estimated_tco_usd": 숫자,
    "is_recommended": false,
    "ai_explanation": "1-2문장 설명"
  },
  "minTCO": {
    "recommended_rpm": 숫자,
    "estimated_duration_hours": 숫자,
    "estimated_foc_tons": 숫자,
    "estimated_fuel_cost_usd": 숫자,
    "estimated_ets_cost_usd": 숫자,
    "estimated_tco_usd": 숫자,
    "is_recommended": true,
    "ai_explanation": "1-2문장 설명"
  }
}
\`\`\`

JSON만 출력하고 다른 텍스트는 포함하지 마세요.`
  }

  /**
   * Generate mock AI plans for demo
   */
  private static generateMockPlans(voyage: Voyage, vessel: Vessel) {
    // Calculate approximate distance (simplified)
    const distance = this.calculateDistance(
      voyage.departure_lat,
      voyage.departure_lon,
      voyage.arrival_lat,
      voyage.arrival_lon
    )

    // Mock calculations
    const fuelPrice = 650 // $/ton
    const etsPrice = 85 // $/ton CO2

    // Min Fuel Plan (Low RPM)
    const minFuelRpm = vessel.rpm_min + 2
    const minFuelSpeed = 10 // knots
    const minFuelDuration = Math.round(distance / minFuelSpeed)
    const minFuelFoc = minFuelDuration * 1.5 // tons
    const minFuelCost = Math.round(minFuelFoc * fuelPrice)
    const minFuelEts = Math.round(minFuelFoc * vessel.co2_emission_factor * etsPrice)
    const minFuelTco = minFuelCost + minFuelEts

    // Min Time Plan (High RPM)
    const minTimeRpm = vessel.rpm_max - 1
    const minTimeSpeed = 18 // knots
    const minTimeDuration = Math.round(distance / minTimeSpeed)
    const minTimeFoc = minTimeDuration * 3.5 // tons
    const minTimeCost = Math.round(minTimeFoc * fuelPrice)
    const minTimeEts = Math.round(minTimeFoc * vessel.co2_emission_factor * etsPrice)
    const minTimeTco = minTimeCost + minTimeEts

    // Min TCO Plan (Optimal RPM)
    const minTcoRpm = Math.round((vessel.rpm_min + vessel.rpm_max) / 2)
    const minTcoSpeed = 14 // knots
    const minTcoDuration = Math.round(distance / minTcoSpeed)
    const minTcoFoc = minTcoDuration * 2.2 // tons
    const minTcoCost = Math.round(minTcoFoc * fuelPrice)
    const minTcoEts = Math.round(minTcoFoc * vessel.co2_emission_factor * etsPrice)
    const minTcoTco = minTcoCost + minTcoEts

    return {
      minFuel: {
        recommended_rpm: minFuelRpm,
        estimated_duration_hours: minFuelDuration,
        estimated_foc_tons: minFuelFoc,
        estimated_fuel_cost_usd: minFuelCost,
        estimated_ets_cost_usd: minFuelEts,
        estimated_tco_usd: minFuelTco,
        is_recommended: false,
        ai_explanation: '저속 운항으로 연료 소비를 최소화하지만, 항해 시간이 길어집니다.',
      },
      minTime: {
        recommended_rpm: minTimeRpm,
        estimated_duration_hours: minTimeDuration,
        estimated_foc_tons: minTimeFoc,
        estimated_fuel_cost_usd: minTimeCost,
        estimated_ets_cost_usd: minTimeEts,
        estimated_tco_usd: minTimeTco,
        is_recommended: false,
        ai_explanation: '최고 속도로 운항하여 시간을 단축하지만, 연료 소비와 ETS 비용이 증가합니다.',
      },
      minTCO: {
        recommended_rpm: minTcoRpm,
        estimated_duration_hours: minTcoDuration,
        estimated_foc_tons: minTcoFoc,
        estimated_fuel_cost_usd: minTcoCost,
        estimated_ets_cost_usd: minTcoEts,
        estimated_tco_usd: minTcoTco,
        is_recommended: true,
        ai_explanation: '연료 소비와 ETS 비용의 균형을 맞춘 최적의 운항 계획입니다. 현재 ETS 가격을 고려할 때 가장 경제적입니다.',
      },
    }
  }

  /**
   * Calculate distance between two coordinates (Haversine formula)
   */
  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 3440.065 // Earth radius in nautical miles
    const dLat = this.toRad(lat2 - lat1)
    const dLon = this.toRad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private static toRad(degrees: number): number {
    return (degrees * Math.PI) / 180
  }
}
