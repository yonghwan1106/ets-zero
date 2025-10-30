import { NextResponse } from 'next/server'
import { GoogleSheetsService } from '@/lib/services/google-sheets'
import { ClaudeAIService } from '@/lib/services/claude-ai'
import type { Voyage, Vessel } from '@/lib/types'

export async function POST(request: Request) {
  try {
    const { voyageId } = await request.json()

    if (!voyageId) {
      return NextResponse.json(
        { error: 'voyageId is required' },
        { status: 400 }
      )
    }

    // Get voyage and vessel data
    const voyage = await GoogleSheetsService.getRowById<Voyage>('Voyages', voyageId, 'voyage_id')

    if (!voyage) {
      return NextResponse.json(
        { error: 'Voyage not found' },
        { status: 404 }
      )
    }

    const vessel = await GoogleSheetsService.getRowById<Vessel>('Vessels', voyage.vessel_id, 'vessel_id')

    if (!vessel) {
      return NextResponse.json(
        { error: 'Vessel not found' },
        { status: 404 }
      )
    }

    // Generate plans using Claude AI
    const plans = await ClaudeAIService.generateVoyagePlans(voyage, vessel)

    return NextResponse.json({ plans })
  } catch (error) {
    console.error('Error generating plans:', error)
    return NextResponse.json(
      { error: 'Failed to generate plans' },
      { status: 500 }
    )
  }
}
