'use client'

import { HandCoins, Landmark, Scale, Wallet, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { BudgetExecutionChart } from '@/components/dashboard/budget-execution-chart'
import { DualCurrencyAmount } from '@/components/dashboard/currency'
import { decideurKpis } from '@/lib/data'
import { cn } from '@/lib/utils'

const icons: Record<(typeof decideurKpis)[number]['icon'], LucideIcon> = { HandCoins, Wallet, Scale, Landmark }

const tones = {
  success: { icon: 'bg-success text-success-foreground', value: 'text-success', bar: 'bg-success' },
  info: { icon: 'bg-primary text-primary-foreground', value: 'text-primary', bar: 'bg-primary' },
  violet: { icon: 'bg-[oklch(0.55_0.16_300)] text-white', value: 'text-[oklch(0.5_0.16_300)]', bar: 'bg-[oklch(0.55_0.16_300)]' },
  warning: { icon: 'bg-warning text-warning-foreground', value: 'text-warning', bar: 'bg-warning' },
} as const

/** Accueil simplifié du profil Décideur (DG/DGA) : quatre agrégats et le graphique d'exécution, sans taux ni indicateurs. */
export function DecideurOverview() {
  return (
    <>
      <div className="animate-fade-up grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" style={{ animationDelay: '80ms' }}>
        {decideurKpis.map((kpi) => {
          const Icon = icons[kpi.icon]
          const tone = tones[kpi.tone]
          return (
            <Card key={kpi.label} className="relative overflow-hidden p-5">
              <div className={cn('absolute inset-x-0 top-0 h-1', tone.bar)} />
              <div className="flex items-center gap-3">
                <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-xl', tone.icon)}>
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-wide text-foreground">{kpi.label}</p>
                  <p className="text-[11px] text-muted-foreground">{kpi.sublabel}</p>
                </div>
              </div>
              {kpi.value === null ? (
                <p className="mt-5 text-[15px] font-semibold text-muted-foreground">Données à publier</p>
              ) : (
                <DualCurrencyAmount value={kpi.value} scale="billion" className={cn('mt-5 text-3xl font-extrabold tabular-nums', tone.value)} />
              )}
            </Card>
          )
        })}
      </div>

      <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
        <BudgetExecutionChart showRates={false} />
      </div>
    </>
  )
}
