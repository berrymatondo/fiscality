'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowDownRight, ArrowUpRight, CalendarClock, FileText, HandCoins, Info, Landmark, Scale, Wallet, type LucideIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DualCurrencyAmount } from '@/components/dashboard/currency'
import { DonutCard } from '@/components/dashboard/donut-card'
import { getExerciceInfo } from '@/lib/exercices'
import {
  actionsPhares2027,
  contexteInternational2027,
  depensesPlf2027,
  equilibrePlf2027,
  macroPlf2027,
  mesuresFiscales2027,
  naturesDepensesPlf2027,
  piliersPag2027,
  recettesPlf2027,
  retrocessionProvinces2027,
  soldesPlf2027,
  totalPiliersPag2027,
  trajectoireRecettes,
  type PlfRow,
  type PlfTable,
} from '@/lib/exercices/2027'
import { cn } from '@/lib/utils'

// Vues « Prévisions » de l'exercice 2027 (projet de loi de finances, aucune exécution).

const COLORS = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)', 'oklch(0.55 0.16 300)', 'var(--chart-4)', 'oklch(0.62 0.14 200)']
const mrd = (fc: number | null) => (fc ?? 0) / 1e9
const fmt = (v: number, digits = 1) => v.toLocaleString('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits })
const findRow = (table: PlfTable, code: string) => table.rows.find((r) => r.code === code)!

export function PlfBanner() {
  const info = getExerciceInfo(2027)!
  return (
    <div className="animate-fade-up flex flex-col gap-2 rounded-xl border border-violet-500/30 bg-violet-500/5 px-4 py-3 text-[12px] md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 font-semibold text-violet-700 dark:text-violet-300">
        <CalendarClock className="h-4 w-4" />
        Exercice 2027 · {info.label} — prévisions, aucune exécution à ce stade
      </div>
      <div className="text-muted-foreground">Source : {info.source}. Comparaison avec la LFR 2026.</div>
    </div>
  )
}

function Evolution({ lfr, plf }: { lfr: number | null; plf: number | null }) {
  if (lfr === null || plf === null || lfr === 0) return <span className="text-muted-foreground">—</span>
  const pct = ((plf - lfr) / Math.abs(lfr)) * 100
  const up = pct >= 0
  const Icon = up ? ArrowUpRight : ArrowDownRight
  return (
    <span className={cn('inline-flex flex-col items-end', up ? 'text-success' : 'text-destructive')}>
      <span className="inline-flex items-center gap-0.5 font-bold">
        <Icon className="h-3 w-3" />
        {up ? '+' : ''}
        {fmt(pct)}%
      </span>
      <span className="text-[0.85em] text-muted-foreground">
        {plf - lfr >= 0 ? '+' : ''}
        {fmt(mrd(plf - lfr))} Mrd
      </span>
    </span>
  )
}

function Amount({ value }: { value: number | null }) {
  if (value === null) return <span className="text-muted-foreground">—</span>
  return <DualCurrencyAmount value={mrd(value)} scale="billion" className="items-end" dual animate={false} />
}

type Kpi = { label: string; value: number; detail: string; icon: LucideIcon; tone: string }

function KpiGrid({ items }: { items: Kpi[] }) {
  return (
    <div className="animate-fade-up grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" style={{ animationDelay: '60ms' }}>
      {items.map(({ label, value, detail, icon: Icon, tone }) => (
        <Card key={label} className="relative overflow-hidden p-5">
          <div className={cn('absolute inset-x-0 top-0 h-1', tone)} />
          <div className="flex items-center gap-3">
            <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl text-white', tone)}>
              <Icon className="h-5 w-5" />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-wide text-foreground">{label}</p>
          </div>
          <DualCurrencyAmount value={mrd(value)} scale="billion" className="mt-4 text-2xl font-extrabold tabular-nums text-foreground" />
          <p className="mt-1 text-[11px] text-muted-foreground">{detail}</p>
        </Card>
      ))}
    </div>
  )
}

const overviewKpis: Kpi[] = [
  { label: 'Budget 2027 (PLF)', value: recettesPlf2027.total.plf!, detail: '+11,9 % par rapport à la LFR 2026 · en équilibre', icon: Landmark, tone: 'bg-primary' },
  { label: 'Recettes courantes', value: findRow(recettesPlf2027, 'I.1.1').plf!, detail: '+15,5 % · pression fiscale de 12,8 % du PIB', icon: HandCoins, tone: 'bg-success' },
  { label: soldesPlf2027.global.label, value: soldesPlf2027.global.plf, detail: `${fmt(soldesPlf2027.global.pibPlf)} % du PIB (LFR 2026 : ${fmt(soldesPlf2027.global.pibLfr)} %)`, icon: Scale, tone: 'bg-[oklch(0.55_0.16_300)]' },
  { label: soldesPlf2027.interieur.label, value: soldesPlf2027.interieur.plf, detail: `${fmt(soldesPlf2027.interieur.pibPlf)} % du PIB (LFR 2026 : ${fmt(soldesPlf2027.interieur.pibLfr)} %)`, icon: Wallet, tone: 'bg-warning' },
]

function ComparisonChart({ title, description, data }: { title: string; description: string; data: { name: string; lfr: number; plf: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} interval={0} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickFormatter={(v) => v.toLocaleString('fr-FR')} />
            <Tooltip
              formatter={(v: number) => `${fmt(v)} Mrd FC`}
              contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="lfr" name="LFR 2026" fill="var(--chart-5)" fillOpacity={0.45} radius={[3, 3, 0, 0]} />
            <Bar dataKey="plf" name="PLF 2027" fill="oklch(0.55 0.16 300)" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

export function PlfTableCard({ table, filter }: { table: PlfTable; filter?: (row: PlfRow) => boolean }) {
  const rows = filter ? table.rows.filter(filter) : table.rows
  const totalPlf = table.total.plf ?? 1
  return (
    <Card>
      <CardHeader>
        <CardTitle>{table.title}</CardTitle>
        <CardDescription>Montants en milliards · évolution par rapport à la LFR 2026 · part du total et du PIB 2027</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="max-h-[70vh] overflow-auto rounded-lg border border-border">
          <table className="w-full min-w-[960px] border-collapse text-left text-[11px] tabular-nums">
            <thead className="sticky top-0 z-10 bg-muted text-[10px] uppercase text-muted-foreground shadow-sm">
              <tr>
                <th className="min-w-80 px-4 py-3">Rubriques</th>
                <th className="px-4 py-3 text-right">LFR 2026</th>
                <th className="px-4 py-3 text-right">PLF 2027</th>
                <th className="px-4 py-3 text-right">Évolution</th>
                <th className="px-4 py-3 text-right">Part du total</th>
                <th className="px-4 py-3 text-right">% du PIB</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={`${row.code}-${row.label}-${i}`}
                  className={cn(
                    'border-t border-border hover:bg-muted/50',
                    row.level === 0 ? 'bg-muted/40 font-bold text-foreground' : row.level === 1 ? 'font-semibold text-foreground' : 'text-muted-foreground',
                  )}
                >
                  <td className="px-4 py-2.5" style={{ paddingLeft: `${16 + row.level * 16}px` }}>
                    {row.code && <span className="mr-2 inline-block min-w-8 text-muted-foreground">{row.code}</span>}
                    {row.label}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right"><Amount value={row.lfr} /></td>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right font-semibold text-foreground"><Amount value={row.plf} /></td>
                  <td className="px-4 py-2.5 text-right"><Evolution lfr={row.lfr} plf={row.plf} /></td>
                  <td className="px-4 py-2.5 text-right">{row.plf !== null ? `${fmt((row.plf / totalPlf) * 100)}%` : '—'}</td>
                  <td className="px-4 py-2.5 text-right">{row.pib !== null ? `${fmt(row.pib)}%` : '—'}</td>
                </tr>
              ))}
            </tbody>
            {!filter && (
              <tfoot className="sticky bottom-0 bg-primary text-primary-foreground">
                <tr className="font-bold">
                  <td className="px-4 py-3 uppercase">{table.total.label}</td>
                  {[table.total.lfr, table.total.plf].map((v, i) => (
                    <td key={i} className="whitespace-nowrap px-4 py-3 text-right">
                      <DualCurrencyAmount value={mrd(v)} scale="billion" className="items-end" secondaryClassName="text-primary-foreground/70" dual animate={false} />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-right">+{fmt(table.total.accrLfr ?? 0)}%</td>
                  <td className="px-4 py-3 text-right">100,0%</td>
                  <td className="px-4 py-3 text-right">{fmt(table.total.pib ?? 0)}%</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
        <p className="text-[11px] text-muted-foreground">Source : {table.source}.</p>
      </CardContent>
    </Card>
  )
}

function NotesGrid({ title, groups }: { title: string; groups: { title: string; items: string[] }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {groups.map((g) => (
          <div key={g.title} className="rounded-lg border border-primary/25 bg-primary/5 p-4">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase text-foreground">
              <Info className="h-4 w-4 text-primary" />
              {g.title}
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-muted-foreground">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function PiliersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dépenses par piliers du PAG</CardTitle>
        <CardDescription>Total des dotations regroupées : {fmt(totalPiliersPag2027, 2)} Md USD</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {piliersPag2027.map((p, i) => (
          <div key={p.code} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3 text-[12px]">
              <span className="font-semibold text-foreground">
                <span className="mr-1.5 text-muted-foreground">{p.code}</span>
                {p.label}
              </span>
              <span className="shrink-0 font-bold tabular-nums text-foreground">
                ≈ {p.montant} Md USD · {fmt(p.part)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full" style={{ width: `${p.part / 0.3}%`, background: COLORS[i % COLORS.length] }} />
            </div>
            <p className="text-[11px] text-muted-foreground">{p.details}</p>
          </div>
        ))}
        <p className="text-[11px] text-muted-foreground">Source : Exposé général du PLF 2027, tableau 2 (synthèse des dépenses par piliers du PAG).</p>
      </CardContent>
    </Card>
  )
}

function TrajectoireCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trajectoire des recettes courantes et de la pression fiscale</CardTitle>
        <CardDescription>2024 : budget · 2026 : LFR · 2027 : PLF · 2028-2030 : projections (CBMT 2027-2030)</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <ComposedChart data={trajectoireRecettes} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
            <XAxis dataKey="annee" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} />
            <YAxis yAxisId="usd" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
            <YAxis yAxisId="pct" orientation="right" domain={[12, 14.5]} tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickFormatter={(v) => `${v}%`} />
            <Tooltip
              formatter={(v: number, name: string) => (name === 'Pression fiscale' ? `${fmt(v)} % du PIB` : `${fmt(v)} Md USD`)}
              contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar yAxisId="usd" dataKey="recettes" name="Recettes courantes (Md USD)" fill="var(--chart-1)" radius={[3, 3, 0, 0]} />
            <Line yAxisId="pct" dataKey="pression" name="Pression fiscale" stroke="var(--chart-3)" strokeWidth={2.5} dot={{ r: 4 }} />
          </ComposedChart>
        </ResponsiveContainer>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Objectif 2028 : 18,8 Md USD, soit près du double de 2024 (9,8 Md USD). À long terme : atteindre la moyenne subsaharienne de 17 % du PIB.
        </p>
      </CardContent>
    </Card>
  )
}

function EquilibreCard() {
  const block = (title: string, items: { label: string; montant: number }[], tone: string) => (
    <div className="rounded-lg border border-border">
      <p className={cn('rounded-t-lg px-4 py-2 text-[11px] font-bold uppercase text-white', tone)}>{title}</p>
      <ul className="divide-y divide-border text-[12px]">
        {items.map((i) => (
          <li key={i.label} className="flex items-center justify-between gap-3 px-4 py-2">
            <span className="text-foreground">{i.label}</span>
            <DualCurrencyAmount value={mrd(i.montant)} scale="billion" className="items-end font-semibold tabular-nums" dual animate={false} />
          </li>
        ))}
        <li className="flex items-center justify-between gap-3 bg-muted/50 px-4 py-2 font-bold">
          <span>Total</span>
          <DualCurrencyAmount value={mrd(equilibrePlf2027.total)} scale="billion" className="items-end tabular-nums" dual animate={false} />
        </li>
      </ul>
    </div>
  )
  return (
    <Card>
      <CardHeader>
        <CardTitle>État de l&apos;équilibre financier et budgétaire</CardTitle>
        <CardDescription>Sources de financement et rubriques à financer du PLF 2027 (annexe, tableau 5)</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {block('Sources de financement', equilibrePlf2027.ressources, 'bg-success')}
        {block('Rubriques à financer', equilibrePlf2027.emplois, 'bg-primary')}
      </CardContent>
    </Card>
  )
}

const grandesMasses = [
  { name: 'Recettes internes', code: 'I.1' },
  { name: 'Recettes extérieures', code: 'I.2' },
  { name: 'Budgets annexes', code: 'II' },
  { name: 'Comptes spéciaux', code: 'III' },
].map(({ name, code }) => {
  const row = findRow(recettesPlf2027, code)
  return { name, lfr: mrd(row.lfr), plf: mrd(row.plf) }
})

const structureDepenses = naturesDepensesPlf2027.map((r, i) => ({
  name: r.label.replace(' (dépenses de personnel)', '').replace(' (fonctionnement)', '').replace(' (sur ressources propres)', ''),
  value: Number((((r.plf ?? 0) / (findRow(depensesPlf2027, 'A').plf ?? 1)) * 100).toFixed(2)),
  color: COLORS[i % COLORS.length],
}))

/** Accueil de l'exercice 2027. Le profil Décideur ne voit que les quatre agrégats et la comparaison. */
export function PlfOverview({ isDecideur }: { isDecideur: boolean }) {
  if (isDecideur) {
    return (
      <>
        <PlfBanner />
        <KpiGrid
          items={[
            { label: 'Recettes totales prévues', value: recettesPlf2027.total.plf!, detail: 'Projet de loi de finances 2027', icon: HandCoins, tone: 'bg-success' },
            { label: 'Dépenses totales prévues', value: depensesPlf2027.total.plf!, detail: 'Budget présenté en équilibre', icon: Wallet, tone: 'bg-primary' },
            overviewKpis[2],
            overviewKpis[3],
          ]}
        />
        <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
          <ComparisonChart title="Budget 2027 : LFR 2026 et PLF 2027" description="Recettes par grande masse, en milliards de FC" data={grandesMasses} />
        </div>
      </>
    )
  }

  return (
    <>
      <PlfBanner />
      <KpiGrid items={overviewKpis} />
      <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '160ms' }}>
        <ComparisonChart title="Recettes : LFR 2026 et PLF 2027" description="Par grande masse, en milliards de FC" data={grandesMasses} />
        <DonutCard
          title="Structure des dépenses du Budget général 2027"
          description="(en %, par grande nature)"
          data={structureDepenses}
          centerValue={fmt(mrd(findRow(depensesPlf2027, 'A').plf))}
          centerUnit="Mrd CDF"
        />
      </div>
      <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '260ms' }}>
        <PiliersCard />
        <TrajectoireCard />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '340ms' }}>
        <EquilibreCard />
      </div>
    </>
  )
}

