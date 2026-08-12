'use client'

import {
  LayoutDashboard,
  HandCoins,
  Wallet,
  Landmark,
  FileBarChart2,
  Building2,
  Layers,
  Map,
  LineChart,
  ClipboardCheck,
  AlertTriangle,
  FileText,
  Workflow,
  ListChecks,
  BarChart3,
  BookOpen,
  type LucideIcon,
} from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import Link from 'next/link'

type Indicator = {
  name: string
  definition: string
  formula?: string
  source?: string
}

const kpiDocs: Indicator[] = [
  {
    name: 'Recettes totales (cumul à date)',
    definition:
      "Montant total des recettes de l'État effectivement encaissées depuis le début de l'exercice budgétaire.",
    formula: "Somme des recettes fiscales, pétrolières, minières, non fiscales et des dons.",
    source: 'DGTCP, régies financières',
  },
  {
    name: 'Dépenses totales (cumul à date)',
    definition:
      "Montant total des dépenses de l'État exécutées (payées) depuis le début de l'exercice.",
    formula: 'Somme des dépenses par nature exécutées à la date de référence.',
    source: 'SIGF, DGTCP',
  },
  {
    name: 'Solde budgétaire (base engagement)',
    definition:
      "Différence entre les recettes et les dépenses engagées. Mesure l'équilibre budgétaire au stade de l'engagement, avant décaissement effectif.",
    formula: 'Recettes − Dépenses engagées',
    source: 'SIGF',
  },
  {
    name: 'Solde budgétaire (base caisse)',
    definition:
      "Différence entre les recettes encaissées et les dépenses effectivement payées. Reflète la trésorerie réelle de l'État.",
    formula: 'Recettes encaissées − Dépenses payées',
    source: 'DGTCP',
  },
  {
    name: 'Dette publique totale (en % du PIB)',
    definition:
      "Encours total de la dette de l'État (intérieure et extérieure) rapporté au produit intérieur brut. Indicateur clé de soutenabilité.",
    formula: '(Encours total de la dette / PIB nominal) × 100',
    source: 'DGDP, BCC',
  },
  {
    name: 'Inflation (glissement annuel)',
    definition:
      "Variation du niveau général des prix sur douze mois. Un glissement annuel élevé traduit une perte de pouvoir d'achat.",
    formula: '(IPC mois courant / IPC même mois année précédente − 1) × 100',
    source: 'BCC, INS',
  },
]

const otherIndicators: Indicator[] = [
  {
    name: "Taux d'exécution",
    definition:
      "Part des prévisions annuelles réalisée à la date de référence. Permet de suivre le rythme d'exécution.",
    formula: '(Réalisation à date / Prévision annuelle) × 100',
  },
  {
    name: 'PIB nominal',
    definition:
      "Valeur de la production nationale aux prix courants, sans correction de l'inflation.",
    source: 'INS, BCC',
  },
  {
    name: 'Taux de croissance du PIB réel',
    definition:
      "Évolution de la production nationale corrigée de l'inflation, sur un an.",
  },
  {
    name: 'Taux de change (CDF/USD)',
    definition:
      "Nombre de francs congolais nécessaires pour obtenir un dollar américain. Une hausse traduit une dépréciation du CDF.",
    source: 'BCC',
  },
  {
    name: 'Arriérés de paiement',
    definition:
      "Dépenses dues et échues mais non encore payées par l'État. Une hausse signale une tension de trésorerie.",
  },
  {
    name: 'Engagements à payer',
    definition:
      "Dépenses engagées dont le paiement reste à effectuer.",
  },
  {
    name: 'Solde de trésorerie',
    definition:
      "Disponibilités nettes de l'État à la date de référence (comptes bancaires et caisses).",
    source: 'DGTCP',
  },
  {
    name: 'Prix du cuivre / du pétrole',
    definition:
      "Cours internationaux des principales matières premières influençant les recettes de la RDC.",
    source: 'Marchés internationaux',
  },
]

type PageDoc = {
  label: string
  href: string
  icon: LucideIcon
  purpose: string
  content: string
}

