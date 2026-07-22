'use client'

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

type Segment = { name: string; value: number; color: string }

export function DonutCard({
  title,
  description,
  data,
  centerValue,
  centerUnit,
}: {
  title: string
  description: string
  data: Segment[]
  centerValue: string
  centerUnit: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="relative h-[200px] w-[200px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={1}
                stroke="none"
                isAnimationActive={false}
                startAngle={90}
                endAngle={-270}
              >
                {data.map((seg) => (
                  <Cell key={seg.name} fill={seg.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-lg font-extrabold text-foreground">{centerValue}</span>
            <span className="text-[10px] font-medium text-muted-foreground">{centerUnit}</span>
          </div>
        </div>

        <ul className="flex flex-1 flex-col gap-2">
          {data.map((seg) => (
            <li key={seg.name} className="flex items-center justify-between gap-2 text-[12px]">
              <span className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-foreground">{seg.name}</span>
              </span>
              <span className="font-bold text-foreground">
                {seg.value.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}%
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
