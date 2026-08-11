'use client'

import { Download, FileText } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { KpiCards } from '@/components/dashboard/kpi-cards'
import { BudgetExecutionChart } from '@/components/dashboard/budget-execution-chart'
import { DonutCard } from '@/components/dashboard/donut-card'
import { MinistryChart } from '@/components/dashboard/ministry-chart'
import { ProvinceMap } from '@/components/dashboard/province-map'
import { TreasuryCard } from '@/components/dashboard/treasury-card'
import { PublicDebtCard } from '@/components/dashboard/public-debt-card'
import { MacroCard } from '@/components/dashboard/macro-card'
import { AlertsCard } from '@/components/dashboard/alerts-card'
import { ReformsCard } from '@/components/dashboard/reforms-card'
import { DocumentationView } from '@/components/dashboard/documentation-view'
import { GovernanceView } from '@/components/dashboard/governance-view'
import { TrackingTable } from '@/components/dashboard/tracking-table'
import { BudgetProcessView } from '@/components/dashboard/budget-process-view'
import type { NavLabel } from '@/components/dashboard/sidebar'
import { revenueBreakdown, expenseBreakdown, provinces } from '@/lib/data'
import { exportDashboard } from '@/lib/export'

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">{title}</h2>
      <p className="text-[13px] text-muted-foreground">{description}</p>
    </div>
  )
}

