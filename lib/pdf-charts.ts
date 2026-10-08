import type { jsPDF } from 'jspdf'
import { PDF_COLORS, fill, ink, sanitizePdfText, stroke, tint, type Rgb } from '@/lib/pdf-theme'

// Primitives de mise en page et de graphiques pour les rapports PDF (jsPDF, unités en mm).

export type Box = { x: number; y: number; w: number; h: number }
export type PdfCursor = { pdf: jsPDF; y: number; ensure: (height: number) => void }

export const MARGIN = 16
export const CONTENT_WIDTH = 210 - MARGIN * 2

export const fmtNumber = (value: number, digits = 1) =>
  sanitizePdfText(value.toLocaleString('fr-FR', { minimumFractionDigits: digits, maximumFractionDigits: digits }))
/** Montant en FC exprimé en milliards. */
export const fmtMrd = (fc: number, digits = 1) => fmtNumber(fc / 1e9, digits)
export const fmtRate = (rate: number) => `${fmtNumber(rate)} %`

export function rateColor(rate: number): Rgb {
  if (rate < 30) return [220, 38, 38]
  if (rate < 60) return [217, 119, 6]
  if (rate > 100) return [124, 58, 237]
  return [5, 150, 105]
}

function niceMax(value: number) {
  if (value <= 0) return 1
  const exp = 10 ** Math.floor(Math.log10(value))
  const n = value / exp
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10) * exp
}

function truncate(pdf: jsPDF, text: string, width: number) {
  const clean = sanitizePdfText(text)
  if (pdf.getTextWidth(clean) <= width) return clean
  let out = clean
  while (out.length > 1 && pdf.getTextWidth(`${out}…`) > width) out = out.slice(0, -1)
  return `${out.trimEnd()}…`
}

/** Cadre blanc avec titre ; renvoie la zone intérieure disponible pour le graphique. */
export function drawChartCard(pdf: jsPDF, box: Box, title: string, subtitle?: string): Box {
  fill(pdf, PDF_COLORS.white)
  stroke(pdf, PDF_COLORS.border)
  pdf.setLineWidth(0.25)
  pdf.roundedRect(box.x, box.y, box.w, box.h, 2.5, 2.5, 'FD')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(8.5)
  ink(pdf, PDF_COLORS.navy)
  pdf.text(truncate(pdf, title, box.w - 10), box.x + 5, box.y + 6.5)
  if (subtitle) {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(6.5)
    ink(pdf, PDF_COLORS.muted)
    pdf.text(truncate(pdf, subtitle, box.w - 10), box.x + 5, box.y + 10.5)
  }
  return { x: box.x + 5, y: box.y + 14, w: box.w - 10, h: box.h - 17 }
}

function drawLegend(pdf: jsPDF, x: number, y: number, items: { label: string; color: Rgb }[]) {
  let cx = x
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(6.5)
  items.forEach((item) => {
    const label = sanitizePdfText(item.label)
    fill(pdf, item.color)
    pdf.roundedRect(cx, y - 2.3, 3, 3, 0.6, 0.6, 'F')
    ink(pdf, PDF_COLORS.text)
    pdf.text(label, cx + 4.2, y)
    cx += pdf.getTextWidth(label) + 10
  })
}

