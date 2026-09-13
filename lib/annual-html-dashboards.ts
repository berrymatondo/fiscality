export const annualHtmlDashboards = {
  2025: {
    title: 'Exécution budgétaire 2025',
    path: '/annual-dashboards/2025/index.html',
    updatedAt: '31/12/2025',
  },
} as const

export type AnnualHtmlDashboardYear = keyof typeof annualHtmlDashboards

export function getAnnualHtmlDashboard(year: number) {
  return annualHtmlDashboards[year as AnnualHtmlDashboardYear] ?? null
}

export function getAvailableAnnualHtmlDashboardYears() {
  return Object.keys(annualHtmlDashboards)
    .map((year) => Number(year))
    .sort((a, b) => b - a)
}
