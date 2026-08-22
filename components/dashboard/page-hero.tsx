import { Sparkles } from 'lucide-react'
import { nav, type NavLabel } from '@/components/dashboard/sidebar'

const descriptions: Record<NavLabel, string> = {
  Paramètres: 'Configuration des variables utilisées dans le tableau de bord.',
  "Vue d'ensemble": "Une vision consolidée des indicateurs clés et de l’exécution du Budget de l’État.",
  Recettes: 'Suivi de la mobilisation, de la structure et de la performance des recettes publiques.',
  Dépenses: 'Analyse de l’exécution des dépenses par nature et de leur rythme de consommation.',
  Trésorerie: 'Lecture des disponibilités, engagements à payer et équilibres de trésorerie de l’État.',
  'Dette publique': 'Suivi de l’encours, de la structure et de la soutenabilité de la dette publique.',
  'Investissements Publics': 'Pilotage des crédits et de la réalisation des investissements structurants.',
  'Exécution par Ministère': 'Comparaison des performances d’exécution budgétaire entre ministères.',
  'Exécution par province': 'Analyse territoriale de l’exécution budgétaire dans les provinces de la RDC.',
  'Indicateurs Macroéconomiques': 'Lecture des principaux agrégats qui encadrent la programmation budgétaire.',
  'Suivi des réformes': 'Pilotage de l’avancement des réformes et des chantiers de modernisation.',
  'Suivi de l’exécution (ESB)': 'Une lecture dynamique de la chaîne d’exécution budgétaire par section.',
  Analyses: 'Exploration multidimensionnelle des données par ministère, province, nature et période.',
  'Alertes & Risques': 'Identification et hiérarchisation des points de vigilance budgétaires.',
  Rapports: 'Accès centralisé aux rapports, situations périodiques et exports de données.',
  'Processus budgétaire': 'Du cadrage à la reddition des comptes, une vision complète du cycle budgétaire.',
  Documentation: 'Guide des indicateurs, des fonctionnalités et des sources du tableau de bord.',
}

export function PageHero({ section }: { section: NavLabel }) {
  if (section === 'Suivi de l’exécution (ESB)' || section === 'Processus budgétaire') return null
  const item = nav.find((entry) => entry.label === section)!
  const Icon = item.icon

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-7 text-white shadow-lg md:px-8">
      <div className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 h-28 w-28 rounded-full bg-violet-400/15 blur-2xl" />
      <div className="relative flex flex-col justify-between gap-5 md:flex-row md:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.16em]">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            {item.group}
          </div>
          <h2 className="text-2xl font-black tracking-tight md:text-3xl">{section}</h2>
          <p className="mt-2 max-w-3xl text-[13px] text-blue-100/80">{descriptions[section]}</p>
        </div>
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner backdrop-blur">
          <Icon className="h-9 w-9 text-blue-200" />
        </div>
      </div>
    </section>
  )
}
