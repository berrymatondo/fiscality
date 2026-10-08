import type { jsPDF } from 'jspdf'
import { budgetSections } from '@/lib/budget-sections'
import { expenseTables } from '@/lib/depenses-executees'
import { revenueTables, type RevenueTable } from '@/lib/recettes-mobilisees'
import { PDF_ACCENTS, PDF_COLORS, drawFooters, drawPageHeader, drawSectionTitle, fill, hexToRgb, ink, sanitizePdfText, tint, type Rgb } from '@/lib/pdf-theme'
import {
  CONTENT_WIDTH,
  MARGIN,
  drawCallout,
  drawChartCard,
  drawDonut,
  drawGroupedBars,
  drawHorizontalBars,
  drawKpiTiles,
  drawParagraph,
  drawStackedBars,
  drawTable,
  fmtMrd,
  fmtNumber,
  fmtRate,
  type Box,
  type PdfCursor,
  type TableColumn,
  type TableRow,
} from '@/lib/pdf-charts'

// Rapports PDF de la page « Rapports », construits à partir du Rapport d'exécution du budget
// du pouvoir central au premier semestre 2026 (Document n°3).

export type ReportId = 'execution' | 'recettes' | 'depenses' | 'dette' | 'macro' | 'reformes'

export type ReportMeta = {
  id: ReportId
  title: string
  description: string
  period: string
  unit: string
  color: string
  contents: string[]
  highlights: { label: string; value: string }[]
  /** Taux affichés dans l'aperçu de la carte (en %). */
  preview: { label: string; value: number }[]
}

export const reportCatalog: ReportMeta[] = [
  {
    id: 'execution',
    title: "Rapport d'exécution budgétaire",
    description: 'Vue consolidée des recettes, des dépenses et des soldes budgétaires du pouvoir central, avec les faits marquants et les recommandations.',
    period: 'S1 2026',
    unit: 'Milliards de FC',
    color: '#1d4ed8',
    contents: ['Indicateurs clés', 'Prévisions vs réalisations', 'Structure des recettes et dépenses', 'Soldes budgétaires', 'Recommandations'],
    highlights: [
      { label: 'Recettes', value: '22 476,1 Mrd' },
      { label: 'Dépenses', value: '20 746,5 Mrd' },
      { label: 'Solde intérieur', value: '-627,4 Mrd' },
    ],
    preview: [
      { label: 'Recettes', value: 88.4 },
      { label: 'Dépenses', value: 81.6 },
      { label: 'Budget général', value: 87.7 },
      { label: 'Comptes spéciaux', value: 36.2 },
    ],
  },
  {
    id: 'recettes',
    title: 'Recettes mobilisées',
    description: 'Performance des régies financières (DGDA, DGI, DGRAD), des pétroliers producteurs, des financements extérieurs et des comptes spéciaux.',
    period: 'S1 2026',
    unit: 'Milliards de FC',
    color: '#059669',
    contents: ['Réalisations par régie', 'Taux de réalisation', 'Détail par nature', 'Facteurs explicatifs'],
    highlights: [
      { label: 'Internes', value: '15 949,7 Mrd' },
      { label: 'Extérieures', value: '5 703,2 Mrd' },
      { label: 'Taux global', value: '88,4 %' },
    ],
    preview: [
      { label: 'DGDA', value: 90.9 },
      { label: 'DGI', value: 82.3 },
      { label: 'DGRAD', value: 98.5 },
      { label: 'Extérieures', value: 136.7 },
    ],
  },
  {
    id: 'depenses',
    title: 'Dépenses exécutées',
    description: 'Exécution du Budget général par rubrique, dépenses exceptionnelles et investissements sur ressources propres et extérieures.',
    period: 'S1 2026',
    unit: 'Milliards de FC',
    color: '#d97706',
    contents: ['Structure de la dépense', 'Taux par rubrique', 'Dépenses exceptionnelles', 'Investissements'],
    highlights: [
      { label: 'Budget général', value: '19 923,3 Mrd' },
      { label: 'Rémunérations', value: '6 369,1 Mrd' },
      { label: 'Taux BG', value: '87,7 %' },
    ],
    preview: [
      { label: 'Rémunérations', value: 93.3 },
      { label: 'Invest. propres', value: 78.8 },
      { label: 'Dette', value: 46.6 },
      { label: 'Exceptionnelles', value: 15.8 },
    ],
  },
  {
    id: 'dette',
    title: 'Bulletin de la dette publique',
    description: 'Service de la dette intérieure et extérieure et paiement des frais financiers, par créancier et par nature.',
    period: 'S1 2026',
    unit: 'Milliards de FC',
    color: '#be123c',
    contents: ['Service de la dette', 'Répartition des paiements', 'Taux par créancier', 'Tableau détaillé'],
    highlights: [
      { label: 'Service total', value: '532,7 Mrd' },
      { label: 'Principal', value: '468,3 Mrd' },
      { label: 'Taux', value: '33,7 %' },
    ],
    preview: [
      { label: 'Extérieure', value: 96.8 },
      { label: 'Intérieure', value: 12.6 },
      { label: 'Intérêts ext.', value: 35.2 },
      { label: 'Intérêts int.', value: 0 },
    ],
  },
  {
    id: 'macro',
    title: 'Cadrage macroéconomique',
    description: 'Hypothèses macroéconomiques de la loi de finances 2026 (vote et LFR), structure du budget et perspectives à fin décembre.',
    period: 'LFR 2026',
    unit: '%, Mrd FC, FC/USD',
    color: '#0891b2',
    contents: ['Indicateurs vote vs LFR', 'Taux de change', 'Structure de la loi de finances', 'Perspectives'],
    highlights: [
      { label: 'Croissance', value: '5,6 %' },
      { label: 'Inflation', value: '3,5 %' },
      { label: 'PIB nominal', value: '121,7 Mrd USD' },
    ],
    preview: [
      { label: 'Croissance', value: 56 },
      { label: 'Inflation', value: 35 },
      { label: 'Mines', value: 67 },
      { label: 'Change', value: 93 },
    ],
  },
  {
    id: 'reformes',
    title: 'Réformes et PDL-145T',
    description: "Avancement physique du Programme de développement local des 145 territoires, financement reçu et réformes budgétaires en cours.",
    period: 'Juillet 2026',
    unit: 'Ouvrages, USD',
    color: '#7c3aed',
    contents: ['Avancement par opérateur', 'Ouvrages par type', 'Financement', 'Réformes en cours'],
    highlights: [
      { label: 'Ouvrages prévus', value: '2 130' },
      { label: 'Achevés', value: '1 098' },
      { label: 'Coût', value: '1,6 Mrd USD' },
    ],
    preview: [
      { label: 'Démarrés', value: 96.1 },
      { label: 'Achevés', value: 51.5 },
      { label: 'Écoles', value: 54.2 },
      { label: 'Santé', value: 47.1 },
    ],
  },
]