function BreakdownTable({
  title,
  description,
  centerValue,
  data,
}: {
  title: string
  description: string
  centerValue: string
  data: { name: string; value: number; color: string }[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[340px] text-[12px]">
          <thead>
            <tr className="text-left text-[10px] uppercase text-muted-foreground">
              <th className="pb-2 font-semibold">Poste</th>
              <th className="pb-2 text-right font-semibold">Part (%)</th>
              <th className="pb-2 text-right font-semibold">Montant (Mrd CDF)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => {
              const amount = (Number(centerValue.replace(/\s/g, '').replace(',', '.')) *
                row.value) /
                100
              return (
                <tr key={row.name} className="border-t border-border">
                  <td className="flex items-center gap-2 py-2 text-foreground">
                    <span
                      className="h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: row.color }}
                    />
                    {row.name}
                  </td>
                  <td className="py-2 text-right font-semibold text-foreground">
                    {row.value.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}%
                  </td>
                  <td className="py-2 text-right text-muted-foreground">
                    {amount.toLocaleString('fr-FR', {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

function ProvinceTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détail par province</CardTitle>
        <CardDescription>(taux d&apos;exécution à date)</CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <table className="w-full min-w-[340px] text-[12px]">
          <thead>
            <tr className="text-left text-[10px] uppercase text-muted-foreground">
              <th className="pb-2 font-semibold">Province</th>
              <th className="pb-2 font-semibold">Taux d&apos;exécution</th>
            </tr>
          </thead>
          <tbody>
            {provinces.map((p) => (
              <tr key={p.name} className="border-t border-border">
                <td className="py-2.5 text-foreground">{p.name}</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-32 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${p.taux}%` }}
                      />
                    </div>
                    <span className="font-semibold text-foreground">{p.taux}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}

function InvestmentsView() {
  const invest = expenseBreakdown.find((e) => e.name === 'Investissements')
  return (
    <>
      <SectionHeading
        title="Investissements Publics"
        description="Exécution des dépenses d'investissement à date"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Part des dépenses</p>
          <p className="mt-1 text-2xl font-extrabold text-primary">{invest?.value}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Taux d&apos;exécution</p>
          <p className="mt-1 text-2xl font-extrabold text-warning">14,6%</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Montant payé</p>
          <p className="mt-1 text-2xl font-extrabold text-foreground">5 784,8</p>
          <p className="text-[10px] text-muted-foreground">Mrd CDF</p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Situation au</p>
          <p className="mt-1 text-2xl font-extrabold text-foreground">31/12/2025</p>
        </Card>
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <MinistryChart />
        <BreakdownTable
          title="Répartition des dépenses par nature"
          description="(en %)"
          centerValue="39 735,6"
          data={expenseBreakdown}
        />
      </div>
    </>
  )
}

function ReportsView() {
  const reports = [
    { name: "Rapport d'exécution budgétaire", period: 'Mai 2024' },
    { name: 'Situation de trésorerie', period: 'Mai 2024' },
    { name: 'Bulletin de la dette publique', period: 'T1 2024' },
    { name: 'Indicateurs macroéconomiques', period: 'Mai 2024' },
    { name: 'Suivi des réformes budgétaires', period: 'S1 2024' },
  ]
  return (
    <>
      <SectionHeading
        title="Rapports"
        description="Documents budgétaires et exports de données"
      />
      <Card>
        <CardContent className="divide-y divide-border p-0">
          {reports.map((r) => (
            <div key={r.name} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <FileText className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-foreground">{r.name}</p>
                  <p className="text-[11px] text-muted-foreground">{r.period}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => exportDashboard('2024', r.period)}
                className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Download className="h-3.5 w-3.5" />
                Télécharger
              </button>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}

export function DashboardContent({ section }: { section: NavLabel }) {
  switch (section) {
    case 'Recettes':
      return (
        <>
          <SectionHeading
            title="Recettes"
            description="Suivi de la mobilisation des recettes à date"
          />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DonutCard
              title="Répartition des recettes à date"
              description="(en %)"
              data={revenueBreakdown}
              centerValue="12 543,8"
              centerUnit="Mrd CDF"
            />
            <BreakdownTable
              title="Détail des recettes"
              description="(en % et en Mrd CDF)"
              centerValue="12 543,8"
              data={revenueBreakdown}
            />
          </div>
          <BudgetExecutionChart />
        </>
      )
    case 'Dépenses':
      return (
        <>
          <SectionHeading
            title="Dépenses"
            description="Suivi de l'exécution des dépenses par nature"
          />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <DonutCard
              title="Répartition des dépenses à date par nature"
              description="(en %)"
              data={expenseBreakdown}
              centerValue="39 735,6"
              centerUnit="Mrd CDF"
            />
            <BreakdownTable
              title="Détail des dépenses"
              description="(en % et en Mrd CDF)"
              centerValue="39 735,6"
              data={expenseBreakdown}
            />
          </div>
          <MinistryChart />
        </>
      )
    case 'Trésorerie':
      return (
        <>
          <SectionHeading
            title="Trésorerie"
            description="Situation et évolution des disponibilités de l'État"
          />
          <TreasuryCard />
        </>
      )
    case 'Dette publique':
      return (
        <>
          <SectionHeading
            title="Dette publique"
            description="Encours et structure de la dette de l'État"
          />
          <PublicDebtCard />
        </>
      )
    case 'Investissements Publics':
      return <InvestmentsView />
    case 'Exécution par Ministère':
      return (
        <>
          <SectionHeading
            title="Exécution par Ministère"
            description="Taux d'exécution des dépenses par ministère à date"
          />
          <MinistryChart />
        </>
      )
    case 'Provinces':
      return (
        <>
          <SectionHeading
            title="Provinces"
            description="Exécution des dépenses par province"
          />
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <ProvinceMap />
            <ProvinceTable />
          </div>
        </>
      )
    case 'Indicateurs Macroéconomiques':
      return (
        <>
          <SectionHeading
            title="Indicateurs Macroéconomiques"
            description="Environnement macroéconomique et hypothèses budgétaires"
          />
          <MacroCard />
        </>
      )
    case 'Suivi des réformes':
      return (
        <>
          <SectionHeading
            title="Suivi des réformes"
            description="Avancement des réformes budgétaires"
          />
          <ReformsCard />
        </>
      )
    case 'Tableau ESB':
      return <TrackingTable />
    case 'Alertes & Risques':
      return (
        <>
          <SectionHeading
            title="Alertes & Risques"
            description="Points de vigilance sur l'exécution budgétaire"
          />
          <AlertsCard />
        </>
      )
    case 'Rapports':
      return <ReportsView />
    case 'Schéma Directeur':
      return <GovernanceView />
    case 'Processus budgétaire':
      return <BudgetProcessView />
    case 'Documentation':
      return <DocumentationView />
    default:
      return (
        <>
          <KpiCards />

          <div
            className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-3"
            style={{ animationDelay: '520ms' }}
          >
            <BudgetExecutionChart />
            <DonutCard
              title="Répartition des recettes à date"
              description="(en %)"
              data={revenueBreakdown}
              centerValue="12 543,8"
              centerUnit="Mrd CDF"
            />
            <DonutCard
              title="Répartition des dépenses à date par nature"
              description="(en %)"
              data={expenseBreakdown}
              centerValue="9 872,3"
              centerUnit="Mrd CDF"
            />
          </div>

          <div
            className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-3"
            style={{ animationDelay: '640ms' }}
          >
            <MinistryChart />
            <ProvinceMap />
            <TreasuryCard />
          </div>

          <div
            className="animate-fade-up grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4"
            style={{ animationDelay: '760ms' }}
          >
            <PublicDebtCard />
            <MacroCard />
            <AlertsCard />
            <ReformsCard />
          </div>
        </>
      )
  }
}
