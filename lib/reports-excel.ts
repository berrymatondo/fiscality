import { expenseTables } from '@/lib/depenses-executees'
import { revenueTables, type RevenueTable } from '@/lib/recettes-mobilisees'
import { lfStructure, macroRows, pdlRows, reportCatalog, type ReportId, type ReportMeta } from '@/lib/reports'
import {
  XL,
  addKpiCards,
  addNotes,
  addSectionTitle,
  addSheet,
  addTable,
  createWorkbook,
  downloadWorkbook,
  hexToArgb,
  type TableColumn,
  type TableRow,
} from '@/lib/excel-theme'
import type { Workbook } from 'exceljs'

// Classeurs Excel des rapports de la page « Rapports » (une feuille d'aperçu + une feuille par tableau).

const SOURCE = "Source : Rapport d'exécution du budget du pouvoir central au premier semestre 2026 (Document n°3)"
const mrd = (fc: number | null) => (fc === null ? null : fc / 1e9)
const noteColor = { positive: XL.green, negative: XL.amber, info: XL.blue }

const amountColumns: TableColumn[] = [
  { header: 'Code' },
  { header: 'Rubrique' },
  { header: 'Voté (Mrd FC)', type: 'number' },
  { header: 'Prévisions linéaires 6 mois (Mrd FC)', type: 'number' },
  { header: 'Réalisations à fin juin (Mrd FC)', type: 'number' },
  { header: 'Taux', type: 'rate', dataBar: true },
]

function addRevenueTableSheet(wb: Workbook, meta: ReportMeta, table: RevenueTable, name = table.tab) {
  const ctx = addSheet(wb, {
    name,
    title: table.title,
    subtitle: meta.title,
    accent: hexToArgb(meta.color),
    widths: [9, 62, 17, 19, 19, 13],
    meta: `${table.source} · Montants en milliards de FC`,
  })
  const rows: TableRow[] = table.rows.map((r) => ({
    cells: [r.code ?? '', r.label, mrd(r.vote), mrd(r.linear), mrd(r.real), r.rate],
    level: r.level,
  }))
  rows.push({ cells: ['', table.total.label, mrd(table.total.vote), mrd(table.total.linear), mrd(table.total.real), table.total.rate], total: true })
  ctx.ws.pageSetup.printTitlesRow = `${ctx.row}:${ctx.row}`
  addTable(ctx, amountColumns, rows)
  table.notes?.forEach((note) => addNotes(ctx, note.title, note.items, noteColor[note.tone]))
}

function addOverviewSheet(wb: Workbook, meta: ReportMeta, sheets: string[]) {
  const accent = hexToArgb(meta.color)
  const ctx = addSheet(wb, {
    name: 'Aperçu',
    title: meta.title,
    subtitle: `Période : ${meta.period} · Unité : ${meta.unit}`,
    accent,
    widths: [40, 18, 18, 18, 18, 18],
    meta: SOURCE,
  })
  addSectionTitle(ctx, 'Chiffres clés')
  addKpiCards(
    ctx,
    meta.highlights.map((h, i) => ({ label: h.label, value: h.value, color: [accent, XL.green, XL.violet][i % 3] })),
  )
  addSectionTitle(ctx, 'Taux clés')
  addTable(ctx, [{ header: 'Indicateur' }, { header: 'Taux', type: 'rate', dataBar: true }], meta.preview.map((p) => ({ cells: [p.label, p.value] })))
  addNotes(ctx, 'À propos de ce rapport', [meta.description], accent)
  addNotes(ctx, 'Contenu du classeur', sheets, XL.navy)
}

