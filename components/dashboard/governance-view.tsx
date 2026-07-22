'use client'

import {
  ScrollText,
  Scale,
  Wallet,
  ArrowRightLeft,
  ShieldAlert,
  CircleDollarSign,
  Building2,
  ShoppingCart,
  RefreshCw,
  Ban,
  ArrowRight,
  ArrowDown,
  type LucideIcon,
} from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

/* ---------- Content models ---------- */

const pillars: { n: string; title: string }[] = [
  { n: '1', title: 'Réformes institutionnelles & efficacité' },
  { n: '2', title: 'Stabilité macroéconomique & emploi' },
  { n: '3', title: 'Modernisation des infrastructures' },
  { n: '4', title: 'Amélioration du cadre de vie' },
  { n: '5', title: 'Capital humain & éducation' },
  { n: '6', title: 'Diplomatie & coopération' },
]

const instruments: {
  code: string
  subtitle: string
  action: string
  definition: string
  rule: string
  icon: LucideIcon
  width: string
}[] = [
  {
    code: 'La Loi de Finances',
    subtitle: "L'autorisation",
    action: 'AUTORISE',
    definition: "Le plafond absolu et l'autorisation légale de dépenser.",
    rule: 'Le dépassement des crédits budgétaires est strictement interdit.',
    icon: Scale,
    width: 'w-full',
  },
  {
    code: 'Le PEB',
    subtitle: "Plan d'Engagement Budgétaire",
    action: 'PLANIFIE',
    definition: 'La régulation du rythme de consommation des crédits.',
    rule: "Aucune dépense ne peut être engagée si la ligne n'est pas libérée dans le PEB.",
    icon: ArrowRightLeft,
    width: 'w-[82%]',
  },
  {
    code: 'Le PTR',
    subtitle: 'Plan de Trésorerie',
    action: 'FINANCE',
    definition: "L'argent réel disponible en caisse.",
    rule: 'Le PEB doit mathématiquement s\u2019aligner sur le PTR pour prévenir les arriérés.',
    icon: Wallet,
    width: 'w-[64%]',
  },
]

const revenueCycle = [
  { n: '1', title: 'Constatation', desc: 'Identifier et évaluer la matière imposable.' },
  { n: '2', title: 'Liquidation', desc: 'Déterminer le montant exact (bases, taux, tarifs).' },
  { n: '3', title: 'Ordonnancement', desc: 'Établir le titre de perception (prise en charge).' },
  { n: '4', title: 'Recouvrement', desc: "L'encaissement réel par l'État." },
]

const expenseCycle = [
  { n: '1', title: 'Engagement', desc: "L'acte créant l'obligation (Bon d'Engagement - BDE)." },
  { n: '2', title: 'Liquidation', desc: 'Vérifier la réalité de la dette et le service fait.' },
  { n: '3', title: 'Ordonnancement', desc: "L'ordre administratif de payer (OPI)." },
  { n: '4', title: 'Paiement', desc: "L'État se libère de sa dette (BCC / Comptable)." },
]

const revenuePillars: { agency: string; title: string; objective: string }[] = [
  {
    agency: 'DGDA',
    title: 'Douanes & Accises',
    objective:
      "Capter la TVA à l'importation, contrôler la valeur en douane et lutter contre la fraude douanière.",
  },
  {
    agency: 'DGI',
    title: 'Impôts',
    objective:
      "Application rigoureuse de la TVA, unification des échéances et fiscalisation du secteur informel (NIF).",
  },
  {
    agency: 'DGRAD',
    title: 'Non-Fiscal & Domanial',
    objective:
      'Sécuriser les titres fonciers (biométrie) et canaliser les recettes consulaires vers le Trésor.',
  },
  {
    agency: 'Pétrole & Extérieur',
    title: 'Pétroliers & Extérieurs',
    objective:
      'Alignement sur les cours internationaux du baril et traçabilité des dons via la PGAI.',
  },
]

