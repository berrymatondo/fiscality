'use client'

import { Calendar, ChevronDown, Download, Check, Menu } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserMenu } from '@/components/dashboard/user-menu'
import { NotificationBell } from '@/components/dashboard/notification-bell'
import { CurrencyToggle } from '@/components/dashboard/currency-toggle'
import { exportDashboard } from '@/lib/export'

const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
]

export function Header({
  onMenuClick,
  exercice,
  periode,
  exercicesDisponibles,
}: {
  onMenuClick: () => void
  exercice: number
  periode: string
  exercicesDisponibles: number[]
}) {
  const router = useRouter()
  const pathname = usePathname()

  const monthIndex = Math.min(Math.max(Number(periode.slice(5, 7)) - 1, 0), 11)
  const monthLabel = MONTHS[monthIndex]

  function navigate(nextExercice: number, nextMonthIndex: number) {
    const nextPeriode = `${nextExercice}-${String(nextMonthIndex + 1).padStart(2, '0')}`
    router.push(`${pathname}?exercice=${nextExercice}&periode=${nextPeriode}`)
  }

  return (
    <header className="sticky top-0 z-30 flex flex-col gap-4 border-b border-border bg-card px-4 py-4 md:px-6 md:py-5 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Ouvrir le menu"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-brand-navy text-balance dark:text-slate-50 md:text-2xl">
            TABLEAU DE BORD STRATÉGIQUE
          </h1>
          <p className="text-[13px] text-muted-foreground md:text-sm">
            Suivi de l&apos;exécution du Budget de l&apos;État
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 md:gap-3">
        <CurrencyToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between gap-6 rounded-md border border-border px-3 py-1.5 text-left transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="leading-tight">
              <span className="block text-[9px] font-semibold uppercase text-muted-foreground">
                Exercice
              </span>
              <span className="block text-sm font-semibold text-foreground">
                {exercice}
              </span>
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Exercice budgétaire</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {exercicesDisponibles.map((year) => (
                <DropdownMenuItem
                  key={year}
                  onClick={() => navigate(year, monthIndex)}
                  className="justify-between"
                >
                  {year}
                  {exercice === year && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-between gap-6 rounded-md border border-border px-3 py-1.5 text-left transition-colors hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="leading-tight">
              <span className="block text-[9px] font-semibold uppercase text-muted-foreground">
                Période
              </span>
              <span className="block text-sm font-semibold text-foreground">
                {monthLabel} {exercice}
              </span>
            </span>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-72 w-44 overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Période</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {MONTHS.map((m, i) => (
                <DropdownMenuItem
                  key={m}
                  onClick={() => navigate(exercice, i)}
                  className="justify-between"
                >
                  {m}
                  {monthIndex === i && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() => exportDashboard(String(exercice), monthLabel)}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>

        <ThemeToggle />
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  )
}
