import {
  kpis,
  budgetExecution,
  revenueBreakdown,
  expenseBreakdown,
  ministryExecution,
  publicDebt,
  macroIndicators,
  provinces,
  alerts,
  reforms,
} from '@/lib/data'
import { parseFrenchNumber } from '@/lib/currency'
import { XL, addKpiCards, addNotes, addSectionTitle, addSheet, addTable, createWorkbook, downloadWorkbook, type KpiCard } from '@/lib/excel-theme'

// Export Excel du tableau de bord (bouton « Exporter » de l'en-tête).

const KPI_COLORS: Record<string, string> = {
  success: XL.green,
  info: XL.blue,
  violet: XL.violet,
  warning: XL.amber,
  destructive: XL.danger,
}

const percent = (value: string) => parseFrenchNumber(value.replace('%', ''))

export async function exportDashboard(exercice: string, month: string) {
  const wb = await createWorkbook()
  wb.title = `Tableau de bord stratégique — ${month} ${exercice}`
  const periode = `Exercice ${exercice} · Période : ${month} ${exercice}`

  // Feuille 1 : tableau de bord.
  const home = addSheet(wb, {
    name: 'Tableau de bord',
    title: 'Tableau de bord stratégique',
    subtitle: `Suivi de l'exécution du Budget de l'État · ${periode}`,
    widths: [44, 20, 20, 20, 16, 16],
    meta: 'Montants en milliards de CDF',
  })
  addSectionTitle(home, 'Indicateurs clés')
  const cards: KpiCard[] = kpis.map((k) => {
    const isRate = !k.unit && k.value.endsWith('%')
    return {
      label: `${k.label} ${k.sublabel}`.trim(),
      value: isRate ? percent(k.value) / 100 : parseFrenchNumber(k.value),
      numFmt: isRate ? '0.0%' : '#,##0.0" Mrd"',
      detail: k.meta ? `${k.meta} : ${k.metaValue}` : `${k.compareLabel} : ${k.compareValue}`,
      color: KPI_COLORS[k.color] ?? XL.blue,
    }
  })
  addKpiCards(home, cards.slice(0, 3))
  addKpiCards(home, cards.slice(3))

  addSectionTitle(home, "Exécution du budget de l'État")
  addTable(
    home,
    [
      { header: 'Poste' },
      { header: 'Prévisions linéaires (Mrd CDF)', type: 'number' },
      { header: 'Exécution à date (Mrd CDF)', type: 'number' },
      { header: 'Écart (Mrd CDF)', type: 'number' },
      { header: "Taux d'exécution", type: 'rate', dataBar: true },
    ],
    budgetExecution.map((b) => ({ cells: [b.name, b.prevision, b.execution, b.execution - b.prevision, percent(b.taux)] })),
  )

  addSectionTitle(home, 'Répartition des recettes')
  addTable(home, [{ header: 'Nature' }, { header: 'Part', type: 'pct', dataBar: true }], revenueBreakdown.map((r) => ({ cells: [r.name, r.value / 100] })))
  addSectionTitle(home, 'Répartition des dépenses')
  addTable(home, [{ header: 'Nature' }, { header: 'Part', type: 'pct', dataBar: true }], expenseBreakdown.map((e) => ({ cells: [e.name, e.value / 100] })))

  // Feuille 2 : ministères.
  const ministeres = addSheet(wb, { name: 'Ministères', title: 'Exécution des dépenses par ministère', subtitle: periode, accent: XL.violet, widths: [70, 22, 16, 16], meta: 'Investissements sur ressources propres · taux d’exécution' })
  addTable(
    ministeres,
    [{ header: 'Ministère / Section' }, { header: "Taux d'exécution", type: 'rate', dataBar: true }],
    [...ministryExecution].sort((a, b) => b.value - a.value).map((m) => ({ cells: [m.name, m.value] })),
  )

  // Feuille 3 : provinces.
  const provincesSheet = addSheet(wb, { name: 'Provinces', title: 'Exécution des dépenses par province', subtitle: periode, accent: XL.green, widths: [40, 22, 16, 16] })
  addTable(
    provincesSheet,
    [{ header: 'Province' }, { header: "Taux d'exécution", type: 'rate', dataBar: true }],
    [...provinces].sort((a, b) => b.taux - a.taux).map((p) => ({ cells: [p.name, p.taux] })),
  )

  // Feuille 4 : dette et macroéconomie.
  const finances = addSheet(wb, { name: 'Dette et macroéconomie', title: 'Dette publique et indicateurs macroéconomiques', subtitle: periode, accent: 'FFBE123C', widths: [44, 20, 16, 20, 16] })
  addSectionTitle(finances, 'Dette publique')
  addTable(
    finances,
    [{ header: 'Type' }, { header: 'Paiements (Mrd CDF)', type: 'number' }, { header: "Taux d'exécution", type: 'rate', dataBar: true }, { header: 'Période' }],
    publicDebt.map((d) => ({ cells: [d.type, parseFrenchNumber(d.encours), percent(d.pib), d.vs], total: d.total })),
  )
  addSectionTitle(finances, 'Indicateurs macroéconomiques', 'FF0891B2')
  addTable(
    finances,
    [{ header: 'Indicateur' }, { header: 'Valeur', type: 'number' }, { header: 'Unité' }, { header: 'Référence' }],
    macroIndicators.map((m) => ({ cells: [m.name, percent(m.value), m.value.endsWith('%') ? '%' : m.name.match(/\(([^)]+)\)/)?.[1] ?? '', m.vs] })),
  )

  // Feuille 5 : alertes et réformes.
  const vigilance = addSheet(wb, { name: 'Alertes et réformes', title: 'Alertes, risques et réformes', subtitle: periode, accent: XL.amber, widths: [70, 20, 16, 16] })
  addSectionTitle(vigilance, 'Alertes et points de vigilance')
  const groups: [string, string, string][] = [
    ['danger', 'Alertes critiques', XL.danger],
    ['warning', 'Points de vigilance', XL.amber],
    ['info', 'Informations', XL.blue],
  ]
  groups.forEach(([level, title, color]) => {
    const items = alerts.filter((a) => a.level === level).map((a) => a.text)
    if (items.length) addNotes(vigilance, title, items, color)
  })
  addSectionTitle(vigilance, 'Suivi des réformes')
  addTable(vigilance, [{ header: 'Réforme' }, { header: 'Statut' }], reforms.map((r) => ({ cells: [r.name, r.status === 'progress' ? 'En cours' : r.status] })))

  await downloadWorkbook(wb, `tableau-bord-budget-${exercice}-${month.toLowerCase().replace(/\s+/g, '-')}.xlsx`)
}
