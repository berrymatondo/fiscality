'use client'

import { useState } from 'react'
import {
  BarChart3,
  Building2,
  Check,
  FileSpreadsheet,
  FileText,
  Globe2,
  HandCoins,
  Landmark,
  LoaderCircle,
  PieChart,
  Sparkles,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { CountUp } from '@/components/dashboard/count-up'
import { generateReportPdf, reportCatalog, type ReportId, type ReportMeta } from '@/lib/reports'
import { downloadReportExcel } from '@/lib/reports-excel'
import { toastManager } from '@/lib/toast-manager'
import { cn } from '@/lib/utils'

const icons: Record<ReportId, LucideIcon> = {
  execution: BarChart3,
  recettes: HandCoins,
  depenses: Wallet,
  dette: Landmark,
  macro: Globe2,
  reformes: Building2,
}

const rateTone = (value: number) =>
  value < 30 ? 'bg-red-500' : value < 60 ? 'bg-amber-500' : value > 100 ? 'bg-violet-500' : 'bg-emerald-500'

function useDownloads() {
  const [pending, setPending] = useState<{ id: ReportId; kind: 'pdf' | 'excel' } | null>(null)
  const run = async (id: ReportId, kind: 'pdf' | 'excel') => {
    setPending({ id, kind })
    try {
      await (kind === 'pdf' ? generateReportPdf(id) : downloadReportExcel(id))
    } catch (error) {
      toastManager.add({
        type: 'error',
        title: 'Échec de la génération',
        description: error instanceof Error ? error.message : 'Une erreur est survenue.',
      })
    } finally {
      setPending(null)
    }
  }
  return { pending, run }
}

type DownloadState = { pdf: boolean; excel: boolean }

function PreviewBars({ report }: { report: ReportMeta }) {
  return (
    <div className="space-y-1.5">
      {report.preview.map((item) => (
        <div key={item.label} className="grid grid-cols-[84px_1fr_42px] items-center gap-2 text-[10px]">
          <span className="truncate text-muted-foreground">{item.label}</span>
          <span className="h-1.5 overflow-hidden rounded-full bg-muted">
            <span className={cn('block h-full rounded-full', rateTone(item.value))} style={{ width: `${Math.min(item.value, 100)}%` }} />
          </span>
          <span className="text-right font-bold tabular-nums text-foreground">
            {item.value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%
          </span>
        </div>
      ))}
    </div>
  )
}

function DownloadButtons({ report, pending, onPdf, onExcel }: { report: ReportMeta; pending: DownloadState; onPdf: () => void; onExcel: () => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onPdf}
        disabled={pending.pdf}
        style={{ backgroundColor: report.color }}
        className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-[12px] font-bold text-white shadow-sm transition hover:brightness-110 disabled:opacity-60"
      >
        {pending.pdf ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
        {pending.pdf ? 'Génération…' : 'Télécharger le PDF'}
      </button>
      <button
        type="button"
        onClick={onExcel}
        disabled={pending.excel}
        title="Télécharger le classeur Excel du rapport"
        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/40 bg-emerald-600/10 px-3 py-2 text-[12px] font-semibold text-emerald-700 transition-colors hover:bg-emerald-600/20 disabled:opacity-60 dark:text-emerald-300"
      >
        {pending.excel ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <FileSpreadsheet className="h-4 w-4" />}
        Excel
      </button>
    </div>
  )
}

function FeaturedReport({ report, pending, onPdf, onExcel }: { report: ReportMeta; pending: DownloadState; onPdf: () => void; onExcel: () => void }) {
  const Icon = icons[report.id]
  return (
    <Card className="overflow-hidden p-0">
      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4 p-6">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              <Sparkles className="h-3 w-3" /> Rapport phare
            </span>
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-semibold text-muted-foreground">{report.period}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md" style={{ backgroundColor: report.color }}>
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-lg font-black tracking-tight text-foreground">{report.title}</h3>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{report.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {report.highlights.map((h) => (
              <div key={h.label} className="rounded-lg border border-border bg-background/60 p-3">
                <p className="text-[9px] font-semibold uppercase text-muted-foreground">{h.label}</p>
                <p className="mt-1 text-[14px] font-extrabold tabular-nums text-foreground">{h.value}</p>
              </div>
            ))}
          </div>
          <DownloadButtons report={report} pending={pending} onPdf={onPdf} onExcel={onExcel} />
        </div>
        <div className="relative overflow-hidden p-6 text-white" style={{ background: `linear-gradient(135deg, #0f2345, ${report.color})` }}>
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 right-12 h-32 w-32 rounded-full bg-white/5" />
          <p className="relative text-[10px] font-bold uppercase tracking-[.18em] text-white/70">Au sommaire</p>
          <ul className="relative mt-3 space-y-2">
            {report.contents.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[12px] font-medium">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                  <Check className="h-3 w-3" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="relative mt-5 rounded-xl bg-white/10 p-3 backdrop-blur">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-white/70">Taux de réalisation</p>
            <div className="flex h-20 items-end gap-3">
              {report.preview.map((item) => (
                <div key={item.label} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-bold">{item.value.toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%</span>
                  <span className="w-full rounded-t-md bg-white/80" style={{ height: `${Math.max(4, Math.min(item.value, 100) * 0.5)}px` }} />
                  <span className="truncate text-[9px] text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

function ReportCard({ report, pending, onPdf, onExcel }: { report: ReportMeta; pending: DownloadState; onPdf: () => void; onExcel: () => void }) {
  const Icon = icons[report.id]
  return (
    <Card className="group relative flex flex-col overflow-hidden p-0 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${report.color}, ${report.color}55)` }} />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
            style={{ backgroundColor: `${report.color}1a`, color: report.color }}
          >
            <Icon className="h-5 w-5" />
          </span>
          <span className="rounded-full px-2.5 py-1 text-[10px] font-bold" style={{ backgroundColor: `${report.color}14`, color: report.color }}>
            {report.period}
          </span>
        </div>
        <div>
          <h3 className="text-[15px] font-black tracking-tight text-foreground">{report.title}</h3>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{report.description}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 border-y border-border py-3">
          {report.highlights.map((h) => (
            <div key={h.label}>
              <p className="text-[9px] uppercase text-muted-foreground">{h.label}</p>
              <p className="mt-0.5 text-[12px] font-extrabold tabular-nums text-foreground">{h.value}</p>
            </div>
          ))}
        </div>
        <PreviewBars report={report} />
        <div className="flex flex-wrap gap-1.5">
          {report.contents.map((item) => (
            <span key={item} className="rounded-md bg-muted px-2 py-0.5 text-[9px] font-medium text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
        <div className="mt-auto">
          <DownloadButtons report={report} pending={pending} onPdf={onPdf} onExcel={onExcel} />
        </div>
      </div>
    </Card>
  )
}

export function ReportsView() {
  const { pending, run } = useDownloads()
  const stateOf = (id: ReportId): DownloadState => ({ pdf: pending?.id === id && pending.kind === 'pdf', excel: pending?.id === id && pending.kind === 'excel' })
  const [featured, ...others] = reportCatalog

  return (
    <>
      <section className="animate-fade-up relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-900 px-6 py-7 text-white shadow-lg md:px-8">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 flex h-1">
          <span className="flex-[6] bg-sky-500" />
          <span className="flex-[1.2] bg-yellow-400" />
          <span className="flex-[2.8] bg-red-600" />
        </div>
        <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em]">
              <FileText className="h-3.5 w-3.5 text-blue-200" /> Publications
            </div>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">Rapports et publications budgétaires</h2>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-blue-100/80">
              Rapports illustrés prêts à diffuser : indicateurs clés, graphiques, tableaux détaillés et analyses, issus du rapport d&apos;exécution du budget du pouvoir central au premier semestre 2026.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: String(reportCatalog.length), label: 'rapports' },
              { value: '30+', label: 'graphiques' },
              { value: 'S1 2026', label: 'période' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 text-center backdrop-blur">
                <p className="text-2xl font-black text-blue-100">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-[10px] uppercase tracking-wider text-blue-100/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="animate-fade-up" style={{ animationDelay: '80ms' }}>
        <FeaturedReport report={featured} pending={stateOf(featured.id)} onPdf={() => run(featured.id, 'pdf')} onExcel={() => run(featured.id, 'excel')} />
      </div>

      <div className="animate-fade-up grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" style={{ animationDelay: '160ms' }}>
        {others.map((report) => (
          <ReportCard key={report.id} report={report} pending={stateOf(report.id)} onPdf={() => run(report.id, 'pdf')} onExcel={() => run(report.id, 'excel')} />
        ))}
      </div>

      <div className="animate-fade-up flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-[11px] text-muted-foreground" style={{ animationDelay: '240ms' }}>
        <PieChart className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p>
          Les PDF sont générés dans le navigateur au format A4 (en-tête aux couleurs nationales, indicateurs, graphiques, tableaux paginés et pied de page numéroté). Le bouton Excel fournit un classeur mis en forme (aperçu, tableaux détaillés, barres de données et notes), avec les montants en milliards de FC. Source : Ministère du Budget, Document n°3 — Rapport d&apos;exécution du budget du pouvoir central au premier semestre 2026.
        </p>
      </div>
    </>
  )
}
