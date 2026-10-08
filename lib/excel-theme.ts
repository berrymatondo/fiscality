import type { Borders, Fill, Workbook, Worksheet } from 'exceljs'

// Thème commun des classeurs Excel générés dans le navigateur (rapports, export du tableau de bord).

export const XL = {
  navy: 'FF0F2345',
  blue: 'FF1D4ED8',
  sky: 'FF007FFF',
  yellow: 'FFF7D618',
  red: 'FFCE1021',
  ink: 'FF0F172A',
  text: 'FF1E293B',
  muted: 'FF64748B',
  border: 'FFDAE1EA',
  zebra: 'FFF6F8FC',
  white: 'FFFFFFFF',
  green: 'FF059669',
  amber: 'FFD97706',
  violet: 'FF7C3AED',
  danger: 'FFDC2626',
}

const FONT = 'Calibri'

export const hexToArgb = (hex: string) => `FF${hex.replace('#', '').toUpperCase()}`

/** Mélange une couleur ARGB avec du blanc (0 = couleur, 1 = blanc). */
export function tintArgb(argb: string, amount: number) {
  const channels = [2, 4, 6].map((i) => parseInt(argb.slice(i, i + 2), 16))
  return `FF${channels.map((c) => Math.round(c + (255 - c) * amount).toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

export const rateArgb = (rate: number) => (rate < 30 ? XL.danger : rate < 60 ? XL.amber : rate > 100 ? XL.violet : XL.green)

const solid = (argb: string): Fill => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } })
const gradient = (from: string, to: string): Fill => ({
  type: 'gradient',
  gradient: 'angle',
  degree: 0,
  stops: [
    { position: 0, color: { argb: from } },
    { position: 1, color: { argb: to } },
  ],
})
const line = (argb: string, style: 'thin' | 'medium' | 'thick' = 'thin') => ({ style, color: { argb } })

export async function createWorkbook(): Promise<Workbook> {
  const ExcelJS = (await import('exceljs')).default
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Ministère du Budget — RDC'
  wb.company = 'Ministère du Budget — République Démocratique du Congo'
  wb.created = new Date()
  return wb
}

export type SheetContext = { ws: Worksheet; row: number; cols: number; accent: string }

/** Crée une feuille avec bandeau titre, bande tricolore et ligne d'informations. */
export function addSheet(
  wb: Workbook,
  { name, title, subtitle, accent = XL.blue, widths, meta }: { name: string; title: string; subtitle?: string; accent?: string; widths: number[]; meta?: string },
): SheetContext {
  const ws = wb.addWorksheet(name.slice(0, 31), {
    views: [{ showGridLines: false }],
    properties: { tabColor: { argb: accent }, defaultRowHeight: 18 },
    pageSetup: {
      paperSize: 9,
      orientation: 'landscape',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: { left: 0.4, right: 0.4, top: 0.5, bottom: 0.6, header: 0.2, footer: 0.3 },
    },
    headerFooter: { oddFooter: `&L&8Ministère du Budget · RDC — ${title}&R&8Page &P / &N` },
  })
  ws.columns = widths.map((width) => ({ width }))
  const cols = widths.length

  const band = (row: number, value: string, size: number, color: string, bold: boolean, height: number) => {
    ws.mergeCells(row, 1, row, cols)
    const cell = ws.getCell(row, 1)
    cell.value = value
    cell.font = { name: FONT, size, bold, color: { argb: color } }
    cell.fill = gradient(XL.navy, accent)
    cell.alignment = { vertical: 'middle', indent: 1 }
    ws.getRow(row).height = height
  }
  band(1, 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO · MINISTÈRE DU BUDGET', 8, 'FFBFDBFE', true, 18)
  band(2, title.toUpperCase(), 18, XL.white, true, 32)
  band(3, subtitle ?? '', 10, 'FFDBEAFE', false, 20)

  // Bande tricolore inspirée du drapeau.
  ws.getRow(4).height = 5
  for (let c = 1; c <= cols; c++) {
    const ratio = (c - 0.5) / cols
    ws.getCell(4, c).fill = solid(ratio < 0.6 ? XL.sky : ratio < 0.72 ? XL.yellow : XL.red)
  }

  ws.mergeCells(5, 1, 5, cols)
  const info = ws.getCell(5, 1)
  info.value = `${meta ? `${meta} · ` : ''}Généré le ${new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}`
  info.font = { name: FONT, size: 8, italic: true, color: { argb: XL.muted } }
  info.alignment = { vertical: 'middle', indent: 1 }
  ws.getRow(5).height = 18
  ws.getRow(6).height = 8

  return { ws, row: 7, cols, accent }
}

export function addSectionTitle(ctx: SheetContext, text: string, accent = ctx.accent) {
  const { ws, cols } = ctx
  ws.mergeCells(ctx.row, 1, ctx.row, cols)
  const cell = ws.getCell(ctx.row, 1)
  cell.value = text.toUpperCase()
  cell.font = { name: FONT, size: 12, bold: true, color: { argb: XL.navy } }
  cell.alignment = { vertical: 'middle' }
  cell.border = { bottom: line(accent, 'medium'), left: line(accent, 'thick') }
  for (let c = 2; c <= cols; c++) ws.getCell(ctx.row, c).border = { bottom: line(accent, 'medium') }
  ws.getRow(ctx.row).height = 24
  ctx.row += 2
}

export type KpiCard = { label: string; value: string | number; numFmt?: string; detail?: string; color: string }

/** Cartes d'indicateurs (3 lignes : libellé, valeur, détail) réparties sur la largeur de la feuille. */
export function addKpiCards(ctx: SheetContext, cards: KpiCard[]) {
  const { ws, cols } = ctx
  const r = ctx.row
  cards.forEach((card, i) => {
    const start = 1 + Math.floor((i * cols) / cards.length)
    const end = Math.floor(((i + 1) * cols) / cards.length)
    const bg = tintArgb(card.color, 0.9)
    const lines: [string | number, number, boolean, string, string | undefined][] = [
      [card.label.toUpperCase(), 8, true, XL.muted, undefined],
      [card.value, 18, true, card.color, card.numFmt],
      [card.detail ?? '', 8, false, XL.text, undefined],
    ]
    lines.forEach(([value, size, bold, color, numFmt], k) => {
      if (end > start) ws.mergeCells(r + k, start, r + k, end)
      const cell = ws.getCell(r + k, start)
      cell.value = value
      cell.font = { name: FONT, size, bold, color: { argb: color } }
      cell.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 }
      if (numFmt) cell.numFmt = numFmt
      for (let c = start; c <= end; c++) {
        const target = ws.getCell(r + k, c)
        target.fill = solid(bg)
        target.border = {
          left: c === start ? line(card.color, 'thick') : undefined,
          right: c === end ? line(XL.white, 'thick') : undefined,
          top: k === 0 ? line(XL.white, 'medium') : undefined,
          bottom: k === 2 ? line(XL.white, 'medium') : undefined,
        } as Partial<Borders>
      }
    })
  })
  ws.getRow(r).height = 18
  ws.getRow(r + 1).height = 30
  ws.getRow(r + 2).height = 18
  ctx.row += 4
}

export type ColumnType = 'text' | 'number' | 'int' | 'rate' | 'pct'
export type TableColumn = { header: string; type?: ColumnType; dataBar?: boolean }
export type TableRow = { cells: (string | number | null)[]; level?: number; total?: boolean }

const formats: Record<ColumnType, string | undefined> = {
  text: undefined,
  number: '#,##0.0',
  int: '#,##0',
  rate: '0.0%',
  pct: '0.0%',
}

/**
 * Tableau stylé : en-tête coloré, lignes alternées, hiérarchie indentée, ligne de total.
 * Les colonnes « rate » sont exprimées en % (85,2 → 85,2 %) et colorées selon le niveau d'exécution.
 */
export function addTable(ctx: SheetContext, columns: TableColumn[], rows: TableRow[], { freeze = false } = {}) {
  const { ws, accent } = ctx
  const header = ctx.row
  const hierarchical = rows.some((r) => (r.level ?? 0) > 0)
  // Colonne portant le libellé (indentée selon la hiérarchie) : la 2e si la 1re est un code.
  const labelIndex = columns[0].header === 'Code' ? 1 : 0

  columns.forEach((col, i) => {
    const cell = ws.getCell(header, i + 1)
    cell.value = col.header
    cell.font = { name: FONT, size: 9, bold: true, color: { argb: XL.white } }
    cell.fill = solid(accent)
    cell.alignment = { vertical: 'middle', horizontal: (col.type ?? 'text') === 'text' ? 'left' : 'right', wrapText: true, indent: 1 }
    cell.border = { bottom: line(accent), right: line(tintArgb(accent, 0.25)) }
  })
  ws.getRow(header).height = 26

  rows.forEach((row, ri) => {
    const r = header + 1 + ri
    const level = row.level ?? 0
    const bold = row.total || (hierarchical && level === 0)
    const bg = row.total ? tintArgb(accent, 0.78) : hierarchical && level === 0 ? tintArgb(accent, 0.92) : ri % 2 ? XL.zebra : XL.white
    let tall = false

    columns.forEach((col, ci) => {
      const type = col.type ?? 'text'
      const cell = ws.getCell(r, ci + 1)
      const raw = row.cells[ci]
      cell.fill = solid(bg)
      cell.border = { bottom: line(XL.border), top: row.total ? line(accent, 'medium') : undefined }

      if (raw === null || raw === undefined || raw === '') {
        cell.value = type === 'text' ? '' : '—'
        cell.font = { name: FONT, size: 9, color: { argb: XL.muted } }
        cell.alignment = { vertical: 'middle', horizontal: type === 'text' ? 'left' : 'right', indent: 1 }
        return
      }
      if (type === 'text') {
        cell.value = String(raw)
        cell.alignment = { vertical: 'middle', wrapText: true, indent: 1 + (ci === labelIndex ? level * 2 : 0) }
        const width = ws.getColumn(ci + 1).width ?? 20
        if (String(raw).length > width * 1.15) tall = true
      } else {
        cell.value = type === 'rate' || type === 'pct' ? Number(raw) / (type === 'rate' ? 100 : 1) : Number(raw)
        cell.numFmt = formats[type]!
        cell.alignment = { vertical: 'middle', horizontal: 'right', indent: 1 }
      }
      const color = type === 'rate' ? rateArgb(Number(raw)) : level > 1 ? XL.muted : XL.ink
      cell.font = { name: FONT, size: 9, bold: bold || type === 'rate', color: { argb: color } }
    })
    ws.getRow(r).height = tall ? 30 : 18
  })

  const last = header + rows.length
  columns.forEach((col, ci) => {
    if (!col.dataBar || rows.length === 0) return
    const letter = ws.getColumn(ci + 1).letter
    ws.addConditionalFormatting({
      ref: `${letter}${header + 1}:${letter}${last - (rows[rows.length - 1].total ? 1 : 0)}`,
      rules: [
        {
          type: 'dataBar',
          priority: 1,
          gradient: true,
          cfvo: [
            { type: 'num', value: 0 },
            { type: 'max' },
          ],
          color: { argb: tintArgb(accent, 0.45) },
        } as never,
      ],
    })
  })

  if (freeze) ws.views = [{ state: 'frozen', ySplit: header, showGridLines: false }]
  ctx.row = last + 2
}

/** Encadré de notes (facteurs explicatifs, recommandations…). */
export function addNotes(ctx: SheetContext, title: string, items: string[], color: string) {
  const { ws, cols } = ctx
  const totalWidth = Array.from({ length: cols }, (_, i) => ws.getColumn(i + 1).width ?? 10).reduce((a, b) => a + b, 0)
  const bg = tintArgb(color, 0.92)

  const write = (r: number, value: string, bold: boolean, size: number, fontColor: string) => {
    ws.mergeCells(r, 1, r, cols)
    const cell = ws.getCell(r, 1)
    cell.value = value
    cell.font = { name: FONT, size, bold, color: { argb: fontColor } }
    cell.alignment = { vertical: 'middle', wrapText: true, indent: 1 }
    for (let c = 1; c <= cols; c++) {
      ws.getCell(r, c).fill = solid(bg)
      if (c === 1) ws.getCell(r, c).border = { left: line(color, 'thick') }
    }
    ws.getRow(r).height = Math.max(18, Math.ceil(value.length / (totalWidth * 1.05)) * 14 + 4)
  }

  write(ctx.row, title.toUpperCase(), true, 9, color)
  items.forEach((item, i) => write(ctx.row + 1 + i, `•  ${item}`, false, 9, XL.text))
  ctx.row += items.length + 3
}

export async function downloadWorkbook(wb: Workbook, fileName: string) {
  const buffer = await wb.xlsx.writeBuffer()
  const url = URL.createObjectURL(new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
