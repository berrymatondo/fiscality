'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, AlertTriangle, Banknote, Coins, FileCheck2, Landmark, Search, ShieldAlert, TrendingDown, Trophy, X, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { budgetSections, budgetSectionTotal } from '@/lib/budget-sections'
import { cn } from '@/lib/utils'
import { DualCurrencyAmount, useExchangeRate } from '@/components/dashboard/currency'
import { CountUp } from '@/components/dashboard/count-up'

const columns = [
  ['voted', 'Crédits votés'],
  ['linear', 'Prévisions linéaires'],
  ['execution', 'Exécution'],
] as const

type RawSection = (typeof budgetSections)[number]
type Risk = 'Critique' | 'À surveiller' | 'Normal' | 'Dépassement'

const toNumber = (value: string) => Number(value.replaceAll(' ', ''))
const rateValue = (value: string) => Number(value.replace(',', '.'))
const compact = (value: number) => `${(value / 1e12).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} Bn`
const billions = (value: number) => `${(value / 1e9).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mrd`
const rateOf = (row: RawSection) => rateValue(row.rate)
const riskOf = (row: RawSection): Risk => {
  const rate = rateOf(row)
  if (rate < 30) return 'Critique'
  if (rate < 60) return 'À surveiller'
  if (rate > 100) return 'Dépassement'
  return 'Normal'
}

const riskStyle: Record<Risk, string> = {
  Critique: 'border border-destructive/25 bg-destructive/10 text-destructive dark:border-red-300/35 dark:bg-red-950/70 dark:text-red-200',
  'À surveiller': 'bg-warning/15 text-warning-foreground',
  Normal: 'bg-success/10 text-success',
  Dépassement: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
}

function RiskBadge({ risk }: { risk: Risk }) {
  const Icon = risk === 'Normal' ? FileCheck2 : risk === 'Critique' ? AlertCircle : AlertTriangle
  return <span className={cn('inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-1 text-[10px] font-bold', riskStyle[risk])}><Icon className="h-3 w-3" />{risk}</span>
}

