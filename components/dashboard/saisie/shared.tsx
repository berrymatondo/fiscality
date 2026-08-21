import {
  Hash,
  Building2,
  Tag,
  FileText,
  Banknote,
  Percent,
  FileEdit,
  Send,
  CheckCircle2,
  Megaphone,
  Landmark,
  Wallet,
  Trash2,
  Sparkles,
  Clock,
  ClipboardList,
  History,
} from "lucide-react";

export const STATUT_LABELS: Record<string, string> = {
  BROUILLON: "Brouillon",
  SOUMIS: "Soumis",
  VALIDE: "Validé",
  PUBLIE: "Publié",
  OP_SOUMIS: "Ordre de paiement soumis",
  PAYE: "Payé",
};

export const STATUT_STYLES: Record<string, string> = {
  BROUILLON: "bg-muted text-muted-foreground",
  SOUMIS: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  VALIDE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  PUBLIE: "bg-primary/15 text-primary",
  OP_SOUMIS: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  PAYE: "bg-emerald-600/20 text-emerald-800 dark:text-emerald-300",
};

const STATUT_DOT_STYLES: Record<string, string> = {
  BROUILLON: "bg-muted-foreground/60",
  SOUMIS: "bg-amber-500",
  VALIDE: "bg-emerald-500",
  PUBLIE: "bg-primary",
  OP_SOUMIS: "bg-sky-500",
  PAYE: "bg-emerald-600",
};

const STATUT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  BROUILLON: FileEdit,
  SOUMIS: Send,
  VALIDE: CheckCircle2,
  PUBLIE: Megaphone,
  OP_SOUMIS: Landmark,
  PAYE: Wallet,
};

export function StatutBadge({ statut }: { statut: string }) {
  const Icon = STATUT_ICONS[statut] ?? Clock;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${STATUT_STYLES[statut] ?? STATUT_STYLES.BROUILLON}`}
    >
      <Icon className="size-3.5" />
      {STATUT_LABELS[statut] ?? statut}
    </span>
  );
}

export function formatMontant(value: unknown, suffix = " CDF") {
  if (value === null || value === undefined) return "—";
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString("fr-FR") + suffix : "—";
}

export function currentPeriode() {
  return new Date().toISOString().slice(0, 7);
}

const SECTION_TONE_STYLES: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  history: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  files: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

export function SectionTitle({
  icon: Icon,
  tone = "primary",
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "history" | "files";
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`flex size-5 items-center justify-center rounded-md ${SECTION_TONE_STYLES[tone]}`}>
        <Icon className="size-3" />
      </span>
      {children}
    </span>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export type FieldTone = "id" | "entity" | "meta" | "money" | "percent" | "text";

const FIELD_TONE_STYLES: Record<FieldTone, { icon: React.ComponentType<{ className?: string }>; className: string }> = {
  id: { icon: Hash, className: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  entity: { icon: Building2, className: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  meta: { icon: Tag, className: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  money: { icon: Banknote, className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  percent: { icon: Percent, className: "bg-sky-500/10 text-sky-600 dark:text-sky-400" },
  text: { icon: FileText, className: "bg-rose-500/10 text-rose-600 dark:text-rose-400" },
};

export function ReadOnlyField({ label, value, tone = "text" }: { label: string; value: React.ReactNode; tone?: FieldTone }) {
  const { icon: Icon, className } = FIELD_TONE_STYLES[tone];
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-card/50 px-3 py-2.5">
      <span className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md ${className}`}>
        <Icon className="size-3.5" />
      </span>
      <div className="flex flex-col gap-0.5">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-sm font-semibold text-foreground">{value}</span>
      </div>
    </div>
  );
}

type HistoriqueEntry = {
  id: string;
  action: string;
  statutAvant: string | null;
  statutApres: string | null;
  auteur: string;
  auteurEmail: string;
  createdAt: Date;
};

export function HistoriqueTimeline({ historique }: { historique: HistoriqueEntry[] }) {
  if (historique.length === 0) {
    return <p className="text-sm text-muted-foreground">Aucun évènement enregistré pour le moment.</p>;
  }

  return (
    <ol className="flex flex-col gap-3">
      {historique.map((h) => {
        const isSuppression = /suppression/i.test(h.action);
        const isCreation = /création/i.test(h.action);
        const dotClass = isSuppression
          ? "bg-rose-500"
          : isCreation
            ? "bg-sky-500"
            : (h.statutApres && STATUT_DOT_STYLES[h.statutApres]) || "bg-muted-foreground/60";
        const Icon = isSuppression ? Trash2 : isCreation ? Sparkles : h.statutApres ? (STATUT_ICONS[h.statutApres] ?? Clock) : Clock;
        const iconWrapClass = isSuppression
          ? "bg-rose-500/10 text-rose-600 dark:text-rose-400"
          : isCreation
            ? "bg-sky-500/10 text-sky-600 dark:text-sky-400"
            : (h.statutApres && STATUT_STYLES[h.statutApres]) || "bg-muted text-muted-foreground";

        return (
          <li key={h.id} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card/50 px-3 py-2.5">
            <span className={`relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full ${iconWrapClass}`}>
              <Icon className="size-3.5" />
            </span>
            <div className="flex flex-1 flex-col gap-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{h.action}</p>
                <span className={`inline-block size-1.5 rounded-full ${dotClass}`} />
              </div>
              <p className="text-xs text-muted-foreground">
                {h.auteur} ({h.auteurEmail}) — {h.createdAt.toLocaleString("fr-FR")}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