export function PlfRecettes() {
  const regies = [
    { name: 'DGDA', code: 'I.1.1.1' },
    { name: 'DGI', code: 'I.1.1.2' },
    { name: 'DGRAD', code: '1°' },
    { name: 'Autres non fisc.', code: '2°' },
    { name: 'Exceptionnelles', code: 'I.1.2' },
    { name: 'Appuis budg.', code: 'I.2.1' },
    { name: 'Financ. invest.', code: 'I.2.2' },
  ].map(({ name, code }) => {
    const row = findRow(recettesPlf2027, code)
    return { name, lfr: mrd(row.lfr), plf: mrd(row.plf) }
  })
  return (
    <>
      <PlfBanner />
      <KpiGrid
        items={[
          { label: 'Total recettes', value: recettesPlf2027.total.plf!, detail: '+11,9 % par rapport à la LFR 2026', icon: Landmark, tone: 'bg-primary' },
          { label: 'Recettes courantes', value: findRow(recettesPlf2027, 'I.1.1').plf!, detail: '+15,5 % · 12,8 % du PIB', icon: HandCoins, tone: 'bg-success' },
          { label: 'Recettes extérieures', value: findRow(recettesPlf2027, 'I.2').plf!, detail: '+13,4 % · 18,5 % du Budget général', icon: Wallet, tone: 'bg-[oklch(0.55_0.16_300)]' },
          { label: 'Comptes spéciaux', value: findRow(recettesPlf2027, 'III').plf!, detail: '+21,0 % par rapport à la LFR 2026', icon: FileText, tone: 'bg-warning' },
        ]}
      />
      <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '160ms' }}>
        <ComparisonChart title="Recettes par régie et par nature" description="LFR 2026 et PLF 2027, en milliards de FC" data={regies} />
        <TrajectoireCard />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
        <PlfTableCard table={recettesPlf2027} />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <NotesGrid title="Mesures fiscales et administratives envisagées pour 2027" groups={mesuresFiscales2027} />
      </div>
    </>
  )
}

