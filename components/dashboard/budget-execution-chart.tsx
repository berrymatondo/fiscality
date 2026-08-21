'use client'

import {
  Bar,
  BarChart,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { budgetExecution } from '@/lib/data'
import { DualCurrencyAmount } from '@/components/dashboard/currency'

const data = budgetExecution.map((item) => ({
  name: item.name,
  Prévisions: item.prevision,
  Exécution: item.execution,
}))

export function BudgetExecutionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Exécution du budget de l&apos;État</CardTitle>
        <CardDescription>(cumul à date)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center gap-5 text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--chart-5)] opacity-40" />
            Prévisions annuelles
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
            Exécution à date
          </span>
        </div>
        <ResponsiveContainer width="100%" height={230}>
          <BarChart data={data} barGap={4} margin={{ top: 24, right: 8, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              domain={[0, 50000]}
              ticks={[0, 10000, 20000, 30000, 40000, 50000]}
              tickFormatter={(v) => v.toLocaleString('fr-FR')}
            />
            <Bar dataKey="Prévisions" fill="var(--chart-5)" fillOpacity={0.35} radius={[3, 3, 0, 0]} barSize={46} isAnimationActive={false}>
              <LabelList
                dataKey="Prévisions"
                position="top"
                formatter={(v: number) => v.toLocaleString('fr-FR')}
                style={{ fontSize: 11, fontWeight: 700, fill: 'var(--foreground)' }}
              />
            </Bar>
            <Bar dataKey="Exécution" radius={[3, 3, 0, 0]} barSize={46} isAnimationActive={false}>
              {data.map((_, i) => (
                <Cell key={i} fill={i === 0 ? 'var(--success)' : 'var(--primary)'} />
              ))}
              <LabelList
                dataKey="Exécution"
                position="top"
                content={(props) => {
                  const { x, y, width, value, index } = props as unknown as {
                    x: number
                    y: number
                    width: number
                    value: number
                    index: number
                  }
                  const taux = budgetExecution[index].taux
                  return (
                    <text
                      x={x + width / 2}
                      y={y - 6}
                      textAnchor="middle"
                      style={{ fontSize: 10, fontWeight: 700, fill: 'var(--foreground)' }}
                    >
                      {value.toLocaleString('fr-FR')} ({taux})
                    </text>
                  )
                }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-3">
          {budgetExecution.map((item) => (
            <div key={item.name}>
              <p className="text-[9px] font-semibold uppercase text-muted-foreground">{item.name} exécutées</p>
              <DualCurrencyAmount value={item.execution} scale="billion" className="text-xs font-bold text-foreground" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