// ---------------------------------------------------------------------------
// Données complémentaires du rapport

const PREV: Rgb = [148, 163, 184]
const SLICES: Rgb[] = [...PDF_ACCENTS, [100, 116, 139], [234, 179, 8]]

export const macroRows: [string, number, number, string][] = [
  ['Taux de croissance', 5.3, 5.6, '%'],
  ["Taux d'inflation moyen", 4.4, 3.5, '%'],
  ['Taux de croissance mine', 5.0, 6.7, '%'],
  ['Taux de change moyen (FC/USD)', 2467.0, 2290.0, ''],
  ['Taux de change fin période (FC/USD)', 2634.1, 2398.5, ''],
  ['PIB nominal (Mrd FC)', 269291.9, 278612.3, ''],
  ['PIB nominal (Mrd USD)', 109.2, 121.7, ''],
]

export const lfStructure = [
  { label: 'Dépenses de personnel', value: 13654.9 },
  { label: "Dépenses d'investissement", value: 10548.3 },
  { label: 'Dépenses exceptionnelles', value: 8238.4 },
  { label: 'Biens et matériels', value: 5276.4 },
  { label: 'Transferts et subventions', value: 4538.1 },
  { label: 'Dette publique en capital', value: 2011.3 },
  { label: 'Frais financiers', value: 1153.4 },
]

const pdlOperators = [
  { label: 'BCeCo', prevus: 731, nonDemarres: 14, ajournes: 22, demarres: 694, achevesT: 370 },
  { label: 'PNUD', prevus: 764, nonDemarres: 23, ajournes: 1, demarres: 740, achevesT: 341 },
  { label: 'CFEF', prevus: 635, nonDemarres: 0, ajournes: 23, demarres: 612, achevesT: 387 },
]

export const pdlRows: [string, number, number, number, number, boolean][] = [
  ['Total ouvrages prévus', 731, 764, 635, 2130, true],
  ['Écoles', 414, 424, 360, 1198, false],
  ['Centres de santé', 269, 286, 232, 787, false],
  ['Bâtiments administratifs', 48, 54, 43, 145, false],
  ['Ouvrages non démarrés (T1)', 14, 23, 0, 37, true],
  ['Ouvrages démarrés mais ajournés (T2)', 22, 1, 23, 46, true],
  ['Ouvrages démarrés (T3)', 694, 740, 612, 2046, true],
  ['Ouvrages restants (T4)', 36, 24, 23, 83, true],
  ['Ouvrages achevés (T5)', 370, 341, 387, 1098, true],
  ['Écoles achevées', 220, 196, 233, 649, false],
  ['Centres de santé achevés', 133, 121, 117, 371, false],
  ['Bâtiments administratifs achevés', 17, 24, 37, 78, false],
]

const shortRubrique: Record<string, string> = {
  '1': "Bourses d'études",
  '2': 'Charges communes',
  '3': 'Contrepartie des projets',
  '4': 'Dépenses exceptionnelles',
  '5': 'Dette publique',
  '6': 'Financement des réformes',
  '7': 'Fonct. des institutions',
  '8': 'Fonct. des ministères',
  '9': 'Fonds de péréquation',
  '10': 'Frais financiers',
  '11': 'Interventions écon. et sociales',
  '12': 'Invest. sur Eurobond',
  '13': 'Invest. ress. extérieures',
  '14': 'Invest. ress. propres',
  '15': 'Invest. transferts provinces',
  '16': 'Invest. contrat chinois',
  '17': 'Mise à la retraite',
  '18': 'Rémunérations',
  '19': 'Rétrocession aux régies',
  '20': 'Subv. organismes auxiliaires',
  '21': 'Subv. services déconcentrés',
  '22': 'Transferts provinces (fonct.)',
  '23': 'TVA remboursable',
}

const expenseGroups: { label: string; numbers: string[] }[] = [
  { label: 'Rémunérations et retraite', numbers: ['17', '18'] },
  { label: 'Investissements', numbers: ['3', '12', '13', '14', '15', '16'] },
  { label: 'Fonctionnement', numbers: ['1', '2', '7', '8', '21'] },
  { label: 'Transferts et interventions', numbers: ['6', '9', '11', '19', '20', '22', '23'] },
  { label: 'Dépenses exceptionnelles', numbers: ['4'] },
  { label: 'Dette et frais financiers', numbers: ['5', '10'] },
]

