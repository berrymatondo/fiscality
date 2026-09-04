import Link from "next/link";
import { Filter, RotateCcw } from "lucide-react";
import { STATUT_LABELS } from "@/components/dashboard/saisie/shared";
import type { StatutSaisie } from "@/lib/generated/prisma/client";

export type SaisieFilterValues = {
  statut?: StatutSaisie;
  periode?: string;
};

const STATUTS = ["BROUILLON", "SOUMIS", "VALIDE", "PUBLIE", "OP_SOUMIS", "PAYE"] as const;

export function SaisieFilters({ values }: { values: SaisieFilterValues }) {
  return (
    <form method="get" className="flex flex-wrap items-end gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="mr-1 flex h-9 items-center gap-2 text-sm font-semibold text-foreground">
        <Filter className="h-4 w-4 text-primary" />
        Filtres
      </div>
      <label className="flex min-w-48 flex-1 flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">Statut</span>
        <select name="statut" defaultValue={values.statut ?? ""} className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
          <option value="">Tous les statuts</option>
          {STATUTS.map((statut) => <option key={statut} value={statut}>{STATUT_LABELS[statut]}</option>)}
        </select>
      </label>
      <label className="flex min-w-44 flex-1 flex-col gap-1.5">
        <span className="text-xs font-medium text-muted-foreground">Période</span>
        <input name="periode" type="month" defaultValue={values.periode ?? ""} className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
      </label>
      <button type="submit" className="h-9 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Appliquer</button>
      <Link href="/saisie" className="flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-foreground">
        <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
      </Link>
    </form>
  );
}
