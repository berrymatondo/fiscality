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
import { saveSaisieTresor, transitionSaisieTresor, revertSaisieTresorToBrouillon, revertSaisieTresorToSoumis } from "../actions";

export default async function EditerSaisieTresorPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireRole(["TRESOR_DGTCP", ...ADMIN_ROLES]);
  const { id } = await params;
  const role = session.user.role as Role;
  const isAdmin = ADMIN_ROLES.includes(role);

  const saisie = await prisma.saisieTresor.findUnique({ where: { id }, include: { pieceJointes: true } });
  if (!saisie) notFound();

  const editable = isEditable(saisie.statut);
  const attachmentsLocked = saisie.statut !== "BROUILLON";
  const next = NEXT_STATUT[saisie.statut];
  const canForward = !!next && ((isOwnerTransition(saisie.statut) && !isAdmin) || (isAdminTransition(saisie.statut) && isAdmin));
  const canRevert = isAdmin && canRevertToBrouillon(saisie.statut);
  const canRevertSoumis = isAdmin && canRevertToSoumis(saisie.statut);
  const historique = await getAuditTrail("tresor", saisie.id);

  return (
    <UtilityShell eyebrow={isAdmin ? "Administration" : "Direction Générale du Trésor"} title={`Trésorerie — ${saisie.periode}`}>
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
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
              <ReadOnlyField label="Référence" value={saisie.reference} tone="id" />
              <ReadOnlyField label="Solde général" value={formatMontant(saisie.soldeCompteGeneral)} tone="money" />
              <ReadOnlyField label="Solde bancaire" value={formatMontant(saisie.soldeBancaire)} tone="money" />
              <ReadOnlyField label="Engagements" value={formatMontant(saisie.engagementsAttente)} tone="money" />
              <ReadOnlyField label="Arriérés" value={formatMontant(saisie.arrieres)} tone="money" />
            </div>
          ) : (
            <form action={saveSaisieTresor} className="flex flex-col gap-4">
              <input type="hidden" name="periode" value={saisie.periode} />

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Field label="Solde du compte général (CDF)">
                  <AmountInput name="soldeCompteGeneral" defaultValue={saisie.soldeCompteGeneral} />
                </Field>
                <Field label="Solde bancaire (CDF)">
                  <AmountInput name="soldeBancaire" defaultValue={saisie.soldeBancaire} />
                </Field>
                <Field label="Engagements en attente (CDF)">
                  <AmountInput name="engagementsAttente" defaultValue={saisie.engagementsAttente} />
                </Field>
                <Field label="Arriérés de paiement (CDF)">
                  <AmountInput name="arrieres" defaultValue={saisie.arrieres} />
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
              <form action={transitionSaisieTresor}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {TRANSITION_LABELS[saisie.statut]}
                </Button>
              </form>
            )}
            {canRevert && (
              <form action={revertSaisieTresorToBrouillon}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_LABEL}
                </Button>
              </form>
            )}
            {canRevertSoumis && (
              <form action={revertSaisieTresorToSoumis}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_SOUMIS_LABEL}
                </Button>
              </form>
            )}
            <ExportPdfButton
              titre="Situation de trésorerie"
              sousTitre={`Direction Générale du Trésor — période ${saisie.periode}`}
              fileName={`${saisie.reference}.pdf`}
              champs={[
                { label: "Référence", value: saisie.reference },
                { label: "Période", value: saisie.periode },
                { label: "Solde du compte général", value: formatMontant(saisie.soldeCompteGeneral) },
                { label: "Solde bancaire", value: formatMontant(saisie.soldeBancaire) },
                { label: "Engagements en attente", value: formatMontant(saisie.engagementsAttente) },
                { label: "Arriérés de paiement", value: formatMontant(saisie.arrieres) },
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
          <DocumentAttachments domain="tresor" recordId={saisie.id} documents={saisie.pieceJointes} locked={attachmentsLocked} />
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