const toNumber = (value: string) => Number(value.replaceAll(' ', ''))
const rate = (value: string) => Number(value.replace(',', '.'))
const revenue = (id: string) => revenueTables.find((t) => t.id === id)!
const expense = (id: string) => expenseTables.find((t) => t.id === id)!
const rowOf = (table: RevenueTable, label: string) => table.rows.find((r) => r.label === label)!
const mrd = (fc: number | null) => (fc ?? 0) / 1e9

function groupSlices(field: 'voted' | 'execution') {
  return expenseGroups.map((g, i) => ({
    label: g.label,
    value: budgetSections.filter((s) => g.numbers.includes(s.number)).reduce((sum, s) => sum + toNumber(s[field]), 0) / 1e9,
    color: SLICES[i],
  }))
}

const amountColumns: TableColumn[] = [
  { header: 'Rubrique', width: 76 },
  { header: 'Voté', width: 28, align: 'right' },
  { header: 'Prév. linéaires', width: 28, align: 'right' },
  { header: 'Réalisations', width: 28, align: 'right' },
  { header: 'Taux', width: 18, align: 'right' },
]

const cell = (v: number | null) => (v === null ? '—' : fmtMrd(v))

function tableRows(table: RevenueTable, maxLevel: number): TableRow[] {
  const rows: TableRow[] = table.rows
    .filter((r) => r.level <= maxLevel)
    .map((r) => ({
      cells: [r.code ? `${r.code}  ${r.label}` : r.label, cell(r.vote), cell(r.linear), cell(r.real), r.rate === null ? '—' : fmtRate(r.rate)],
      level: r.level,
      rate: r.rate,
    }))
  const { total } = table
  rows.push({
    cells: [total.label, cell(total.vote), cell(total.linear), cell(total.real), total.rate === null ? '—' : fmtRate(total.rate)],
    total: true,
    rate: total.rate,
  })
  return rows
}

function notesOf(cursor: PdfCursor, table: RevenueTable) {
  table.notes?.forEach((note) =>
    drawCallout(cursor, note.title, note.items, note.tone === 'positive' ? [5, 150, 105] : note.tone === 'negative' ? [217, 119, 6] : PDF_COLORS.blue),
  )
}

// ---------------------------------------------------------------------------
// Moteur de mise en page

type Ctx = {
  pdf: jsPDF
  cursor: PdfCursor
  color: Rgb
  section: (title: string, color?: Rgb) => void
  row: (height: number, ...draws: ((box: Box) => void)[]) => void
}

function createContext(pdf: jsPDF, meta: ReportMeta, subtitle: string): Ctx {
  const pageHeight = pdf.internal.pageSize.getHeight()
  const color = hexToRgb(meta.color)
  // Un titre de section n'est dessiné qu'avec le bloc qui le suit, pour ne jamais rester seul en bas de page.
  let pending: { title: string; color: Rgb } | null = null
  const cursor: PdfCursor = {
    pdf,
    y: drawPageHeader(pdf, { title: meta.title, subtitle }),
    ensure: (height) => {
      const extra = pending ? 13 : 0
      if (cursor.y + height + extra > pageHeight - 18) {
        pdf.addPage()
        cursor.y = drawPageHeader(pdf, { title: meta.title, compact: true })
      }
      if (pending) {
        const { title, color: sectionColor } = pending
        pending = null
        cursor.y = drawSectionTitle(pdf, cursor.y + 2, title, sectionColor) + 1
      }
    },
  }

  // Fiche signalétique du rapport.
  const items: [string, string][] = [
    ['Période', meta.period],
    ['Unité', meta.unit],
    ['Source', 'Document n°3 · DGPPB'],
    ['Édité par', 'Ministère du Budget'],
  ]
  const w = CONTENT_WIDTH / items.length
  fill(pdf, tint(color, 0.94))
  pdf.roundedRect(MARGIN, cursor.y - 2, CONTENT_WIDTH, 12, 2, 2, 'F')
  items.forEach(([label, value], i) => {
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(5.8)
    ink(pdf, color)
    pdf.text(label.toUpperCase(), MARGIN + 5 + i * w, cursor.y + 2.6)
    pdf.setFontSize(7.6)
    ink(pdf, PDF_COLORS.navy)
    pdf.text(sanitizePdfText(value), MARGIN + 5 + i * w, cursor.y + 7)
  })
  cursor.y += 16

  return {
    pdf,
    cursor,
    color,
    section: (title, sectionColor = color) => {
      pending = { title, color: sectionColor }
    },
    row: (height, ...draws) => {
      cursor.ensure(height)
      const gap = 5
      const w = (CONTENT_WIDTH - gap * (draws.length - 1)) / draws.length
      draws.forEach((draw, i) => draw({ x: MARGIN + i * (w + gap), y: cursor.y, w, h: height }))
      cursor.y += height + 5
    },
  }
}

const tiles = (ctx: Ctx, list: Parameters<typeof drawKpiTiles>[4]) => {
  ctx.cursor.ensure(30)
  ctx.cursor.y = drawKpiTiles(ctx.pdf, MARGIN, ctx.cursor.y, CONTENT_WIDTH, list) + 6
}

// ---------------------------------------------------------------------------
// Rapports

