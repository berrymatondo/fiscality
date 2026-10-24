import { DashboardShell } from '@/components/dashboard/dashboard-shell'
import { getExercicesDisponibles, getProvincesPubliees, resolvePeriode, formatPeriodeLabel } from '@/lib/dashboard-data'
import { requireSession } from '@/lib/rbac'
import { getTauxParExercice } from '@/lib/exchange-rates'
import type { Role } from '@/lib/roles'

type PageProps = {
  searchParams: Promise<{ exercice?: string; periode?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const session = await requireSession()

  const { exercice, periode } = resolvePeriode(await searchParams)
  const [exercicesDisponibles, provincesPubliees, tauxParExercice] = await Promise.all([
    getExercicesDisponibles(),
    getProvincesPubliees(periode),
    getTauxParExercice(),
  ])

  return (
    <DashboardShell
      section="Vue d'ensemble"
      exercice={exercice}
      periode={periode}
      periodeLabel={formatPeriodeLabel(periode)}
      exercicesDisponibles={exercicesDisponibles}
      provincesPubliees={provincesPubliees}
      tauxParExercice={tauxParExercice}
      currentRole={session.user.role as Role}
    />
  )
}