export function drawGroupedBars(
  pdf: jsPDF,
  area: Box,
  {
    categories,
    series,
    format = (v: number) => fmtNumber(v, 0),
  }: { categories: string[]; series: { name: string; color: Rgb; values: number[] }[]; format?: (v: number) => string },
) {
  const axisW = 11
  const plot = { x: area.x + axisW, y: area.y + 4, w: area.w - axisW, h: area.h - 19 }
  const max = niceMax(Math.max(0, ...series.flatMap((s) => s.values)))

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(5.5)
  for (let i = 0; i <= 4; i++) {
    const gy = plot.y + plot.h - (plot.h * i) / 4
    stroke(pdf, i === 0 ? PDF_COLORS.border : tint(PDF_COLORS.border, 0.45))
    pdf.setLineWidth(i === 0 ? 0.35 : 0.15)
    pdf.line(plot.x, gy, plot.x + plot.w, gy)
    ink(pdf, PDF_COLORS.muted)
    const v = (max * i) / 4
    pdf.text(fmtNumber(v, v > 0 && v < 10 ? 1 : 0), plot.x - 1.5, gy + 1, { align: 'right' })
  }

  const groupW = plot.w / categories.length
  const barW = Math.min(10, (groupW * 0.74) / series.length)
  categories.forEach((category, ci) => {
    const gx = plot.x + groupW * ci + (groupW - barW * series.length) / 2
    series.forEach((s, si) => {
      const value = s.values[ci] ?? 0
      const h = (plot.h * Math.min(value, max)) / max
      const bx = gx + si * barW
      fill(pdf, s.color)
      if (h > 0.2) pdf.roundedRect(bx + 0.35, plot.y + plot.h - h, barW - 0.7, h, 0.6, 0.6, 'F')
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(5.2)
      ink(pdf, PDF_COLORS.text)
      pdf.text(format(value), bx + barW / 2, plot.y + plot.h - h - 1.2, { align: 'center' })
    })
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(6)
    ink(pdf, PDF_COLORS.text)
    const lines = (pdf.splitTextToSize(sanitizePdfText(category), groupW - 1) as string[]).slice(0, 2)
    pdf.text(lines, plot.x + groupW * ci + groupW / 2, plot.y + plot.h + 3.6, { align: 'center' })
  })

  drawLegend(pdf, plot.x, area.y + area.h - 1, series.map((s) => ({ label: s.name, color: s.color })))
}

export function drawHorizontalBars(
  pdf: jsPDF,
  area: Box,
  {
    items,
    max,
    reference,
    format = fmtRate,
    labelWidth,
  }: {
    items: { label: string; value: number; color?: Rgb }[]
    max?: number
    reference?: number
    format?: (v: number) => string
    labelWidth?: number
  },
) {
  const labelW = labelWidth ?? area.w * 0.42
  const valueW = 17
  const barX = area.x + labelW + 2
  const barW = area.w - labelW - 2 - valueW
  const rowH = Math.min(7, area.h / items.length)
  const maxV = max ?? niceMax(Math.max(0, ...items.map((i) => i.value)))

  items.forEach((item, i) => {
    const ry = area.y + i * rowH
    if (i % 2 === 0) {
      fill(pdf, PDF_COLORS.zebra)
      pdf.rect(area.x, ry, area.w, rowH, 'F')
    }
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(6.3)
    ink(pdf, PDF_COLORS.text)
    pdf.text(truncate(pdf, item.label, labelW - 2), area.x + 1.5, ry + rowH / 2 + 1.1)

    const barH = Math.max(1.6, rowH * 0.46)
    const by = ry + (rowH - barH) / 2
    fill(pdf, tint(PDF_COLORS.border, 0.35))
    pdf.roundedRect(barX, by, barW, barH, barH / 2, barH / 2, 'F')
    const w = (barW * Math.min(Math.max(item.value, 0), maxV)) / maxV
    const color = item.color ?? rateColor(item.value)
    if (w > 0.5) {
      fill(pdf, color)
      pdf.roundedRect(barX, by, w, barH, barH / 2, barH / 2, 'F')
    }
    if (item.value > maxV) {
      fill(pdf, color)
      pdf.triangle(barX + barW + 0.4, by - 0.3, barX + barW + 0.4, by + barH + 0.3, barX + barW + 2.2, by + barH / 2, 'F')
    }
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6.3)
    ink(pdf, item.color ? PDF_COLORS.ink : color)
    pdf.text(format(item.value), area.x + area.w - 1, ry + rowH / 2 + 1.1, { align: 'right' })
  })

  if (reference !== undefined && reference <= maxV) {
    const rx = barX + (barW * reference) / maxV
    const bottom = area.y + items.length * rowH
    stroke(pdf, [220, 38, 38])
    pdf.setLineWidth(0.3)
    pdf.setLineDashPattern([1, 0.8], 0)
    pdf.line(rx, area.y - 1, rx, bottom + 1)
    pdf.setLineDashPattern([], 0)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(5.5)
    ink(pdf, [220, 38, 38])
    pdf.text(`Cible ${fmtNumber(reference, 0)} %`, rx, bottom + 3.5, { align: 'center' })
  }
}

