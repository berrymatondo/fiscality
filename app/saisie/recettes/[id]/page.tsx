import { notFound } from "next/navigation";
import Link from "next/link";
import { ClipboardList, History } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole, ADMIN_ROLES } from "@/lib/rbac";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DocumentAttachments } from "@/components/dashboard/saisie/document-attachments";
import { AutoRefresh } from "@/components/dashboard/saisie/auto-refresh";
import { ExportPdfButton } from "@/components/dashboard/saisie/export-pdf-button";
import { Field, StatutBadge, STATUT_LABELS, formatMontant, ReadOnlyField, HistoriqueTimeline, SectionTitle } from "@/components/dashboard/saisie/shared";
import { AmountInput } from "@/components/dashboard/saisie/amount-input";
import { getAuditTrail } from "@/lib/audit";
import {
  NEXT_STATUT,
  TRANSITION_LABELS,
  REVERT_LABEL,
  REVERT_SOUMIS_LABEL,
  isOwnerTransition,
  isAdminTransition,
  isEditable,
  canRevertToBrouillon,
  canRevertToSoumis,
} from "@/lib/workflow";
import { retourSaisieLabel, type Role } from "@/lib/roles";
import { saveSaisieRecettes, transitionSaisieRecettes, revertSaisieRecettesToBrouillon, revertSaisieRecettesToSoumis } from "../actions";

export default async function EditerSaisieRecettesPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireRole(["REGIE_FINANCIERE", ...ADMIN_ROLES]);
  const { id } = await params;
  const role = session.user.role as Role;
  const isAdmin = ADMIN_ROLES.includes(role);

  const saisie = await prisma.saisieRecettes.findUnique({ where: { id }, include: { pieceJointes: true } });
  if (!saisie) notFound();

  const editable = isEditable(saisie.statut);
  const attachmentsLocked = saisie.statut !== "BROUILLON";
  const next = NEXT_STATUT[saisie.statut];
  const canForward = !!next && ((isOwnerTransition(saisie.statut) && !isAdmin) || (isAdminTransition(saisie.statut) && isAdmin));
  const canRevert = isAdmin && canRevertToBrouillon(saisie.statut);
  const canRevertSoumis = isAdmin && canRevertToSoumis(saisie.statut);
  const historique = await getAuditTrail("recettes", saisie.id);

  return (
    <UtilityShell eyebrow={isAdmin ? "Administration" : "Régies financières"} title={`Recettes — ${saisie.periode}`}>
      {!editable && <AutoRefresh />}
      <Link href="/saisie" className="text-xs font-medium text-muted-foreground hover:underline">
        ← {retourSaisieLabel(role)}
      </Link>
      <Card>
        <CardHeader className="flex-row items-center justify-between gap-4 px-5 pt-5">
          <div>
            <CardTitle className="text-xs">
              <SectionTitle icon={ClipboardList} tone="primary">
                Détail de la saisie
              </SectionTitle>
            </CardTitle>
            <CardDescription>
              Référence : {saisie.reference} —{" "}
              {editable
                ? "Brouillon — modifiable"
                : saisie.statut === "PUBLIE"
                  ? "Cette saisie est publiée et ne peut plus être modifiée."
                  : `${STATUT_LABELS[saisie.statut]} — en attente, non modifiable`}
            </CardDescription>
          </div>
          <StatutBadge statut={saisie.statut} />
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-5 pb-5">
          {!editable ? (
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-5">
              <ReadOnlyField label="Référence" value={saisie.reference} tone="id" />
              <ReadOnlyField label="Fiscales" value={formatMontant(saisie.recettesFiscales)} tone="money" />
              <ReadOnlyField label="Douanières" value={formatMontant(saisie.recettesDouanieres)} tone="money" />
              <ReadOnlyField label="Minières" value={formatMontant(saisie.recettesMinieres)} tone="money" />
              <ReadOnlyField label="Non fiscales" value={formatMontant(saisie.recettesNonFiscales)} tone="money" />
              <ReadOnlyField label="Dons" value={formatMontant(saisie.dons)} tone="money" />
            </div>
          ) : (
            <form action={saveSaisieRecettes} className="flex flex-col gap-4">
              <input type="hidden" name="periode" value={saisie.periode} />

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                <Field label="Fiscales (CDF)">
                  <AmountInput name="recettesFiscales" defaultValue={saisie.recettesFiscales} />
                </Field>
                <Field label="Douanières (CDF)">
                  <AmountInput name="recettesDouanieres" defaultValue={saisie.recettesDouanieres} />
                </Field>
                <Field label="Minières (CDF)">
                  <AmountInput name="recettesMinieres" defaultValue={saisie.recettesMinieres} />
                </Field>
                <Field label="Non fiscales (CDF)">
                  <AmountInput name="recettesNonFiscales" defaultValue={saisie.recettesNonFiscales} />
                </Field>
                <Field label="Dons (CDF)">
                  <AmountInput name="dons" defaultValue={saisie.dons} />
                </Field>
              </div>

              <Field label="Commentaire">
                <textarea
                  name="commentaire"
                  rows={3}
                  defaultValue={saisie.commentaire ?? ""}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" name="intent" value="brouillon" variant="outline">
                  Enregistrer
                </Button>
                <Button type="submit" name="intent" value="soumettre">
                  Soumettre pour validation
                </Button>
              </div>
            </form>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {canForward && (
              <form action={transitionSaisieRecettes}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {TRANSITION_LABELS[saisie.statut]}
                </Button>
              </form>
            )}
            {canRevert && (
              <form action={revertSaisieRecettesToBrouillon}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_LABEL}
                </Button>
              </form>
            )}
            {canRevertSoumis && (
              <form action={revertSaisieRecettesToSoumis}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_SOUMIS_LABEL}
                </Button>
              </form>
            )}
            <ExportPdfButton
              titre="Recettes"
              sousTitre={`Régies financières — période ${saisie.periode}`}
              fileName={`${saisie.reference}.pdf`}
              champs={[
                { label: "Référence", value: saisie.reference },
                { label: "Période", value: saisie.periode },
                { label: "Recettes fiscales", value: formatMontant(saisie.recettesFiscales) },
                { label: "Recettes douanières", value: formatMontant(saisie.recettesDouanieres) },
                { label: "Recettes minières", value: formatMontant(saisie.recettesMinieres) },
                { label: "Recettes non fiscales", value: formatMontant(saisie.recettesNonFiscales) },
                { label: "Dons", value: formatMontant(saisie.dons) },
                { label: "Statut", value: STATUT_LABELS[saisie.statut] },
                { label: "Commentaire", value: saisie.commentaire ?? "—" },
              ]}
              historique={historique.map((h) => ({
                action: h.action,
                statutAvant: h.statutAvant,
                statutApres: h.statutApres,
                auteur: h.auteur,
                date: h.createdAt.toLocaleString("fr-FR"),
              }))}
            />
          </div>

        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">
            <SectionTitle icon={History} tone="history">
              Historique de traitement
            </SectionTitle>
          </CardTitle>
          <CardDescription>Traçabilité des étapes (soumission, validation, publication...).</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <HistoriqueTimeline historique={historique} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="px-5 py-5">
          <DocumentAttachments domain="recettes" recordId={saisie.id} documents={saisie.pieceJointes} locked={attachmentsLocked} />
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
