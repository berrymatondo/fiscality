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
import {
  saveSaisieProvince,
  transitionSaisieProvince,
  revertSaisieProvinceToBrouillon,
  revertSaisieProvinceToSoumis,
  renvoyerValidationSaisieProvince,
  soumettreOrdrePaiementSaisieProvince,
  confirmerExecutionSaisieProvince,
} from "../actions";

export default async function EditerSaisieProvincePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireRole(["PROVINCE_FOCAL", "ADMIN_DGF", "BCC", ...ADMIN_ROLES]);
  const { id } = await params;
  const role = session.user.role as Role;
  const isAdmin = ADMIN_ROLES.includes(role);

  const saisie = await prisma.saisieProvince.findUnique({
    where: { id },
    include: { pieceJointes: true, province: true },
  });

  if (!saisie || (role === "PROVINCE_FOCAL" && saisie.provinceId !== session.user.provinceId)) {
    notFound();
  }

  const editable = isEditable(saisie.statut);
  const attachmentsLocked = saisie.statut !== "BROUILLON";
  const next = NEXT_STATUT[saisie.statut];
  const canForward = !!next && ((isOwnerTransition(saisie.statut) && !isAdmin) || (isAdminTransition(saisie.statut) && isAdmin));
  const canRevert = isAdmin && canRevertToBrouillon(saisie.statut);
  const canRevertSoumis = isAdmin && canRevertToSoumis(saisie.statut);
  const canDgfAct = role === "ADMIN_DGF" && saisie.statut === "PUBLIE";
  const canBccAct = role === "BCC" && saisie.statut === "OP_SOUMIS";
  const historique = await getAuditTrail("province", saisie.id);

  const eyebrow = isAdmin ? "Administration" : role === "ADMIN_DGF" ? "Administration fonctionnelle (DGF)" : role === "BCC" ? "Banque Centrale du Congo" : "Point focal Province";

  return (
    <UtilityShell eyebrow={eyebrow} title={`${saisie.province.nom} — ${saisie.periode}`}>
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
            <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
              <ReadOnlyField label="Référence" value={saisie.reference} tone="id" />
              <ReadOnlyField label="Taux d'exécution" value={formatMontant(saisie.tauxExecution, " %")} tone="percent" />
              <ReadOnlyField label="Recettes propres" value={formatMontant(saisie.recettesPropres)} tone="money" />
              <ReadOnlyField label="Rétrocessions" value={formatMontant(saisie.retrocessions)} tone="money" />
            </div>
          ) : (
            <form action={saveSaisieProvince} className="flex flex-col gap-4">
              <input type="hidden" name="periode" value={saisie.periode} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field label="Taux d'exécution (%)">
                  <AmountInput name="tauxExecution" defaultValue={saisie.tauxExecution} />
                </Field>
                <Field label="Recettes propres collectées (CDF)">
                  <AmountInput name="recettesPropres" defaultValue={saisie.recettesPropres} />
                </Field>
                <Field label="Rétrocessions reçues (CDF)">
                  <AmountInput name="retrocessions" defaultValue={saisie.retrocessions} />
                </Field>
              </div>

              <Field label="Commentaire / signalement">
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
              <form action={transitionSaisieProvince}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {TRANSITION_LABELS[saisie.statut]}
                </Button>
              </form>
            )}
            {canRevert && (
              <form action={revertSaisieProvinceToBrouillon}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_LABEL}
                </Button>
              </form>
            )}
            {canRevertSoumis && (
              <form action={revertSaisieProvinceToSoumis}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit" variant="outline">
                  {REVERT_SOUMIS_LABEL}
                </Button>
              </form>
            )}
            {canDgfAct && (
              <>
                <form action={renvoyerValidationSaisieProvince}>
                  <input type="hidden" name="id" value={saisie.id} />
                  <Button type="submit" variant="outline">
                    Renvoyer à la validation
                  </Button>
                </form>
                <form action={soumettreOrdrePaiementSaisieProvince}>
                  <input type="hidden" name="id" value={saisie.id} />
                  <Button type="submit">Soumettre l&apos;ordre de paiement</Button>
                </form>
              </>
            )}
            {canBccAct && (
              <form action={confirmerExecutionSaisieProvince}>
                <input type="hidden" name="id" value={saisie.id} />
                <Button type="submit">Confirmer l&apos;exécution</Button>
              </form>
            )}
            <ExportPdfButton
              titre="Saisie province"
              sousTitre={`${saisie.province.nom} — période ${saisie.periode}`}
              fileName={`${saisie.reference}.pdf`}
              champs={[
                { label: "Référence", value: saisie.reference },
                { label: "Province", value: saisie.province.nom },
                { label: "Période", value: saisie.periode },
                { label: "Taux d'exécution", value: formatMontant(saisie.tauxExecution, " %") },
                { label: "Recettes propres", value: formatMontant(saisie.recettesPropres) },
                { label: "Rétrocessions", value: formatMontant(saisie.retrocessions) },
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
          <CardDescription>Traçabilité des étapes (soumission, validation, publication, paiement...).</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <HistoriqueTimeline historique={historique} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="px-5 py-5">
          <DocumentAttachments
            domain="province"
            recordId={saisie.id}
            documents={saisie.pieceJointes}
            locked={attachmentsLocked}
          />
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
