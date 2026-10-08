import { PROVINCES_GEO } from '@/lib/provinces-geo'

export const kpis = [
  {
    label: 'Recettes totales',
    sublabel: '(à fin juin 2026)',
    value: '22 476,1',
    unit: 'Mrd CDF',
    meta: "Taux de réalisation",
    metaValue: '88,4%',
    compareLabel: 'Prévision linéaire',
    compareValue: '25 433,2 Mrd CDF',
    compareTone: 'positive',
    icon: 'HandCoins',
    color: 'success',
  },
  {
    label: 'Dépenses totales',
    sublabel: '(à fin juin 2026)',
    value: '20 746,5',
    unit: 'Mrd CDF',
    meta: "Taux d'exécution",
    metaValue: '81,6%',
    compareLabel: 'Budget général',
    compareValue: '19 923,3 Mrd CDF',
    compareTone: 'positive',
    icon: 'Wallet',
    color: 'info',
  },
  {
    label: 'Solde budgétaire',
    sublabel: '(global)',
    value: '1 729,6',
    unit: 'Mrd CDF',
    meta: '',
    metaValue: '',
    compareLabel: 'à fin juin 2026',
    compareValue: 'excédent',
    compareTone: 'positive',
    icon: 'Scale',
    color: 'success',
  },
  {
    label: 'Solde budgétaire',
    sublabel: '(intérieur)',
    value: '-627,4',
    unit: 'Mrd CDF',
    meta: '',
    metaValue: '',
    compareLabel: 'à fin juin 2026',
    compareValue: 'déficit',
    compareTone: 'negative',
    icon: 'Coins',
    color: 'violet',
  },
  {
    label: 'Dette et frais financiers',
    sublabel: '(paiements)',
    value: '532,7',
    unit: 'Mrd CDF',
    meta: "Taux d'exécution",
    metaValue: '33,7%',
    compareLabel: 'Prévision linéaire',
    compareValue: '1 582,4 Mrd CDF',
    compareTone: 'negative',
    icon: 'Landmark',
    color: 'warning',
  },
  {
    label: 'Inflation moyenne',
    sublabel: '(LFR 2026)',
    value: '3,5%',
    unit: '',
    meta: '',
    metaValue: '',
    compareLabel: 'Vote initial',
    compareValue: '4,4%',
    compareTone: 'positive',
    icon: 'TrendingUp',
    color: 'destructive',
  },
]

/**
 * Agrégats affichés au profil Décideur (DG/DGA), en milliards de CDF à fin juin 2026.
 * Solde base engagement : recettes mobilisées moins dépenses exécutées (ESB).
 * Solde base caisse : à renseigner à partir des données de trésorerie (DGTCP) — null tant qu'il n'est pas publié.
 */
export const decideurKpis = [
  { label: 'Recettes totales', sublabel: 'à fin juin 2026', value: 22476.1 as number | null, icon: 'HandCoins', tone: 'success' },
  { label: 'Dépenses totales', sublabel: 'à fin juin 2026', value: 20746.5 as number | null, icon: 'Wallet', tone: 'info' },
  { label: 'Solde sur base engagement', sublabel: 'recettes moins dépenses exécutées', value: 1729.6 as number | null, icon: 'Scale', tone: 'violet' },
  { label: 'Solde sur base caisse', sublabel: 'encaissements moins décaissements', value: null as number | null, icon: 'Landmark', tone: 'warning' },
] as const

export const budgetExecution = [
  { name: 'RECETTES', prevision: 25433.2, execution: 22476.1, taux: '88,4%' },
  { name: 'DÉPENSES', prevision: 25433.2, execution: 20746.5, taux: '81,6%' },
]

export const revenueBreakdown = [
  { name: 'Recettes internes', value: 70.96, color: 'var(--chart-1)' },
  { name: 'Recettes extérieures', value: 25.37, color: 'oklch(0.62 0.16 245)' },
  { name: 'Comptes spéciaux', value: 3.66, color: 'var(--chart-3)' },
  { name: 'Budgets annexes', value: 0.01, color: 'var(--chart-2)' },
]

