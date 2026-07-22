import {
  kpis,
  budgetExecution,
  revenueBreakdown,
  expenseBreakdown,
  ministryExecution,
  publicDebt,
  macroIndicators,
  provinces,
} from '@/lib/data'

function escapeCsv(value: string | number): string {
  const str = String(value)
  if (/[",;\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

function toRows(rows: (string | number)[][]): string {
  return rows.map((row) => row.map(escapeCsv).join(';')).join('\n')
}

export function exportDashboard(exercice: string, month: string) {
  const sections: string[] = []

  sections.push(
    toRows([
      ['TABLEAU DE BORD STRATÉGIQUE — MINISTÈRE DU BUDGET RDC'],
      ['Exercice', exercice],
      ['Période', `${month} ${exercice}`],
      ['Généré le', new Date().toLocaleString('fr-FR')],
    ]),
  )

  sections.push(
    toRows([
      [''],
      ['INDICATEURS CLÉS'],
      ['Indicateur', 'Valeur', 'Unité', 'vs 2023'],
      ...kpis.map((k) => [
        `${k.label} ${k.sublabel}`.trim(),
        k.value,
        k.unit,
        k.compareValue,
      ]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ["EXÉCUTION DU BUDGET DE L'ÉTAT (Mrd CDF)"],
      ['Poste', 'Prévisions annuelles', 'Exécution à date', "Taux d'exécution"],
      ...budgetExecution.map((b) => [b.name, b.prevision, b.execution, b.taux]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ['RÉPARTITION DES RECETTES (%)'],
      ['Nature', 'Part'],
      ...revenueBreakdown.map((r) => [r.name, `${r.value}%`]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ['RÉPARTITION DES DÉPENSES (%)'],
      ['Nature', 'Part'],
      ...expenseBreakdown.map((e) => [e.name, `${e.value}%`]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ["EXÉCUTION DES DÉPENSES PAR MINISTÈRE (Taux d'exécution)"],
      ['Ministère', 'Taux'],
      ...ministryExecution.map((m) => [m.name, `${m.value}%`]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ["EXÉCUTION DES DÉPENSES PAR PROVINCE (Taux d'exécution)"],
      ['Province', 'Taux'],
      ...provinces.map((p) => [p.name, `${p.taux}%`]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ['DETTE PUBLIQUE'],
      ['Type', 'Encours (Mrd CDF)', '% du PIB', 'vs 2023'],
      ...publicDebt.map((d) => [d.type, d.encours, d.pib, d.vs]),
    ]),
  )

  sections.push(
    toRows([
      [''],
      ['INDICATEURS MACROÉCONOMIQUES'],
      ['Indicateur', 'Valeur', 'vs 2023'],
      ...macroIndicators.map((m) => [m.name, m.value, m.vs]),
    ]),
  )

  const csv = '\uFEFF' + sections.join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `tableau-bord-budget-${exercice}-${month.toLowerCase()}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
