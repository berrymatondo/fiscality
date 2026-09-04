import { ArrowDown, CheckCircle2, CircleDot, FileEdit, Landmark, Send, ShieldCheck, Wallet } from "lucide-react";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";
import type { Role } from "@/lib/roles";
import type { StatutSaisie } from "@/lib/generated/prisma/client";

const STEPS: Array<{
  statut: StatutSaisie;
  label: string;
  description: string;
  acteur: string;
  phase: string;
  icon: typeof FileEdit;
  tone: string;
  dot: string;
}> = [
  { statut: "BROUILLON", label: "Brouillon", description: "Saisie en préparation", acteur: "Point focal", phase: "Phase 1 · Création", icon: FileEdit, tone: "border-slate-400/50 bg-slate-500/5", dot: "bg-slate-500" },
  { statut: "SOUMIS", label: "Soumis", description: "Transmis pour contrôle", acteur: "Point focal", phase: "Phase 2 · Soumission", icon: Send, tone: "border-blue-500/60 bg-blue-500/5", dot: "bg-blue-500" },
  { statut: "VALIDE", label: "Validé", description: "Conformité approuvée", acteur: "DGB", phase: "Phase 3 · Validation", icon: ShieldCheck, tone: "border-emerald-500/60 bg-emerald-500/5", dot: "bg-emerald-500" },
  { statut: "PUBLIE", label: "Publié", description: "Saisie rendue officielle", acteur: "DGB", phase: "Phase 4 · Publication", icon: CheckCircle2, tone: "border-violet-500/60 bg-violet-500/5", dot: "bg-violet-500" },
  { statut: "OP_SOUMIS", label: "Ordre de paiement soumis", description: "Transmis à la Banque Centrale", acteur: "DGF", phase: "Phase 5 · Paiement", icon: Landmark, tone: "border-amber-500/60 bg-amber-500/5", dot: "bg-amber-500" },
  { statut: "PAYE", label: "Payé", description: "Paiement exécuté et clôturé", acteur: "BCC", phase: "Phase 6 · Exécution", icon: Wallet, tone: "border-green-500/60 bg-green-500/5", dot: "bg-green-500" },
];

