import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import type { NavLabel } from '@/components/dashboard/sidebar'

type PageProps = { params: Promise<{ section: string }> }

const sections: Record<string, NavLabel> = {
  recettes: 'Recettes', depenses: 'Dépenses', tresorerie: 'Trésorerie',
  'dette-publique': 'Dette publique', 'investissements-publics': 'Investissements Publics',
  'execution-par-ministere': 'Exécution par Ministère', provinces: 'Provinces',
  'indicateurs-macroeconomiques': 'Indicateurs Macroéconomiques',
  'suivi-des-reformes': 'Suivi des réformes', 'tableau-esb': 'Tableau ESB',
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

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params
  const label = sections[section]
  if (!label) notFound()

  return <DashboardShell section={label} />
}
