import type { jsPDF } from 'jspdf'

// Thème visuel commun aux PDF générés côté client (rapports de saisie, processus budgétaire).

export type Rgb = [number, number, number]

export const PDF_COLORS = {
  navy: [15, 35, 69] as Rgb,
  blue: [29, 78, 216] as Rgb,
  sky: [0, 127, 255] as Rgb,
  yellow: [247, 214, 24] as Rgb,
  red: [206, 16, 33] as Rgb,
  ink: [15, 23, 42] as Rgb,
  text: [30, 41, 59] as Rgb,
  muted: [100, 116, 139] as Rgb,
  border: [218, 225, 234] as Rgb,
  zebra: [246, 248, 252] as Rgb,
  white: [255, 255, 255] as Rgb,
}

/** Couleurs d'accent utilisées pour différencier les lignes de montants. */
export const PDF_ACCENTS: Rgb[] = [
  [37, 99, 235],
  [5, 150, 105],
  [217, 119, 6],
  [124, 58, 237],
  [219, 39, 119],
  [8, 145, 178],
]

// La police Helvetica de jsPDF utilise WinAnsiEncoding, qui ne contient pas les espaces fines
// insécables de toLocaleString('fr-FR') : on les remplace par une espace ASCII.
const NBSP_LIKE = /[    ]/g

export function sanitizePdfText(text: string): string {
  return text.replace(NBSP_LIKE, ' ').replace(/→/g, '»')
}

export function hexToRgb(hex: string): Rgb {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16)) as Rgb
}

/** Mélange une couleur avec du blanc (amount = 0 → couleur, 1 → blanc). */
export function tint([r, g, b]: Rgb, amount: number): Rgb {
  return [r + (255 - r) * amount, g + (255 - g) * amount, b + (255 - b) * amount].map(Math.round) as Rgb
}

export const fill = (pdf: jsPDF, c: Rgb) => pdf.setFillColor(c[0], c[1], c[2])
export const stroke = (pdf: jsPDF, c: Rgb) => pdf.setDrawColor(c[0], c[1], c[2])
export const ink = (pdf: jsPDF, c: Rgb) => pdf.setTextColor(c[0], c[1], c[2])

function horizontalGradient(pdf: jsPDF, x: number, y: number, w: number, h: number, from: Rgb, to: Rgb) {
  const steps = 60
  for (let i = 0; i < steps; i++) {
    const t = i / (steps - 1)
    fill(pdf, from.map((v, k) => Math.round(v + (to[k] - v) * t)) as Rgb)
    pdf.rect(x + (w / steps) * i, y, w / steps + 0.3, h, 'F')
  }
}

/** Bande tricolore (bleu, jaune, rouge) inspirée du drapeau de la RDC. */
export function drawFlagStripe(pdf: jsPDF, y: number, height = 1.4) {
  const width = pdf.internal.pageSize.getWidth()
  fill(pdf, PDF_COLORS.sky)
  pdf.rect(0, y, width * 0.6, height, 'F')
  fill(pdf, PDF_COLORS.yellow)
  pdf.rect(width * 0.6, y, width * 0.12, height, 'F')
  fill(pdf, PDF_COLORS.red)
  pdf.rect(width * 0.72, y, width * 0.28, height, 'F')
}

/**
 * Dessine l'en-tête de page et renvoie l'ordonnée où commence le contenu.
 * `compact` réduit la hauteur pour les pages de continuation.
 */
export function drawPageHeader(
  pdf: jsPDF,
  { title, subtitle, kicker = 'République Démocratique du Congo · Ministère du Budget', compact = false }: { title: string; subtitle?: string; kicker?: string; compact?: boolean },
): number {
  const width = pdf.internal.pageSize.getWidth()
  const margin = 16
  const height = compact ? 18 : 38

  horizontalGradient(pdf, 0, 0, width, height, PDF_COLORS.navy, PDF_COLORS.blue)
  // Motif décoratif discret à droite.
  fill(pdf, tint(PDF_COLORS.blue, 0.12))
  pdf.circle(width - 14, compact ? 2 : 4, compact ? 12 : 22, 'F')
  fill(pdf, tint(PDF_COLORS.blue, 0.22))
  pdf.circle(width - 4, compact ? 12 : 27, compact ? 5 : 10, 'F')
  drawFlagStripe(pdf, height)

  ink(pdf, PDF_COLORS.white)
  pdf.setFont('helvetica', 'bold')
  if (compact) {
    pdf.setFontSize(11)
    pdf.text(sanitizePdfText(title.toUpperCase()), margin, 11.5)
    return height + 10
  }

  pdf.setFontSize(7)
  ink(pdf, [191, 219, 254])
  pdf.text(sanitizePdfText(kicker.toUpperCase()), margin, 10)
  ink(pdf, PDF_COLORS.white)
  pdf.setFontSize(18)
  pdf.text(sanitizePdfText(title.toUpperCase()), margin, 21)
  if (subtitle) {
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(9)
    ink(pdf, [219, 234, 254])
    pdf.text(sanitizePdfText(subtitle), margin, 28.5)
  }

  // Pastille de date à droite.
  const dateLabel = sanitizePdfText(new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }))
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(7.5)
  const pillWidth = pdf.getTextWidth(dateLabel) + 8
  stroke(pdf, [147, 197, 253])
  pdf.setLineWidth(0.3)
  pdf.roundedRect(width - margin - pillWidth, 24.5, pillWidth, 6, 3, 3, 'S')
  ink(pdf, PDF_COLORS.white)
  pdf.text(dateLabel, width - margin - pillWidth / 2, 28.6, { align: 'center' })

  return height + 10
}