function wedge(pdf: jsPDF, cx: number, cy: number, ro: number, ri: number, a0: number, a1: number, color: Rgb) {
  const steps = Math.max(2, Math.ceil((a1 - a0) / (Math.PI / 40)))
  const points: [number, number][] = []
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps
    points.push([cx + ro * Math.cos(a), cy + ro * Math.sin(a)])
  }
  for (let i = steps; i >= 0; i--) {
    const a = a0 + ((a1 - a0) * i) / steps
    points.push([cx + ri * Math.cos(a), cy + ri * Math.sin(a)])
  }
  const deltas = points.slice(1).map((p, i) => [p[0] - points[i][0], p[1] - points[i][1]])
  fill(pdf, color)
  stroke(pdf, PDF_COLORS.white)
  pdf.setLineWidth(0.5)
  pdf.lines(deltas, points[0][0], points[0][1], [1, 1], 'FD', true)
}

export function drawDonut(
  pdf: jsPDF,
  area: Box,
  slices: { label: string; value: number; color: Rgb }[],
  { centerValue, centerLabel, format = (v: number) => fmtNumber(v) }: { centerValue: string; centerLabel: string; format?: (v: number) => string },
) {
  const r = Math.min(area.h / 2 - 1, area.w * 0.19)
  const cx = area.x + r + 1
  const cy = area.y + area.h / 2
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1
  let angle = -Math.PI / 2
  slices.forEach((s) => {
    const span = (2 * Math.PI * s.value) / total
    if (span > 0.004) wedge(pdf, cx, cy, r, r * 0.6, angle, angle + span, s.color)
    angle += span
  })

  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(r > 14 ? 10 : 8.5)
  ink(pdf, PDF_COLORS.navy)
  pdf.text(sanitizePdfText(centerValue), cx, cy + 0.8, { align: 'center' })
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(5.5)
  ink(pdf, PDF_COLORS.muted)
  pdf.text(sanitizePdfText(centerLabel), cx, cy + 4.2, { align: 'center' })

  const lx = cx + r + 6
  const lw = area.x + area.w - lx
  const rowH = Math.min(8.5, area.h / slices.length)
  const ly0 = cy - (rowH * slices.length) / 2
  slices.forEach((s, i) => {
    const ly = ly0 + i * rowH + rowH / 2
    fill(pdf, s.color)
    pdf.roundedRect(lx, ly - 3, 2.6, 2.6, 0.6, 0.6, 'F')
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(6.3)
    ink(pdf, PDF_COLORS.text)
    pdf.text(truncate(pdf, s.label, lw - 4), lx + 4, ly - 0.8)
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(5.8)
    ink(pdf, PDF_COLORS.navy)
    const pct = `${fmtNumber((s.value / total) * 100)} %`
    pdf.text(pct, lx + 4, ly + 2.2)
    pdf.setFont('helvetica', 'normal')
    ink(pdf, PDF_COLORS.muted)
    pdf.text(`· ${format(s.value)}`, lx + 5 + pdf.getTextWidth(pct), ly + 2.2)
  })
}

