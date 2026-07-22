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
  AlertTriangle,
  FileText,
  BookOpen,
  ScrollText,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export const nav = [
  { label: "Vue d'ensemble", icon: LayoutDashboard },
  { label: 'Recettes', icon: HandCoins },
  { label: 'Dépenses', icon: Wallet },
  { label: 'Trésorerie', icon: Landmark },
  { label: 'Dette publique', icon: FileBarChart2 },
  { label: 'Investissements Publics', icon: Building2 },
  { label: 'Exécution par Ministère', icon: Layers },
  { label: 'Provinces', icon: Map },
  { label: 'Indicateurs Macroéconomiques', icon: LineChart },
  { label: 'Suivi des réformes', icon: ClipboardCheck },
  { label: 'Alertes & Risques', icon: AlertTriangle },
  { label: 'Rapports', icon: FileText },
  { label: 'Schéma Directeur', icon: ScrollText },
  { label: 'Documentation', icon: BookOpen },
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
      <img
        src="/logo-ministere-budget.png"
        alt="Logo du Ministère du Budget de la République Démocratique du Congo"
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
  return (
    <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-2">
      {nav.map(({ label, icon: Icon }) => {
        const isActive = active === label
        return (
          <button
            key={label}
            onClick={() => onSelect(label)}
            title={collapsed ? label : undefined}
            className={cn(
              'flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] font-medium transition-colors',
              collapsed && 'justify-center px-0',
              isActive
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent/60',
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {!collapsed && <span className="leading-tight">{label}</span>}
          </button>
        )
      })}
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
