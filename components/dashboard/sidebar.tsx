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
  ChevronDown,
  BarChart3,
  Library,
  ShieldCheck,
  PenLine,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Settings,
  SlidersHorizontal,
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useSession } from '@/lib/auth-client'
import { SAISIE_HREF_BY_ROLE, saisieNavLabel, type Role } from '@/lib/roles'

export const nav = [
  { label: "Vue d'ensemble", href: '/', icon: LayoutDashboard, group: 'Synthèse' },
  { label: 'Recettes', href: '/recettes', icon: HandCoins, group: 'Exécution budgétaire' },
  { label: 'Dépenses', href: '/depenses', icon: Wallet, group: 'Exécution budgétaire' },
  { label: 'Trésorerie', href: '/tresorerie', icon: Landmark, group: 'Exécution budgétaire' },
  { label: 'Dette publique', href: '/dette-publique', icon: FileBarChart2, group: 'Exécution budgétaire' },
  { label: 'Investissements Publics', href: '/investissements-publics', icon: Building2, group: 'Exécution budgétaire' },
  { label: 'Exécution par Ministère', href: '/execution-par-ministere', icon: Layers, group: 'Analyses' },
  { label: 'Exécution par province', href: '/provinces', icon: Map, group: 'Analyses' },
  { label: 'Indicateurs Macroéconomiques', href: '/indicateurs-macroeconomiques', icon: LineChart, group: 'Analyses' },
  { label: 'Analyses', href: '/analyses', icon: BarChart3, group: 'Analyses' },
  { label: 'Suivi des réformes', href: '/suivi-des-reformes', icon: ClipboardCheck, group: 'Pilotage & contrôle' },
  { label: 'Suivi de l’exécution (ESB)', href: '/tableau-esb', icon: ListChecks, group: 'Pilotage & contrôle' },
  { label: 'Alertes & Risques', href: '/alertes-et-risques', icon: AlertTriangle, group: 'Pilotage & contrôle' },
  { label: 'Processus budgétaire', href: '/processus-budgetaire', icon: Workflow, group: 'Ressources' },
  { label: 'Rapports', href: '/rapports', icon: FileText, group: 'Ressources' },
  { label: 'Documentation', href: '/documentation', icon: BookOpen, group: 'Ressources' },
  { label: 'Paramètres', href: '/parametres', icon: Settings, group: 'Configuration' },
] as const

export type NavLabel = (typeof nav)[number]['label'] | 'Paramètres'

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
          <p className="text-[11px] font-bold text-brand-navy dark:text-slate-50">
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
  active: NavLabel | undefined
  onSelect: (label: NavLabel) => void
  collapsed?: boolean
}) {
  const sections = [
    { key: 'overview', label: "Vue d'ensemble", icon: LayoutDashboard, href: '/', children: [] },
    { key: 'execution', label: 'Exécution budgétaire', icon: Wallet, href: '/depenses', children: ['Recettes', 'Dépenses', 'Exécution par Ministère', 'Exécution par province', 'Investissements Publics'] },
    { key: 'finances', label: 'Finances publiques', icon: Landmark, href: '/tresorerie', children: ['Trésorerie', 'Dette publique', 'Indicateurs Macroéconomiques'] },
    { key: 'analyses', label: 'Analyses', icon: BarChart3, href: '/analyses', children: ['Analyses'] },
    { key: 'pilotage', label: 'Pilotage & contrôle', icon: ShieldCheck, href: '/suivi-des-reformes', children: ['Suivi des réformes', 'Suivi de l’exécution (ESB)', 'Alertes & Risques'] },
    { key: 'resources', label: 'Rapports & ressources', icon: Library, href: '/rapports', children: ['Rapports', 'Processus budgétaire', 'Documentation'] },
    { key: 'settings', label: 'Paramètres', icon: Settings, href: '/parametres', children: [] },
  ] as const
  const activeSection = sections.find((section) => section.children.some((label) => label === active))?.key
  const [openGroup, setOpenGroup] = useState<string | null>(activeSection || null)

  return (
    <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-2">
      {sections.map((section) => {
        const Icon = section.icon
        const direct = section.children.length === 0 || collapsed || section.key === 'analyses'
        const expanded = openGroup === section.key
        const sectionActive = active === section.label || section.children.some((label) => label === active)
        return <div key={section.key} className="mb-1">
          {direct ? <Link href={section.href} onClick={() => onSelect(section.label as NavLabel)} title={collapsed ? section.label : undefined} className={cn('flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold transition-colors',collapsed&&'justify-center px-0',sectionActive?'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm':'text-sidebar-foreground hover:bg-sidebar-accent/60')}><Icon className="h-4 w-4 shrink-0"/>{!collapsed&&<span className="flex-1">{section.label}</span>}</Link> : <button type="button" onClick={() => setOpenGroup(expanded ? null : section.key)} className={cn('flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left text-[13px] font-semibold transition-colors',sectionActive?'text-sidebar-accent-foreground':'text-sidebar-foreground hover:bg-sidebar-accent/60')}><Icon className="h-4 w-4 shrink-0"/><span className="flex-1">{section.label}</span><ChevronDown className={cn('h-3.5 w-3.5 transition-transform',expanded&&'rotate-180')}/></button>}
          {!collapsed && !direct && expanded && <div className="ml-5 mt-1 space-y-0.5 border-l border-sidebar-border pl-2">{section.children.map((childLabel) => {const item=nav.find((entry)=>entry.label===childLabel)!;const ChildIcon=item.icon;const isActive=active===item.label;return <Link key={item.label} href={item.href} onClick={()=>onSelect(item.label)} className={cn('flex items-center gap-2.5 rounded-md px-3 py-2 text-[11px] font-medium transition-colors',isActive?'bg-sidebar-accent text-sidebar-accent-foreground':'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground')}><ChildIcon className="h-3.5 w-3.5 shrink-0"/><span>{item.label}</span></Link>})}</div>}
        </div>
      })}
    </nav>
  )
}

