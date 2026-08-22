'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { CountUp } from '@/components/dashboard/count-up'
import { BudgetBreakdown } from '@/components/dashboard/budget-breakdown'
import { MINISTRY_ENTITIES } from '@/lib/ministry-entities'

type Level = { depth: 0 } | { depth: 1; ministry: string } | { depth: 2; ministry: string; entite: string }

function ExecutionBar({ value }: { value: number }) {
  return (
    <div className="h-3.5 w-full overflow-hidden rounded-sm bg-muted">
      <div className="h-full rounded-sm bg-primary" style={{ width: `${Math.min(value, 120) / 1.2}%` }} />
    </div>
  )
}

function ScaleLegend() {
  return (
    <div className="flex justify-between pt-1 text-[10px] text-muted-foreground">
      {[0, 20, 40, 60, 80, 100, 120].map((t) => (
        <span key={t}>{t}%</span>
      ))}
    </div>
  )
}

export function MinistryDrilldown({ data }: { data: { name: string; value: number }[] }) {
  const [level, setLevel] = useState<Level>({ depth: 0 })

  if (level.depth === 1) {
    const ministry = MINISTRY_ENTITIES.find((m) => m.name === level.ministry)
    const ministryTaux = data.find((m) => m.name === level.ministry)?.value ?? 0
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="gap-1.5">
            <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <button type="button" onClick={() => setLevel({ depth: 0 })} className="hover:text-foreground hover:underline">
                Ministères
              </button>
              <ChevronRight className="size-3" />
              <span>{level.ministry}</span>
            </div>
            <CardTitle>{level.ministry}</CardTitle>
            <CardDescription>Détail budgétaire et exécution par entité</CardDescription>
          </CardHeader>
        </Card>
        <BudgetBreakdown label={level.ministry} taux={ministryTaux} scale={8} />
        <Card>
          <CardHeader>
            <CardTitle>Exécution par entité</CardTitle>
            <CardDescription>Cliquez sur une entité pour voir son détail budgétaire</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {!ministry || ministry.entites.length === 0 ? (
              <p className="py-4 text-sm text-muted-foreground">Aucune entité détaillée disponible pour ce ministère.</p>
            ) : (
              <>
                {ministry.entites.map((e) => (
                  <button
                    key={e.name}
                    type="button"
                    onClick={() => setLevel({ depth: 2, ministry: level.ministry, entite: e.name })}
                    className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md px-1 py-0.5 text-left transition-colors hover:bg-muted/50"
                  >
                    <div>
                      <p className="mb-1 text-[11px] leading-tight text-foreground">{e.name}</p>
                      <ExecutionBar value={e.taux} />
                    </div>
                    <span className="w-11 text-right text-[11px] font-bold text-foreground">
                      <CountUp value={`${e.taux.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}%`} />
                    </span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </button>
                ))}
                <ScaleLegend />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (level.depth === 2) {
    const ministry = MINISTRY_ENTITIES.find((m) => m.name === level.ministry)
    const entite = ministry?.entites.find((e) => e.name === level.entite)
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="gap-1.5">
            <div className="flex flex-wrap items-center gap-1 text-[11px] font-medium text-muted-foreground">
              <button type="button" onClick={() => setLevel({ depth: 0 })} className="hover:text-foreground hover:underline">
                Ministères
              </button>
              <ChevronRight className="size-3" />
              <button
                type="button"
                onClick={() => setLevel({ depth: 1, ministry: level.ministry })}
                className="hover:text-foreground hover:underline"
              >
                {level.ministry}
              </button>
              <ChevronRight className="size-3" />
              <span>{level.entite}</span>
            </div>
            <CardTitle>Détail budgétaire — {level.entite}</CardTitle>
            <CardDescription>{level.ministry} — données de démonstration</CardDescription>
          </CardHeader>
        </Card>
        <BudgetBreakdown label={level.entite} taux={entite?.taux ?? 25} />
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Exécution des dépenses par ministère</CardTitle>
        <CardDescription>(taux d&apos;exécution à date) — cliquez sur un ministère pour voir le détail par entité</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2.5">
        {data.map((m) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setLevel({ depth: 1, ministry: m.name })}
            className="grid w-full grid-cols-[1fr_auto_auto] items-center gap-3 rounded-md px-1 py-0.5 text-left transition-colors hover:bg-muted/50"
          >
            <div>
              <p className="mb-1 text-[11px] leading-tight text-foreground">{m.name}</p>
              <ExecutionBar value={m.value} />
            </div>
            <span className="w-11 text-right text-[11px] font-bold text-foreground">
              <CountUp value={`${m.value.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}%`} />
            </span>
            <ChevronRight className="size-4 text-muted-foreground" />
          </button>
        ))}
        <ScaleLegend />
      </CardContent>
    </Card>
  )
}
