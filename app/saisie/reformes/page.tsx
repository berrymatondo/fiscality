import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/dashboard/saisie/shared";
import { ConfirmDeleteForm } from "@/components/dashboard/saisie/row-actions";
import { saveReforme, createAlerte, resolveAlerte, deleteReforme, deleteAlerte } from "./actions";

const REFORME_STATUT_LABELS: Record<string, string> = {
  EN_COURS: "En cours",
  REALISE: "Réalisée",
  RETARDE: "Retardée",
};

const REFORME_STATUT_STYLES: Record<string, string> = {
  EN_COURS: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  REALISE: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  RETARDE: "bg-destructive/15 text-destructive",
};

const SEVERITE_LABELS: Record<string, string> = {
  INFO: "Info",
  AVERTISSEMENT: "Avertissement",
  CRITIQUE: "Critique",
};

const SEVERITE_STYLES: Record<string, string> = {
  INFO: "bg-muted text-muted-foreground",
  AVERTISSEMENT: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  CRITIQUE: "bg-destructive/15 text-destructive",
};

export default async function SaisieReformesPage({
  searchParams,
}: {
  searchParams: Promise<{ nom?: string }>;
}) {
  await requireRole(["SUIVI_EVALUATION"]);

  const nomEnEdition = (await searchParams).nom;

  const [reformes, alertes] = await Promise.all([
    prisma.reforme.findMany({ orderBy: { updatedAt: "desc" }, take: 20 }),
    prisma.alerte.findMany({ orderBy: { createdAt: "desc" }, take: 20 }),
  ]);

  const reformeEnEdition = nomEnEdition ? reformes.find((r) => r.nom === nomEnEdition) : undefined;

  return (
    <UtilityShell
      eyebrow="Cellule de Suivi-Évaluation"
      title="Réformes & alertes"
      subtitle="Mettez à jour l'avancement des réformes et signalez les alertes et risques."
    >
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">{reformeEnEdition ? "Modifier la réforme" : "Ajouter une réforme"}</CardTitle>
          <CardDescription>
            {reformeEnEdition
              ? "Le nom ne peut pas être changé ici — créez une nouvelle réforme pour un nom différent."
              : "Ressaisir un nom déjà existant met à jour son avancement."}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <form action={saveReforme} className="flex flex-col gap-4">
            <Field label="Nom de la réforme">
              <input
                type="text"
                name="nom"
                required
                readOnly={!!reformeEnEdition}
                defaultValue={reformeEnEdition?.nom ?? ""}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none read-only:bg-muted read-only:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Field label="Statut">
                <select
                  name="statut"
                  defaultValue={reformeEnEdition?.statut ?? "EN_COURS"}
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="EN_COURS">En cours</option>
                  <option value="REALISE">Réalisée</option>
                  <option value="RETARDE">Retardée</option>
                </select>
              </Field>
              <Field label="Avancement (%)">
                <input
                  type="number"
                  name="avancement"
                  min="0"
                  max="100"
                  defaultValue={reformeEnEdition?.avancement ?? ""}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>
              <Field label="Prochain jalon">
                <input
                  type="text"
                  name="prochainJalon"
                  defaultValue={reformeEnEdition?.prochainJalon ?? ""}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>
            </div>
            <Field label="Commentaire">
              <textarea
                name="commentaire"
                rows={2}
                defaultValue={reformeEnEdition?.commentaire ?? ""}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </Field>
            <div className="flex items-center gap-3">
              <Button type="submit">{reformeEnEdition ? "Enregistrer les modifications" : "Enregistrer la réforme"}</Button>
              {reformeEnEdition && (
                <Link href="/saisie/reformes" className="text-xs font-medium text-muted-foreground hover:underline">
                  Annuler / ajouter une nouvelle réforme
                </Link>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Réformes suivies</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2 font-semibold">Réforme</th>
                  <th className="px-3 py-2 font-semibold">Avancement</th>
                  <th className="px-3 py-2 font-semibold">Prochain jalon</th>
                  <th className="px-3 py-2 font-semibold">Statut</th>
                  <th className="px-3 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reformes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-6 text-center text-muted-foreground">
                      Aucune réforme enregistrée.
                    </td>
                  </tr>
                )}
                {reformes.map((r) => (
                  <tr key={r.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-medium text-foreground">{r.nom}</td>
                    <td className="px-3 py-3">{r.avancement !== null ? `${r.avancement} %` : "—"}</td>
                    <td className="px-3 py-3">{r.prochainJalon ?? "—"}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${REFORME_STATUT_STYLES[r.statut]}`}>
                        {REFORME_STATUT_LABELS[r.statut]}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/saisie/reformes?nom=${encodeURIComponent(r.nom)}`}
                          className="text-xs font-medium text-primary hover:underline"
                        >
                          Modifier
                        </Link>
                        <ConfirmDeleteForm
                          id={r.id}
                          deleteAction={deleteReforme}
                          message="Supprimer cette réforme ? Cette action est irréversible."
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Signaler une alerte ou un risque</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <form action={createAlerte} className="flex flex-col gap-4">
            <Field label="Description">
              <textarea
                name="texte"
                rows={2}
                required
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Section concernée">
                <input
                  type="text"
                  name="section"
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>
              <Field label="Sévérité">
                <select
                  name="severite"
                  defaultValue="INFO"
                  className="h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="INFO">Info</option>
                  <option value="AVERTISSEMENT">Avertissement</option>
                  <option value="CRITIQUE">Critique</option>
                </select>
              </Field>
            </div>
            <div>
              <Button type="submit">Publier l&apos;alerte</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Alertes récentes</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2 font-semibold">Alerte</th>
                  <th className="px-3 py-2 font-semibold">Section</th>
                  <th className="px-3 py-2 font-semibold">Sévérité</th>
                  <th className="px-3 py-2 font-semibold">Statut</th>
                  <th className="px-3 py-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {alertes.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-6 text-center text-muted-foreground">
                      Aucune alerte enregistrée.
                    </td>
                  </tr>
                )}
                {alertes.map((a) => (
                  <tr key={a.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 text-foreground">{a.texte}</td>
                    <td className="px-3 py-3 text-muted-foreground">{a.section ?? "—"}</td>
                    <td className="px-3 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${SEVERITE_STYLES[a.severite]}`}>
                        {SEVERITE_LABELS[a.severite]}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {a.statut === "TRAITEE" ? (
                        <span className="inline-flex rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                          Traitée
                        </span>
                      ) : (
                        <span className="inline-flex rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                          Ouverte
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-3">
                        {a.statut !== "TRAITEE" && (
                          <form action={resolveAlerte}>
                            <input type="hidden" name="id" value={a.id} />
                            <Button type="submit" size="sm" variant="outline">
                              Marquer traitée
                            </Button>
                          </form>
                        )}
                        <ConfirmDeleteForm
                          id={a.id}
                          deleteAction={deleteAlerte}
                          message="Supprimer cette alerte ? Cette action est irréversible."
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
