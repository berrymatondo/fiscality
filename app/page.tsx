import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { getExercicesDisponibles, getProvincesPubliees, resolvePeriode, formatPeriodeLabel } from '@/lib/dashboard-data'
import { requireSession } from '@/lib/rbac'

type PageProps = {
  searchParams: Promise<{ exercice?: string; periode?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  await requireSession()

  const { exercice, periode } = resolvePeriode(await searchParams)
  const [exercicesDisponibles, provincesPubliees] = await Promise.all([
    getExercicesDisponibles(),
    getProvincesPubliees(periode),
  ])

  return (
    <DashboardShell
      section="Vue d'ensemble"
      exercice={exercice}
      periode={periode}
      periodeLabel={formatPeriodeLabel(periode)}
      exercicesDisponibles={exercicesDisponibles}
      provincesPubliees={provincesPubliees}
    />
  )
}