function executionReport(ctx: Ctx) {
  const { pdf, cursor } = ctx
  drawParagraph(
    cursor,
    "Au premier semestre 2026, l'exécution budgétaire s'est inscrite dans un contexte marqué par d'importants besoins de financement liés aux priorités sécuritaires, sociales et d'investissement. Les recettes du Budget général atteignent 21 652,9 Mrd FC (95,3 % de la prévision linéaire) et ses dépenses 19 923,3 Mrd FC (87,7 %).",
  )
  tiles(ctx, [
    { label: 'Recettes totales', value: '22 476,1', unit: 'Mrd FC', detail: '88,4 % de la prévision linéaire', color: [5, 150, 105], rate: 88.4 },
    { label: 'Dépenses totales', value: '20 746,5', unit: 'Mrd FC', detail: '81,6 % de la prévision linéaire', color: [217, 119, 6], rate: 81.6 },
    { label: 'Excédent global', value: '+1 729,6', unit: 'Mrd FC', detail: 'Recettes moins dépenses', color: PDF_COLORS.blue },
    { label: 'Solde intérieur', value: '-627,4', unit: 'Mrd FC', detail: 'Déficit · plafond FMI 2 000', color: [220, 38, 38] },
  ])

  ctx.section('Prévisions et réalisations')
  ctx.row(82, (box) =>
    drawGroupedBars(pdf, drawChartCard(pdf, box, 'Prévisions linéaires vs réalisations à fin juin', 'En milliards de FC'), {
      categories: ['Recettes totales', 'Dépenses totales', 'Budget général · recettes', 'Budget général · dépenses', 'Comptes spéciaux'],
      series: [
        { name: 'Prévisions linéaires 6 mois', color: PREV, values: [25433.2, 25433.2, 22710.4, 22710.4, 2276.7] },
        { name: 'Réalisations à fin juin', color: ctx.color, values: [22476.1, 20746.5, 21652.9, 19923.3, 823.2] },
      ],
    }),
  )
  ctx.row(
    62,
    (box) =>
      drawDonut(
        pdf,
        drawChartCard(pdf, box, 'Structure des recettes réalisées', 'En milliards de FC'),
        [
          { label: 'Recettes internes', value: 15949.7, color: SLICES[1] },
          { label: 'Recettes extérieures', value: 5703.2, color: SLICES[0] },
          { label: 'Comptes spéciaux', value: 823.2, color: SLICES[2] },
          { label: 'Budgets annexes', value: 0.027, color: SLICES[3] },
        ],
        { centerValue: '22 476,1', centerLabel: 'Mrd FC' },
      ),
    (box) =>
      drawDonut(pdf, drawChartCard(pdf, box, 'Structure des dépenses du Budget général', 'Exécution par grande nature'), groupSlices('execution'), {
        centerValue: '19 923,3',
        centerLabel: 'Mrd FC',
      }),
  )

  ctx.section('Recettes par grande nature')
  drawTable(cursor, amountColumns, tableRows(revenue('synthese'), 3), ctx.color)

  ctx.section('Exécution des dépenses par rubrique')
  const items = [...budgetSections]
    .map((s) => ({ label: shortRubrique[s.number], value: rate(s.rate) }))
    .sort((a, b) => b.value - a.value)
  ctx.row(items.length * 6 + 24, (box) =>
    drawHorizontalBars(pdf, drawChartCard(pdf, box, "Taux d'exécution par rubrique du Budget général", 'Échelle plafonnée à 250 % · flèche = dépassement'), {
      items,
      max: 250,
      reference: 100,
      labelWidth: 52,
    }),
  )

  ctx.section('Soldes budgétaires')
  tiles(ctx, [
    { label: 'Solde global', value: '-2 885,8', unit: 'Mrd FC', detail: '16 897,4 de recettes vs 19 783,2', color: [220, 38, 38] },
    { label: 'Solde intérieur', value: '-627,4', unit: 'Mrd FC', detail: '14 339,6 de recettes vs 14 967,0', color: [217, 119, 6] },
    { label: 'Critère MPEF (FMI)', value: '2 000,0', unit: 'Mrd FC', detail: 'Plafond de déficit respecté', color: [5, 150, 105] },
  ])
  drawParagraph(
    cursor,
    "Le déficit observé a été couvert essentiellement par des emprunts intérieurs, notamment à travers les émissions nettes de bons et obligations du Trésor sur le marché domestique. Le Gouvernement n'a pas dépassé la limite de déficit de 2 000,0 Mrd FC définie dans le Mémorandum de politiques économiques et financières.",
  )

  ctx.section('Faits marquants et recommandations')
  drawCallout(
    cursor,
    'Faits marquants',
    [
      "Première émission d'Eurobond : 1,25 Mrd USD mobilisés sur les marchés internationaux.",
      'Recettes extérieures réalisées à 136,7 %, portées par les dons et emprunts projets.',
      'Achèvement en juin 2026 de la 3e revue FEC et de la 2e revue FRD : 348,5 M USD décaissés.',
      'Recettes non fiscales de la DGRAD (hors pétroliers) réalisées à 98,5 %.',
    ],
    PDF_COLORS.blue,
  )
  drawCallout(
    cursor,
    'Points de vigilance',
    [
      'Surconsommation des crédits de fonctionnement des institutions (167,5 %) et des ministères (217,1 %).',
      'Faible exécution des dépenses exceptionnelles (15,8 %) et des frais financiers (11,2 %).',
      'TVA intérieure réalisée à 59,8 % et pétroliers producteurs à 54,0 %.',
      'Remontée quasi nulle des statistiques des budgets annexes.',
    ],
    [220, 38, 38],
  )
  drawCallout(
    cursor,
    'Recommandations',
    [
      "Renforcer la mobilisation des recettes intérieures par l'élargissement de l'assiette fiscale et l'amélioration du recouvrement.",
      'Assurer une meilleure planification et priorisation des dépenses à fort impact socio-économique.',
      "Accélérer la mise en œuvre des projets d'investissement, notamment le PDL-145T.",
      'Poursuivre les réformes structurelles pour la soutenabilité des finances publiques.',
    ],
    [5, 150, 105],
  )
}