const builders: Record<ReportId, (wb: Workbook, meta: ReportMeta) => string[]> = {
  execution: (wb, meta) => {
    const revenue = revenueTables.find((t) => t.id === 'synthese')!
    const [synthese, rubriques] = ['synthese', 'rubriques'].map((id) => expenseTables.find((t) => t.id === id)!)
    addRevenueTableSheet(wb, meta, revenue, 'Recettes')
    addRevenueTableSheet(wb, meta, synthese, 'Dépenses')
    addRevenueTableSheet(wb, meta, rubriques, 'Dépenses par rubrique')
    return ['Recettes : recettes du budget du pouvoir central (tableau 3)', 'Dépenses : synthèse des dépenses (section 2.2)', 'Dépenses par rubrique : Budget général (tableau 11)']
  },
  recettes: (wb, meta) => {
    revenueTables.forEach((t) => addRevenueTableSheet(wb, meta, t))
    return revenueTables.map((t) => `${t.tab} : ${t.title}`)
  },
  depenses: (wb, meta) => {
    expenseTables.forEach((t) => addRevenueTableSheet(wb, meta, t))
    return expenseTables.map((t) => `${t.tab} : ${t.title}`)
  },
  dette: (wb, meta) => {
    const dette = expenseTables.find((t) => t.id === 'dette')!
    addRevenueTableSheet(wb, meta, dette, 'Dette et frais financiers')
    return [`Dette et frais financiers : ${dette.title} (tableau 13)`]
  },
  macro: (wb, meta) => {
    const accent = hexToArgb(meta.color)
    const ctx = addSheet(wb, { name: 'Hypothèses', title: 'Hypothèses macroéconomiques 2026', subtitle: meta.title, accent, widths: [42, 12, 16, 16, 16, 16], meta: 'Source : Loi de finances 2026 (tableau 1)' })
    addTable(
      ctx,
      [
        { header: 'Indicateur' },
        { header: 'Unité' },
        { header: 'Vote', type: 'number' },
        { header: 'LFR', type: 'number' },
        { header: 'Écart', type: 'number' },
        { header: 'Écart relatif', type: 'pct' },
      ],
      macroRows.map(([label, vote, lfr, unit]) => ({ cells: [label, unit || (label.includes('FC/USD') ? 'FC/USD' : label.includes('USD') ? 'Mrd USD' : 'Mrd FC'), vote, lfr, lfr - vote, (lfr - vote) / vote] })),
    )

    const structure = addSheet(wb, { name: 'Loi de finances 2026', title: 'Structure de la loi de finances 2026', subtitle: meta.title, accent, widths: [42, 20, 16, 16, 16, 16], meta: 'Montants en milliards de FC' })
    const ressources = [
      ['Recettes internes', 37078.6],
      ['Recettes extérieures', 8342.2],
      ['Comptes spéciaux', 4553.5],
      ['Budgets annexes', 892.1],
    ] as const
    addSectionTitle(structure, 'Ressources (LFR 2026)')
    addTable(
      structure,
      [{ header: 'Ressource' }, { header: 'Montant (Mrd FC)', type: 'number' }, { header: 'Part', type: 'pct', dataBar: true }],
      [...ressources.map(([l, v]) => ({ cells: [l, v, v / 50866.3] })), { cells: ['Total', 50866.3, 1], total: true }],
    )
    const totalBg = lfStructure.reduce((sum, s) => sum + s.value, 0)
    addSectionTitle(structure, 'Dépenses du Budget général par nature')
    addTable(
      structure,
      [{ header: 'Nature' }, { header: 'Montant (Mrd FC)', type: 'number' }, { header: 'Part', type: 'pct', dataBar: true }],
      [...lfStructure.map((s) => ({ cells: [s.label, s.value, s.value / totalBg] })), { cells: ['Total Budget général', totalBg, 1], total: true }],
    )
    addNotes(
      structure,
      'Perspectives à fin décembre 2026',
      [
        'Dette publique et frais financiers : 3 164,7 Mrd FC (+6,6 % par rapport au niveau initial).',
        'Rémunérations : 13 654,9 Mrd FC (+0,8 %), soit 30,1 % du Budget général.',
        'Biens, matériels et prestations : 5 276,4 Mrd FC (-3,6 %).',
        'Transferts et subventions : 4 538,1 Mrd FC (+5,8 %).',
        "Dépenses d'investissement : 10 548,3 Mrd FC (-34,1 %).",
        'Dépenses exceptionnelles : 8 238,4 Mrd FC (+23,3 %).',
      ],
      accent,
    )
    return ['Hypothèses : indicateurs macroéconomiques, vote et LFR (tableau 1)', 'Loi de finances 2026 : ressources, dépenses par nature et perspectives']
  },
  reformes: (wb, meta) => {
    const accent = hexToArgb(meta.color)
    const ctx = addSheet(wb, { name: 'PDL-145T', title: 'Exécution physique du PDL-145T à fin juillet 2026', subtitle: meta.title, accent, widths: [44, 14, 14, 14, 14, 16], meta: 'Source : Comité technique de suivi du PDL-145T (tableau 15)' })
    addTable(
      ctx,
      [
        { header: 'Ouvrages' },
        { header: 'BCeCo', type: 'int' },
        { header: 'PNUD', type: 'int' },
        { header: 'CFEF', type: 'int' },
        { header: 'Total', type: 'int' },
        { header: 'Part du prévu', type: 'pct', dataBar: true },
      ],
      pdlRows.map(([label, a, b, c, total, head]) => ({ cells: [label, a, b, c, total, total / 2130], level: head ? 0 : 1 })),
    )
    addNotes(
      ctx,
      'Financement reçu par le programme',
      [
        '523 M USD en 2022, dont 511 M USD de fonds DTS et 12 M USD du Trésor public.',
        '59,7 M USD en 2024 et 25,63 M USD en 2025 (remboursements de DTS).',
        'Gap de financement de 26 M USD.',
        'Décaissement annoncé de 150 M USD pour environ 3 700 km de routes de desserte agricole.',
      ],
      XL.amber,
    )
    const reformes = addSheet(wb, { name: 'Réformes', title: 'Réformes budgétaires en cours', subtitle: meta.title, accent, widths: [70, 18, 18, 18, 18, 18] })
    addTable(
      reformes,
      [{ header: 'Réforme' }, { header: 'Statut' }],
      [
        'Mobilisation accrue des ressources internes',
        'Poursuite des réformes des administrations financières',
        "Transparence des opérations d'endettement",
        'Amélioration de la qualité de la dépense',
        'Implémentation de la facture normalisée (TVA)',
      ].map((label) => ({ cells: [label, 'En cours'] })),
    )
    return ['PDL-145T : avancement physique par opérateur et financement', 'Réformes : réformes budgétaires en cours']
  },
}

export async function downloadReportExcel(id: ReportId) {
  const meta = reportCatalog.find((r) => r.id === id)!
  const wb = await createWorkbook()
  wb.title = meta.title
  const sheets = builders[id](wb, meta)
  addOverviewSheet(wb, meta, sheets)
  // L'aperçu, créé en dernier pour lister les feuilles, est placé en tête du classeur.
  ;(wb.getWorksheet('Aperçu') as unknown as { orderNo: number }).orderNo = -1
  wb.views = [{ activeTab: 0, x: 0, y: 0, width: 12000, height: 8000, firstSheet: 0, visibility: 'visible' }]
  await downloadWorkbook(wb, `rapport-${id}-2026.xlsx`)
}
