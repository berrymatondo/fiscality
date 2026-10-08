'use client'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { KpiCards } from '@/components/dashboard/kpi-cards'
import { BudgetExecutionChart } from '@/components/dashboard/budget-execution-chart'
import { DonutCard } from '@/components/dashboard/donut-card'
import { MinistryChart } from '@/components/dashboard/ministry-chart'
import { MinistryDrilldown } from '@/components/dashboard/ministry-drilldown'
import { ProvinceMap } from '@/components/dashboard/province-map'
import { ProvinceDrilldown } from '@/components/dashboard/province-drilldown'
import { TreasuryCard } from '@/components/dashboard/treasury-card'
import { PublicDebtCard } from '@/components/dashboard/public-debt-card'
import { MacroCard } from '@/components/dashboard/macro-card'
import { AlertsCard } from '@/components/dashboard/alerts-card'
import { ReformsCard } from '@/components/dashboard/reforms-card'
import { DocumentationView } from '@/components/dashboard/documentation-view'
import { TrackingTable } from '@/components/dashboard/tracking-table'
import { ExpenseDetail, RevenueDetail } from '@/components/dashboard/revenue-detail'
import { ReportsView } from '@/components/dashboard/reports-view'
import { DecideurOverview } from '@/components/dashboard/decideur-overview'
import {
  PlfDepenses,
  PlfInvestissements,
  PlfMacro,
  PlfOverview,
  PlfPlaceholder,
  PlfProvinces,
  PlfRecettes,
  PlfTableCard,
  PlfBanner,
} from '@/components/dashboard/plf-views'
import { isPrevision } from '@/lib/exercices'
import { depensesPlf2027 } from '@/lib/exercices/2027'
import { BudgetProcessView } from '@/components/dashboard/budget-process-view'
import { AnalysisView } from '@/components/dashboard/analysis-view'
import { SettingsView } from '@/components/dashboard/settings-view'
import { AnnualHtmlDashboard } from '@/components/dashboard/annual-html-dashboard'
import { DualCurrencyAmount } from '@/components/dashboard/currency'
import { CountUp } from '@/components/dashboard/count-up'
import type { NavLabel } from '@/components/dashboard/sidebar'
import type { Role } from '@/lib/roles'
import { revenueBreakdown, expenseBreakdown, provinces, ministryExecution } from '@/lib/data'