function recettesReport(ctx: Ctx) {
  const { pdf, cursor } = ctx
  const synthese = revenue('synthese')
  tiles(ctx, [
    { label: 'Total recettes', value: '22 476,1', unit: 'Mrd FC', detail: '88,4 % de la prévision', color: ctx.color, rate: 88.4 },
    { label: 'Recettes internes', value: '15 949,7', unit: 'Mrd FC', detail: '86,0 % de la prévision', color: PDF_COLORS.blue, rate: 86 },
    { label: 'Recettes extérieures', value: '5 703,2', unit: 'Mrd FC', detail: '136,7 % de la prévision', color: [124, 58, 237], rate: 136.7 },
    { label: 'Comptes spéciaux', value: '823,2', unit: 'Mrd FC', detail: '36,2 % de la prévision', color: [217, 119, 6], rate: 36.2 },
  ])

  const regies: [string, string][] = [
    ['DGDA', 'Recettes des Douanes et Accises (DGDA)'],
    ['DGI hors PP', 'Recettes des Impôts (DGI) hors pétroliers producteurs'],
    ['DGRAD hors PP', 'DGRAD hors pétroliers'],
    ['Pétroliers', 'Pétroliers producteurs'],
    ['Exceptionnelles', 'Recettes exceptionnelles'],
    ['Appuis budgétaires', "Recettes extérieures d'appuis budgétaires"],
    ['Financ. invest.', 'Recettes extérieures de financement des investissements'],
  ]
  ctx.section('Réalisations par régie')
  ctx.row(84, (box) =>
    drawGroupedBars(pdf, drawChartCard(pdf, box, 'Prévisions linéaires vs réalisations par régie', 'En milliards de FC'), {
      categories: regies.map(([short]) => short),
      series: [
        { name: 'Prévisions linéaires', color: PREV, values: regies.map(([, l]) => mrd(rowOf(synthese, l).linear)) },
        { name: 'Réalisations', color: ctx.color, values: regies.map(([, l]) => mrd(rowOf(synthese, l).real)) },
      ],
    }),
  )
  ctx.row(
    70,
    (box) =>
      drawDonut(
        pdf,
        drawChartCard(pdf, box, 'Composition des recettes internes', 'Réalisations en milliards de FC'),
        [
          { label: 'DGI hors pétroliers', value: 8165.3, color: SLICES[0] },
          { label: 'DGDA', value: 3770.5, color: SLICES[1] },
          { label: 'DGRAD hors pétroliers', value: 2509.9, color: SLICES[2] },
          { label: 'Exceptionnelles', value: 1281.4, color: SLICES[3] },
          { label: 'Pétroliers producteurs', value: 169.7, color: SLICES[4] },
          { label: 'Autres non fiscales', value: 40.0, color: SLICES[5] },
          { label: 'Fonds de concours guerre', value: 12.9, color: SLICES[6] },
        ],
        { centerValue: '15 949,7', centerLabel: 'Mrd FC' },
      ),
    (box) =>
      drawHorizontalBars(pdf, drawChartCard(pdf, box, 'Taux de réalisation', 'Réalisations / prévisions linéaires'), {
        items: [
          { label: 'Extérieures', value: 136.7 },
          { label: 'Exceptionnelles', value: 113.4 },
          { label: 'DGRAD', value: 98.5 },
          { label: 'DGDA', value: 90.9 },
          { label: 'DGI', value: 82.3 },
          { label: 'Pétroliers', value: 54.0 },
          { label: 'Comptes spéciaux', value: 36.2 },
          { label: 'Autres non fisc.', value: 8.5 },
        ],
        max: 150,
        reference: 100,
        labelWidth: 24,
      }),
  )

  for (const table of revenueTables.filter((t) => t.id !== 'synthese')) {
    ctx.section(table.title)
    if (table.id === 'dgrad') {
      const top = table.rows
        .filter((r) => r.level === 1 && r.real)
        .sort((a, b) => (b.real ?? 0) - (a.real ?? 0))
        .slice(0, 10)
      ctx.row(top.length * 6 + 22, (box) =>
        drawHorizontalBars(pdf, drawChartCard(pdf, box, 'Dix premiers services contributeurs', 'Réalisations en milliards de FC'), {
          items: top.map((r) => ({ label: r.label, value: mrd(r.real), color: ctx.color })),
          format: (v) => fmtNumber(v),
          labelWidth: 70,
        }),
      )
    }
    if (table.id === 'comptes-speciaux') {
      const funds = table.rows.filter((r) => r.rate !== null).sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0))
      ctx.row(funds.length * 6 + 24, (box) =>
        drawHorizontalBars(pdf, drawChartCard(pdf, box, 'Taux de réalisation par fonds', 'Réalisations / prévisions linéaires'), {
          items: funds.map((r) => ({ label: r.label, value: r.rate ?? 0 })),
          max: 200,
          reference: 100,
          labelWidth: 80,
        }),
      )
    }
    drawTable(cursor, amountColumns, tableRows(table, table.rows.length > 30 ? 0 : 1), ctx.color)
    notesOf(cursor, table)
  }
}

