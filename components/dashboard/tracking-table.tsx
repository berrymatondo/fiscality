'use client'

import { useMemo, useState } from 'react'
import { AlertCircle, AlertTriangle, ArrowRight, BadgeDollarSign, Banknote, CheckCircle2, CircleGauge, Coins, FileCheck2, Landmark, ListChecks, Search, ShieldAlert, Sparkles, TrendingDown, Trophy, WalletCards, X, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { budgetSections, budgetSectionTotal } from '@/lib/budget-sections'
import { cn } from '@/lib/utils'
import { DualCurrencyAmount, useExchangeRate } from '@/components/dashboard/currency'
import { CountUp } from '@/components/dashboard/count-up'

const columns = [
  ['voted', 'Créd. votés'], ['adjusted', 'Créd. après virements'],
  ['committed', 'Engagements'], ['liquidated', 'Liquidations'],
  ['ordered', 'Ordonnancements'], ['paid', 'Paiements'],
] as const

type RawSection = (typeof budgetSections)[number]
type Risk = 'Critique' | 'À surveiller' | 'Normal' | 'Dépassement'

const toNumber = (value: string) => Number(value.replaceAll(' ', ''))
const compact = (value: number) => `${(value / 1e12).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} Bn`
const billions = (value: number) => `${(value / 1e9).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} Mrd`
const rateOf = (row: RawSection) => toNumber(row.voted) ? toNumber(row.paid) / toNumber(row.voted) * 100 : 0
const riskOf = (row: RawSection): Risk => {
  if (toNumber(row.committed) > toNumber(row.voted)) return 'Dépassement'
  const rate = rateOf(row)
  if (rate < 30) return 'Critique'
  if (rate < 60) return 'À surveiller'
  return 'Normal'
}

const riskStyle: Record<Risk, string> = {
  Critique: 'border border-destructive/25 bg-destructive/10 text-destructive dark:border-red-300/35 dark:bg-red-950/70 dark:text-red-200',
  'À surveiller': 'bg-warning/15 text-warning-foreground',
  Normal: 'bg-success/10 text-success',
  Dépassement: 'bg-violet-500/10 text-violet-700 dark:text-violet-300',
}

function RiskBadge({ risk }: { risk: Risk }) {
  const Icon = risk === 'Normal' ? CheckCircle2 : risk === 'Critique' ? AlertCircle : AlertTriangle
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
    const overruns = [...budgetSections].filter((r) => toNumber(r.committed) > toNumber(r.voted)).sort((a, b) => (toNumber(b.committed) - toNumber(b.voted)) - (toNumber(a.committed) - toNumber(a.voted)))
    const unpaid = [...budgetSections].sort((a, b) => (toNumber(b.ordered) - toNumber(b.paid)) - (toNumber(a.ordered) - toNumber(a.paid)))
    const counts = budgetSections.reduce<Record<Risk, number>>((acc, row) => { acc[riskOf(row)]++; return acc }, { Critique: 0, 'À surveiller': 0, Normal: 0, Dépassement: 0 })
    return { byBudget, lowExecution, overruns, unpaid, counts }
  }, [])

  const rows = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('fr')
    return budgetSections.filter((row) => {
      const matchesSearch = !normalized || row.number.includes(normalized) || row.section.toLocaleLowerCase('fr').includes(normalized)
      return matchesSearch && (riskFilter === 'Tous' || riskOf(row) === riskFilter)
    })
  }, [query, riskFilter])

  const totalVoted = toNumber(budgetSectionTotal.voted)
  const totalCommitted = toNumber(budgetSectionTotal.committed)
  const totalOrdered = toNumber(budgetSectionTotal.ordered)
  const totalPaid = toNumber(budgetSectionTotal.paid)
  const pipeline = columns.map(([key, label]) => ({ label, value: toNumber(budgetSectionTotal[key]) }))
  const pipelineIcons = [Landmark, WalletCards, FileCheck2, ListChecks, BadgeDollarSign, Banknote]
  const pipelineTones = ['bg-blue-600', 'bg-indigo-600', 'bg-violet-600', 'bg-amber-500', 'bg-orange-500', 'bg-emerald-600']
  const kpis = [
    { label: 'Crédits votés', value: compact(totalVoted), detail: 'Base budgétaire', icon: Landmark, tone: 'from-blue-600 to-blue-500', soft: 'bg-blue-500/10 text-blue-600' },
    { label: 'Engagements', value: compact(totalCommitted), detail: `${(totalCommitted / totalVoted * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}% des crédits`, icon: FileCheck2, tone: 'from-violet-600 to-indigo-500', soft: 'bg-violet-500/10 text-violet-600' },
    { label: 'Paiements', value: compact(totalPaid), detail: `${(totalPaid / totalVoted * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}% des crédits`, icon: Banknote, tone: 'from-emerald-600 to-teal-500', soft: 'bg-emerald-500/10 text-emerald-600' },
    { label: 'Reste à payer', value: compact(totalOrdered - totalPaid), detail: 'Ordonnancé non payé', icon: Coins, tone: 'from-amber-500 to-orange-500', soft: 'bg-amber-500/10 text-amber-600' },
    { label: 'Sections critiques', value: String(analytics.counts.Critique), detail: 'Paiement inférieur à 30%', icon: ShieldAlert, tone: 'from-red-600 to-rose-500', soft: 'bg-red-500/10 text-red-700 dark:bg-red-950/70 dark:text-red-200' },
    { label: 'Dépassements', value: String(analytics.counts.Dépassement), detail: 'Engagements > crédits', icon: AlertTriangle, tone: 'from-fuchsia-600 to-violet-500', soft: 'bg-fuchsia-500/10 text-fuchsia-600' },
  ]
  const usd = (value: number) => `${(value / exchangeRate).toLocaleString('fr-FR', { maximumFractionDigits: 0 })} USD`

  return (
    <>
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-7 text-white shadow-lg md:px-8">
        <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" /><div className="absolute bottom-0 right-1/3 h-28 w-28 rounded-full bg-violet-400/15 blur-2xl" />
        <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em]"><Sparkles className="h-3.5 w-3.5 text-amber-300" />Pilotage intelligent</div><h2 className="text-2xl font-black tracking-tight md:text-3xl">Cockpit de pilotage ESB</h2><p className="mt-2 text-[13px] text-blue-100/80">Une lecture dynamique de la chaîne d’exécution budgétaire par section.</p></div><div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur"><CircleGauge className="h-8 w-8 text-emerald-300" /><div><p className="text-2xl font-black"><CountUp value={`${(totalPaid / totalVoted * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%`} /></p><p className="text-[9px] uppercase tracking-wider text-blue-100/70">Taux global payé</p></div></div></div>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-6">
        {kpis.map(({ label, value, detail, icon: Icon, tone, soft }, index) => (
          <Card key={label} className="group relative overflow-hidden p-4 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', tone)} />
            <div className="flex items-start justify-between gap-2"><p className="text-[9px] font-semibold uppercase text-muted-foreground">{label}</p><span className={cn('flex h-8 w-8 items-center justify-center rounded-lg transition-transform group-hover:scale-110', soft)}><Icon className="h-4 w-4" /></span></div>
            <p className="mt-2 text-xl font-extrabold text-foreground"><CountUp value={value} /></p>
            {index < 4 && <p className="text-[9px] text-muted-foreground">≈ {usd([totalVoted, totalCommitted, totalPaid, totalOrdered - totalPaid][index])}</p>}
            <p className="mt-1 text-[10px] text-muted-foreground">{detail}</p>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Chaîne d’exécution de la dépense</CardTitle></CardHeader>
        <CardContent>
          <div className="grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
            {pipeline.map((step, index) => (
              <div key={step.label} className="contents">
                <div className="group rounded-xl border border-border bg-muted/20 p-3 transition-all hover:border-primary/30 hover:bg-card hover:shadow-md">
                  <div className={cn('mb-2 flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm', pipelineTones[index])}>{(() => { const Icon = pipelineIcons[index]; return <Icon className="h-4 w-4" /> })()}</div>
                  <p className="text-[9px] font-bold uppercase text-muted-foreground">{step.label}</p>
                  <p className="mt-1 text-sm font-extrabold text-foreground"><CountUp value={compact(step.value)} /></p>
                  {index > 0 && <p className="text-[10px] text-muted-foreground"><CountUp value={`${(step.value / pipeline[index - 1].value * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%`} /> de l’étape précédente</p>}
                </div>
                {index < pipeline.length - 1 && <span className="mx-auto hidden h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary lg:flex"><ArrowRight className="h-4 w-4" /></span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Ranking title="Plus gros budgets" icon={Trophy} tone="bg-blue-600" rows={analytics.byBudget.slice(0, 5)} value={(r) => compact(toNumber(r.voted))} />
        <Ranking title="Plus faibles exécutions" icon={TrendingDown} tone="bg-red-500" rows={analytics.lowExecution.slice(0, 5)} value={(r) => `${rateOf(r).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%`} />
        <Ranking title="Plus forts dépassements" icon={AlertTriangle} tone="bg-violet-600" rows={analytics.overruns.slice(0, 5)} value={(r) => `+${billions(toNumber(r.committed) - toNumber(r.voted))}`} />
        <Ranking title="Plus grands restes à payer" icon={Coins} tone="bg-amber-500" rows={analytics.unpaid.slice(0, 5)} value={(r) => billions(toNumber(r.ordered) - toNumber(r.paid))} />
      </div>

      <Card>
        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-3"><CardTitle>Alertes et détail par section</CardTitle><span className="text-xs text-muted-foreground">{rows.length} section{rows.length > 1 ? 's' : ''}</span></div>
          <div className="flex flex-col gap-2 lg:flex-row">
            <label className="relative block flex-1"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une section…" className="h-9 w-full rounded-md border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring" /></label>
            <div className="flex flex-wrap gap-1.5">
              {(['Tous', 'Critique', 'À surveiller', 'Dépassement', 'Normal'] as const).map((risk) => <button key={risk} onClick={() => setRiskFilter(risk)} className={cn('rounded-md border px-2.5 py-2 text-[10px] font-semibold', riskFilter === risk ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-background text-foreground')}>{risk}{risk !== 'Tous' && ` (${analytics.counts[risk]})`}</button>)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="max-h-[70vh] overflow-auto px-0 pt-1">
          <table className="w-full min-w-[1600px] border-collapse text-left text-[11px] tabular-nums">
            <thead className="sticky top-0 z-10 bg-muted text-[10px] uppercase text-muted-foreground shadow-sm"><tr><th className="w-14 px-4 py-3 text-center">N°</th><th className="min-w-80 px-4 py-3">Sections</th>{columns.map(([key, label]) => <th key={key} className="min-w-44 px-4 py-3 text-right">{label}</th>)}<th className="px-4 py-3 text-right">Taux payé</th><th className="px-4 py-3 text-center">Alerte</th></tr></thead>
            <tbody>{rows.map((row) => { const risk = riskOf(row); return <tr id={`section-${row.number}`} key={row.number} onClick={() => setSelected(row)} className="cursor-pointer border-t border-border hover:bg-muted/40"><td className="px-4 py-3 text-center text-muted-foreground">{row.number}</td><td className="px-4 py-3 font-semibold text-foreground">{row.section}</td>{columns.map(([key]) => <td key={key} className="whitespace-nowrap px-4 py-3 text-right"><DualCurrencyAmount value={toNumber(row[key])} className="items-end" dual /></td>)}<td className="px-4 py-3 text-right font-bold text-primary">{rateOf(row).toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%</td><td className="px-4 py-3 text-center"><RiskBadge risk={risk} /></td></tr> })}</tbody>
            {riskFilter === 'Tous' && !query && <tfoot className="sticky bottom-0 bg-primary text-primary-foreground"><tr className="font-bold"><td /><td className="px-4 py-3">TOTAL GÉNÉRAL</td>{columns.map(([key]) => <td key={key} className="whitespace-nowrap px-4 py-3 text-right"><DualCurrencyAmount value={toNumber(budgetSectionTotal[key])} className="items-end" secondaryClassName="text-primary-foreground/70" dual /></td>)}<td className="px-4 py-3 text-right"><CountUp value="86,9%" /></td><td /></tr></tfoot>}
          </table>
          {!rows.length && <p className="py-10 text-center text-sm text-muted-foreground">Aucune section trouvée.</p>}
        </CardContent>
      </Card>

      {selected && <div className="fixed inset-0 z-50 flex justify-end bg-foreground/30" onClick={() => setSelected(null)}><aside className="h-full w-full max-w-lg overflow-y-auto bg-card p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}><div className="flex items-start justify-between gap-4"><div><p className="text-xs text-muted-foreground">Section {selected.number}</p><h3 className="mt-1 text-lg font-bold text-foreground">{selected.section}</h3></div><button onClick={() => setSelected(null)} className="rounded-md p-2 hover:bg-muted"><X className="h-5 w-5" /></button></div><div className="mt-5 flex items-center gap-2"><RiskBadge risk={riskOf(selected)} /><span className="text-sm font-bold text-primary">{rateOf(selected).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}% payé</span></div><div className="mt-6 space-y-3">{columns.map(([key, label]) => <div key={key} className="flex justify-between gap-4 border-b border-border pb-3 text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold tabular-nums">{selected[key]} CDF</span></div>)}</div><div className="mt-6 rounded-lg bg-muted/50 p-4"><p className="text-xs font-bold uppercase text-foreground">Diagnostic de pilotage</p><div className="mt-3 space-y-2 text-sm text-muted-foreground"><p className="flex items-center gap-2"><TrendingDown className="h-4 w-4" />Reste à payer : <strong className="text-foreground">{billions(toNumber(selected.ordered) - toNumber(selected.paid))} CDF</strong></p>{riskOf(selected) === 'Dépassement' && <p className="flex items-start gap-2 text-violet-700 dark:text-violet-300"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />Les engagements dépassent les crédits votés de {billions(toNumber(selected.committed) - toNumber(selected.voted))} CDF.</p>}{riskOf(selected) === 'Critique' && <p className="flex items-start gap-2 text-destructive"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />Exécution très faible : revue immédiate des blocages recommandée.</p>}{riskOf(selected) === 'À surveiller' && <p className="flex items-start gap-2 text-warning-foreground"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />Sous-exécution : demander un plan d’accélération et un échéancier.</p>}</div></div></aside></div>}

      <p className="text-[11px] text-muted-foreground">Source : Ministère du Budget — ESB des dépenses par section, édition du 07/08/2026.</p>
    </>
  )
}
