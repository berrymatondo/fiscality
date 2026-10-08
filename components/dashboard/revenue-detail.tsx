'use client'

import { useState } from 'react'
import { Banknote, CheckCircle2, Coins, FileCheck2, Info, Landmark, TrendingDown } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DualCurrencyAmount } from '@/components/dashboard/currency'
import { CountUp } from '@/components/dashboard/count-up'
import { revenueTables, type RevenueRow, type RevenueTable } from '@/lib/recettes-mobilisees'
import { expenseTables } from '@/lib/depenses-executees'
import { cn } from '@/lib/utils'

const formatRate = (rate: number) => `${rate.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`

const rateTone = (rate: number) => {
  if (rate < 30) return { text: 'text-destructive', bar: 'bg-destructive' }
  if (rate < 60) return { text: 'text-warning-foreground', bar: 'bg-warning' }
  if (rate > 100) return { text: 'text-violet-700 dark:text-violet-300', bar: 'bg-violet-500' }
  return { text: 'text-success', bar: 'bg-success' }
}

function RateCell({ rate }: { rate: number | null }) {
  if (rate === null) return <span className="text-muted-foreground">—</span>
  const tone = rateTone(rate)
  return (
    <span className="inline-flex flex-col items-end gap-1">
      <span className={cn('font-bold', tone.text)}>{formatRate(rate)}</span>
      <span className="h-1 w-16 overflow-hidden rounded-full bg-muted">
        <span className={cn('block h-full rounded-full', tone.bar)} style={{ width: `${Math.min(rate, 100)}%` }} />
      </span>
    </span>
  )
}

function AmountCell({ value, secondaryClassName }: { value: number | null; secondaryClassName?: string }) {
  if (value === null) return <span className="text-muted-foreground">—</span>
  return <DualCurrencyAmount value={value} className="items-end" secondaryClassName={secondaryClassName} dual animate={false} />
}

const rowStyle = (row: RevenueRow) =>
  row.level === 0 ? 'bg-muted/40 font-bold text-foreground' : row.level === 1 ? 'font-semibold text-foreground' : 'text-muted-foreground'

type DetailLabels = {
  title: string
  real: string
  rate: string
  under: string
  over: string
}

const revenueLabels: DetailLabels = {
  title: 'Recettes mobilisées à fin juin 2026',
  real: 'Réalisations à fin juin',
  rate: 'Taux de réalisation',
  under: 'Moins-value',
  over: 'Plus-value',
}

const expenseLabels: DetailLabels = {
  title: 'Dépenses exécutées à fin juin 2026',
  real: 'Exécution à fin juin',
  rate: "Taux d'exécution",
  under: 'Sous-exécution',
  over: 'Sur-exécution',
}

const noteStyle = {
  positive: { box: 'border-success/30 bg-success/5', icon: <CheckCircle2 className="h-4 w-4 text-success" /> },
  negative: { box: 'border-warning/40 bg-warning/5', icon: <TrendingDown className="h-4 w-4 text-warning-foreground" /> },
  info: { box: 'border-primary/25 bg-primary/5', icon: <Info className="h-4 w-4 text-primary" /> },
}

export function RevenueDetail() {
  return <ExecutionDetail tables={revenueTables} labels={revenueLabels} />
}

export function ExpenseDetail() {
  return <ExecutionDetail tables={expenseTables} labels={expenseLabels} />
}