function depensesReport(ctx: Ctx) {
  const { pdf, cursor } = ctx
  tiles(ctx, [
    { label: 'Total dépenses', value: '20 746,5', unit: 'Mrd FC', detail: '81,6 % de la prévision', color: ctx.color, rate: 81.6 },
    { label: 'Budget général', value: '19 923,3', unit: 'Mrd FC', detail: '87,7 % de la prévision', color: PDF_COLORS.blue, rate: 87.7 },
    { label: 'Rémunérations', value: '6 369,1', unit: 'Mrd FC', detail: '93,3 % de la prévision', color: [5, 150, 105], rate: 93.3 },
    { label: 'Dép. exceptionnelles', value: '649,5', unit: 'Mrd FC', detail: '15,8 % de la prévision', color: [220, 38, 38], rate: 15.8 },
  ])

  ctx.section('Structure de la dépense')
  ctx.row(
    66,
    (box) =>
      drawDonut(pdf, drawChartCard(pdf, box, 'Crédits votés du Budget général', 'Répartition par grande nature'), groupSlices('voted'), {
        centerValue: '45 420,8',
        centerLabel: 'Mrd FC votés',
      }),
    (box) =>
      drawDonut(pdf, drawChartCard(pdf, box, 'Exécution à fin juin 2026', 'Répartition par grande nature'), groupSlices('execution'), {
        centerValue: '19 923,3',
        centerLabel: 'Mrd FC exécutés',
      }),
  )
  const top = [...budgetSections].sort((a, b) => toNumber(b.linear) - toNumber(a.linear)).slice(0, 8)
  ctx.row(84, (box) =>
    drawGroupedBars(pdf, drawChartCard(pdf, box, 'Huit premières rubriques par prévision linéaire', 'En milliards de FC'), {
      categories: top.map((s) => shortRubrique[s.number]),
      series: [
        { name: 'Prévisions linéaires', color: PREV, values: top.map((s) => toNumber(s.linear) / 1e9) },
        { name: 'Exécution', color: ctx.color, values: top.map((s) => toNumber(s.execution) / 1e9) },
      ],
    }),
  )

  ctx.section("Taux d'exécution par rubrique")
  const items = [...budgetSections].map((s) => ({ label: shortRubrique[s.number], value: rate(s.rate) })).sort((a, b) => b.value - a.value)
  ctx.row(items.length * 6 + 24, (box) =>
    drawHorizontalBars(pdf, drawChartCard(pdf, box, 'Exécution / prévisions linéaires', 'Échelle plafonnée à 250 % · flèche = dépassement'), {
      items,
      max: 250,
      reference: 100,
      labelWidth: 52,
    }),
  )
  drawTable(cursor, amountColumns, tableRows(expense('rubriques'), 0), ctx.color)
  notesOf(cursor, expense('rubriques'))

  const exceptionnelles = expense('exceptionnelles')
  ctx.section(exceptionnelles.title)
  drawTable(cursor, amountColumns, tableRows(exceptionnelles, 1), ctx.color)
  notesOf(cursor, exceptionnelles)

  const investissements = expense('investissements')
  ctx.section(investissements.title)
  ctx.row(investissements.rows.length * 6 + 24, (box) =>
    drawHorizontalBars(pdf, drawChartCard(pdf, box, "Taux d'exécution par section", 'Échelle plafonnée à 300 % · flèche = dépassement'), {
      items: [...investissements.rows].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0)).map((r) => ({ label: r.label, value: r.rate ?? 0 })),
      max: 300,
      reference: 100,
      labelWidth: 78,
    }),
  )
  drawTable(cursor, amountColumns, tableRows(investissements, 0), ctx.color)
  notesOf(cursor, investissements)
}

function detteReport(ctx: Ctx) {
  const { pdf, cursor } = ctx
  const dette = expense('dette')
  tiles(ctx, [
    { label: 'Service total', value: '532,7', unit: 'Mrd FC', detail: '33,7 % de la prévision', color: ctx.color, rate: 33.7 },
    { label: 'Principal payé', value: '468,3', unit: 'Mrd FC', detail: '46,6 % de la prévision', color: PDF_COLORS.blue, rate: 46.6 },
    { label: 'Frais financiers', value: '64,3', unit: 'Mrd FC', detail: '11,2 % de la prévision', color: [217, 119, 6], rate: 11.2 },
    { label: 'Dette extérieure', value: '392,6', unit: 'Mrd FC', detail: '96,8 % de la prévision', color: [5, 150, 105], rate: 96.8 },
  ])

  const groups = ['Dette extérieure', 'Dette intérieure', 'Intérêts sur la dette intérieure', 'Intérêts sur la dette extérieure']
  ctx.section('Service de la dette')
  ctx.row(80, (box) =>
    drawGroupedBars(pdf, drawChartCard(pdf, box, 'Prévisions linéaires vs paiements', 'En milliards de FC'), {
      categories: groups,
      series: [
        { name: 'Prévisions linéaires', color: PREV, values: groups.map((g) => mrd(rowOf(dette, g).linear)) },
        { name: 'Paiements', color: ctx.color, values: groups.map((g) => mrd(rowOf(dette, g).real)) },
      ],
      format: (v) => fmtNumber(v),
    }),
  )
  const creditors = dette.rows.filter((r) => r.level === 2 && (r.linear ?? 0) > 0)
  ctx.row(
    70,
    (box) =>
      drawDonut(
        pdf,
        drawChartCard(pdf, box, 'Répartition des paiements', 'En milliards de FC'),
        creditors.filter((r) => (r.real ?? 0) > 0).map((r, i) => ({ label: r.label, value: mrd(r.real), color: SLICES[i] })),
        { centerValue: '532,7', centerLabel: 'Mrd FC payés' },
      ),
    (box) =>
      drawHorizontalBars(pdf, drawChartCard(pdf, box, "Taux d'exécution par créancier", 'Paiements / prévisions linéaires'), {
        items: [...creditors].sort((a, b) => (b.rate ?? 0) - (a.rate ?? 0)).map((r) => ({ label: r.label.replace('Intérêts sur ', 'Int. '), value: r.rate ?? 0 })),
        max: 150,
        reference: 100,
        labelWidth: 36,
      }),
  )

  ctx.section('Tableau détaillé')
  drawTable(cursor, amountColumns, tableRows(dette, 2), ctx.color)
  notesOf(cursor, dette)
}

