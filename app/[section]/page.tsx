import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import type { NavLabel } from '@/components/dashboard/sidebar'
import { getExercicesDisponibles, getProvincesPubliees, resolvePeriode, formatPeriodeLabel } from '@/lib/dashboard-data'

type PageProps = {
  params: Promise<{ section: string }>
  searchParams: Promise<{ exercice?: string; periode?: string }>
}

const sections: Record<string, NavLabel> = {
  parametres: 'Paramètres',
  recettes: 'Recettes', depenses: 'Dépenses', tresorerie: 'Trésorerie',
  'dette-publique': 'Dette publique', 'investissements-publics': 'Investissements Publics',
  'execution-par-ministere': 'Exécution par Ministère', provinces: 'Provinces',
  'indicateurs-macroeconomiques': 'Indicateurs Macroéconomiques',
  'suivi-des-reformes': 'Suivi des réformes', 'tableau-esb': 'Suivi de l’exécution (ESB)',
  analyses: 'Analyses',
  'alertes-et-risques': 'Alertes & Risques', rapports: 'Rapports',
  'processus-budgetaire': 'Processus budgétaire',
  documentation: 'Documentation',
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params
  const label = sections[section]
  return label ? { title: `${label} — Ministère du Budget RDC` } : {}
}

export function generateStaticParams() {
  return Object.keys(sections).map((section) => ({ section }))
}

export default async function SectionPage({ params, searchParams }: PageProps) {
  const { section } = await params
  const label = sections[section]
  if (!label) notFound()

  const { exercice, periode } = resolvePeriode(await searchParams)
  const [exercicesDisponibles, provincesPubliees] = await Promise.all([
    getExercicesDisponibles(),
    getProvincesPubliees(periode),
  ])

  return (
    <DashboardShell
      section={label}
      exercice={exercice}
      periode={periode}
      periodeLabel={formatPeriodeLabel(periode)}
      exercicesDisponibles={exercicesDisponibles}
      provincesPubliees={provincesPubliees}
    />
  )
}