const procurement: {
  nature: string
  national: string
  international: string
}[] = [
  { nature: 'Travaux', national: '\u2265 50 M FC', international: '\u2265 8 Mrd FC' },
  { nature: 'Fournitures', national: '\u2265 50 M FC', international: '\u2265 500 M FC' },
  { nature: 'Prestations intellectuelles', national: '\u2265 20 M FC', international: '\u2265 250 M FC' },
]

const madSteps = [
  { n: '1', title: 'Émission', desc: 'BDE initié sur base du quota mensuel.' },
  { n: '2', title: 'Transfert', desc: 'Fonds gérés par le Comptable Public Principal.' },
  { n: '3', title: 'Verrou de justification', desc: 'Le Comptable soumet les reçus et un BDE de régularisation.' },
  { n: '4', title: 'Visa de conformité', desc: 'La DCB valide et déverrouille le compte.' },
]

const goldenRules: { title: string; desc: string }[] = [
  {
    title: "Pas d'avances BCC",
    desc: 'Le recours aux avances de la Banque Centrale du Congo est strictement prohibé.',
  },
  {
    title: 'Pas de compensation',
    desc: "Interdiction de la consommation à la source : toutes les recettes transitent par le Trésor.",
  },
  {
    title: 'Intégrité du circuit',
    desc: 'Toute demande de paiement hors de la chaîne de la dépense est nulle.',
  },
  {
    title: 'Preuves originales',
    desc: 'Aucun dossier de dépense en photocopie ne sera admis au traitement.',
  },
  {
    title: 'Souveraineté monétaire',
    desc: "L'indexation des salaires en monnaie étrangère est interdite (sauf diplomatie).",
  },
]

/* ---------- Diagram helpers ---------- */

const toneClasses = {
  primary: {
    node: 'border-primary/30 bg-primary/5',
    badge: 'bg-primary text-primary-foreground',
    bar: 'bg-primary',
    arrow: 'text-primary',
  },
  success: {
    node: 'border-success/30 bg-success/5',
    badge: 'bg-success text-success-foreground',
    bar: 'bg-success',
    arrow: 'text-success',
  },
} as const

type Tone = keyof typeof toneClasses

