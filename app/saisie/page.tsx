import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireSession, ADMIN_ROLES } from "@/lib/rbac";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent } from "@/components/ui/card";
import { SaisieList } from "@/components/dashboard/saisie/saisie-list";
import { SaisiesTable } from "@/components/dashboard/saisie/saisies-table";
import { PaiementQueueTable } from "@/components/dashboard/saisie/paiement-queue-table";
import { formatMontant } from "@/components/dashboard/saisie/shared";
import { AutoRefresh } from "@/components/dashboard/saisie/auto-refresh";
import type { RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";
import type { QueueRow, PaiementQueueRow } from "@/components/dashboard/saisie/queue-row";
import { DOMAIN_LABELS, type Domain } from "@/lib/documents";
import { TYPE_PREVISION_LABELS } from "@/lib/rubriques";
import type { Role } from "@/lib/roles";
import type { StatutSaisie } from "@/lib/generated/prisma/client";

import {
  saveLigneBudgetaire,
  deleteLigneBudgetaire,
  transitionLigneBudgetaire,
  revertLigneBudgetaireToBrouillon,
  revertLigneBudgetaireToSoumis,
  renvoyerValidationLigneBudgetaire,
  soumettreOrdrePaiementLigneBudgetaire,
  confirmerExecutionLigneBudgetaire,
  getRapportLigneBudgetaire,
} from "./ministere/actions";
import {
  deleteSaisieProvince,
  transitionSaisieProvince,
  revertSaisieProvinceToBrouillon,
  revertSaisieProvinceToSoumis,
  renvoyerValidationSaisieProvince,
  soumettreOrdrePaiementSaisieProvince,
  confirmerExecutionSaisieProvince,
  getRapportSaisieProvince,
} from "./province/actions";
import {
  deleteSaisieTresor,
  transitionSaisieTresor,
  revertSaisieTresorToBrouillon,
  revertSaisieTresorToSoumis,
  getRapportSaisieTresor,
} from "./tresor/actions";
import {
  deleteSaisieDette,
  transitionSaisieDette,
  revertSaisieDetteToBrouillon,
  revertSaisieDetteToSoumis,
  getRapportSaisieDette,
} from "./dette/actions";
import {
  deleteSaisieRecettes,
  transitionSaisieRecettes,
  revertSaisieRecettesToBrouillon,
  revertSaisieRecettesToSoumis,
  getRapportSaisieRecettes,
} from "./recettes/actions";
import {
  deleteSaisieMacro,
  transitionSaisieMacro,
  revertSaisieMacroToBrouillon,
  revertSaisieMacroToSoumis,
  getRapportSaisieMacro,
} from "./macro/actions";

const TRANSITION_ACTIONS: Record<Domain, (formData: FormData) => void> = {
  ministere: transitionLigneBudgetaire,
  province: transitionSaisieProvince,
  tresor: transitionSaisieTresor,
  dette: transitionSaisieDette,
  recettes: transitionSaisieRecettes,
  macro: transitionSaisieMacro,
};

const REVERT_ACTIONS: Record<Domain, (formData: FormData) => void> = {
  ministere: revertLigneBudgetaireToBrouillon,
  province: revertSaisieProvinceToBrouillon,
  tresor: revertSaisieTresorToBrouillon,
  dette: revertSaisieDetteToBrouillon,
  recettes: revertSaisieRecettesToBrouillon,
  macro: revertSaisieMacroToBrouillon,
};

const REVERT_SOUMIS_ACTIONS: Record<Domain, (formData: FormData) => void> = {
  ministere: revertLigneBudgetaireToSoumis,
  province: revertSaisieProvinceToSoumis,
  tresor: revertSaisieTresorToSoumis,
  dette: revertSaisieDetteToSoumis,
  recettes: revertSaisieRecettesToSoumis,
  macro: revertSaisieMacroToSoumis,
};

export default async function SaisieIndexPage() {
  const session = await requireSession();
  const role = session.user.role as Role;

  if (role === "SUIVI_EVALUATION") {
    redirect("/saisie/reformes");
  }

  if (ADMIN_ROLES.includes(role)) {
    return <AdminQueue />;
  }

  if (role === "MINISTERE_FOCAL") {
    if (!session.user.ministereId) return <SansPerimetre eyebrow="Point focal Ministère" texte="ministère" />;
    const rows = await prisma.ligneBudgetaire.findMany({
      where: { ministereId: session.user.ministereId },
      orderBy: { periode: "desc" },
      include: { entite: true },
    });
    return (
      <UtilityShell eyebrow="Point focal Ministère" title="Mes saisies" subtitle="Demandes budgétaires par entité et par rubrique.">
        <AutoRefresh />
        <SaisieList
          title={`${rows.length} saisie(s)`}
          createHref="/saisie/ministere/nouveau"
          editHrefBase="/saisie/ministere"
          rows={rows}
          columns={[
            { label: "Entité", render: (r) => r.entite?.sigle ?? "—" },
            { label: "Rubrique", render: (r) => r.rubrique },
            { label: "Type", render: (r) => TYPE_PREVISION_LABELS[r.typePrevision] },
            { label: "Montant demandé", render: (r) => formatMontant(r.montantDemande) },
          ]}
          canAct={(statut) => statut === "BROUILLON"}
          canDelete={(r) => r.statut === "BROUILLON"}
          transitionAction={transitionLigneBudgetaire}
          deleteAction={deleteLigneBudgetaire}
          getRapportAction={getRapportLigneBudgetaire}
        />
      </UtilityShell>
    );
  }

  if (role === "PROVINCE_FOCAL") {
    if (!session.user.provinceId) return <SansPerimetre eyebrow="Point focal Province" texte="province" />;
    const rows = await prisma.saisieProvince.findMany({
      where: { provinceId: session.user.provinceId },
      orderBy: { periode: "desc" },
    });
    return (
      <UtilityShell eyebrow="Point focal Province" title="Mes saisies" subtitle="Exécution budgétaire mensuelle.">
        <AutoRefresh />
        <SaisieList
          title={`${rows.length} saisie(s)`}
          createHref="/saisie/province/nouveau"
          editHrefBase="/saisie/province"
          rows={rows}
          columns={[
            { label: "Taux", render: (r) => formatMontant(r.tauxExecution, " %") },
            { label: "Recettes propres", render: (r) => formatMontant(r.recettesPropres) },
            { label: "Rétrocessions", render: (r) => formatMontant(r.retrocessions) },
          ]}
          canAct={(statut) => statut === "BROUILLON"}
          canDelete={(r) => r.statut === "BROUILLON"}
          transitionAction={transitionSaisieProvince}
          deleteAction={deleteSaisieProvince}
          getRapportAction={getRapportSaisieProvince}
        />
      </UtilityShell>
    );
  }

  if (role === "TRESOR_DGTCP") {
    const rows = await prisma.saisieTresor.findMany({ orderBy: { periode: "desc" } });
    return (
      <UtilityShell eyebrow="Direction Générale du Trésor" title="Mes saisies" subtitle="Situation de trésorerie mensuelle.">
        <AutoRefresh />
        <SaisieList
          title={`${rows.length} saisie(s)`}
          createHref="/saisie/tresor/nouveau"
          editHrefBase="/saisie/tresor"
          rows={rows}
          columns={[
            { label: "Solde général", render: (r) => formatMontant(r.soldeCompteGeneral) },
            { label: "Solde bancaire", render: (r) => formatMontant(r.soldeBancaire) },
            { label: "Engagements", render: (r) => formatMontant(r.engagementsAttente) },
            { label: "Arriérés", render: (r) => formatMontant(r.arrieres) },
          ]}
          canAct={(statut) => statut === "BROUILLON"}
          canDelete={(r) => r.statut === "BROUILLON"}
          transitionAction={transitionSaisieTresor}
          deleteAction={deleteSaisieTresor}
          getRapportAction={getRapportSaisieTresor}
        />
      </UtilityShell>
    );
  }

  if (role === "DETTE_DGDP") {
    const rows = await prisma.saisieDette.findMany({ orderBy: { periode: "desc" } });
    return (
      <UtilityShell eyebrow="Direction Générale de la Dette Publique" title="Mes saisies" subtitle="Encours et service de la dette.">
        <AutoRefresh />
        <SaisieList
          title={`${rows.length} saisie(s)`}
          createHref="/saisie/dette/nouveau"
          editHrefBase="/saisie/dette"
          rows={rows}
          columns={[
            { label: "Encours ext.", render: (r) => formatMontant(r.encoursExterieure) },
            { label: "Encours int.", render: (r) => formatMontant(r.encoursInterieure) },
            { label: "Dette/PIB", render: (r) => formatMontant(r.ratioDettePib, " %") },
          ]}
          canAct={(statut) => statut === "BROUILLON"}
          canDelete={(r) => r.statut === "BROUILLON"}
          transitionAction={transitionSaisieDette}
          deleteAction={deleteSaisieDette}
          getRapportAction={getRapportSaisieDette}
        />
      </UtilityShell>
    );
  }

  if (role === "REGIE_FINANCIERE") {
    const rows = await prisma.saisieRecettes.findMany({ orderBy: { periode: "desc" } });
    return (
      <UtilityShell eyebrow="Régies financières" title="Mes saisies" subtitle="Recettes réalisées par nature.">
        <AutoRefresh />
        <SaisieList
          title={`${rows.length} saisie(s)`}
          createHref="/saisie/recettes/nouveau"
          editHrefBase="/saisie/recettes"
          rows={rows}
          columns={[
            { label: "Fiscales", render: (r) => formatMontant(r.recettesFiscales) },
            { label: "Douanières", render: (r) => formatMontant(r.recettesDouanieres) },
            { label: "Minières", render: (r) => formatMontant(r.recettesMinieres) },
            { label: "Non fiscales", render: (r) => formatMontant(r.recettesNonFiscales) },
            { label: "Dons", render: (r) => formatMontant(r.dons) },
          ]}
          canAct={(statut) => statut === "BROUILLON"}
          canDelete={(r) => r.statut === "BROUILLON"}
          transitionAction={transitionSaisieRecettes}
          deleteAction={deleteSaisieRecettes}
          getRapportAction={getRapportSaisieRecettes}
        />
      </UtilityShell>
    );
  }

  if (role === "CELLULE_MACRO") {
    const rows = await prisma.saisieMacro.findMany({ orderBy: { periode: "desc" } });
    return (
      <UtilityShell eyebrow="Cellule macroéconomique" title="Mes saisies" subtitle="Indicateurs macroéconomiques mensuels.">
        <AutoRefresh />
        <SaisieList
          title={`${rows.length} saisie(s)`}
          createHref="/saisie/macro/nouveau"
          editHrefBase="/saisie/macro"
          rows={rows}
          columns={[
            { label: "Croissance", render: (r) => formatMontant(r.croissance, " %") },
            { label: "Inflation", render: (r) => formatMontant(r.inflation, " %") },
            { label: "Taux de change", render: (r) => formatMontant(r.tauxChange, " CDF/USD") },
          ]}
          canAct={(statut) => statut === "BROUILLON"}
          canDelete={(r) => r.statut === "BROUILLON"}
          transitionAction={transitionSaisieMacro}
          deleteAction={deleteSaisieMacro}
          getRapportAction={getRapportSaisieMacro}
        />
      </UtilityShell>
    );
  }

  if (role === "ADMIN_DGF") {
    const [ministere, province] = await Promise.all([
      prisma.ligneBudgetaire.findMany({
        where: { statut: { in: ["PUBLIE", "OP_SOUMIS", "PAYE"] } },
        include: { ministere: true },
        orderBy: { periode: "desc" },
      }),
      prisma.saisieProvince.findMany({
        where: { statut: { in: ["PUBLIE", "OP_SOUMIS", "PAYE"] } },
        include: { province: true },
        orderBy: { periode: "desc" },
      }),
    ]);
    const rows = mapQueueRowsMP(ministere, province);
    return (
      <UtilityShell
        eyebrow="Administration fonctionnelle (DGF)"
        title="Saisies publiées"
        subtitle="Renvoyez une saisie à la validation ou soumettez l'ordre de paiement à la Banque Centrale."
      >
        <AutoRefresh />
        <PaiementQueueTable
          title={`${rows.length} saisie(s)`}
          description="Consultez, renvoyez à la validation (DGB) ou soumettez l'ordre de paiement (BCC)."
          emptyMessage="Aucune saisie publiée pour le moment."
          rows={rows}
          mode="dgf"
        />
      </UtilityShell>
    );
  }

  if (role === "BCC") {
    const [ministere, province] = await Promise.all([
      prisma.ligneBudgetaire.findMany({
        where: { statut: { in: ["OP_SOUMIS", "PAYE"] } },
        include: { ministere: true },
        orderBy: { periode: "desc" },
      }),
      prisma.saisieProvince.findMany({
        where: { statut: { in: ["OP_SOUMIS", "PAYE"] } },
        include: { province: true },
        orderBy: { periode: "desc" },
      }),
    ]);
    const rows = mapQueueRowsMP(ministere, province);
    return (
      <UtilityShell
        eyebrow="Banque Centrale du Congo"
        title="Ordres de paiement"
        subtitle="Confirmez l'exécution des paiements soumis par la DGF."
      >
        <AutoRefresh />
        <PaiementQueueTable
          title={`${rows.length} ordre(s) de paiement`}
          description="Confirmer l'exécution notifie le ministère ou la province, la DGB et la DGF."
          emptyMessage="Aucun ordre de paiement pour le moment."
          rows={rows}
          mode="bcc"
        />
      </UtilityShell>
    );
  }

  redirect("/");
}

function SansPerimetre({ eyebrow, texte }: { eyebrow: string; texte: string }) {
  return (
    <UtilityShell eyebrow={eyebrow} title="Saisie non disponible">
      <Card>
        <CardContent className="px-5 py-5 text-sm text-muted-foreground">
          Votre compte n&apos;est rattaché à aucun{texte === "province" ? "e" : ""} {texte} pour le moment. Contactez
          un administrateur.
        </CardContent>
      </Card>
    </UtilityShell>
  );
}

function toMontantValue(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function sumMontants(...values: unknown[]): number | null {
  const nums = values.map(toMontantValue).filter((n): n is number => n !== null);
  return nums.length > 0 ? nums.reduce((a, b) => a + b, 0) : null;
}

function mapQueueRows(
  ministere: { id: string; reference: string; periode: string; statut: StatutSaisie; ministere: { nom: string }; montantDemande: unknown }[],
  province: { id: string; reference: string; periode: string; statut: StatutSaisie; province: { nom: string }; recettesPropres: unknown; retrocessions: unknown }[],
  tresor: { id: string; reference: string; periode: string; statut: StatutSaisie; soldeCompteGeneral: unknown }[],
  dette: { id: string; reference: string; periode: string; statut: StatutSaisie; encoursExterieure: unknown }[],
  recettes: {
    id: string;
    reference: string;
    periode: string;
    statut: StatutSaisie;
    recettesFiscales: unknown;
    recettesDouanieres: unknown;
    recettesMinieres: unknown;
    recettesNonFiscales: unknown;
    dons: unknown;
  }[],
  macro: { id: string; reference: string; periode: string; statut: StatutSaisie; pib: unknown }[],
): QueueRow[] {
  return [
    ...ministere.map((r) => {
      const montantValue = toMontantValue(r.montantDemande);
      return {
        id: r.id,
        domain: "ministere" as const,
        domainLabel: DOMAIN_LABELS.ministere,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/ministere/${r.id}`,
        libelle: r.ministere.nom,
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.ministere,
        transitionAction: TRANSITION_ACTIONS.ministere,
        revertAction: REVERT_ACTIONS.ministere,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.ministere,
      };
    }),
    ...province.map((r) => {
      const montantValue = sumMontants(r.recettesPropres, r.retrocessions);
      return {
        id: r.id,
        domain: "province" as const,
        domainLabel: DOMAIN_LABELS.province,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/province/${r.id}`,
        libelle: r.province.nom,
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.province,
        transitionAction: TRANSITION_ACTIONS.province,
        revertAction: REVERT_ACTIONS.province,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.province,
      };
    }),
    ...tresor.map((r) => {
      const montantValue = toMontantValue(r.soldeCompteGeneral);
      return {
        id: r.id,
        domain: "tresor" as const,
        domainLabel: DOMAIN_LABELS.tresor,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/tresor/${r.id}`,
        libelle: "Trésorerie",
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.tresor,
        transitionAction: TRANSITION_ACTIONS.tresor,
        revertAction: REVERT_ACTIONS.tresor,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.tresor,
      };
    }),
    ...dette.map((r) => {
      const montantValue = toMontantValue(r.encoursExterieure);
      return {
        id: r.id,
        domain: "dette" as const,
        domainLabel: DOMAIN_LABELS.dette,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/dette/${r.id}`,
        libelle: "Dette publique",
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.dette,
        transitionAction: TRANSITION_ACTIONS.dette,
        revertAction: REVERT_ACTIONS.dette,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.dette,
      };
    }),
    ...recettes.map((r) => {
      const montantValue = sumMontants(r.recettesFiscales, r.recettesDouanieres, r.recettesMinieres, r.recettesNonFiscales, r.dons);
      return {
        id: r.id,
        domain: "recettes" as const,
        domainLabel: DOMAIN_LABELS.recettes,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/recettes/${r.id}`,
        libelle: "Recettes",
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.recettes,
        transitionAction: TRANSITION_ACTIONS.recettes,
        revertAction: REVERT_ACTIONS.recettes,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.recettes,
      };
    }),
    ...macro.map((r) => {
      const montantValue = toMontantValue(r.pib);
      return {
        id: r.id,
        domain: "macro" as const,
        domainLabel: DOMAIN_LABELS.macro,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/macro/${r.id}`,
        libelle: "Indicateurs macro",
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.macro,
        transitionAction: TRANSITION_ACTIONS.macro,
        revertAction: REVERT_ACTIONS.macro,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.macro,
      };
    }),
  ].sort((a, b) => (a.periode < b.periode ? 1 : -1));
}

/** Variante de mapQueueRows limitée au ministère et à la province, pour les files DGF/BCC. */
function mapQueueRowsMP(
  ministere: { id: string; reference: string; periode: string; statut: StatutSaisie; ministere: { nom: string }; montantDemande: unknown }[],
  province: { id: string; reference: string; periode: string; statut: StatutSaisie; province: { nom: string }; recettesPropres: unknown; retrocessions: unknown }[],
): PaiementQueueRow[] {
  return [
    ...ministere.map((r) => {
      const montantValue = toMontantValue(r.montantDemande);
      return {
        id: r.id,
        domain: "ministere" as const,
        domainLabel: DOMAIN_LABELS.ministere,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/ministere/${r.id}`,
        libelle: r.ministere.nom,
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.ministere,
        transitionAction: TRANSITION_ACTIONS.ministere,
        revertAction: REVERT_ACTIONS.ministere,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.ministere,
        renvoiValidationAction: RENVOI_VALIDATION_ACTIONS.ministere,
        soumettreOpAction: SOUMETTRE_OP_ACTIONS.ministere,
        confirmerExecutionAction: CONFIRMER_EXECUTION_ACTIONS.ministere,
      };
    }),
    ...province.map((r) => {
      const montantValue = sumMontants(r.recettesPropres, r.retrocessions);
      return {
        id: r.id,
        domain: "province" as const,
        domainLabel: DOMAIN_LABELS.province,
        reference: r.reference,
        periode: r.periode,
        statut: r.statut,
        editHref: `/saisie/province/${r.id}`,
        libelle: r.province.nom,
        montant: formatMontant(montantValue),
        montantValue,
        rapportAction: RAPPORT_ACTIONS.province,
        transitionAction: TRANSITION_ACTIONS.province,
        revertAction: REVERT_ACTIONS.province,
        revertSoumisAction: REVERT_SOUMIS_ACTIONS.province,
        renvoiValidationAction: RENVOI_VALIDATION_ACTIONS.province,
        soumettreOpAction: SOUMETTRE_OP_ACTIONS.province,
        confirmerExecutionAction: CONFIRMER_EXECUTION_ACTIONS.province,
      };
    }),
  ].sort((a, b) => (a.periode < b.periode ? 1 : -1));
}

const RAPPORT_ACTIONS: Record<Domain, (id: string) => Promise<RapportData | null>> = {
  ministere: getRapportLigneBudgetaire,
  province: getRapportSaisieProvince,
  tresor: getRapportSaisieTresor,
  dette: getRapportSaisieDette,
  recettes: getRapportSaisieRecettes,
  macro: getRapportSaisieMacro,
};

const RENVOI_VALIDATION_ACTIONS: Record<"ministere" | "province", (formData: FormData) => void> = {
  ministere: renvoyerValidationLigneBudgetaire,
  province: renvoyerValidationSaisieProvince,
};
const SOUMETTRE_OP_ACTIONS: Record<"ministere" | "province", (formData: FormData) => void> = {
  ministere: soumettreOrdrePaiementLigneBudgetaire,
  province: soumettreOrdrePaiementSaisieProvince,
};
const CONFIRMER_EXECUTION_ACTIONS: Record<"ministere" | "province", (formData: FormData) => void> = {
  ministere: confirmerExecutionLigneBudgetaire,
  province: confirmerExecutionSaisieProvince,
};

async function AdminQueue() {
  const [pendingData, publishedData, payeesData] = await Promise.all([
    Promise.all([
      prisma.ligneBudgetaire.findMany({ where: { statut: { in: ["SOUMIS", "VALIDE"] } }, include: { ministere: true } }),
      prisma.saisieProvince.findMany({ where: { statut: { in: ["SOUMIS", "VALIDE"] } }, include: { province: true } }),
      prisma.saisieTresor.findMany({ where: { statut: { in: ["SOUMIS", "VALIDE"] } } }),
      prisma.saisieDette.findMany({ where: { statut: { in: ["SOUMIS", "VALIDE"] } } }),
      prisma.saisieRecettes.findMany({ where: { statut: { in: ["SOUMIS", "VALIDE"] } } }),
      prisma.saisieMacro.findMany({ where: { statut: { in: ["SOUMIS", "VALIDE"] } } }),
    ]),
    Promise.all([
      prisma.ligneBudgetaire.findMany({ where: { statut: "PUBLIE" }, include: { ministere: true } }),
      prisma.saisieProvince.findMany({ where: { statut: "PUBLIE" }, include: { province: true } }),
      prisma.saisieTresor.findMany({ where: { statut: "PUBLIE" } }),
      prisma.saisieDette.findMany({ where: { statut: "PUBLIE" } }),
      prisma.saisieRecettes.findMany({ where: { statut: "PUBLIE" } }),
      prisma.saisieMacro.findMany({ where: { statut: "PUBLIE" } }),
    ]),
    Promise.all([
      prisma.ligneBudgetaire.findMany({ where: { statut: "PAYE" }, include: { ministere: true } }),
      prisma.saisieProvince.findMany({ where: { statut: "PAYE" }, include: { province: true } }),
    ]),
  ]);

  const enAttente = mapQueueRows(...pendingData);
  const publiees = mapQueueRows(...publishedData);
  const payees = mapQueueRowsMP(...payeesData);

  return (
    <UtilityShell
      eyebrow="Administration"
      title="Validation des saisies"
      subtitle="Saisies soumises par les points focaux, en attente ou déjà publiées."
    >
      <AutoRefresh />
      <SaisiesTable
        title={`${enAttente.length} saisie(s) en attente`}
        description="Valider fait passer une saisie soumise à l'état validé ; publier la rend officielle."
        emptyMessage="Aucune saisie en attente de validation ou de publication."
        rows={enAttente}
        actionable
      />
      <SaisiesTable
        title={`${publiees.length} saisie(s) publiée(s)`}
        description="Données actuellement visibles sur le tableau de bord public."
        emptyMessage="Aucune saisie publiée pour le moment."
        rows={publiees}
        actionable={false}
      />
      <SaisiesTable
        title={`${payees.length} saisie(s) payée(s)`}
        description="Ordres de paiement exécutés par la Banque Centrale du Congo."
        emptyMessage="Aucune saisie payée pour le moment."
        rows={payees}
        actionable={false}
      />
    </UtilityShell>
  );
}
