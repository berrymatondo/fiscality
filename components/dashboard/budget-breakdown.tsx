'use client'

import { HandCoins, Wallet, type LucideIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { DonutCard } from '@/components/dashboard/donut-card'
import { DualCurrencyAmount } from '@/components/dashboard/currency'
import { CountUp } from '@/components/dashboard/count-up'
import { revenueBreakdown, expenseBreakdown } from '@/lib/data'
import { cn } from '@/lib/utils'

/** Hash simple et déterministe — permet de varier les montants de démonstration par entité. */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0
  }
  return hash
}

function entityFinances(label: string, baseTaux: number, scale: number) {
  const hash = hashString(label)
  const recettes = Math.round((20 + (hash % 140)) * scale)
  const depenses = Math.round(recettes * (2.6 + ((hash >> 8) % 20) / 100))
  const tauxRecettes = Math.min(95, Math.max(10, baseTaux + ((hash >> 4) % 11) - 5))
  const tauxDepenses = Math.min(98, Math.max(30, tauxRecettes + 35 + ((hash >> 12) % 15)))
  return { recettes, depenses, tauxRecettes, tauxDepenses }
}

function MiniKpi({
  label,
  value,
  taux,
  icon: Icon,
  tone,
}: {
  label: string
  value: number
  taux: number
  icon: LucideIcon
  tone: 'success' | 'info'
}) {
  const iconClass = tone === 'success' ? 'bg-success text-success-foreground' : 'bg-primary text-primary-foreground'
  const valueClass = tone === 'success' ? 'text-success' : 'text-primary'
  return (
    <Card className="p-4">
      <p className="text-[10px] font-semibold uppercase leading-tight text-foreground">{label}</p>
      <p className="text-[9px] uppercase text-muted-foreground">(cumul à date — démonstration)</p>
      <div className="mt-3 flex items-center gap-3">
        <div className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-full', iconClass)}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="leading-tight">
          <DualCurrencyAmount value={value} scale="billion" className={cn('text-xl font-extrabold', valueClass)} />
          <p className="mt-0.5 text-[10px] text-muted-foreground">
            Taux d&apos;exécution{' '}
            <span className="font-bold text-foreground">
              <CountUp value={`${taux}%`} />
            </span>
          </p>
        </div>
      </div>
    </Card>
  )
}

export function BudgetBreakdown({ label, taux, scale = 1 }: { label: string; taux: number; scale?: number }) {
  const { recettes, depenses, tauxRecettes, tauxDepenses } = entityFinances(label, taux, scale)

  return (
    <div className="animate-fade-up flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MiniKpi label="Recettes totales" value={recettes} taux={tauxRecettes} icon={HandCoins} tone="success" />
        <MiniKpi label="Dépenses totales" value={depenses} taux={tauxDepenses} icon={Wallet} tone="info" />
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DonutCard
          title="Répartition des recettes à date"
          description="(en %)"
          data={revenueBreakdown}
          centerValue={recettes.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}
          centerUnit="Mrd CDF"
        />
        <DonutCard
          title="Répartition des dépenses à date par nature"
          description="(en %)"
          data={expenseBreakdown}
          centerValue={depenses.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}
          centerUnit="Mrd CDF"
        />
      </div>
    </div>
  )
}