function SectionHeading({ title, description }: { title: string; description: string }) {
  void title
  void description
  return null
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
              <th className="pb-2 text-right font-semibold">Montant (CDF / USD)</th>
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
                    <CountUp value={`${row.value.toLocaleString('fr-FR', { minimumFractionDigits: 1 })}%`} />
                  </td>
                  <td className="py-2 text-right text-muted-foreground">
                    <DualCurrencyAmount value={amount} scale="billion" className="items-end" dual />
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

function InvestmentsView() {
  const invest = expenseBreakdown.find((e) => e.name === 'Investissements')
  return (
    <>
      <SectionHeading
        title="Investissements Publics"
        description="Exécution des dépenses d'investissement à date"
      />
      <div className="animate-fade-up grid grid-cols-2 gap-4 md:grid-cols-4" style={{ animationDelay: '80ms' }}>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Part des dépenses</p>
          <p className="mt-1 text-2xl font-extrabold text-primary"><CountUp value={`${invest?.value ?? 0}%`} /></p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Taux d&apos;exécution</p>
          <p className="mt-1 text-2xl font-extrabold text-warning"><CountUp value="14,6%" /></p>
        </Card>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Montant payé</p>
          <DualCurrencyAmount value="5 784,8" scale="billion" className="mt-1 text-2xl font-extrabold text-foreground" />
        </Card>
        <Card className="p-4">
          <p className="text-[10px] uppercase text-muted-foreground">Situation au</p>
          <p className="mt-1 text-2xl font-extrabold text-foreground">31/12/2025</p>
        </Card>
      </div>
      <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '200ms' }}>
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

export function DashboardContent({
  section,
  exercice,
  periodeLabel,
  provincesPubliees,
  currentRole,
}: {
  section: NavLabel
  exercice: number
  periodeLabel?: string
  provincesPubliees?: { name: string; taux: number }[] | null
  currentRole: Role
}) {
  const isDecideur = currentRole === 'DECIDEUR'

  // Exercice au stade de la prévision (PLF 2027) : vues dédiées, sans exécution.
  if (isPrevision(exercice)) {
    switch (section) {
      case 'Recettes':
        return <PlfRecettes />
      case 'Dépenses':
        return <PlfDepenses />
      case 'Investissements Publics':
        return <PlfInvestissements />
      case 'Indicateurs Macroéconomiques':
        return <PlfMacro />
      case 'Exécution par province':
        return <PlfProvinces />
      case 'Dette publique':
        return (
          <>
            <PlfBanner />
            <div className="animate-fade-up">
              <PlfTableCard
                table={{ ...depensesPlf2027, title: 'Dette publique et frais financiers 2027' }}
                filter={(r) => r.code === 'I' || r.code?.startsWith('1.') === true}
              />
            </div>
          </>
        )
      case 'Trésorerie':
      case 'Exécution par Ministère':
      case 'Suivi des réformes':
      case 'Suivi de l’exécution (ESB)':
      case 'Analyses':
      case 'Alertes & Risques':
        return <PlfPlaceholder section={section} />
      case "Vue d'ensemble":
        return <PlfOverview isDecideur={isDecideur} />
      default:
        break
    }
  }

  switch (section) {
    case 'Paramètres':
      return <SettingsView />
    case 'Recettes':
      return (
        <>
          <SectionHeading
            title="Recettes"
            description="Suivi de la mobilisation des recettes à date"
          />
          <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '80ms' }}>
            <DonutCard
              title="Répartition des recettes à date"
              description="(en %)"
              data={revenueBreakdown}
              centerValue="12 543,8"
              centerUnit="Mrd CDF"
            />
            <BreakdownTable
              title="Détail des recettes"
              description="(en % · CDF principal · équivalent USD)"
              centerValue="12 543,8"
              data={revenueBreakdown}
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <BudgetExecutionChart />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '320ms' }}>
            <RevenueDetail />
          </div>
        </>
      )
    case 'Dépenses':
      return (
        <>
          <SectionHeading
            title="Dépenses"
            description="Suivi de l'exécution des dépenses par nature"
          />
          <div className="animate-fade-up grid grid-cols-1 gap-4 xl:grid-cols-2" style={{ animationDelay: '80ms' }}>
            <DonutCard
              title="Répartition des dépenses à date par nature"
              description="(en %)"
              data={expenseBreakdown}
              centerValue="39 735,6"
              centerUnit="Mrd CDF"
            />
            <BreakdownTable
              title="Détail des dépenses"
              description="(en % · CDF principal · équivalent USD)"
              centerValue="39 735,6"
              data={expenseBreakdown}
            />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '200ms' }}>
            <MinistryChart />
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '320ms' }}>
            <ExpenseDetail />
          </div>
        </>
      )
    case 'Trésorerie':
      return (
        <>
          <SectionHeading
            title="Trésorerie"
            description="Situation et évolution des disponibilités de l'État"
          />
          <div className="animate-fade-up">
            <TreasuryCard />
          </div>
        </>
      )
    case 'Dette publique':
      return (
        <>
          <SectionHeading
            title="Dette publique"
            description="Encours et structure de la dette de l'État"
          />
          <div className="animate-fade-up">
            <PublicDebtCard />
          </div>
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
          <div className="animate-fade-up">
            <MinistryDrilldown data={ministryExecution} />
          </div>
        </>
      )
    case 'Exécution par province':
      return (
        <>
          <SectionHeading
            title="Exécution par province"
            description="Exécution des dépenses par province"
          />
          <div className="animate-fade-up flex items-center gap-2 text-[11px] font-medium">
            {provincesPubliees ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Données publiées{periodeLabel ? ` — ${periodeLabel}` : ''}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                Données de démonstration — aucune saisie publiée pour cette période
              </span>
            )}
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '120ms' }}>
            <ProvinceDrilldown data={provincesPubliees ?? provinces} />
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
          <div className="animate-fade-up">
            <MacroCard />
          </div>
        </>
      )
    case 'Suivi des réformes':
      return (
        <>
          <SectionHeading
            title="Suivi des réformes"
            description="Avancement des réformes budgétaires"
          />
          <div className="animate-fade-up">
            <ReformsCard />
          </div>
        </>
      )
    case 'Suivi de l’exécution (ESB)':
      return (
        <div className="animate-fade-up">
          <TrackingTable />
        </div>
      )
    case 'Analyses':
      return (
        <div className="animate-fade-up">
          <AnalysisView />
        </div>
      )
    case 'Alertes & Risques':
      return (
        <>
          <SectionHeading
            title="Alertes & Risques"
            description="Points de vigilance sur l'exécution budgétaire"
          />
          <div className="animate-fade-up">
            <AlertsCard />
          </div>
        </>
      )
    case 'Tableau HTML annuel':
      return <AnnualHtmlDashboard exercice={exercice} />
    case 'Rapports':
      return <ReportsView />
    case 'Processus budgétaire':
      return (
        <div className="animate-fade-up">
          <BudgetProcessView />
        </div>
      )
    case 'Documentation':
      return (
        <div className="animate-fade-up">
          <DocumentationView />
        </div>
      )
    default:
      if (isDecideur) return <DecideurOverview />

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
