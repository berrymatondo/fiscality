'use client'

import { useState } from 'react'
import { Sidebar, type NavLabel } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { PageHero } from '@/components/dashboard/page-hero'
import { ExchangeRateProvider } from '@/components/dashboard/currency'
import { rateForExercice, type TauxParExercice } from '@/lib/settings'
import type { Role } from '@/lib/roles'

export function DashboardShell({
  section,
  exercice,
  periode,
  periodeLabel,
  exercicesDisponibles,
  provincesPubliees,
  tauxParExercice,
  currentRole,
}: {
  section: NavLabel
  exercice: number
  periode: string
  periodeLabel: string
  exercicesDisponibles: number[]
  provincesPubliees: { name: string; taux: number }[] | null
  tauxParExercice: TauxParExercice
  currentRole: Role
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isAnnualHtmlPage = section === 'Tableau HTML annuel'
  const exchangeRate = rateForExercice(tauxParExercice, exercice)

  return (
    <ExchangeRateProvider rate={exchangeRate}>
    <div className="flex min-h-screen bg-background">
      <Sidebar
        active={section}
        onSelect={() => setMobileOpen(false)}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setMobileOpen(true)}
          exercice={exercice}
          periode={periode}
          exercicesDisponibles={exercicesDisponibles}
          exchangeRate={exchangeRate}
        />
        <main className={isAnnualHtmlPage ? 'flex-1' : 'flex-1 space-y-4 p-4 md:p-6'}>
          <PageHero section={section} />
          <DashboardContent
            key={section}
            section={section}
            exercice={exercice}
            periodeLabel={periodeLabel}
            provincesPubliees={provincesPubliees}
            exercicesDisponibles={exercicesDisponibles}
            tauxParExercice={tauxParExercice}
            currentRole={currentRole}
          />
        </main>
      </div>
    </div>
    </ExchangeRateProvider>
  )
}
