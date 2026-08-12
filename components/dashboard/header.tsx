'use client'

import { Calendar, ChevronDown, Download, Check, Menu } from 'lucide-react'
import { useState } from 'react'
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
import { exportDashboard } from '@/lib/export'

const EXERCICES = ['2021', '2022', '2023', '2024', '2025']
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

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const [exercice, setExercice] = useState('2025')
  const [month, setMonth] = useState('Décembre')

  return (
    <header className="flex flex-col gap-4 border-b border-border bg-card px-4 py-4 md:px-6 md:py-5 xl:flex-row xl:items-center xl:justify-between">
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
              {EXERCICES.map((year) => (
                <DropdownMenuItem
                  key={year}
                  onClick={() => setExercice(year)}
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
                {month} {exercice}
              </span>
            </span>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="max-h-72 w-44 overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Période</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {MONTHS.map((m) => (
                <DropdownMenuItem
                  key={m}
                  onClick={() => setMonth(m)}
                  className="justify-between"
                >
                  {m}
                  {month === m && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={() => exportDashboard(exercice, month)}
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Download className="h-4 w-4" />
          Exporter
        </Button>

        <ThemeToggle />
      </div>
    </header>
  )
}