/** Modern sequential flow: numbered nodes connected by arrows (row on lg, column on mobile). */
function FlowChain({
  steps,
  tone,
}: {
  steps: { n: string; title: string; desc: string }[]
  tone: Tone
}) {
  const t = toneClasses[tone]
  return (
    <div className="flex flex-col items-stretch lg:flex-row lg:items-center">
      {steps.map((s, i) => (
        <div
          key={s.n}
          className="flex flex-col items-stretch lg:flex-1 lg:flex-row lg:items-center"
        >
          <div
            className={cn(
              'relative flex-1 rounded-xl border p-4 transition-transform hover:-translate-y-0.5',
              t.node,
            )}
          >
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold shadow-sm',
                  t.badge,
                )}
              >
                {s.n}
              </span>
              <p className="text-[13px] font-bold text-foreground text-pretty">{s.title}</p>
            </div>
            <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">{s.desc}</p>
          </div>

          {i < steps.length - 1 && (
            <div className="flex items-center justify-center py-1 lg:px-1.5 lg:py-0">
              <ArrowRight className={cn('hidden h-5 w-5 shrink-0 lg:block', t.arrow)} />
              <ArrowDown className={cn('h-5 w-5 shrink-0 lg:hidden', t.arrow)} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ---------- Main view ---------- */

export function GovernanceView() {
  return (
    <>
      <div>
        <div className="flex items-center gap-2">
          <ScrollText className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground text-balance">
            Le Schéma Directeur de la Gouvernance Financière
          </h2>
        </div>
        <p className="text-[13px] text-muted-foreground">
          Instructions relatives à l&apos;exécution de la Loi de Finances pour une gestion
          axée sur les résultats — Circulaire N°001/ME/MIN.BUDGET (Janvier 2015).
        </p>
      </div>

      {/* 6 Piliers + Double Mandat */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Les 6 piliers du Gouvernement (PAG)</CardTitle>
            <CardDescription>Le cadre de l&apos;action publique</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {pillars.map((p) => (
                <div
                  key={p.n}
                  className="flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent/40"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-[13px] font-bold text-accent-foreground">
                    {p.n}
                  </span>
                  <p className="text-[13px] font-medium text-foreground text-pretty">
                    {p.title}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-primary" />
              Le double mandat
            </CardTitle>
            <CardDescription>Deux exigences complémentaires</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-lg border-l-4 border-warning bg-warning/10 p-3">
              <p className="text-[13px] font-bold text-foreground">
                Maximisation / Mobilisation optimale
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                Élargir l&apos;assiette, éradiquer le coulage, numériser la traçabilité.
              </p>
            </div>
            <div className="rounded-lg border-l-4 border-primary bg-primary/10 p-3">
              <p className="text-[13px] font-bold text-foreground">
                Rationalisation / Encadrement strict
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                Gestion Axée sur les Résultats (GAR), respect strict des plafonds et
                alignement sur les priorités sectorielles.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3 instruments — pyramide de contrainte */}
      <Card>
        <CardHeader>
          <CardTitle>Les trois instruments de l&apos;exécution</CardTitle>
          <CardDescription>
            La Loi autorise, le PEB planifie, le PTR finance — chaque niveau contraint le
            suivant. Leur synchronisation est la condition de la stabilité macroéconomique.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-1">
            {instruments.map((ins, i) => {
              const Icon = ins.icon
              return (
                <div key={ins.code} className={cn('flex flex-col items-center', ins.width)}>
                  <div className="w-full rounded-xl border border-primary/30 bg-gradient-to-r from-primary/10 to-accent/40 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                          <Icon className="h-5 w-5" />
                        </span>
                        <div className="leading-tight">
                          <p className="text-[14px] font-bold text-foreground">{ins.code}</p>
                          <p className="text-[10px] uppercase text-muted-foreground">
                            {ins.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                        {ins.action}
                      </span>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      <p className="text-[12px] leading-relaxed text-muted-foreground">
                        {ins.definition}
                      </p>
                      <p className="rounded bg-card px-2 py-1.5 text-[11px] leading-relaxed text-foreground">
                        {ins.rule}
                      </p>
                    </div>
                  </div>
                  {i < instruments.length - 1 && (
                    <ArrowDown className="my-1 h-5 w-5 text-primary" />
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Cycle de vie symétrique — flux séquentiels */}
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-success" />
              Le cycle des recettes (l&apos;entrée)
            </CardTitle>
            <CardDescription>De la constatation au recouvrement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FlowChain steps={revenueCycle} tone="success" />
            <p className="rounded-lg border-l-4 border-success bg-success/10 p-3 text-[12px] leading-relaxed text-foreground">
              <span className="font-semibold">Règle clé :</span> toutes les recettes
              assurent l&apos;ensemble des dépenses. La consommation à la source est
              interdite.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-primary" />
              La chaîne de la dépense (la sortie)
            </CardTitle>
            <CardDescription>De l&apos;engagement au paiement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <FlowChain steps={expenseCycle} tone="primary" />
            <p className="rounded-lg border-l-4 border-primary bg-primary/10 p-3 text-[12px] leading-relaxed text-foreground">
              <span className="font-semibold">Règle clé :</span> tout paiement nécessite un
              ordonnancement, qui nécessite une liquidation et un engagement préalable.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 4 piliers recettes */}
      <Card>
        <CardHeader>
          <CardTitle>Les 4 piliers de la mobilisation des recettes</CardTitle>
          <CardDescription>Régies financières et objectifs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {revenuePillars.map((rp) => (
              <div
                key={rp.agency}
                className="rounded-lg border border-border p-4 transition-transform hover:-translate-y-0.5"
              >
                <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                  {rp.agency}
                </span>
                <p className="mt-2 text-[13px] font-semibold text-foreground">
                  {rp.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                  {rp.objective}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Axe provincial + Marchés publics */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary" />
              L&apos;axe provincial : le modèle des 40%
            </CardTitle>
            <CardDescription>Répartition des recettes à caractère national</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Barre de répartition visuelle */}
            <div>
              <div className="flex h-9 w-full overflow-hidden rounded-lg border border-border">
                <div className="flex items-center justify-center bg-success text-[12px] font-bold text-success-foreground" style={{ width: '40%' }}>
                  40%
                </div>
                <div className="flex flex-1 items-center justify-center bg-primary text-[12px] font-bold text-primary-foreground">
                  60%
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-success" /> Part provinciale
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Pouvoir central
                </span>
              </div>
            </div>

            <div className="space-y-2 text-[12px] leading-relaxed text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Catégorie A (locales)</span>{' '}
                : 40% retenus directement à la source (nivellement BCC).
              </p>
              <p>
                <span className="font-semibold text-foreground">
                  Catégorie B (centrales : douanes, pétrole)
                </span>{' '}
                : 40% redistribués selon le poids démographique et la capacité.
              </p>
              <p>
                <span className="font-semibold text-foreground">Déduction centrale</span> :
                le gouvernement déduit le coût des compétences non transférées (ex. paie des
                enseignants).
              </p>
            </div>
            <p className="rounded-lg border-l-4 border-success bg-success/10 p-3 text-[12px] leading-relaxed text-foreground">
              <span className="font-semibold">Exception pétrolière :</span> 10% de la part
              provinciale va exclusivement à la province productrice pour réparation
              environnementale.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-primary" />
              Marchés publics : seuils
            </CardTitle>
            <CardDescription>Seuils de passation en francs congolais</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-[12px]">
              <thead>
                <tr className="text-left text-[10px] uppercase text-muted-foreground">
                  <th className="pb-2 font-semibold">Nature</th>
                  <th className="pb-2 text-right font-semibold">Appel national</th>
                  <th className="pb-2 text-right font-semibold">Appel international</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {procurement.map((p) => (
                  <tr key={p.nature}>
                    <td className="py-2 font-medium text-foreground">{p.nature}</td>
                    <td className="py-2 text-right text-muted-foreground">{p.national}</td>
                    <td className="py-2 text-right text-muted-foreground">
                      {p.international}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 rounded bg-muted px-2 py-1.5 text-[11px] leading-relaxed text-foreground">
              Gré à gré : strictement sur autorisation de la DGCMP (monopole absolu,
              urgence extrême ou défense nationale). Avances plafonnées à 30% (travaux) et
              20% (fournitures), avec garantie bancaire.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mécanisme M.A.D — flux séquentiel avec verrou */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4 text-primary" />
            Le mécanisme M.A.D (Mise à Disposition)
          </CardTitle>
          <CardDescription>
            Procédure accélérée réservée au fonctionnement de base (fournitures, internet,
            urgences).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FlowChain steps={madSteps} tone="primary" />
          <p className="flex items-start gap-2 rounded-lg border-l-4 border-warning bg-warning/10 p-3 text-[12px] leading-relaxed text-foreground">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
            <span>
              Aucun service ne peut prétendre au renouvellement de la mise à disposition si
              l&apos;utilisation des fonds précédents n&apos;est pas intégralement
              justifiée.
            </span>
          </p>
        </CardContent>
      </Card>

      {/* Règles d'or */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ban className="h-4 w-4 text-destructive" />
            Les règles d&apos;or : prohibitions absolues
          </CardTitle>
          <CardDescription>
            L&apos;exécution de la Loi de Finances reflète la crédibilité, la sincérité et
            l&apos;exhaustivité de l&apos;État.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {goldenRules.map((r) => (
              <div
                key={r.title}
                className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2">
                  <Ban className="h-4 w-4 shrink-0 text-destructive" />
                  <p className="text-[13px] font-bold text-foreground">{r.title}</p>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