function AccountNav({ collapsed }: { collapsed?: boolean }) {
  const { data: session } = useSession()
  const [configOpen, setConfigOpen] = useState(false)
  if (!session) return null

  const role = session.user.role as Role
  const isAdmin = role === 'SUPER_ADMIN' || role === 'ADMIN_DGB'
  const isSuperAdmin = role === 'SUPER_ADMIN'
  const isMinistereFocal = role === 'MINISTERE_FOCAL'
  const saisieHref = SAISIE_HREF_BY_ROLE[role] ?? null
  const saisieLabel = saisieNavLabel(role)

  if (!isAdmin && !saisieHref) return null

  return (
    <div
      className={cn(
        'flex flex-col gap-1 border-t border-sidebar-border px-3 pb-2 pt-2',
        collapsed && 'items-center px-0',
      )}
    >
      {saisieHref && (
        <Link
          href={saisieHref}
          title={collapsed ? saisieLabel : undefined}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60',
            collapsed && 'justify-center px-0',
          )}
        >
          <PenLine className="h-4 w-4 shrink-0" />
          {!collapsed && <span>{saisieLabel}</span>}
        </Link>
      )}
      {isAdmin && (
        <Link
          href="/admin/users"
          title={collapsed ? 'Administration des comptes' : undefined}
          className={cn(
            'flex items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60',
            collapsed && 'justify-center px-0',
          )}
        >
          <ShieldCheck className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Administration des comptes</span>}
        </Link>
      )}
      {isSuperAdmin && (
        <div>
          <button
            type="button"
            onClick={() => setConfigOpen((v) => !v)}
            title={collapsed ? 'Configuration' : undefined}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60',
              collapsed && 'justify-center px-0',
            )}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Configuration</span>
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', configOpen && 'rotate-180')} />
              </>
            )}
          </button>
          {!collapsed && configOpen && (
            <div className="ml-5 mt-1 space-y-0.5 border-l border-sidebar-border pl-2">
              <Link
                href="/admin/ministeres"
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              >
                <Landmark className="h-3.5 w-3.5 shrink-0" />
                <span>Ministères</span>
              </Link>
              <Link
                href="/admin/provinces"
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              >
                <Map className="h-3.5 w-3.5 shrink-0" />
                <span>Provinces</span>
              </Link>
            </div>
          )}
        </div>
      )}
      {isMinistereFocal && (
        <div>
          <button
            type="button"
            onClick={() => setConfigOpen((v) => !v)}
            title={collapsed ? 'Configuration' : undefined}
            className={cn(
              'flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-[13px] font-semibold text-sidebar-foreground transition-colors hover:bg-sidebar-accent/60',
              collapsed && 'justify-center px-0',
            )}
          >
            <SlidersHorizontal className="h-4 w-4 shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Configuration</span>
                <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', configOpen && 'rotate-180')} />
              </>
            )}
          </button>
          {!collapsed && configOpen && (
            <div className="ml-5 mt-1 space-y-0.5 border-l border-sidebar-border pl-2">
              <Link
                href="/ministere/entites"
                className="flex items-center gap-2.5 rounded-md px-3 py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              >
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span>Mes entités</span>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
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
  active: NavLabel | undefined
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
          'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex',
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
        <AccountNav collapsed={collapsed} />
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
          <AccountNav />
          <Footer />
        </aside>
      </div>
    </>
  )
}