export default async function CycleDeViePage() {
  const session = await requireSession();
  const statuses = await getVisibleStatuses(session.user.role as Role, session.user.ministereId, session.user.provinceId);
  const counts = Object.fromEntries(STEPS.map(({ statut }) => [statut, statuses.filter((value) => value === statut).length])) as Record<StatutSaisie, number>;
  const total = statuses.length;
  const actifs = total - counts.PAYE;
  const max = Math.max(1, ...Object.values(counts));

  return (
    <UtilityShell eyebrow="Flux opérationnel" title="Cycle de vie des saisies" subtitle="Vue d’ensemble du workflow, de la création jusqu’au paiement.">
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Metric label="Total des saisies" value={total} />
        <Metric label="Pipeline actif" value={actifs} accent="text-blue-600 dark:text-blue-400" />
        <Metric label="Saisies clôturées" value={counts.PAYE} accent="text-emerald-600 dark:text-emerald-400" />
      </section>

      <section className="rounded-xl border border-border bg-card p-4 shadow-sm md:p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Workflow opérationnel</p>
            <h2 className="mt-1 text-lg font-bold text-foreground">Cycle de vie — Saisies budgétaires</h2>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            <Legend color="bg-blue-500" label="Transmission" />
            <Legend color="bg-emerald-500" label="Validation / succès" />
            <Legend color="bg-amber-500" label="Paiement" />
          </div>
        </div>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,.65fr)]">
          <div className="rounded-xl border border-border/70 bg-background/40 p-4 md:p-6">
            <div className="mx-auto flex max-w-xl flex-col items-center">
              {STEPS.map((step, index) => (
                <div key={step.statut} className="flex w-full flex-col items-center">
                  <WorkflowNode step={step} count={counts[step.statut]} />
                  {index < STEPS.length - 1 && (
                    <div className="flex h-12 flex-col items-center justify-center text-muted-foreground">
                      <div className="h-5 w-px bg-border" />
                      <ArrowDown className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border/70 bg-background/40 p-4 md:p-5">
            <div className="mb-5 flex items-center gap-2 border-b border-border pb-3">
              <CircleDot className="h-4 w-4 text-primary" />
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">Répartition par statut</h3>
            </div>
            <div className="space-y-4">
              {STEPS.map((step) => (
                <div key={step.statut}>
                  <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                    <span className="font-medium text-muted-foreground">{step.label}</span>
                    <span className="font-bold text-foreground">{counts[step.statut]}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={`h-full rounded-full ${step.dot} transition-all`} style={{ width: `${(counts[step.statut] / max) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </UtilityShell>
  );
}

function WorkflowNode({ step, count }: { step: (typeof STEPS)[number]; count: number }) {
  const Icon = step.icon;
  return (
    <Link
      href={`/saisie?statut=${step.statut}`}
      aria-label={`Voir les ${count} saisies au statut ${step.label}`}
      className={`relative block w-full rounded-xl border-2 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${step.tone}`}
    >
      <span className="absolute -right-2 -top-2 flex h-8 min-w-8 items-center justify-center rounded-full bg-foreground px-2 text-xs font-bold text-background shadow-md">{count}</span>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary">{step.phase}</p>
      <div className="mt-3 flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background shadow-sm"><Icon className="h-5 w-5" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-2"><h3 className="font-bold text-foreground">{step.label}</h3><span className="text-[11px] font-semibold text-muted-foreground">{step.acteur}</span></div>
          <p className="mt-0.5 text-xs text-muted-foreground">{step.description}</p>
        </div>
      </div>
      <span className="mt-3 inline-flex text-[11px] font-semibold text-primary">Voir les saisies →</span>
    </Link>
  );
}

function Metric({ label, value, accent = "text-foreground" }: { label: string; value: number; accent?: string }) {
  return <div className="rounded-xl border border-border bg-card px-5 py-4 shadow-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p><p className={`mt-1 text-2xl font-extrabold ${accent}`}>{value.toLocaleString("fr-FR")}</p></div>;
}

function Legend({ color, label }: { color: string; label: string }) {
  return <span className="inline-flex items-center gap-2"><span className={`size-2.5 rounded-sm ${color}`} />{label}</span>;
}

async function getVisibleStatuses(role: Role, ministereId?: string | null, provinceId?: string | null): Promise<StatutSaisie[]> {
  const select = { statut: true } as const;
  if (role === "MINISTERE_FOCAL") return ministereId ? (await prisma.ligneBudgetaire.findMany({ where: { ministereId }, select })).map((row) => row.statut) : [];
  if (role === "PROVINCE_FOCAL") return provinceId ? (await prisma.saisieProvince.findMany({ where: { provinceId }, select })).map((row) => row.statut) : [];
  if (role === "TRESOR_DGTCP") return (await prisma.saisieTresor.findMany({ select })).map((row) => row.statut);
  if (role === "DETTE_DGDP") return (await prisma.saisieDette.findMany({ select })).map((row) => row.statut);
  if (role === "REGIE_FINANCIERE") return (await prisma.saisieRecettes.findMany({ select })).map((row) => row.statut);
  if (role === "CELLULE_MACRO") return (await prisma.saisieMacro.findMany({ select })).map((row) => row.statut);

  const rows = await Promise.all([
    prisma.ligneBudgetaire.findMany({ select }),
    prisma.saisieProvince.findMany({ select }),
    prisma.saisieTresor.findMany({ select }),
    prisma.saisieDette.findMany({ select }),
    prisma.saisieRecettes.findMany({ select }),
    prisma.saisieMacro.findMany({ select }),
  ]);
  return rows.flat().map((row) => row.statut);
}