const pageDocs: PageDoc[] = [
  {
    label: "Vue d'ensemble",
    href: '/',
    icon: LayoutDashboard,
    purpose: "Synthèse stratégique de l'exécution du budget de l'État.",
    content:
      'Regroupe les 6 indicateurs clés (KPI), le graphique recettes/dépenses, la répartition des recettes et des dépenses, l\u2019exécution par ministère et par province, la trésorerie, la dette, les indicateurs macroéconomiques, les alertes et le suivi des réformes.',
  },
  {
    label: 'Recettes',
    href: '/recettes',
    icon: HandCoins,
    purpose: 'Détail de la mobilisation des recettes à date.',
    content:
      'Présente la répartition des recettes par catégorie (fiscales, pétrolières, minières, non fiscales, dons) sous forme de graphique en anneau et de tableau détaillé en montants et en pourcentages.',
  },
  {
    label: 'Dépenses',
    href: '/depenses',
    icon: Wallet,
    purpose: "Suivi de l'exécution des dépenses par nature.",
    content:
      'Affiche la ventilation des dépenses (personnel, biens et services, transferts, intérêts de la dette, investissements, autres) et le taux d\u2019exécution par ministère.',
  },
  {
    label: 'Trésorerie',
    href: '/tresorerie',
    icon: Landmark,
    purpose: "Situation et évolution des disponibilités de l'État.",
    content:
      "Montre le solde de trésorerie, les disponibilités en banque, les engagements à payer, les arriérés et l'évolution des disponibilités sur les 12 derniers mois.",
  },
  {
    label: 'Dette publique',
    href: '/dette-publique',
    icon: FileBarChart2,
    purpose: "Encours et structure de la dette de l'État.",
    content:
      "Détaille la dette extérieure et intérieure, leur poids en pourcentage du PIB et leur évolution par rapport à l'année précédente.",
  },
  {
    label: 'Investissements Publics',
    href: '/investissements-publics',
    icon: Building2,
    purpose: "Exécution des dépenses d'investissement.",
    content:
      "Présente la part des investissements dans les dépenses, leur taux d'exécution, les montants engagés et la comparaison annuelle.",
  },
  {
    label: 'Exécution par Ministère',
    href: '/execution-par-ministere',
    icon: Layers,
    purpose: "Taux d'exécution des dépenses par ministère.",
    content:
      "Classe les ministères selon leur taux d'exécution des dépenses à date, sous forme de barres horizontales.",
  },
  {
    label: 'Provinces',
    href: '/provinces',
    icon: Map,
    purpose: 'Exécution des dépenses par province.',
    content:
      "Combine une carte choroplèthe de la RDC (colorée selon le taux d'exécution) et un tableau détaillé par province.",
  },
  {
    label: 'Analyses',
    href: '/analyses',
    icon: BarChart3,
    purpose: 'Exploration multidimensionnelle de l’exécution budgétaire.',
    content:
      'Regroupe dans une même page les lectures par ministère, province, nature économique et période, accessibles au moyen d’onglets internes.',
  },
  {
    label: 'Indicateurs Macroéconomiques',
    href: '/indicateurs-macroeconomiques',
    icon: LineChart,
    purpose: 'Environnement macroéconomique et hypothèses budgétaires.',
    content:
      'Récapitule le PIB, la croissance, l\u2019inflation, le taux de change et les cours des matières premières, avec leur variation annuelle.',
  },
  {
    label: 'Suivi des réformes',
    href: '/suivi-des-reformes',
    icon: ClipboardCheck,
    purpose: 'Avancement des réformes budgétaires.',
    content:
      "Affiche l'avancement global et le statut de chaque réforme (réalisée, en cours).",
  },
  {
    label: 'Suivi de l’exécution (ESB)',
    href: '/tableau-esb',
    icon: ListChecks,
    purpose: 'Suivi détaillé des engagements et de l’exécution budgétaire.',
    content:
      'Centralise les lignes de suivi budgétaire, leurs montants, leur niveau d’exécution et leur situation afin de faciliter le pilotage opérationnel.',
  },
  {
    label: 'Alertes & Risques',
    href: '/alertes-et-risques',
    icon: AlertTriangle,
    purpose: "Points de vigilance sur l'exécution budgétaire.",
    content:
      "Liste les risques hiérarchisés par niveau (danger, avertissement, information) : arriérés, faible exécution, recettes inférieures aux prévisions, liquidité.",
  },
  {
    label: 'Rapports',
    href: '/rapports',
    icon: FileText,
    purpose: 'Documents budgétaires et exports de données.',
    content:
      "Permet de télécharger les rapports d'exécution, de trésorerie, de dette, macroéconomiques et de réformes au format CSV.",
  },
  {
    label: 'Processus budgétaire',
    href: '/processus-budgetaire',
    icon: Workflow,
    purpose: 'Représentation chronologique du cycle budgétaire de l’État.',
    content:
      'Présente les 4 phases et les 12 étapes du cadrage à la reddition des comptes. Chaque étape affiche son activité, ses intervenants et une date éditable sauvegardée dans le navigateur. La frise permet de sélectionner, ouvrir et focaliser directement une étape. La page détaille également les quatre actes de la dépense publique.',
  },
  {
    label: 'Documentation',
    href: '/documentation',
    icon: BookOpen,
    purpose: 'Guide d\u2019utilisation du tableau de bord.',
    content:
      "La présente page : définition de tous les indicateurs (KPI et notions annexes), présentation détaillée de chaque page de la webapp et rappel des sources de données.",
  },
]