export const expenseBreakdown = [
  { name: 'Budget général', value: 96.03, color: 'var(--chart-1)' },
  { name: 'Comptes spéciaux', value: 3.97, color: 'var(--chart-3)' },
  { name: 'Budgets annexes', value: 0.01, color: 'var(--chart-2)' },
]

export const ministryExecution = [
  { name: 'Enseignement Supérieur et Universitaire, Recherche Scientifique et Innovation', value: 712.6 },
  { name: 'Présidence de la République', value: 436.4 },
  { name: 'Infrastructures et Travaux Publics', value: 250.0 },
  { name: 'Transports, Voies de Communication et Désenclavement', value: 201.3 },
  { name: 'Santé Publique, Hygiène et Prévoyance Sociale', value: 33.9 },
  { name: 'Défense et Anciens Combattants', value: 33.8 },
  { name: 'Ressources Hydrauliques et Electricité', value: 16.4 },
  { name: 'Intérieur, Sécurité, Décentralisation et Affaires Coutumières', value: 9.4 },
  { name: 'Budget', value: 3.9 },
  { name: 'Finances', value: 3.5 },
]

export const treasury = {
  solde: '1 729,6',
  banques: '22 476,1',
  engagements: '20 746,5',
  arrieres: '627,4',
}

export const treasuryTrend = [
  { month: 'Recettes', value: 22476.1 },
  { month: 'Dépenses', value: 20746.5 },
  { month: 'Solde', value: 1729.6 },
]

export const publicDebt = [
  { type: 'Dette publique', encours: '468,3', pib: '46,6%', vs: 'à fin juin' },
  { type: 'Frais financiers', encours: '64,3', pib: '11,2%', vs: 'à fin juin' },
  { type: 'Total dette et frais financiers', encours: '532,7', pib: '33,7%', vs: 'à fin juin', total: true },
]

export const macroIndicators = [
  { name: 'Taux de croissance', value: '5,6%', vs: 'LFR 2026', tone: 'positive' },
  { name: "Taux d'inflation moyen", value: '3,5%', vs: 'LFR 2026', tone: 'positive' },
  { name: 'Taux de croissance mine', value: '6,7%', vs: 'LFR 2026', tone: 'positive' },
  { name: 'Taux de change moyen (FC/USD)', value: '2 290,0', vs: 'LFR 2026', tone: 'positive' },
  { name: 'Taux de change fin période (FC/USD)', value: '2 398,5', vs: 'LFR 2026', tone: 'positive' },
  { name: 'PIB nominal (Mrd CDF)', value: '278 612,3', vs: 'LFR 2026', tone: 'positive' },
  { name: 'PIB nominal (Mrd USD)', value: '121,7', vs: 'LFR 2026', tone: 'positive' },
]

export const alerts = [
  { text: 'Dépenses exceptionnelles sur ressources propres exécutées à 15,8% à fin juin 2026', level: 'warning' },
  { text: 'Comptes spéciaux exécutés à 36,2% contre la prévision linéaire', level: 'warning' },
  { text: 'Solde budgétaire intérieur déficitaire de 627,4 Mrd CDF', level: 'danger' },
  { text: 'Recettes extérieures réalisées à 136,7% grâce aux appuis et financements extérieurs', level: 'info' },
]

export const reforms = [
  { name: 'Mobilisation accrue des ressources internes', status: 'progress' },
  { name: 'Poursuite des réformes des administrations financières', status: 'progress' },
  { name: 'Transparence des opérations d’endettement', status: 'progress' },
  { name: 'Amélioration de la qualité de la dépense', status: 'progress' },
]

export const provinces = PROVINCES_GEO.map((p) => ({ name: p.nom, taux: p.taux }))

export const provinceLegend = [
  { label: '≥ 50%', color: 'oklch(0.34 0.13 258)' },
  { label: '40% - 50%', color: 'oklch(0.46 0.16 258)' },
  { label: '30% - 40%', color: 'oklch(0.58 0.15 258)' },
  { label: '20% - 30%', color: 'oklch(0.74 0.1 258)' },
  { label: '< 20%', color: 'oklch(0.88 0.05 258)' },
]
