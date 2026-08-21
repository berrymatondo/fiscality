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
import { saveSaisieDette, transitionSaisieDette, revertSaisieDetteToBrouillon, revertSaisieDetteToSoumis } from "../actions";

export default async function EditerSaisieDettePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireRole(["DETTE_DGDP", ...ADMIN_ROLES]);
  const { id } = await params;
  const role = session.user.role as Role;
  const isAdmin = ADMIN_ROLES.includes(role);

  const saisie = await prisma.saisieDette.findUnique({ where: { id }, include: { pieceJointes: true } });
  if (!saisie) notFound();

  const editable = isEditable(saisie.statut);
  const attachmentsLocked = saisie.statut !== "BROUILLON";
  const next = NEXT_STATUT[saisie.statut];
  const canForward = !!next && ((isOwnerTransition(saisie.statut) && !isAdmin) || (isAdminTransition(saisie.statut) && isAdmin));
  const canRevert = isAdmin && canRevertToBrouillon(saisie.statut);
  const canRevertSoumis = isAdmin && canRevertToSoumis(saisie.statut);
  const historique = await getAuditTrail("dette", saisie.id);

  return (
    <UtilityShell eyebrow={isAdmin ? "Administration" : "Direction Générale de la Dette Publique"} title={`Dette publique — ${saisie.periode}`}>
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
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <ReadOnlyField label="Référence" value={saisie.reference} tone="id" />
              <ReadOnlyField label="Encours extérieure" value={formatMontant(saisie.encoursExterieure)} tone="money" />
              <ReadOnlyField label="Encours intérieure" value={formatMontant(saisie.encoursInterieure)} tone="money" />
              <ReadOnlyField label="Ratio dette/PIB" value={formatMontant(saisie.ratioDettePib, " %")} tone="percent" />
              <ReadOnlyField label="Service dû" value={formatMontant(saisie.serviceDetteDu)} tone="money" />
              <ReadOnlyField label="Service payé" value={formatMontant(saisie.serviceDettePaye)} tone="money" />
            </div>
          ) : (
            <form action={saveSaisieDette} className="flex flex-col gap-4">
              <input type="hidden" name="periode" value={saisie.periode} />

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <Field label="Encours dette extérieure (CDF)">
                  <AmountInput name="encoursExterieure" defaultValue={saisie.encoursExterieure} />
                </Field>
                <Field label="Encours dette intérieure (CDF)">
                  <AmountInput name="encoursInterieure" defaultValue={saisie.encoursInterieure} />
                </Field>
                <Field label="Ratio dette / PIB (%)">
                  <AmountInput name="ratioDettePib" defaultValue={saisie.ratioDettePib} />
                </Field>
                <Field label="Service de la dette dû (CDF)">
                  <AmountInput name="serviceDetteDu" defaultValue={saisie.serviceDetteDu} />
                </Field>
                <Field label="Service de la dette payé (CDF)">
                  <AmountInput name="serviceDettePaye" defaultValue={saisie.serviceDettePaye} />
                </Field>
              </div>

              <Field label="Nouveaux emprunts contractés (créancier, montant, conditions)">
                <textarea
                  name="nouveauxEmprunts"
                  rows={2}
                  defaultValue={saisie.nouveauxEmprunts ?? ""}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </Field>

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
              <form action={transitionSaisieDette}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {TRANSITION_LABELS[saisie.statut]}
                </Button>
              </form>
            )}
            {canRevert && (
              <form action={revertSaisieDetteToBrouillon}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_LABEL}
                </Button>
              </form>
            )}
            {canRevertSoumis && (
              <form action={revertSaisieDetteToSoumis}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_SOUMIS_LABEL}
                </Button>
              </form>
            )}
            <ExportPdfButton
              titre="Dette publique"
              sousTitre={`Direction Générale de la Dette Publique — période ${saisie.periode}`}
              fileName={`${saisie.reference}.pdf`}
              champs={[
                { label: "Référence", value: saisie.reference },
                { label: "Période", value: saisie.periode },
                { label: "Encours extérieur", value: formatMontant(saisie.encoursExterieure) },
                { label: "Encours intérieur", value: formatMontant(saisie.encoursInterieure) },
                { label: "Service de la dette dû", value: formatMontant(saisie.serviceDetteDu) },
                { label: "Service de la dette payé", value: formatMontant(saisie.serviceDettePaye) },
                { label: "Ratio dette/PIB", value: formatMontant(saisie.ratioDettePib, " %") },
                { label: "Nouveaux emprunts", value: saisie.nouveauxEmprunts ?? "—" },
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
          <DocumentAttachments domain="dette" recordId={saisie.id} documents={saisie.pieceJointes} locked={attachmentsLocked} />
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
