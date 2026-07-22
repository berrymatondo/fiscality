import {
  HandCoins,
  Wallet,
  Scale,
  Coins,
  Landmark,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { CountUp } from '@/components/dashboard/count-up'
import { kpis } from '@/lib/data'
import { cn } from '@/lib/utils'

const icons: Record<string, LucideIcon> = {
  HandCoins,
  Wallet,
  Scale,
  Coins,
  Landmark,
  TrendingUp,
}

const iconStyles: Record<string, string> = {
  success: 'bg-success text-success-foreground',
  info: 'bg-primary text-primary-foreground',
  violet: 'bg-[oklch(0.55_0.16_300)] text-white',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-white',
}

const valueStyles: Record<string, string> = {
  success: 'text-success',
  info: 'text-primary',
  violet: 'text-[oklch(0.5_0.16_300)]',
  warning: 'text-warning',
  destructive: 'text-destructive',
}

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi, index) => {
        const Icon = icons[kpi.icon]
        return (
          <Card
            key={kpi.label + kpi.sublabel}
            className="group wow-card wow-shine animate-fade-up p-4"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-[10px] font-semibold uppercase leading-tight text-foreground">
                {kpi.label}
              </p>
              {kpi.sublabel && (
                <p className="text-[9px] uppercase text-muted-foreground">
                  {kpi.sublabel}
                </p>
              )}
            </div>

            <div className="mt-3 flex items-center gap-3">
              <div
                className={cn(
                  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110',
                  iconStyles[kpi.color],
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <CountUp
                  value={kpi.value}
                  className={cn('text-xl font-extrabold', valueStyles[kpi.color])}
                />
                {kpi.unit && (
                  <span className="ml-1 text-[10px] font-semibold text-muted-foreground">
                    {kpi.unit}
                  </span>
                )}
                {kpi.meta && (
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {kpi.meta}{' '}
                    <span className="font-bold text-foreground">{kpi.metaValue}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-[10px]">
              <span className="text-muted-foreground">{kpi.compareLabel}</span>
              <span
                className={cn(
                  'font-bold',
                  kpi.compareTone === 'positive' ? 'text-success' : 'text-destructive',
                )}
              >
                {kpi.compareValue}
              </span>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
