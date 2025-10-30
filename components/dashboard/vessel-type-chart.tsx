'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface VesselTypeChartProps {
  container: number
  bulk: number
  tanker: number
}

export function VesselTypeChart({ container, bulk, tanker }: VesselTypeChartProps) {
  const data = [
    { name: '컨테이너', count: container, fill: '#1A3A52' },
    { name: '벌크', count: bulk, fill: '#00BCD4' },
    { name: '탱커', count: tanker, fill: '#4CAF50' },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#1A3A52" name="선박 수" />
      </BarChart>
    </ResponsiveContainer>
  )
}