export function PlfDepenses() {
  const natures = naturesDepensesPlf2027.map((r) => ({
    name: r.label.split(' (')[0].replace("Dépenses d'investissement", 'Investissements').replace('Dette publique et frais financiers', 'Dette et frais fin.'),
    lfr: mrd(r.lfr),
    plf: mrd(r.plf),
  }))
  return (
    <>
      <PlfBanner />
      <KpiGrid
        items={[
          { label: 'Total dépenses', value: depensesPlf2027.total.plf!, detail: '+11,9 % par rapport à la LFR 2026', icon: Landmark, tone: 'bg-primary' },
          { label: 'Rémunérations', value: findRow(depensesPlf2027, 'II').plf!, detail: '29,9 % du Budget général · 4,9 % du PIB', icon: Wallet, tone: 'bg-success' },
          { label: "Dépenses d'investissement", value: findRow(depensesPlf2027, 'V').plf!, detail: '+30,1 % · 26,8 % du Budget général', icon: HandCoins, tone: 'bg-[oklch(0.55_0.16_300)]' },
          { label: 'Dépenses exceptionnelles', value: findRow(depensesPlf2027, 'VI').plf!, detail: '-9,3 % · dont sécuritaires 6 614,1 Mrd', icon: Scale, tone: 'bg-warning' },
        ]}
      />
      <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '160ms' }}>
        <ComparisonChart title="Dépenses du Budget général par nature" description="LFR 2026 et PLF 2027, en milliards de FC" data={natures} />
        <DonutCard
          title="Structure des dépenses du Budget général 2027"
          description="(en %, par grande nature)"
          data={structureDepenses}
          centerValue={fmt(mrd(findRow(depensesPlf2027, 'A').plf))}
          centerUnit="Mrd CDF"
        />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '240ms' }}>
        <PlfTableCard table={depensesPlf2027} />
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
        <NotesGrid title="Actions phares du budget 2027" groups={actionsPhares2027} />
      </div>
    </>
  )
}