export function drawStackedBars(
  pdf: jsPDF,
  area: Box,
  { rows, segments }: { rows: { label: string; values: number[] }[]; segments: { label: string; color: Rgb }[] },
) {
  const labelW = 24
  const barX = area.x + labelW
  const barW = area.w - labelW - 12
  const rowH = Math.min(11, (area.h - 8) / rows.length)
  rows.forEach((row, i) => {
    const ry = area.y + i * rowH
    const total = row.values.reduce((a, b) => a + b, 0) || 1
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(7)
    ink(pdf, PDF_COLORS.navy)
    pdf.text(sanitizePdfText(row.label), area.x, ry + rowH / 2 + 1.2)
    let x = barX
    row.values.forEach((value, si) => {
      const w = (barW * value) / total
      if (w <= 0) return
      fill(pdf, segments[si].color)
      pdf.rect(x, ry + rowH * 0.18, w, rowH * 0.64, 'F')
      if (w > 7) {
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(6)
        ink(pdf, PDF_COLORS.white)
        pdf.text(String(value), x + w / 2, ry + rowH / 2 + 1, { align: 'center' })
      }
      x += w
    })
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6.5)
    ink(pdf, PDF_COLORS.text)
    pdf.text(String(total), area.x + area.w, ry + rowH / 2 + 1.2, { align: 'right' })
  })
  drawLegend(pdf, barX, area.y + area.h - 1, segments)
}

export type KpiTile = { label: string; value: string; unit?: string; detail?: string; color: Rgb; rate?: number }

export function drawKpiTiles(pdf: jsPDF, x: number, y: number, w: number, tiles: KpiTile[], height = 25): number {
  const gap = 3.5
  const tw = (w - gap * (tiles.length - 1)) / tiles.length
  tiles.forEach((tile, i) => {
    const tx = x + i * (tw + gap)
    fill(pdf, tint(tile.color, 0.92))
    pdf.roundedRect(tx, y, tw, height, 2.5, 2.5, 'F')
    fill(pdf, tile.color)
    pdf.roundedRect(tx, y, 1.6, height, 0.8, 0.8, 'F')

    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6)
    ink(pdf, PDF_COLORS.muted)
    pdf.text(truncate(pdf, tile.label.toUpperCase(), tw - 8), tx + 5, y + 6)

    pdf.setFontSize(tile.value.length > 9 ? 12 : 14)
    ink(pdf, tile.color)
    const value = sanitizePdfText(tile.value)
    pdf.text(value, tx + 5, y + 13.5)
    if (tile.unit) {
      const vw = pdf.getTextWidth(value)
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(6.5)
      ink(pdf, PDF_COLORS.text)
      pdf.text(sanitizePdfText(tile.unit), tx + 6 + vw, y + 13.5)
    }
    if (tile.detail) {
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(6.2)
      ink(pdf, PDF_COLORS.text)
      pdf.text(truncate(pdf, tile.detail, tw - 8), tx + 5, y + 18.5)
    }
    if (tile.rate !== undefined) {
      const bw = tw - 10
      fill(pdf, PDF_COLORS.white)
      pdf.roundedRect(tx + 5, y + height - 4.2, bw, 1.6, 0.8, 0.8, 'F')
      fill(pdf, tile.color)
      pdf.roundedRect(tx + 5, y + height - 4.2, (bw * Math.min(tile.rate, 100)) / 100, 1.6, 0.8, 0.8, 'F')
    }
  })
  return y + height
}

export type TableColumn = { header: string; width: number; align?: 'left' | 'right' | 'center' }
export type TableRow = { cells: string[]; level?: number; total?: boolean; rate?: number | null }

