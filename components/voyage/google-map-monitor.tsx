'use client'

import { useEffect, useRef } from 'react'

interface Port {
  name: string
  code: string
  coordinates: { lat: number; lng: number }
}

interface GoogleMapMonitorProps {
  departurePort: Port
  arrivalPort: Port
  currentPosition: { lat: number; lng: number }
  vesselName: string
}

export function GoogleMapMonitor({
  departurePort,
  arrivalPort,
  currentPosition,
  vesselName,
}: GoogleMapMonitorProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<any>(null)
  const vesselMarker = useRef<any>(null)
  const infoWindow = useRef<any>(null)

  useEffect(() => {
    if (!mapRef.current || typeof window === 'undefined') return

    const initMap = () => {
      if (!(window as any).google || !(window as any).google.maps) {
        console.error('Google Maps API not loaded')
        return
      }

      // Calculate center point between departure and arrival
      const centerLat = (departurePort.coordinates.lat + arrivalPort.coordinates.lat) / 2
      const centerLng = (departurePort.coordinates.lng + arrivalPort.coordinates.lng) / 2

      // Create map
      const google = (window as any).google
      const map = new google.maps.Map(mapRef.current!, {
        center: { lat: centerLat, lng: centerLng },
        zoom: 3,
        mapTypeId: 'terrain',
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
      })

      mapInstance.current = map

      // Departure port marker
      new google.maps.Marker({
        position: { lat: departurePort.coordinates.lat, lng: departurePort.coordinates.lng },
        map: map,
        title: departurePort.name,
        label: {
          text: '🏁',
          fontSize: '24px',
        },
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="40">
              <rect x="0" y="0" width="120" height="40" rx="8" fill="#1a3a52"/>
              <text x="60" y="26" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="middle">🏁 ${departurePort.name}</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(120, 40),
          anchor: new google.maps.Point(60, 20),
        },
      })

      // Arrival port marker
      new google.maps.Marker({
        position: { lat: arrivalPort.coordinates.lat, lng: arrivalPort.coordinates.lng },
        map: map,
        title: arrivalPort.name,
        label: {
          text: '🏁',
          fontSize: '24px',
        },
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="140" height="40">
              <rect x="0" y="0" width="140" height="40" rx="8" fill="#4caf50"/>
              <text x="70" y="26" font-family="Arial" font-size="14" font-weight="bold" fill="white" text-anchor="middle">🏁 ${arrivalPort.name}</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(140, 40),
          anchor: new google.maps.Point(70, 20),
        },
      })

      // Planned route polyline (dashed)
      new google.maps.Polyline({
        path: [
          { lat: departurePort.coordinates.lat, lng: departurePort.coordinates.lng },
          { lat: arrivalPort.coordinates.lat, lng: arrivalPort.coordinates.lng },
        ],
        geodesic: true,
        strokeColor: '#00bcd4',
        strokeOpacity: 0.6,
        strokeWeight: 3,
        icons: [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 3,
          },
          offset: '0',
          repeat: '20px',
        }],
        map: map,
      })

      // Actual route polyline (solid)
      new google.maps.Polyline({
        path: [
          { lat: departurePort.coordinates.lat, lng: departurePort.coordinates.lng },
          { lat: currentPosition.lat, lng: currentPosition.lng },
        ],
        geodesic: true,
        strokeColor: '#4caf50',
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: map,
      })

      // Current vessel position marker
      const marker = new google.maps.Marker({
        position: { lat: currentPosition.lat, lng: currentPosition.lng },
        map: map,
        title: vesselName,
        label: {
          text: '🚢',
          fontSize: '32px',
        },
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60">
              <circle cx="30" cy="30" r="28" fill="#f44336" opacity="0.9"/>
              <text x="30" y="40" font-size="28" text-anchor="middle">🚢</text>
            </svg>
          `),
          scaledSize: new google.maps.Size(60, 60),
          anchor: new google.maps.Point(30, 30),
        },
      })

      vesselMarker.current = marker

      // Info window
      const info = new google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; min-width: 200px; font-family: Arial, sans-serif;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold; color: #1a3a52;">${vesselName}</h4>
            <p style="margin: 4px 0; font-size: 13px; color: #666;">현재 위치: ${currentPosition.lat.toFixed(4)}°N, ${currentPosition.lng.toFixed(4)}°E</p>
            <p style="margin: 4px 0; font-size: 13px; color: #666;">목적지: ${arrivalPort.name}</p>
          </div>
        `,
      })

      infoWindow.current = info

      marker.addListener('click', () => {
        if (info.getMap()) {
          info.close()
        } else {
          info.open(map, marker)
        }
      })
    }

    if ((window as any).google && (window as any).google.maps) {
      initMap()
    } else {
      const checkInterval = setInterval(() => {
        if ((window as any).google && (window as any).google.maps) {
          clearInterval(checkInterval)
          initMap()
        }
      }, 100)

      return () => clearInterval(checkInterval)
    }
  }, [departurePort, arrivalPort, currentPosition, vesselName])

  // Update vessel marker position when currentPosition changes
  useEffect(() => {
    if (vesselMarker.current) {
      vesselMarker.current.setPosition({
        lat: currentPosition.lat,
        lng: currentPosition.lng,
      })
    }
  }, [currentPosition])

  return (
    <div className="relative">
      <div ref={mapRef} className="w-full h-[500px] rounded-lg" />
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