export function PlfInvestissements() {
  return (
    <>
      <PlfBanner />
      <KpiGrid
        items={[
          { label: "Dépenses d'investissement", value: findRow(depensesPlf2027, 'V').plf!, detail: '+30,1 % · 4,4 % du PIB', icon: Landmark, tone: 'bg-primary' },
          { label: 'Sur ressources propres', value: findRow(depensesPlf2027, '5.1').plf!, detail: '+30,9 % · 12,7 % du Budget général', icon: HandCoins, tone: 'bg-success' },
          { label: 'Sur ressources extérieures', value: findRow(depensesPlf2027, '5.3').plf!, detail: '+29,4 % · dont Eurobonds 1 217,8 Mrd', icon: Wallet, tone: 'bg-[oklch(0.55_0.16_300)]' },
          { label: 'Projets des provinces', value: findRow(depensesPlf2027, '5.1.4').plf!, detail: 'PDL-145T, écoles, santé, routes de desserte', icon: Scale, tone: 'bg-warning' },
        ]}
      />
      <div className="animate-fade-up" style={{ animationDelay: '160ms' }}>
        <PlfTableCard table={{ ...depensesPlf2027, title: "Dépenses d'investissement 2027" }} filter={(r) => r.code === 'V' || r.code?.startsWith('5.') === true} />
      </div>
    </>
  )
}