function ExecutionDetail({ tables, labels }: { tables: RevenueTable[]; labels: DetailLabels }) {
  const [activeId, setActiveId] = useState(tables[0].id)
  const table = tables.find((t) => t.id === activeId) ?? tables[0]
  const { total } = table
  const gap = (total.linear ?? 0) - (total.real ?? 0)

  const kpis = [
    { label: 'Crédits votés (LFR 2026)', value: total.vote, icon: Landmark, soft: 'bg-blue-500/10 text-blue-600' },
    { label: 'Prévisions linéaires 6 mois', value: total.linear, icon: FileCheck2, soft: 'bg-violet-500/10 text-violet-600' },
    { label: labels.real, value: total.real, icon: Banknote, soft: 'bg-emerald-500/10 text-emerald-600' },
    { label: gap >= 0 ? labels.under : labels.over, value: Math.abs(gap), icon: gap >= 0 ? TrendingDown : Coins, soft: 'bg-amber-500/10 text-amber-600' },
  ]

  return (
    <Card>
      <CardHeader className="gap-3">
        <div>
          <CardTitle>{labels.title}</CardTitle>
          <CardDescription>Détail par rubrique · Loi de finances rectificative 2026</CardDescription>
        </div>
        <div role="tablist" className="flex flex-wrap gap-1.5">
          {tables.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={t.id === activeId}
              onClick={() => setActiveId(t.id)}
              className={cn(
                'rounded-md border px-2.5 py-1.5 text-[11px] font-semibold transition-colors',
                t.id === activeId ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground hover:bg-accent',
              )}
            >
              {t.tab}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
          <h3 className="text-[14px] font-bold text-foreground">{table.title}</h3>
          {total.rate !== null && (
            <span className={cn('text-[12px] font-semibold', rateTone(total.rate).text)}>
              {labels.rate} : <CountUp value={formatRate(total.rate)} />
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
          {kpis.map(({ label, value, icon: Icon, soft }) => (
            <div key={label} className="rounded-lg border border-border p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[9px] font-semibold uppercase text-muted-foreground">{label}</p>
                <span className={cn('flex h-7 w-7 items-center justify-center rounded-md', soft)}><Icon className="h-3.5 w-3.5" /></span>
              </div>
              {value !== null && <DualCurrencyAmount value={value / 1e9} scale="billion" className="mt-1 text-lg font-extrabold text-foreground" dual />}
            </div>
          ))}
        </div>

        <div className="max-h-[70vh] overflow-auto rounded-lg border border-border">
          <table className="w-full min-w-[900px] border-collapse text-left text-[11px] tabular-nums">
            <thead className="sticky top-0 z-10 bg-muted text-[10px] uppercase text-muted-foreground shadow-sm">
              <tr>
                <th className="min-w-80 px-4 py-3">Rubriques</th>
                <th className="min-w-40 px-4 py-3 text-right">Voté</th>
                <th className="min-w-40 px-4 py-3 text-right">Prévisions linéaires 6 mois</th>
                <th className="min-w-40 px-4 py-3 text-right">{labels.real}</th>
                <th className="px-4 py-3 text-right">Taux</th>
              </tr>
            </thead>
            <tbody>
              {table.rows.map((row, index) => (
                <tr key={`${row.label}-${index}`} className={cn('border-t border-border hover:bg-muted/50', rowStyle(row))}>
                  <td className="px-4 py-2.5" style={{ paddingLeft: `${16 + row.level * 18}px` }}>
                    {row.code && <span className="mr-2 inline-block min-w-6 text-muted-foreground">{row.code}</span>}
                    {row.label}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right"><AmountCell value={row.vote} /></td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right"><AmountCell value={row.linear} /></td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right"><AmountCell value={row.real} /></td>
                  <td className="px-4 py-2.5 text-right"><RateCell rate={row.rate} /></td>
                </tr>
              ))}
            </tbody>
            <tfoot className="sticky bottom-0 bg-primary text-primary-foreground">
              <tr className="font-bold">
                <td className="px-4 py-3 uppercase">{total.label}</td>
                {([total.vote, total.linear, total.real] as const).map((value, i) => (
                  <td key={i} className="whitespace-nowrap px-4 py-3 text-right">
                    <AmountCell value={value} secondaryClassName="text-primary-foreground/70" />
                  </td>
                ))}
                <td className="px-4 py-3 text-right">{total.rate !== null ? formatRate(total.rate) : '—'}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {table.notes && (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {table.notes.map((note) => (
              <div
                key={note.title}
                className={cn('rounded-lg border p-4', noteStyle[note.tone].box)}
              >
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase text-foreground">
                  {noteStyle[note.tone].icon}
                  {note.title}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-muted-foreground">
                  {note.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        )}

        <p className="text-[11px] text-muted-foreground">
          Source : {table.source} — Rapport d&apos;exécution du budget du pouvoir central au premier semestre 2026.
        </p>
      </CardContent>
    </Card>
  )
}