function Ranking({ title, rows, value, icon: Icon, tone }: { title: string; rows: RawSection[]; value: (row: RawSection) => string; icon: LucideIcon; tone: string }) {
  return (
    <Card className="overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className={cn('h-1', tone)} />
      <CardHeader><CardTitle className="flex items-center gap-2"><span className={cn('flex h-8 w-8 items-center justify-center rounded-lg text-white', tone)}><Icon className="h-4 w-4" /></span>{title}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        {rows.map((row, index) => (
          <button key={row.number} onClick={() => document.getElementById(`section-${row.number}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })} className="grid w-full grid-cols-[20px_1fr_auto] items-center gap-2 text-left">
            <span className={cn('flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-black text-white', tone)}>{index + 1}</span>
            <span className="truncate text-[11px] font-medium text-foreground">{row.section}</span>
            <span className="text-[11px] font-bold text-foreground">{value(row)}</span>
          </button>
        ))}
      </CardContent>
    </Card>
  )
}

export function TrackingTable() {
  const exchangeRate = useExchangeRate()
  const [query, setQuery] = useState('')
  const [riskFilter, setRiskFilter] = useState<Risk | 'Tous'>('Tous')
  const [selected, setSelected] = useState<RawSection | null>(null)

  const analytics = useMemo(() => {
    const byBudget = [...budgetSections].sort((a, b) => toNumber(b.voted) - toNumber(a.voted))
    const lowExecution = [...budgetSections].filter((r) => toNumber(r.voted) > 0).sort((a, b) => rateOf(a) - rateOf(b))
    const overruns = [...budgetSections].filter((r) => rateOf(r) > 100).sort((a, b) => rateOf(b) - rateOf(a))
    const gaps = [...budgetSections].sort((a, b) => (toNumber(b.linear) - toNumber(b.execution)) - (toNumber(a.linear) - toNumber(a.execution)))
    const counts = budgetSections.reduce<Record<Risk, number>>((acc, row) => { acc[riskOf(row)]++; return acc }, { Critique: 0, 'À surveiller': 0, Normal: 0, Dépassement: 0 })
    return { byBudget, lowExecution, overruns, gaps, counts }
  }, [])

  const rows = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('fr')
    return budgetSections.filter((row) => {
      const matchesSearch = !normalized || row.number.includes(normalized) || row.section.toLocaleLowerCase('fr').includes(normalized)
      return matchesSearch && (riskFilter === 'Tous' || riskOf(row) === riskFilter)
    })
  }, [query, riskFilter])

  const totalVoted = toNumber(budgetSectionTotal.voted)
  const totalLinear = toNumber(budgetSectionTotal.linear)
  const totalExecution = toNumber(budgetSectionTotal.execution)
  const usd = (value: number) => `${(value / exchangeRate).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} USD`

  const kpis = [
    { label: 'Crédits votés', value: compact(totalVoted), detail: 'Base budgétaire', raw: totalVoted, icon: Landmark, tone: 'from-blue-600 to-blue-500', soft: 'bg-blue-500/10 text-blue-600' },
    { label: 'Prévision linéaire', value: compact(totalLinear), detail: 'Cible du semestre', raw: totalLinear, icon: FileCheck2, tone: 'from-violet-600 to-indigo-500', soft: 'bg-violet-500/10 text-violet-600' },
    { label: 'Exécution', value: compact(totalExecution), detail: `${(totalExecution / totalLinear * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}% de la prévision`, raw: totalExecution, icon: Banknote, tone: 'from-emerald-600 to-teal-500', soft: 'bg-emerald-500/10 text-emerald-600' },
    { label: 'Écart à la prévision', value: compact(totalLinear - totalExecution), detail: 'Prévision linéaire non exécutée', raw: totalLinear - totalExecution, icon: Coins, tone: 'from-amber-500 to-orange-500', soft: 'bg-amber-500/10 text-amber-600' },
    { label: 'Rubriques critiques', value: String(analytics.counts.Critique), detail: 'Exécution inférieure à 30%', icon: ShieldAlert, tone: 'from-red-600 to-rose-500', soft: 'bg-red-500/10 text-red-700 dark:bg-red-950/70 dark:text-red-200' },
    { label: 'Sur-exécutions', value: String(analytics.counts.Dépassement), detail: 'Taux supérieur à 100%', icon: AlertTriangle, tone: 'from-fuchsia-600 to-violet-500', soft: 'bg-fuchsia-500/10 text-fuchsia-600' },
  ]

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-7 text-white shadow-lg md:px-8">
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-blue-100/70">Premier semestre 2026</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Cockpit de pilotage ESB</h2>
            <p className="mt-2 text-[13px] text-blue-100/80">Dépenses du Budget général par rubrique, à fin juin 2026.</p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
            <Banknote className="h-8 w-8 text-emerald-300" />
            <div>
              <p className="text-2xl font-black"><CountUp value={`${budgetSectionTotal.rate}%`} /></p>
              <p className="text-[9px] uppercase tracking-wider text-blue-100/70">Taux global</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map(({ label, value, detail, icon: Icon, tone, soft, ...item }) => (
          <Card key={label} className="group relative overflow-hidden p-4 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', tone)} />
            <div className="flex items-start justify-between gap-2"><p className="text-[9px] font-semibold uppercase text-muted-foreground">{label}</p><span className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110', soft)}><Icon className="h-4 w-4" /></span></div>
            <p className="mt-2 text-xl font-extrabold text-foreground"><CountUp value={value} /></p>
            {item.raw !== undefined && <p className="text-[9px] text-muted-foreground">≈ {usd(item.raw)}</p>}
            <p className="mt-1 text-[10px] text-muted-foreground">{detail}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Ranking title="Plus gros budgets" icon={Trophy} tone="bg-blue-600" rows={analytics.byBudget.slice(0, 5)} value={(r) => compact(toNumber(r.voted))} />
        <Ranking title="Plus faibles exécutions" icon={TrendingDown} tone="bg-red-500" rows={analytics.lowExecution.slice(0, 5)} value={(r) => `${rateOf(r).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%`} />
        <Ranking title="Plus fortes sur-exécutions" icon={AlertTriangle} tone="bg-violet-600" rows={analytics.overruns.slice(0, 5)} value={(r) => `${rateOf(r).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%`} />
        <Ranking title="Plus grands écarts" icon={Coins} tone="bg-amber-500" rows={analytics.gaps.slice(0, 5)} value={(r) => billions(toNumber(r.linear) - toNumber(r.execution))} />
      </div>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-3"><CardTitle>Alertes et détail par rubrique</CardTitle><span className="text-xs text-muted-foreground">{rows.length} rubrique{rows.length > 1 ? 's' : ''}</span></div>
          <div className="flex flex-col gap-2 lg:flex-row">
            <label className="relative block flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une rubrique..." className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
            <div className="flex flex-wrap gap-1.5">
              {(['Tous', 'Critique', 'À surveiller', 'Dépassement', 'Normal'] as const).map((risk) => <button key={risk} onClick={() => setRiskFilter(risk)} className={cn('rounded-md border px-2.5 py-2 text-[10px] font-semibold', riskFilter === risk ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground')}>{risk}{risk !== 'Tous' && ` (${analytics.counts[risk]})`}</button>)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-[70vh] overflow-auto px-0 pt-1">
          <table className="w-full min-w-[1000px] border-collapse text-left text-[11px] tabular-nums">
            <thead className="sticky top-0 z-10 bg-muted text-[10px] uppercase text-muted-foreground shadow-sm"><tr><th className="w-14 px-4 py-3 text-center">N°</th><th className="min-w-80 px-4 py-3">Rubriques</th>{columns.map(([key, label]) => <th key={key} className="min-w-44 px-4 py-3 text-right">{label}</th>)}<th className="px-4 py-3 text-right">Taux</th><th className="px-4 py-3 text-center">Alerte</th></tr></thead>
            <tbody>{rows.map((row) => { const risk = riskOf(row); return <tr id={`section-${row.number}`} key={row.number} onClick={() => setSelected(row)} className="cursor-pointer border-t border-border hover:bg-muted/40"><td className="px-4 py-3 text-center text-muted-foreground">{row.number}</td><td className="px-4 py-3 font-semibold text-foreground">{row.section}</td>{columns.map(([key]) => <td key={key} className="whitespace-nowrap px-4 py-3 text-right"><DualCurrencyAmount value={toNumber(row[key])} className="items-end" dual /></td>)}<td className="px-4 py-3 text-right font-bold text-primary">{rateOf(row).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</td><td className="px-4 py-3 text-center"><RiskBadge risk={risk} /></td></tr> })}</tbody>
            {riskFilter === 'Tous' && !query && <tfoot className="sticky bottom-0 bg-primary text-primary-foreground"><tr className="font-bold"><td /><td className="px-4 py-3">TOTAL GÉNÉRAL</td>{columns.map(([key]) => <td key={key} className="whitespace-nowrap px-4 py-3 text-right"><DualCurrencyAmount value={toNumber(budgetSectionTotal[key])} className="items-end" secondaryClassName="text-primary-foreground/70" dual /></td>)}<td className="px-4 py-3 text-right"><CountUp value={`${budgetSectionTotal.rate}%`} /></td><td /></tr></tfoot>}
          </table>
          {!rows.length && <p className="py-10 text-center text-sm text-muted-foreground">Aucune rubrique trouvée.</p>}
        </CardContent>
      </Card>

      {selected && (
        <div className="animate-in fade-in-0 fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-4 duration-200" onClick={() => setSelected(null)}>
          <div role="dialog" aria-modal="true" aria-label={selected.section} className="animate-in fade-in-0 zoom-in-95 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl bg-card p-6 shadow-2xl duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div><p className="text-xs text-muted-foreground">Rubrique {selected.number}</p><h3 className="mt-1 text-lg font-bold text-foreground">{selected.section}</h3></div>
              <button onClick={() => setSelected(null)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button>
            </div>
            <div className="mt-5 flex items-center gap-2"><RiskBadge risk={riskOf(selected)} /><span className="text-sm font-bold text-primary">{rateOf(selected).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}% exécuté</span></div>
            <div className="mt-6 space-y-3">
              {columns.map(([key, label]) => (
                <div key={key} className="flex items-center justify-between gap-4 border-b border-border pb-3 text-sm"><span className="text-muted-foreground">{label}</span><DualCurrencyAmount value={toNumber(selected[key])} className="items-end" dual /></div>
              ))}
            </div>
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-xs font-bold uppercase text-foreground">Diagnostic de pilotage</p>
              <p className="mt-3 text-sm text-muted-foreground">Écart à la prévision linéaire : <strong className="text-foreground">{billions(toNumber(selected.linear) - toNumber(selected.execution))} CDF</strong></p>
            </div>
          </div>
        </div>
      )}

      <p className="text-[11px] text-muted-foreground">Source : Ministère du Budget - Rapport d'exécution du budget du pouvoir central au premier semestre 2026, tableau n° 11.</p>
    </>
  )
}