function IndicatorList({ items }: { items: Indicator[] }) {
  return (
    <div className="divide-y divide-border">
      {items.map((ind) => (
        <div key={ind.name} className="py-3 first:pt-0 last:pb-0">
          <p className="text-[13px] font-semibold text-foreground">{ind.name}</p>
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
            {ind.definition}
          </p>
          {ind.formula && (
            <p className="mt-1.5 inline-block rounded bg-accent px-2 py-1 font-mono text-[11px] text-accent-foreground">
              {ind.formula}
            </p>
          )}
          {ind.source && (
            <p className="mt-1 text-[11px] text-muted-foreground">
              <span className="font-semibold">Source :</span> {ind.source}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}

export function DocumentationView() {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Comment lire le tableau de bord</CardTitle>
          <CardDescription>Principes généraux</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-[12px] leading-relaxed text-muted-foreground">
          <p>
            Chaque rubrique du menu correspond à une page autonome avec sa propre adresse.
            Elle peut être ouverte directement, actualisée ou ajoutée aux favoris sans perdre
            la section consultée.
          </p>
          <p>
            Ce tableau de bord suit l&apos;exécution du Budget de l&apos;État de la
            République Démocratique du Congo. Les montants sont exprimés en{' '}
            <span className="font-semibold text-foreground">
              milliards de francs congolais (Mrd CDF)
            </span>{' '}
            sauf indication contraire.
          </p>
          <p>
            Les sélecteurs{' '}
            <span className="font-semibold text-foreground">Exercice</span> et{' '}
            <span className="font-semibold text-foreground">Période</span> en haut à
            droite définissent l&apos;année budgétaire et le mois de référence. Le
            bouton <span className="font-semibold text-foreground">Exporter</span>{' '}
            télécharge les données au format CSV.
          </p>
          <p>
            La mention{' '}
            <span className="font-semibold text-foreground">« à date »</span> ou{' '}
            <span className="font-semibold text-foreground">« cumul à date »</span>{' '}
            désigne le cumul depuis le début de l&apos;exercice jusqu&apos;à la période
            sélectionnée. Les comparaisons{' '}
            <span className="font-semibold text-foreground">« vs 2023 »</span> se font
            par rapport à la même période de l&apos;année précédente.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Indicateurs clés (KPI)</CardTitle>
            <CardDescription>Les 6 cartes de la vue d&apos;ensemble</CardDescription>
          </CardHeader>
          <CardContent>
            <IndicatorList items={kpiDocs} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Autres indicateurs</CardTitle>
            <CardDescription>Notions utilisées dans les différentes pages</CardDescription>
          </CardHeader>
          <CardContent>
            <IndicatorList items={otherIndicators} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Présentation des pages</CardTitle>
          <CardDescription>Rôle et contenu de chaque section du menu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {pageDocs.map(({ label, href, icon: Icon, purpose, content }) => (
              <Link
                key={label}
                href={href}
                className="group rounded-lg border border-border p-4 transition-colors hover:border-primary/30 hover:bg-accent/40"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-foreground group-hover:text-primary">{label}</p>
                    <p className="truncate font-mono text-[9px] text-muted-foreground">{href}</p>
                  </div>
                </div>
                <p className="mt-2 text-[12px] font-medium text-foreground">{purpose}</p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {content}
                </p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sources des données</CardTitle>
          <CardDescription>Institutions productrices</CardDescription>
        </CardHeader>
        <CardContent className="text-[12px] leading-relaxed text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">SIGF</span> : Système
            Intégré de Gestion des Finances publiques —{' '}
            <span className="font-semibold text-foreground">DGTCP</span> : Direction
            Générale du Trésor et de la Comptabilité Publique —{' '}
            <span className="font-semibold text-foreground">BCC</span> : Banque Centrale
            du Congo — <span className="font-semibold text-foreground">MEF</span> :
            Ministère de l&apos;Économie et des Finances —{' '}
            <span className="font-semibold text-foreground">INS</span> : Institut
            National de la Statistique.
          </p>
        </CardContent>
      </Card>
    </>
  )
}
