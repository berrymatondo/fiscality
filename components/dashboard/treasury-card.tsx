'use client'

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { treasury, treasuryTrend } from '@/lib/data'

export function TreasuryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Situation de trésorerie</CardTitle>
        <CardDescription>(en Mrd CDF)</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-5 sm:grid-cols-[180px_1fr]">
        <div className="space-y-3">
          <Metric label="Solde de trésorerie" value={treasury.solde} tone="text-success" />
          <Metric label="Disponibilités banques" value={treasury.banques} tone="text-primary" />
          <Metric label="Engagements à payer" value={treasury.engagements} tone="text-warning" />
          <Metric label="Arriérés de paiement" value={treasury.arrieres} tone="text-destructive" />
        </div>

        <div>
          <p className="mb-1 text-[10px] font-semibold uppercase text-muted-foreground">
            Évolution des disponibilités (12 derniers mois)
          </p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={treasuryTrend} margin={{ top: 8, right: 8, left: -8, bottom: 12 }}>
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={40}
                tick={{ fontSize: 8, fill: 'var(--muted-foreground)' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                domain={[0, 2500]}
                ticks={[0, 500, 1000, 1500, 2000, 2500]}
                tick={{ fontSize: 9, fill: 'var(--muted-foreground)' }}
                tickFormatter={(v) => v.toLocaleString('fr-FR')}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="var(--primary)"
                strokeWidth={2}
                dot={{ r: 3, fill: 'var(--primary)' }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

function Metric({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div>
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={`text-lg font-extrabold ${tone}`}>{value}</p>
    </div>
  )
}