function macroReport(ctx: Ctx) {
  const { pdf, cursor } = ctx
  tiles(ctx, [
    { label: 'Croissance du PIB', value: '5,6 %', detail: 'Vote initial : 5,3 %', color: ctx.color },
    { label: 'Inflation moyenne', value: '3,5 %', detail: 'Vote initial : 4,4 %', color: [5, 150, 105] },
    { label: 'PIB nominal', value: '278 612,3', unit: 'Mrd FC', detail: 'Soit 121,7 Mrd USD', color: PDF_COLORS.blue },
    { label: 'Change moyen', value: '2 290,0', unit: 'FC/USD', detail: 'Vote initial : 2 467,0', color: [124, 58, 237] },
  ])

  ctx.section('Hypothèses macroéconomiques')
  ctx.row(
    72,
    (box) =>
      drawGroupedBars(pdf, drawChartCard(pdf, box, 'Taux de croissance et inflation', 'En % · vote initial vs LFR'), {
        categories: ['Croissance', 'Inflation', 'Croissance mine'],
        series: [
          { name: 'Vote', color: PREV, values: [5.3, 4.4, 5.0] },
          { name: 'LFR', color: ctx.color, values: [5.6, 3.5, 6.7] },
        ],
        format: (v) => `${fmtNumber(v)}%`,
      }),
    (box) =>
      drawGroupedBars(pdf, drawChartCard(pdf, box, 'Taux de change', 'FC pour 1 USD · vote initial vs LFR'), {
        categories: ['Moyen', 'Fin de période'],
        series: [
          { name: 'Vote', color: PREV, values: [2467.0, 2634.1] },
          { name: 'LFR', color: [124, 58, 237], values: [2290.0, 2398.5] },
        ],
        format: (v) => fmtNumber(v),
      }),
  )
  drawTable(
    cursor,
    [
      { header: 'Indicateur', width: 82 },
      { header: 'Vote', width: 32, align: 'right' },
      { header: 'LFR', width: 32, align: 'right' },
      { header: 'Variation', width: 32, align: 'right' },
    ],
    macroRows.map(([label, vote, lfr, unit]) => {
      const digits = unit ? 1 : 1
      const delta = unit ? `${lfr - vote >= 0 ? '+' : ''}${fmtNumber(lfr - vote)} pt` : `${lfr - vote >= 0 ? '+' : ''}${fmtNumber(((lfr - vote) / vote) * 100)} %`
      return { cells: [label, `${fmtNumber(vote, digits)}${unit}`, `${fmtNumber(lfr, digits)}${unit}`, delta] }
    }),
    ctx.color,
  )

  ctx.section('Structure de la loi de finances 2026')
  tiles(ctx, [
    { label: 'Budget LFR 2026', value: '50 866,3', unit: 'Mrd FC', detail: 'Soit 22,2 Mrd USD', color: ctx.color },
    { label: 'Budget initial', value: '54 335,8', unit: 'Mrd FC', detail: 'Régression de 6,4 %', color: PREV },
    { label: 'Budget général', value: '45 420,8', unit: 'Mrd FC', detail: 'Soit 19,8 Mrd USD', color: PDF_COLORS.blue },
  ])
  ctx.row(
    66,
    (box) =>
      drawDonut(
        pdf,
        drawChartCard(pdf, box, 'Ressources de la LFR 2026', 'En milliards de FC'),
        [
          { label: 'Recettes internes', value: 37078.6, color: SLICES[1] },
          { label: 'Recettes extérieures', value: 8342.2, color: SLICES[0] },
          { label: 'Comptes spéciaux', value: 4553.5, color: SLICES[2] },
          { label: 'Budgets annexes', value: 892.1, color: SLICES[3] },
        ],
        { centerValue: '50 866,3', centerLabel: 'Mrd FC' },
      ),
    (box) =>
      drawDonut(
        pdf,
        drawChartCard(pdf, box, 'Dépenses du Budget général par nature', 'En milliards de FC'),
        lfStructure.map((s, i) => ({ ...s, color: SLICES[i] })),
        { centerValue: '45 420,8', centerLabel: 'Mrd FC' },
      ),
  )

  ctx.section('Perspectives à fin décembre 2026')
  drawCallout(
    cursor,
    'Dépenses du Budget général',
    [
      'Dette publique et frais financiers : 3 164,7 Mrd FC (+6,6 % par rapport au niveau initial).',
      'Rémunérations : 13 654,9 Mrd FC (+0,8 %), soit 30,1 % du Budget général.',
      'Biens, matériels et prestations : 5 276,4 Mrd FC (-3,6 %).',
      'Transferts et subventions : 4 538,1 Mrd FC (+5,8 %).',
      "Dépenses d'investissement : 10 548,3 Mrd FC (-34,1 %).",
      'Dépenses exceptionnelles : 8 238,4 Mrd FC (+23,3 %).',
    ],
    ctx.color,
  )
  drawCallout(
    cursor,
    'Leviers pour le second semestre',
    [
      "Renforcement des actions de recouvrement et du rendement des administrations financières.",
      "Élargissement de l'assiette fiscale, lutte contre la fraude et l'évasion fiscale.",
      'Mobilisation des recettes exceptionnelles et des ressources extérieures prévues.',
    ],
    [5, 150, 105],
  )
}

