"use client";

import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatutBadge } from "@/components/dashboard/saisie/shared";
import { DownloadRapportButton } from "@/components/dashboard/saisie/download-rapport-button";
import {
  NEXT_STATUT,
  TRANSITION_LABELS,
  REVERT_LABEL,
  REVERT_SOUMIS_LABEL,
  canRevertToBrouillon,
  canRevertToSoumis,
} from "@/lib/workflow";
import type { QueueRow } from "@/components/dashboard/saisie/queue-row";

type SortKey = "domainLabel" | "reference" | "libelle" | "periode" | "montant" | "statut";
type SortDir = "asc" | "desc";

function SortableHeader({
  label,
  sortKey,
  currentKey,
  currentDir,
  onSort,
  align,
}: {
  label: string;
  sortKey: SortKey;
  currentKey: SortKey;
  currentDir: SortDir;
  onSort: (key: SortKey) => void;
  align?: "right";
}) {
  const active = sortKey === currentKey;
  const Icon = active ? (currentDir === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
  return (
    <button
      type="button"
      onClick={() => onSort(sortKey)}
      className={`inline-flex items-center gap-1 font-semibold hover:text-foreground ${align === "right" ? "flex-row-reverse" : ""}`}
    >
      {label}
      <Icon className={`size-3 ${active ? "" : "opacity-40"}`} />
    </button>
  );
}

export function SaisiesTable({
  title,
  description,
  emptyMessage,
  rows,
  actionable,
}: {
  title: string;
  description: string;
  emptyMessage: string;
  rows: QueueRow[];
  actionable: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("periode");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sortedRows = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortKey === "montant") {
        cmp = (a.montantValue ?? -Infinity) - (b.montantValue ?? -Infinity);
      } else {
        cmp = a[sortKey].localeCompare(b[sortKey]);
      }
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const headerProps = { currentKey: sortKey, currentDir: sortDir, onSort: handleSort };

  return (
    <Card>
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-xs">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0 pb-0 pt-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2">
                  <SortableHeader label="Domaine" sortKey="domainLabel" {...headerProps} />
                </th>
                <th className="px-3 py-2">
                  <SortableHeader label="Référence" sortKey="reference" {...headerProps} />
                </th>
                <th className="px-3 py-2">
                  <SortableHeader label="Entité" sortKey="libelle" {...headerProps} />
                </th>
                <th className="px-3 py-2">
                  <SortableHeader label="Période" sortKey="periode" {...headerProps} />
                </th>
                <th className="px-3 py-2 text-right">
                  <SortableHeader label="Montant" sortKey="montant" align="right" {...headerProps} />
                </th>
                <th className="px-3 py-2">
                  <SortableHeader label="Statut" sortKey="statut" {...headerProps} />
                </th>
                <th className="px-3 py-2 font-semibold">Actions</th>
                <th className="px-3 py-2 font-semibold">Rapport</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-muted-foreground">
                    {emptyMessage}
                  </td>
                </tr>
              )}
              {sortedRows.map((row) => (
                <tr key={`${row.domain}-${row.id}`} className="border-b border-border last:border-0">
                  <td className="px-5 py-3 font-medium text-foreground">{row.domainLabel}</td>
                  <td className="px-3 py-3 font-medium text-foreground">{row.reference}</td>
                  <td className="px-3 py-3 text-muted-foreground">{row.libelle}</td>
                  <td className="px-3 py-3">{row.periode}</td>
                  <td className="px-3 py-3 text-right font-medium text-foreground tabular-nums">{row.montant}</td>
                  <td className="px-3 py-3">
                    <StatutBadge statut={row.statut} />
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-3">
                      <a href={row.editHref} className="text-xs font-medium text-primary hover:underline">
                        Consulter
                      </a>
                      {actionable && NEXT_STATUT[row.statut] && (
                        <form action={row.transitionAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <button
                            type="submit"
                            className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400"
                          >
                            {TRANSITION_LABELS[row.statut]}
                          </button>
                        </form>
                      )}
                      {actionable && canRevertToBrouillon(row.statut) && (
                        <form action={row.revertAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <button type="submit" className="text-xs font-medium text-amber-700 hover:underline dark:text-amber-400">
                            {REVERT_LABEL}
                          </button>
                        </form>
                      )}
                      {actionable && canRevertToSoumis(row.statut) && (
                        <form action={row.revertSoumisAction}>
                          <input type="hidden" name="id" value={row.id} />
                          <button type="submit" className="text-xs font-medium text-amber-700 hover:underline dark:text-amber-400">
                            {REVERT_SOUMIS_LABEL}
                          </button>
                        </form>
                      )}
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    <DownloadRapportButton id={row.id} getRapportAction={row.rapportAction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
