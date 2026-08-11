'use client'

import { useState } from 'react'
import { Sidebar, type NavLabel } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { DashboardContent } from '@/components/dashboard/dashboard-content'

export function DashboardShell({ section }: { section: NavLabel }) {
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
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 space-y-4 p-4 md:p-6">
          <DashboardContent section={section} />
        </main>
      </div>
    </div>
  )
}