function reformesReport(ctx: Ctx) {
  const { pdf, cursor } = ctx
  tiles(ctx, [
    { label: 'Ouvrages prévus', value: '2 130', detail: 'Écoles, centres de santé, bâtiments', color: ctx.color },
    { label: 'Ouvrages démarrés', value: '2 046', detail: '96,1 % des ouvrages prévus', color: PDF_COLORS.blue, rate: 96.1 },
    { label: 'Ouvrages achevés', value: '1 098', detail: '51,5 % des ouvrages prévus', color: [5, 150, 105], rate: 51.5 },
    { label: 'Coût global', value: '1,6', unit: 'Mrd USD', detail: 'Financement mixte', color: [217, 119, 6] },
  ])

  ctx.section('Programme de développement local des 145 territoires')
  drawParagraph(
    cursor,
    "Le PDL-145T vise à réduire les disparités territoriales en assurant un accès équitable aux infrastructures sociales de base, à favoriser un développement local inclusif et à renforcer la gouvernance locale.",
  )
  ctx.row(58, (box) =>
    drawStackedBars(pdf, drawChartCard(pdf, box, 'Avancement physique par opérateur', 'Nombre d’ouvrages à fin juillet 2026'), {
      rows: pdlOperators.map((o) => ({
        label: o.label,
        values: [o.achevesT, o.demarres - o.achevesT, o.ajournes, o.nonDemarres],
      })),
      segments: [
        { label: 'Achevés', color: [5, 150, 105] },
        { label: 'En cours ou en arrêt', color: PDF_COLORS.blue },
        { label: 'Ajournés', color: [217, 119, 6] },
        { label: 'Non démarrés', color: [220, 38, 38] },
      ],
    }),
  )
  ctx.row(
    70,
    (box) =>
      drawGroupedBars(pdf, drawChartCard(pdf, box, 'Ouvrages prévus vs achevés', 'Par type d’ouvrage'), {
        categories: ['Écoles', 'Centres de santé', 'Bâtiments admin.'],
        series: [
          { name: 'Prévus', color: PREV, values: [1198, 787, 145] },
          { name: 'Achevés', color: ctx.color, values: [649, 371, 78] },
        ],
      }),
    (box) =>
      drawDonut(
        pdf,
        drawChartCard(pdf, box, 'Ouvrages achevés par type', 'Total : 1 098 ouvrages'),
        [
          { label: 'Écoles', value: 649, color: SLICES[0] },
          { label: 'Centres de santé', value: 371, color: SLICES[1] },
          { label: 'Bâtiments administratifs', value: 78, color: SLICES[3] },
        ],
        { centerValue: '1 098', centerLabel: 'ouvrages', format: (v) => fmtNumber(v, 0) },
      ),
  )
  drawTable(
    cursor,
    [
      { header: 'Ouvrages', width: 74 },
      { header: 'BCeCo', width: 26, align: 'right' },
      { header: 'PNUD', width: 26, align: 'right' },
      { header: 'CFEF', width: 26, align: 'right' },
      { header: 'Total', width: 26, align: 'right' },
    ],
    pdlRows.map(([label, a, b, c, total, head]) => ({
      cells: [label, ...[a, b, c, total].map((v) => fmtNumber(v, 0))],
      level: head ? 0 : 1,
    })),
    ctx.color,
  )
  drawCallout(
    cursor,
    'Financement reçu par le programme',
    [
      '523 M USD en 2022, dont 511 M USD de fonds DTS et 12 M USD du Trésor public.',
      '59,7 M USD en 2024 et 25,63 M USD en 2025 (remboursements de DTS).',
      'Gap de financement de 26 M USD.',
      "Décaissement annoncé de 150 M USD pour environ 3 700 km de routes de desserte agricole.",
    ],
    [217, 119, 6],
  )

  ctx.section('Réformes budgétaires en cours')
  drawTable(
    cursor,
    [
      { header: 'Réforme', width: 140 },
      { header: 'Statut', width: 38, align: 'center' },
    ],
    [
      'Mobilisation accrue des ressources internes',
      'Poursuite des réformes des administrations financières',
      "Transparence des opérations d'endettement",
      'Amélioration de la qualité de la dépense',
      'Implémentation de la facture normalisée (TVA)',
    ].map((label) => ({ cells: [label, 'En cours'] })),
    ctx.color,
  )
  drawCallout(
    cursor,
    'Enjeux et perspectives',
    [
      'Accélérer la mobilisation des fonds restants, notamment par une meilleure coordination avec le FMI.',
      'Renforcer les capacités des structures locales chargées de la mise en œuvre.',
      'Intégrer les populations locales dans le processus décisionnel.',
      "Mettre en place un système de suivi-évaluation efficace pour mesurer l'impact du programme.",
    ],
    PDF_COLORS.blue,
  )
}

const builders: Record<ReportId, (ctx: Ctx) => void> = {
  execution: executionReport,
  recettes: recettesReport,
  depenses: depensesReport,
  dette: detteReport,
  macro: macroReport,
  reformes: reformesReport,
}

const subtitles: Record<ReportId, string> = {
  execution: 'Budget du pouvoir central · premier semestre 2026 (à fin juin)',
  recettes: 'Mobilisation des recettes du pouvoir central à fin juin 2026',
  depenses: 'Exécution des dépenses du pouvoir central à fin juin 2026',
  dette: 'Service de la dette publique et frais financiers à fin juin 2026',
  macro: 'Hypothèses de la loi de finances 2026 et perspectives',
  reformes: 'Avancement du PDL-145T et des réformes budgétaires',
}

export async function generateReportPdf(id: ReportId) {
  const meta = reportCatalog.find((r) => r.id === id)!
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ unit: 'mm', format: 'a4' })
  builders[id](createContext(pdf, meta, subtitles[id]))
  drawFooters(pdf, `${meta.title} · Ministère du Budget · République Démocratique du Congo`)
  pdf.save(`rapport-${id}-2026.pdf`)
}