/** Tableau paginé : l'en-tête est répété en cas de saut de page. Le taux (rate) colore la dernière colonne. */
export function drawTable(cursor: PdfCursor, columns: TableColumn[], rows: TableRow[], accent: Rgb = PDF_COLORS.navy) {
  const { pdf } = cursor
  const totalW = columns.reduce((sum, c) => sum + c.width, 0)
  const hierarchical = rows.some((r) => (r.level ?? 0) > 0)

  const header = () => {
    fill(pdf, accent)
    pdf.roundedRect(MARGIN, cursor.y, totalW, 7.5, 1.2, 1.2, 'F')
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(6.3)
    ink(pdf, PDF_COLORS.white)
    let x = MARGIN
    columns.forEach((c) => {
      const tx = c.align === 'right' ? x + c.width - 2.5 : c.align === 'center' ? x + c.width / 2 : x + 2.5
      pdf.text(sanitizePdfText(c.header.toUpperCase()), tx, cursor.y + 4.9, { align: c.align ?? 'left' })
      x += c.width
    })
    cursor.y += 7.5
  }

  cursor.ensure(18)
  header()
  rows.forEach((row, i) => {
    const level = row.level ?? 0
    const bold = row.total || (hierarchical && level === 0)
    pdf.setFont('helvetica', bold ? 'bold' : 'normal')
    pdf.setFontSize(6.8)
    const indent = level * 3.5
    const lines = pdf.splitTextToSize(sanitizePdfText(row.cells[0]), columns[0].width - 4 - indent) as string[]
    const rowH = Math.max(6.4, lines.length * 3.3 + 3.2)

    const pages = pdf.getNumberOfPages()
    cursor.ensure(rowH)
    if (pdf.getNumberOfPages() !== pages) header()

    fill(pdf, row.total ? tint(accent, 0.82) : hierarchical && level === 0 ? tint(accent, 0.93) : i % 2 ? PDF_COLORS.zebra : PDF_COLORS.white)
    pdf.rect(MARGIN, cursor.y, totalW, rowH, 'F')
    stroke(pdf, PDF_COLORS.border)
    pdf.setLineWidth(0.15)
    pdf.line(MARGIN, cursor.y + rowH, MARGIN + totalW, cursor.y + rowH)

    let x = MARGIN
    columns.forEach((c, ci) => {
      const isRate = ci === columns.length - 1 && row.rate !== undefined
      pdf.setFont('helvetica', bold || isRate ? 'bold' : 'normal')
      pdf.setFontSize(6.8)
      ink(pdf, isRate && row.rate !== null ? rateColor(row.rate!) : level > 1 ? PDF_COLORS.muted : PDF_COLORS.ink)
      const textY = cursor.y + 4.3
      if (ci === 0) {
        pdf.text(lines, x + 2.5 + indent, textY)
      } else {
        const tx = c.align === 'right' ? x + c.width - 2.5 : c.align === 'center' ? x + c.width / 2 : x + 2.5
        pdf.text(sanitizePdfText(row.cells[ci] ?? ''), tx, textY, { align: c.align ?? 'left' })
      }
      x += c.width
    })
    cursor.y += rowH
  })
  cursor.y += 4
}

export function drawCallout(cursor: PdfCursor, title: string, items: string[], color: Rgb) {
  const { pdf } = cursor
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8)
  const wrapped = items.map((item) => pdf.splitTextToSize(sanitizePdfText(item), CONTENT_WIDTH - 15) as string[])
  const height = 11 + wrapped.reduce((sum, l) => sum + l.length * 3.8 + 1.4, 0)
  cursor.ensure(height + 4)
  fill(pdf, tint(color, 0.93))
  pdf.roundedRect(MARGIN, cursor.y, CONTENT_WIDTH, height, 2.5, 2.5, 'F')
  fill(pdf, color)
  pdf.roundedRect(MARGIN, cursor.y, 1.8, height, 0.9, 0.9, 'F')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(7.5)
  ink(pdf, color)
  pdf.text(sanitizePdfText(title.toUpperCase()), MARGIN + 6, cursor.y + 6.5)
  let y = cursor.y + 11.5
  wrapped.forEach((lines) => {
    fill(pdf, color)
    pdf.circle(MARGIN + 7, y - 1, 0.8, 'F')
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(8)
    ink(pdf, PDF_COLORS.text)
    pdf.text(lines, MARGIN + 10, y)
    y += lines.length * 3.8 + 1.4
  })
  cursor.y += height + 5
}

export function drawParagraph(cursor: PdfCursor, text: string) {
  const { pdf } = cursor
  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(8.8)
  const lines = pdf.splitTextToSize(sanitizePdfText(text), CONTENT_WIDTH) as string[]
  cursor.ensure(lines.length * 4.2 + 3)
  ink(pdf, PDF_COLORS.text)
  pdf.text(lines, MARGIN, cursor.y + 1, { lineHeightFactor: 1.35 })
  cursor.y += lines.length * 4.2 + 4
}
