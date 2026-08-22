'use client'

import { useState } from 'react'
import { Sidebar, type NavLabel } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { PageHero } from '@/components/dashboard/page-hero'

export function DashboardShell({
  section,
  exercice,
  periode,
  periodeLabel,
  exercicesDisponibles,
  provincesPubliees,
}: {
  section: NavLabel
  exercice: number
  periode: string
  periodeLabel: string
  exercicesDisponibles: number[]
  provincesPubliees: { name: string; taux: number }[] | null
}) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
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
        />
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <PageHero section={section} />
          <DashboardContent key={section} section={section} periodeLabel={periodeLabel} provincesPubliees={provincesPubliees} />
        </main>
      </div>
    </div>
  )
}
