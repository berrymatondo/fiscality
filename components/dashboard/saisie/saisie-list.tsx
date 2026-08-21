import Link from "next/link";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StatutBadge } from "@/components/dashboard/saisie/shared";
import { ConfirmDeleteForm } from "@/components/dashboard/saisie/row-actions";
import { DownloadRapportButton } from "@/components/dashboard/saisie/download-rapport-button";
import type { RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";
import { TRANSITION_LABELS, NEXT_STATUT, isEditable } from "@/lib/workflow";
import type { StatutSaisie } from "@/lib/generated/prisma/client";

export function SaisieList<T extends { id: string; reference: string; periode: string; statut: StatutSaisie }>({
  title,
  description,
  createHref,
  editHrefBase,
  rows,
  columns,
  canAct,
  canDelete,
  transitionAction,
  deleteAction,
  getRapportAction,
}: {
  title: string;
  description?: string;
  createHref: string;
  editHrefBase: string;
  rows: T[];
  columns: { label: string; render: (row: T) => React.ReactNode }[];
  canAct: (statut: StatutSaisie) => boolean;
  canDelete: (row: T) => boolean;
  transitionAction: (formData: FormData) => void;
  deleteAction: (formData: FormData) => void;
  getRapportAction: (id: string) => Promise<RapportData | null>;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between gap-4 px-5 pt-5">
        <div>
          <CardTitle className="text-xs">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Link
          href={createHref}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" />
          Nouvelle saisie
        </Link>
      </CardHeader>
      <CardContent className="px-0 pb-0 pt-2">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2 font-semibold">Référence</th>
                <th className="px-3 py-2 font-semibold">Période</th>
                {columns.map((col) => (
                  <th key={col.label} className="px-3 py-2 font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="px-3 py-2 font-semibold">Statut</th>
                <th className="px-3 py-2 font-semibold">Actions</th>
                <th className="px-3 py-2 font-semibold">Rapport</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 5} className="px-5 py-8 text-center text-muted-foreground">
                    Aucune saisie enregistrée.{" "}
                    <Link href={createHref} className="font-medium text-primary hover:underline">
                      Créer la première saisie
                    </Link>
                  </td>
                </tr>
              )}
              {rows.map((row) => {
                const next = NEXT_STATUT[row.statut];
                const showTransition = next !== null && canAct(row.statut);
                return (
                  <tr key={row.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-medium text-foreground">{row.reference}</td>
                    <td className="px-3 py-3">{row.periode}</td>
                    {columns.map((col) => (
                      <td key={col.label} className="px-3 py-3">
                        {col.render(row)}
                      </td>
                    ))}
                    <td className="px-3 py-3">
                      <StatutBadge statut={row.statut} />
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`${editHrefBase}/${row.id}`}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          {isEditable(row.statut) ? "Modifier" : "Consulter"}
                        </Link>
                        {showTransition && (
                          <form action={transitionAction}>
                            <input type="hidden" name="id" value={row.id} />
                            <button type="submit" className="text-xs font-medium text-emerald-700 hover:underline dark:text-emerald-400">
                              {TRANSITION_LABELS[row.statut]}
                            </button>
                          </form>
                        )}
                        {canDelete(row) && (
                          <ConfirmDeleteForm
                            id={row.id}
                            deleteAction={deleteAction}
                            message="Supprimer cette saisie ? Cette action est irréversible."
                          />
                        )}
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <DownloadRapportButton id={row.id} getRapportAction={getRapportAction} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
