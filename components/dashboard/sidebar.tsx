'use client'

import {
  LayoutDashboard,
  HandCoins,
  Wallet,
  Landmark,
  FileBarChart2,
  Building2,
  Layers,
  Map,
  LineChart,
  ClipboardCheck,
  ListChecks,
  AlertTriangle,
  FileText,
  BookOpen,
  Workflow,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export const nav = [
  { label: "Vue d'ensemble", href: '/', icon: LayoutDashboard, group: 'Synthèse' },
  { label: 'Recettes', href: '/recettes', icon: HandCoins, group: 'Exécution budgétaire' },
  { label: 'Dépenses', href: '/depenses', icon: Wallet, group: 'Exécution budgétaire' },
  { label: 'Trésorerie', href: '/tresorerie', icon: Landmark, group: 'Exécution budgétaire' },
  { label: 'Dette publique', href: '/dette-publique', icon: FileBarChart2, group: 'Exécution budgétaire' },
  { label: 'Investissements Publics', href: '/investissements-publics', icon: Building2, group: 'Exécution budgétaire' },
  { label: 'Exécution par Ministère', href: '/execution-par-ministere', icon: Layers, group: 'Analyses' },
  { label: 'Provinces', href: '/provinces', icon: Map, group: 'Analyses' },
  { label: 'Indicateurs Macroéconomiques', href: '/indicateurs-macroeconomiques', icon: LineChart, group: 'Analyses' },
  { label: 'Suivi des réformes', href: '/suivi-des-reformes', icon: ClipboardCheck, group: 'Pilotage & contrôle' },
  { label: 'Tableau ESB', href: '/tableau-esb', icon: ListChecks, group: 'Pilotage & contrôle' },
  { label: 'Alertes & Risques', href: '/alertes-et-risques', icon: AlertTriangle, group: 'Pilotage & contrôle' },
  { label: 'Processus budgétaire', href: '/processus-budgetaire', icon: Workflow, group: 'Ressources' },
  { label: 'Rapports', href: '/rapports', icon: FileText, group: 'Ressources' },
  { label: 'Documentation', href: '/documentation', icon: BookOpen, group: 'Ressources' },
] as const

export type NavLabel = (typeof nav)[number]['label']

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5 py-5',
        collapsed && 'justify-center px-0',
      )}
    >
      <Image
        src="/logo-ministere-budget.png"
        alt="Logo du Ministère du Budget de la République Démocratique du Congo"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 object-contain"
      />
      {!collapsed && (
        <div className="leading-tight">
          <p className="text-[11px] font-bold text-brand-navy">
            RÉPUBLIQUE DÉMOCRATIQUE DU CONGO
          </p>
          <p className="text-[10px] font-semibold text-muted-foreground">
            MINISTÈRE DU BUDGET
          </p>
          <p className="mt-0.5 text-[9px] italic text-muted-foreground">
            Le Budget au service du Développement
          </p>
        </div>
      )}
    </div>
  )
}

function NavList({
  active,
  onSelect,
  collapsed,
}: {
  active: NavLabel
  onSelect: (label: NavLabel) => void
  collapsed?: boolean
}) {
  const groups = ['Synthèse', 'Exécution budgétaire', 'Analyses', 'Pilotage & contrôle', 'Ressources'] as const

  return (
    <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-2">
      {groups.map((group, groupIndex) => (
        <div
          key={group}
          className={cn(groupIndex > 0 && (collapsed ? 'mt-2 border-t border-sidebar-border pt-2' : 'mt-3'))}
        >
          {!collapsed && (
            <p className="mb-1 px-3 text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70">
              {group}
            </p>
          )}
          <div className="space-y-0.5">
            {nav.filter((item) => item.group === group).map(({ label, href, icon: Icon }) => {
              const isActive = active === label
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => onSelect(label)}
                  title={collapsed ? label : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-md px-3 py-2 text-left text-[12px] font-medium transition-colors',
                    collapsed && 'justify-center px-0 py-2.5',
                    isActive
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent/60',
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span className="leading-tight">{label}</span>}
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </nav>
  )
}

function Footer() {
  return (
    <div className="border-t border-sidebar-border px-5 py-4 text-[10px] text-muted-foreground">
      <p className="font-semibold text-foreground">Dernière mise à jour</p>
      <p>31/05/2024 08:00</p>
      <p className="mt-2">Source : SIGF, DGTCP, BCC, MEF</p>
    </div>
  )
}

export function Sidebar({
  active,
  onSelect,
  mobileOpen,
  onMobileClose,
}: {
  active: NavLabel
  onSelect: (label: NavLabel) => void
  mobileOpen: boolean
  onMobileClose: () => void
}) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          'hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex',
          collapsed ? 'w-16' : 'w-64',
        )}
      >
        <Brand collapsed={collapsed} />

        <div className={cn('px-3 pb-1', collapsed && 'flex justify-center px-0')}>
          <button
            type="button"
            onClick={() => setCollapsed((v) => !v)}
            aria-label={
              collapsed ? 'Déployer la barre latérale' : 'Réduire la barre latérale'
            }
            title={collapsed ? 'Déployer' : 'Réduire'}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
        </div>

        <NavList active={active} onSelect={onSelect} collapsed={collapsed} />
        {!collapsed && <Footer />}
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden',
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={onMobileClose}
          className={cn(
            'absolute inset-0 bg-foreground/40 transition-opacity duration-200',
            mobileOpen ? 'opacity-100' : 'opacity-0',
          )}
        />
        <aside
          className={cn(
            'absolute left-0 top-0 flex h-full w-72 max-w-[80%] flex-col border-r border-sidebar-border bg-sidebar shadow-xl transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <div className="flex items-start justify-between">
            <Brand />
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="Fermer le menu"
              className="m-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <NavList active={active} onSelect={onSelect} />
          <Footer />
        </aside>
      </div>
    </>
  )
}