export function PlfMacro() {
  const value = (v: number | null, unit: string) => (v === null ? '—' : `${fmt(v)}${unit === '%' ? ' %' : ''}`)
  return (
    <>
      <PlfBanner />
      <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '80ms' }}>
        <Card>
          <CardHeader>
            <CardTitle>Cadrage macroéconomique du PLF 2027</CardTitle>
            <CardDescription>Vote et LFR 2026, projection 2027 (annexe, tableau 1)</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-[12px] tabular-nums">
              <thead>
                <tr className="text-left text-[10px] uppercase text-muted-foreground">
                  <th className="pb-2">Indicateur</th>
                  <th className="pb-2 text-right">Vote 2026</th>
                  <th className="pb-2 text-right">LFR 2026</th>
                  <th className="pb-2 text-right text-violet-600 dark:text-violet-300">Projection 2027</th>
                </tr>
              </thead>
              <tbody>
                {macroPlf2027.map((m) => (
                  <tr key={`${m.label}-${m.unit}`} className="border-t border-border">
                    <td className="py-2 text-foreground">
                      {m.label} <span className="text-muted-foreground">({m.unit})</span>
                    </td>
                    <td className="py-2 text-right text-muted-foreground">{value(m.vote2026, m.unit)}</td>
                    <td className="py-2 text-right text-muted-foreground">{value(m.lfr2026, m.unit)}</td>
                    <td className="py-2 text-right font-bold text-foreground">{value(m.projection2027, m.unit)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Environnement international en 2027</CardTitle>
            <CardDescription>Perspectives du FMI, de la Banque mondiale et de l&apos;OMC (juillet 2026)</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-[12px] tabular-nums">
              <thead>
                <tr className="text-left text-[10px] uppercase text-muted-foreground">
                  <th className="pb-2">Indicateur</th>
                  <th className="pb-2 text-right">Référence 2026</th>
                  <th className="pb-2 text-right text-violet-600 dark:text-violet-300">2027</th>
                </tr>
              </thead>
              <tbody>
                {contexteInternational2027.map((c) => (
                  <tr key={c.label} className="border-t border-border">
                    <td className="py-2 text-foreground">
                      {c.label} <span className="text-muted-foreground">({c.unit})</span>
                    </td>
                    <td className="py-2 text-right text-muted-foreground">{c.reference2026 === null ? '—' : fmt(c.reference2026)}</td>
                    <td className="py-2 text-right font-bold text-foreground">{fmt(c.valeur2027)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
        <TrajectoireCard />
      </div>
    </>
  )
}

export function PlfProvinces() {
  const transfert = retrocessionProvinces2027.find((r) => r.label.startsWith('8.'))!
  const repartition = retrocessionProvinces2027.slice(retrocessionProvinces2027.findIndex((r) => r.label.startsWith('9.')) + 1).slice(0, 3)
  return (
    <>
      <PlfBanner />
      <KpiGrid
        items={[
          { label: 'Transfert aux provinces (40 %)', value: transfert.plf, detail: `LFR 2026 : ${fmt(mrd(transfert.lfr))} Mrd`, icon: Landmark, tone: 'bg-primary' },
          ...repartition.map((r, i) => ({
            label: `Dont ${r.label.toLowerCase()}`,
            value: r.plf,
            detail: `LFR 2026 : ${fmt(mrd(r.lfr))} Mrd`,
            icon: [Wallet, FileText, HandCoins][i],
            tone: ['bg-success', 'bg-warning', 'bg-[oklch(0.55_0.16_300)]'][i],
          })),
        ]}
      />
      <Card className="animate-fade-up" style={{ animationDelay: '160ms' }}>
        <CardHeader>
          <CardTitle>Calcul des 40 % des recettes à caractère national</CardTitle>
          <CardDescription>Du total des recettes courantes à la part revenant aux provinces et ETD (annexe, tableau 4)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-auto rounded-lg border border-border">
            <table className="w-full min-w-[760px] text-[11px] tabular-nums">
              <thead className="bg-muted text-[10px] uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">Étape</th>
                  <th className="px-4 py-3 text-right">LFR 2026</th>
                  <th className="px-4 py-3 text-right">PLF 2027</th>
                  <th className="px-4 py-3 text-right">Évolution</th>
                </tr>
              </thead>
              <tbody>
                {retrocessionProvinces2027.map((r, i) => (
                  <tr
                    key={`${r.label}-${i}`}
                    className={cn('border-t border-border', r.level === 0 ? 'bg-muted/40 font-bold text-foreground' : 'text-muted-foreground', r.label.startsWith('8.') && 'bg-primary/10 text-primary')}
                  >
                    <td className="px-4 py-2.5" style={{ paddingLeft: `${16 + r.level * 18}px` }}>{r.label}</td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right"><Amount value={r.lfr} /></td>
                    <td className="whitespace-nowrap px-4 py-2.5 text-right"><Amount value={r.plf} /></td>
                    <td className="px-4 py-2.5 text-right"><Evolution lfr={r.lfr} plf={r.plf} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Source : Exposé général du PLF 2027, annexe, tableau 4. Le fonds de péréquation représente 10 % des recettes courantes après déductions. La répartition par province sera disponible avec les saisies 2027.
          </p>
        </CardContent>
      </Card>
    </>
  )
}

/** Sections sans donnée pour un exercice en prévision (trésorerie, exécution par ministère, ESB…). */
export function PlfPlaceholder({ section }: { section: string }) {
  return (
    <>
      <PlfBanner />
      <Card className="animate-fade-up p-8 text-center">
        <CalendarClock className="mx-auto h-10 w-10 text-violet-500" />
        <h3 className="mt-3 text-lg font-bold text-foreground">{section} : pas encore de données pour 2027</h3>
        <p className="mx-auto mt-2 max-w-xl text-[13px] text-muted-foreground">
          L&apos;exercice 2027 n&apos;existe pour l&apos;instant qu&apos;au stade du projet de loi de finances. Cette vue s&apos;alimentera avec les
          données d&apos;exécution 2027 dès leur publication. Les prévisions sont consultables dans la Vue d&apos;ensemble, les Recettes, les
          Dépenses, les Investissements, les Indicateurs macroéconomiques et l&apos;Exécution par province.
        </p>
      </Card>
    </>
  )
}