/** Titre de section avec pastille de couleur et filet. Renvoie la nouvelle ordonnée. */
export function drawSectionTitle(pdf: jsPDF, y: number, text: string, color: Rgb = PDF_COLORS.blue): number {
  const margin = 16
  const width = pdf.internal.pageSize.getWidth()
  fill(pdf, color)
  pdf.roundedRect(margin, y - 4, 2.2, 6, 1, 1, 'F')
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(11.5)
  ink(pdf, PDF_COLORS.navy)
  const label = sanitizePdfText(text.toUpperCase())
  pdf.text(label, margin + 5, y + 0.5)
  const end = margin + 5 + pdf.getTextWidth(label) + 4
  stroke(pdf, tint(color, 0.7))
  pdf.setLineWidth(0.4)
  pdf.line(end, y - 0.8, width - margin, y - 0.8)
  return y + 8
}

const STATUS_STYLES: Record<string, { fg: Rgb; bg: Rgb }> = {
  brouillon: { fg: [71, 85, 105], bg: [241, 245, 249] },
  soumis: { fg: [180, 83, 9], bg: [254, 243, 199] },
  valide: { fg: [4, 120, 87], bg: [209, 250, 229] },
  publie: { fg: [29, 78, 216], bg: [219, 234, 254] },
  op_soumis: { fg: [109, 40, 217], bg: [237, 233, 254] },
  'ordre de paiement soumis': { fg: [109, 40, 217], bg: [237, 233, 254] },
  paye: { fg: [5, 150, 105], bg: [209, 250, 229] },
}

const STATUS_LABELS: Record<string, string> = {
  brouillon: 'Brouillon',
  soumis: 'Soumis',
  valide: 'Validé',
  publie: 'Publié',
  op_soumis: 'OP soumis',
  paye: 'Payé',
}

const normalizeStatus = (status: string) =>
  status.normalize('NFD').replace(/[̀-ͯ]/g, '').trim().toLowerCase()

export function statusStyle(status: string) {
  return STATUS_STYLES[normalizeStatus(status)] ?? { fg: PDF_COLORS.muted, bg: [241, 245, 249] as Rgb }
}

export function statusLabel(status: string) {
  return STATUS_LABELS[normalizeStatus(status)] ?? status
}

/** Badge arrondi coloré selon le statut. `align: 'right'` ancre le badge sur x par sa droite. */
export function drawStatusBadge(pdf: jsPDF, x: number, y: number, status: string, align: 'left' | 'right' = 'left'): number {
  const { fg, bg } = statusStyle(status)
  const label = sanitizePdfText(statusLabel(status).toUpperCase())
  pdf.setFont('helvetica', 'bold')
  pdf.setFontSize(7)
  const width = pdf.getTextWidth(label) + 7
  const left = align === 'right' ? x - width : x
  fill(pdf, bg)
  pdf.roundedRect(left, y - 3.6, width, 5.2, 2.6, 2.6, 'F')
  fill(pdf, fg)
  pdf.circle(left + 2.4, y - 1, 0.8, 'F')
  ink(pdf, fg)
  pdf.text(label, left + 4, y + 0.2)
  return width
}

/** Pied de page sur toutes les pages : filet tricolore, mention et pagination. */
export function drawFooters(pdf: jsPDF, label: string) {
  const width = pdf.internal.pageSize.getWidth()
  const height = pdf.internal.pageSize.getHeight()
  const margin = 16
  const count = pdf.getNumberOfPages()
  for (let page = 1; page <= count; page++) {
    pdf.setPage(page)
    drawFlagStripe(pdf, height - 12, 0.6)
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(7)
    ink(pdf, PDF_COLORS.muted)
    pdf.text(sanitizePdfText(label), margin, height - 6.5)
    pdf.setFont('helvetica', 'bold')
    ink(pdf, PDF_COLORS.navy)
    pdf.text(`Page ${page} / ${count}`, width - margin, height - 6.5, { align: 'right' })
  }
}
