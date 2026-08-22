import { PROVINCES_GEO } from '@/lib/provinces-geo'

export const kpis = [
  {
    label: 'Recettes totales',
    sublabel: '(cumul à date)',
    value: '12 543,8',
    unit: 'Mrd CDF',
    meta: "Taux d'exécution",
    metaValue: '45,2%',
    compareLabel: 'vs 2023 :',
    compareValue: '+8,6%',
    compareTone: 'positive',
    icon: 'HandCoins',
    color: 'success',
  },
  {
    label: 'Dépenses totales',
    sublabel: '(cumul à date)',
    value: '39 735,6',
    unit: 'Mrd CDF',
    meta: "Taux d'exécution",
    metaValue: '86,9%',
    compareLabel: 'Situation au',
    compareValue: '31/12/2025',
    compareTone: 'positive',
    icon: 'Wallet',
    color: 'info',
  },
  {
    label: 'Solde budgétaire',
    sublabel: '(base engagement)',
    value: '2 671,5',
    unit: 'Mrd CDF',
    meta: '',
    metaValue: '',
    compareLabel: 'vs 2023 :',
    compareValue: '+15,7%',
    compareTone: 'positive',
    icon: 'Scale',
    color: 'success',
  },
  {
    label: 'Solde budgétaire',
    sublabel: '(base caisse)',
    value: '1 983,6',
    unit: 'Mrd CDF',
    meta: '',
    metaValue: '',
    compareLabel: 'vs 2023 :',
    compareValue: '+12,4%',
    compareTone: 'positive',
    icon: 'Coins',
    color: 'violet',
  },
  {
    label: 'Dette publique totale',
    sublabel: '(en % du PIB)',
    value: '22,7%',
    unit: '',
    meta: '',
    metaValue: '',
    compareLabel: 'vs 2023 :',
    compareValue: '+1,8 pt',
    compareTone: 'negative',
    icon: 'Landmark',
    color: 'warning',
  },
  {
    label: 'Inflation (glissement annuel)',
    sublabel: '',
    value: '8,4%',
    unit: '',
    meta: '',
    metaValue: '',
    compareLabel: 'vs 2023 :',
    compareValue: '+2,1 pt',
    compareTone: 'negative',
    icon: 'TrendingUp',
    color: 'destructive',
  },
]

export const budgetExecution = [
  { name: 'RECETTES', prevision: 27764.4, execution: 12543.8, taux: '45,2%' },
  { name: 'DÉPENSES', prevision: 45749.6, execution: 39735.6, taux: '86,9%' },
]

export const revenueBreakdown = [
  { name: 'Recettes fiscales', value: 70.1, color: 'var(--chart-1)' },
  { name: 'Recettes pétrolières', value: 18.7, color: 'oklch(0.62 0.16 245)' },
  { name: 'Recettes minières', value: 6.5, color: 'var(--chart-3)' },
  { name: 'Recettes non fiscales', value: 3.4, color: 'var(--chart-2)' },
  { name: 'Dons', value: 1.3, color: 'oklch(0.5 0.16 300)' },
]

export const expenseBreakdown = [
  { name: 'Rémunérations', value: 31.9, color: 'var(--chart-1)' },
  { name: 'Fonctionnement', value: 27.8, color: 'oklch(0.62 0.16 245)' },
  { name: 'Investissements', value: 14.6, color: 'var(--chart-2)' },
  { name: 'Interventions', value: 4.0, color: 'var(--chart-3)' },
  { name: 'Dette et frais financiers', value: 3.4, color: 'var(--chart-4)' },
  { name: 'Autres dépenses', value: 18.3, color: 'var(--chart-5)' },
]

export const ministryExecution = [
  { name: 'Infrastructures et Travaux Publics', value: 113.4 },
  { name: 'Finances', value: 98.0 },
  { name: 'Intérieur et Sécurité', value: 85.6 },
  { name: 'Éducation Nationale et Nouvelle Citoyenneté', value: 77.7 },
  { name: 'Défense Nationale', value: 70.8 },
  { name: 'Santé Publique, Hygiène et Prévention', value: 36.5 },
  { name: 'Affaires Sociales', value: 23.3 },
  { name: 'Agriculture et Sécurité Alimentaire', value: 20.4 },
]

export const treasury = {
  solde: '1 256,4',
  banques: '1 876,3',
  engagements: '619,9',
  arrieres: '287,6',
}

export const treasuryTrend = [
  { month: 'Juin', value: 1050 },
  { month: 'Juil.', value: 980 },
  { month: 'Août', value: 1180 },
  { month: 'Sept.', value: 1020 },
  { month: 'Oct.', value: 1240 },
  { month: 'Nov.', value: 1160 },
  { month: 'Déc.', value: 1480 },
  { month: 'Janv.', value: 1360 },
  { month: 'Fév.', value: 1520 },
  { month: 'Mars', value: 1440 },
  { month: 'Avr.', value: 1680 },
  { month: 'Mai', value: 1876 },
]

export const publicDebt = [
  { type: 'Dette extérieure', encours: '17 842,6', pib: '15,3%', vs: '+1,2 pt' },
  { type: 'Dette intérieure', encours: '8 642,3', pib: '7,4%', vs: '+0,6 pt' },
  { type: 'Total dette publique', encours: '26 484,9', pib: '22,7%', vs: '+1,8 pt', total: true },
]

export const macroIndicators = [
  { name: 'PIB nominal (Mrd CDF)', value: '116 713,2', vs: '+9,1%', tone: 'positive' },
  { name: 'Taux de croissance du PIB réel', value: '4,6%', vs: '+0,8 pt', tone: 'positive' },
  { name: 'Inflation (glissement annuel)', value: '8,4%', vs: '+2,1 pt', tone: 'negative' },
  { name: 'Taux de change (CDF/USD)', value: '2 802,1', vs: '+3,7%', tone: 'negative' },
  { name: 'Prix du cuivre (USD/tonne)', value: '9 856', vs: '-5,4%', tone: 'negative' },
  { name: 'Prix du pétrole (USD/baril)', value: '82,1', vs: '+6,2%', tone: 'positive' },
]

export const alerts = [
  {
    text: 'Arriérés de paiement en augmentation 287,6 Mrd CDF (+32,4% vs 2023)',
    level: 'danger',
  },
  {
    text: "Taux d'exécution des investissements faible 19,4% à date",
    level: 'warning',
  },
  {
    text: 'Recettes pétrolières inférieures aux prévisions -8,7% vs prévisions',
    level: 'warning',
  },
  {
    text: 'Risque de liquidité : à surveiller',
    level: 'info',
  },
]

export const reforms = [
  { name: 'Implémentation du budget programme', status: 'done' },
  { name: 'Déploiement du SIGF dans les provinces', status: 'done' },
  { name: 'Réforme de la gestion de la trésorerie', status: 'progress' },
  { name: 'Renforcement du contrôle interne', status: 'done' },
  { name: 'Transparence budgétaire', status: 'done' },
]

export const provinces = PROVINCES_GEO.map((p) => ({ name: p.nom, taux: p.taux }))

export const provinceLegend = [
  { label: '≥ 50%', color: 'oklch(0.34 0.13 258)' },
  { label: '40% – 50%', color: 'oklch(0.46 0.16 258)' },
  { label: '30% – 40%', color: 'oklch(0.58 0.15 258)' },
  { label: '20% – 30%', color: 'oklch(0.74 0.1 258)' },
  { label: '< 20%', color: 'oklch(0.88 0.05 258)' },
]
