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
import { LigneBudgetaireForm } from "@/components/dashboard/saisie/ligne-budgetaire-form";
import { ExportPdfButton } from "@/components/dashboard/saisie/export-pdf-button";
import { StatutBadge, STATUT_LABELS, formatMontant, ReadOnlyField, HistoriqueTimeline, SectionTitle } from "@/components/dashboard/saisie/shared";
import { formatUsdFromCdf } from "@/lib/currency";
import { DEFAULT_USD_CDF_EXCHANGE_RATE } from "@/lib/settings";
import { getRubriquesForMinistere, TYPE_PREVISION_LABELS } from "@/lib/rubriques";
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
  transitionLigneBudgetaire,
  revertLigneBudgetaireToBrouillon,
  revertLigneBudgetaireToSoumis,
  renvoyerValidationLigneBudgetaire,
  soumettreOrdrePaiementLigneBudgetaire,
  confirmerExecutionLigneBudgetaire,
} from "../actions";

export default async function EditerSaisieMinisterePage({ params }: { params: Promise<{ id: string }> }) {
  const session = await requireRole(["MINISTERE_FOCAL", "ADMIN_DGF", "BCC", ...ADMIN_ROLES]);
  const { id } = await params;
  const role = session.user.role as Role;
  const isAdmin = ADMIN_ROLES.includes(role);

  const ligne = await prisma.ligneBudgetaire.findUnique({
    where: { id },
    include: { pieceJointes: true, ministere: true, entite: true },
  });

  if (!ligne || (role === "MINISTERE_FOCAL" && ligne.ministereId !== session.user.ministereId)) {
    notFound();
  }

  const editable = isEditable(ligne.statut);
  const attachmentsLocked = ligne.statut !== "BROUILLON";
  const next = NEXT_STATUT[ligne.statut];
  const canForward = !!next && ((isOwnerTransition(ligne.statut) && !isAdmin) || (isAdminTransition(ligne.statut) && isAdmin));
  const canRevert = isAdmin && canRevertToBrouillon(ligne.statut);
  const canRevertSoumis = isAdmin && canRevertToSoumis(ligne.statut);
  const canDgfAct = role === "ADMIN_DGF" && ligne.statut === "PUBLIE";
  const canBccAct = role === "BCC" && ligne.statut === "OP_SOUMIS";

  const entites = editable
    ? await prisma.entite.findMany({ where: { ministereId: ligne.ministereId }, orderBy: { sigle: "asc" } })
    : [];
  const rubriques = editable ? getRubriquesForMinistere(ligne.ministere.nom) : [];
  const historique = await getAuditTrail("ministere", ligne.id);

  const eyebrow = isAdmin ? "Administration" : role === "ADMIN_DGF" ? "Administration fonctionnelle (DGF)" : role === "BCC" ? "Banque Centrale du Congo" : "Point focal Ministère";

  return (
    <UtilityShell eyebrow={eyebrow} title={`${ligne.ministere.nom} — ${ligne.periode}`}>
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
              Référence : {ligne.reference} —{" "}
              {editable
                ? "Brouillon — modifiable"
                : ligne.statut === "PUBLIE"
                  ? "Cette saisie est publiée et ne peut plus être modifiée."
                  : `${STATUT_LABELS[ligne.statut]} — en attente, non modifiable`}
            </CardDescription>
          </div>
          <StatutBadge statut={ligne.statut} />
        </CardHeader>
        <CardContent className="flex flex-col gap-5 px-5 pb-5">
          {!editable ? (
            <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
              <ReadOnlyField label="Référence" value={ligne.reference} tone="id" />
              <ReadOnlyField label="Entité" value={ligne.entite ? `${ligne.entite.sigle} — ${ligne.entite.nom}` : "—"} tone="entity" />
              <ReadOnlyField label="Type de prévision" value={TYPE_PREVISION_LABELS[ligne.typePrevision]} tone="meta" />
              <ReadOnlyField label="Rubrique" value={ligne.rubrique} tone="text" />
              <ReadOnlyField label="Objet de la demande" value={ligne.objet ?? "—"} tone="text" />
              <ReadOnlyField
                label="Montant demandé"
                tone="money"
                value={
                  ligne.montantDemande !== null ? (
                    <>
                      {formatMontant(ligne.montantDemande)}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        (≈ {formatUsdFromCdf(Number(ligne.montantDemande), DEFAULT_USD_CDF_EXCHANGE_RATE)} USD)
                      </span>
                    </>
                  ) : (
                    "—"
                  )
                }
              />
              <ReadOnlyField label="Priorité" value={ligne.priorite ?? "—"} tone="meta" />
              {ligne.commentaire && (
                <div className="col-span-full">
                  <ReadOnlyField label="Justification / Commentaire" value={ligne.commentaire} tone="text" />
                </div>
              )}
            </div>
          ) : (
            <LigneBudgetaireForm
              ligneId={ligne.id}
              defaultPeriode={ligne.periode}
              entites={entites}
              rubriques={rubriques}
              defaults={{
                entiteId: ligne.entiteId,
                typePrevision: ligne.typePrevision,
                rubrique: ligne.rubrique,
                objet: ligne.objet,
                montantDemande: ligne.montantDemande?.toString() ?? null,
                priorite: ligne.priorite,
                commentaire: ligne.commentaire,
              }}
            />
          )}

          <div className="flex flex-wrap items-center gap-3">
            {canForward && (
              <form action={transitionLigneBudgetaire}>
                <input type="hidden" name="id" value={ligne.id} />
                <Button type="submit" variant="outline">
                  {TRANSITION_LABELS[ligne.statut]}
                </Button>
              </form>
            )}
            {canRevert && (
              <form action={revertLigneBudgetaireToBrouillon}>
                <input type="hidden" name="id" value={ligne.id} />
                <Button type="submit" variant="outline">
                  {REVERT_LABEL}
                </Button>
              </form>
            )}
            {canRevertSoumis && (
              <form action={revertLigneBudgetaireToSoumis}>
                <input type="hidden" name="id" value={ligne.id} />
                <Button type="submit" variant="outline">
                  {REVERT_SOUMIS_LABEL}
                </Button>
              </form>
            )}
            {canDgfAct && (
              <>
                <form action={renvoyerValidationLigneBudgetaire}>
                  <input type="hidden" name="id" value={ligne.id} />
                  <Button type="submit" variant="outline">
                    Renvoyer à la validation
                  </Button>
                </form>
                <form action={soumettreOrdrePaiementLigneBudgetaire}>
                  <input type="hidden" name="id" value={ligne.id} />
                  <Button type="submit">Soumettre l&apos;ordre de paiement</Button>
                </form>
              </>
            )}
            {canBccAct && (
              <form action={confirmerExecutionLigneBudgetaire}>
                <input type="hidden" name="id" value={ligne.id} />
                <Button type="submit">Confirmer l&apos;exécution</Button>
              </form>
            )}
            <ExportPdfButton
              titre="Demande budgétaire"
              sousTitre={`${ligne.ministere.nom} — période ${ligne.periode}`}
              fileName={`${ligne.reference}.pdf`}
              champs={[
                { label: "Référence", value: ligne.reference },
                { label: "Ministère", value: ligne.ministere.nom },
                { label: "Entité", value: ligne.entite ? `${ligne.entite.sigle} — ${ligne.entite.nom}` : "—" },
                { label: "Période", value: ligne.periode },
                { label: "Type de prévision", value: TYPE_PREVISION_LABELS[ligne.typePrevision] },
                { label: "Rubrique", value: ligne.rubrique },
                { label: "Objet", value: ligne.objet ?? "—" },
                {
                  label: "Montant demandé",
                  value:
                    ligne.montantDemande !== null
                      ? `${formatMontant(ligne.montantDemande)} (env. ${formatUsdFromCdf(Number(ligne.montantDemande), DEFAULT_USD_CDF_EXCHANGE_RATE)} USD)`
                      : "—",
                },
                { label: "Priorité", value: ligne.priorite ?? "—" },
                { label: "Statut", value: STATUT_LABELS[ligne.statut] },
                { label: "Justification", value: ligne.commentaire ?? "—" },
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
            domain="ministere"
            recordId={ligne.id}
            documents={ligne.pieceJointes}
            locked={attachmentsLocked}
          />
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
