'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface VoyageStatusChartProps {
  planned: number
  inProgress: number
  completed: number
}

const COLORS = {
  planned: '#6B7280',
  inProgress: '#00BCD4',
  completed: '#4CAF50',
}

export function VoyageStatusChart({ planned, inProgress, completed }: VoyageStatusChartProps) {
  const data = [
    { name: '계획됨', value: planned, color: COLORS.planned },
    { name: '진행중', value: inProgress, color: COLORS.inProgress },
    { name: '완료됨', value: completed, color: COLORS.completed },
  ].filter(item => item.value > 0)

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(props: any) => `${props.name} ${(props.percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
