'use client'

import { useState } from 'react'
import { Building2, CalendarRange, Layers3, Map } from 'lucide-react'
import { MinistryChart } from '@/components/dashboard/ministry-chart'
import { ProvinceMap } from '@/components/dashboard/province-map'
import { DonutCard } from '@/components/dashboard/donut-card'
import { BudgetExecutionChart } from '@/components/dashboard/budget-execution-chart'
import { expenseBreakdown } from '@/lib/data'
import { cn } from '@/lib/utils'

const dimensions = [
  { id: 'ministere', label: 'Ministère', icon: Building2 },
  { id: 'province', label: 'Province', icon: Map },
  { id: 'nature', label: 'Nature économique', icon: Layers3 },
  { id: 'periode', label: 'Période', icon: CalendarRange },
] as const

type Dimension = (typeof dimensions)[number]['id']

export function AnalysisView() {
  const [dimension, setDimension] = useState<Dimension>('ministere')

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap gap-2 rounded-xl border border-border bg-card p-2">
        {dimensions.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setDimension(id)} className={cn('inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12px] font-semibold transition-colors', dimension === id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-accent hover:text-foreground')}>
            <Icon className="h-4 w-4" />{label}
          </button>
        ))}
      </div>
      {dimension === 'ministere' && <MinistryChart />}
      {dimension === 'province' && <ProvinceMap />}
      {dimension === 'nature' && <DonutCard title="Dépenses par nature économique" description="Répartition à date" data={expenseBreakdown} centerValue="39 735,6" centerUnit="Mrd CDF" />}
      {dimension === 'periode' && <BudgetExecutionChart />}
    </section>
  )
}
