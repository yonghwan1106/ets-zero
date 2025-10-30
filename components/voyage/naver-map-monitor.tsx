'use client'

import { useEffect, useRef } from 'react'

interface Port {
  name: string
  code: string
  coordinates: { lat: number; lng: number }
}

interface NaverMapMonitorProps {
  departurePort: Port
  arrivalPort: Port
  currentPosition: { lat: number; lng: number }
  vesselName: string
}

export function NaverMapMonitor({
  departurePort,
  arrivalPort,
  currentPosition,
  vesselName,
}: NaverMapMonitorProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const vesselMarker = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return

    const initMap = () => {
      const naver = (window as any).naver

      if (!naver || !naver.maps) {
        console.error('Naver Maps API not loaded')
        return
      }

      // Calculate center point between departure and current position
      const centerLat = (departurePort.coordinates.lat + arrivalPort.coordinates.lat) / 2
      const centerLng = (departurePort.coordinates.lng + arrivalPort.coordinates.lng) / 2

      // Create map
      const map = new naver.maps.Map(mapRef.current!, {
        center: new naver.maps.LatLng(centerLat, centerLng),
        zoom: 4,
        mapTypeControl: true,
      })

      mapInstance.current = map

      // Departure port marker
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          departurePort.coordinates.lat,
          departurePort.coordinates.lng
        ),
        map: map,
        title: departurePort.name,
        icon: {
          content: `<div style="background: #1a3a52; color: white; padding: 8px 12px; border-radius: 8px; font-weight: bold; white-space: nowrap;">🏁 ${departurePort.name}</div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      })

      // Arrival port marker
      new naver.maps.Marker({
        position: new naver.maps.LatLng(
          arrivalPort.coordinates.lat,
          arrivalPort.coordinates.lng
        ),
        map: map,
        title: arrivalPort.name,
        icon: {
          content: `<div style="background: #4caf50; color: white; padding: 8px 12px; border-radius: 8px; font-weight: bold; white-space: nowrap;">🏁 ${arrivalPort.name}</div>`,
          anchor: new naver.maps.Point(12, 12),
        },
      })

      // Planned route polyline
      new naver.maps.Polyline({
        map: map,
        path: [
          new naver.maps.LatLng(
            departurePort.coordinates.lat,
            departurePort.coordinates.lng
          ),
          new naver.maps.LatLng(
            arrivalPort.coordinates.lat,
            arrivalPort.coordinates.lng
          ),
        ],
        strokeColor: '#00bcd4',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        strokeStyle: 'shortdash',
      })

      // Actual route polyline (from departure to current position)
      new naver.maps.Polyline({
        map: map,
        path: [
          new naver.maps.LatLng(
            departurePort.coordinates.lat,
            departurePort.coordinates.lng
          ),
          new naver.maps.LatLng(currentPosition.lat, currentPosition.lng),
        ],
        strokeColor: '#4caf50',
        strokeOpacity: 0.8,
        strokeWeight: 4,
      })

      // Current vessel position marker
      const marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(currentPosition.lat, currentPosition.lng),
        map: map,
        title: vesselName,
        icon: {
          content: `<div style="background: #f44336; color: white; padding: 12px; border-radius: 50%; font-size: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🚢</div>`,
          anchor: new naver.maps.Point(24, 24),
        },
      })

      vesselMarker.current = marker

      // Info window
      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding: 12px; min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #1a3a52;">${vesselName}</h4>
            <p style="margin: 4px 0; font-size: 13px; color: #666;">현재 위치: ${currentPosition.lat.toFixed(4)}°N, ${currentPosition.lng.toFixed(4)}°E</p>
            <p style="margin: 4px 0; font-size: 13px; color: #666;">목적지: ${arrivalPort.name}</p>
          </div>
        `,
      })

      naver.maps.Event.addListener(marker, 'click', () => {
        if (infoWindow.getMap()) {
          infoWindow.close()
        } else {
          infoWindow.open(map, marker)
        }
      })
    }

    if ((window as any).naver && (window as any).naver.maps) {
      initMap()
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).naver && (window as any).naver.maps) {
          clearInterval(checkInterval)
          initMap()
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [departurePort, arrivalPort, currentPosition, vesselName])

  // Update vessel marker position when currentPosition changes
  useEffect(() => {
    if (vesselMarker.current && (window as any).naver) {
      const naver = (window as any).naver
      vesselMarker.current.setPosition(
        new naver.maps.LatLng(currentPosition.lat, currentPosition.lng)
      )
    }
  }, [currentPosition])

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[500px]" />
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-xs">
        <h3 className="font-bold text-gray-900 mb-2">항로 정보</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-primary rounded-full"></span>
            <span className="text-gray-600">출발: {departurePort.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-success rounded-full"></span>
            <span className="text-gray-600">도착: {arrivalPort.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚢</span>
            <span className="text-gray-600">현재 위치</span>
          </div>
        </div>
      </div>
    </div>
  )
}
