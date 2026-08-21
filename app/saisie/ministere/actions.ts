"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole, requireSession, ADMIN_ROLES } from "@/lib/rbac";
import { NEXT_STATUT, isOwnerTransition, canRevertToBrouillon, canRevertToSoumis } from "@/lib/workflow";
import { MAX_UPLOAD_SIZE, DOMAIN_LABELS } from "@/lib/documents";
import { notifySaisieSoumise, notifySaisieStatutChange, notifyRole, notifyUser } from "@/lib/notifications";
import { logAudit, getAuditTrail } from "@/lib/audit";
import { slugifyCode, formatReference } from "@/lib/reference";
import { formatUsdFromCdf } from "@/lib/currency";
import { DEFAULT_USD_CDF_EXCHANGE_RATE } from "@/lib/settings";
import { TYPE_PREVISION_LABELS } from "@/lib/rubriques";
import { STATUT_LABELS, formatMontant } from "@/components/dashboard/saisie/shared";
import type { RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";
import type { Role } from "@/lib/roles";
import type { TypePrevision, StatutSaisie } from "@/lib/generated/prisma/client";

const TYPES_PREVISION: TypePrevision[] = ["INVESTISSEMENT", "BIENS_SERVICES", "PERSONNEL"];

function parseAmount(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  return raw === "" ? null : raw;
}

export async function saveLigneBudgetaire(formData: FormData) {
  const session = await requireRole(["MINISTERE_FOCAL"]);
  const ministereId = session.user.ministereId;

  if (!ministereId) {
    throw new Error("Ce compte n'est rattaché à aucun ministère.");
  }

  const id = String(formData.get("id") ?? "") || null;

  const periode = String(formData.get("periode") ?? "");
  if (!/^\d{4}-\d{2}$/.test(periode)) {
    throw new Error("Période invalide.");
  }

  let existing: Awaited<ReturnType<typeof prisma.ligneBudgetaire.findUnique>> = null;
  if (id) {
    existing = await prisma.ligneBudgetaire.findUnique({ where: { id } });
    if (!existing || existing.ministereId !== ministereId) {
      throw new Error("Saisie introuvable.");
    }
    if (existing.statut !== "BROUILLON") {
      throw new Error("Cette saisie a été soumise et ne peut plus être modifiée directement.");
    }
  }

  const entiteId = String(formData.get("entiteId") ?? "") || null;
  let entiteCode: string | null = null;
  if (entiteId) {
    const entite = await prisma.entite.findUnique({ where: { id: entiteId } });
    if (!entite || entite.ministereId !== ministereId) {
      throw new Error("Entité invalide.");
    }
    entiteCode = slugifyCode(entite.sigle);
  }

  const typePrevision = String(formData.get("typePrevision") ?? "") as TypePrevision;
  if (!TYPES_PREVISION.includes(typePrevision)) {
    throw new Error("Type de prévision invalide.");
  }

  const rubrique = String(formData.get("rubrique") ?? "").trim();
  if (!rubrique) {
    throw new Error("La rubrique est requise.");
  }

  const fichiers = formData.getAll("fichiers").filter((f): f is File => f instanceof File && f.size > 0);
  for (const fichier of fichiers) {
    if (fichier.size > MAX_UPLOAD_SIZE) {
      throw new Error(`Fichier « ${fichier.name} » trop volumineux (5 Mo maximum).`);
    }
  }

  const exercice = Number(periode.slice(0, 4));
  const intent = String(formData.get("intent") ?? "brouillon");
  const statut: StatutSaisie = intent === "soumettre" ? "SOUMIS" : "BROUILLON";

  const data = {
    ministereId,
    entiteId,
    exercice,
    periode,
    typePrevision,
    rubrique,
    objet: String(formData.get("objet") ?? "").trim() || null,
    montantDemande: parseAmount(formData.get("montantDemande")),
    priorite: String(formData.get("priorite") ?? "").trim() || null,
    commentaire: String(formData.get("commentaire") ?? "").trim() || null,
    statut,
    auteurId: session.user.id,
  };

  let ligne;
  if (id) {
    ligne = await prisma.ligneBudgetaire.update({ where: { id }, data });
  } else {
    if (!entiteCode) {
      const ministere = await prisma.ministere.findUniqueOrThrow({ where: { id: ministereId } });
      entiteCode = slugifyCode(ministere.nom);
    }
    const seq = (await prisma.ligneBudgetaire.count({ where: { ministereId, entiteId, periode } })) + 1;
    const reference = formatReference(entiteCode, periode, seq);
    ligne = await prisma.ligneBudgetaire.create({ data: { ...data, reference } });
  }

  if (fichiers.length > 0) {
    for (const fichier of fichiers) {
      const buffer = Buffer.from(await fichier.arrayBuffer());
      await prisma.pieceJointe.create({
        data: {
          nom: fichier.name,
          typeMime: fichier.type || "application/octet-stream",
          taille: fichier.size,
          contenu: buffer,
          auteurId: session.user.id,
          ligneBudgetaireId: ligne.id,
        },
      });
    }
  }

  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: existing ? "Modification" : "Création",
    statutAvant: existing?.statut ?? null,
    statutApres: statut,
    userId: session.user.id,
  });

  if (statut === "SOUMIS") {
    await notifySaisieSoumise("ministere", ligne.id, ligne.periode);
  }

  revalidatePath("/saisie");
  redirect("/saisie");
}

export async function deleteLigneBudgetaire(formData: FormData) {
  const session = await requireRole(["MINISTERE_FOCAL"]);
  const id = String(formData.get("id") ?? "");

  const ligne = await prisma.ligneBudgetaire.findUnique({ where: { id } });
  if (!ligne || ligne.ministereId !== session.user.ministereId) {
    throw new Error("Saisie introuvable.");
  }
  if (ligne.statut !== "BROUILLON") {
    throw new Error("Seule une saisie en brouillon peut être supprimée.");
  }

  await prisma.ligneBudgetaire.delete({ where: { id } });
  await logAudit({
    domain: "ministere",
    recordId: id,
    action: "Suppression",
    statutAvant: ligne.statut,
    statutApres: null,
    userId: session.user.id,
  });

  revalidatePath("/saisie");
}

export async function revertLigneBudgetaireToBrouillon(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const role = session.user.role as Role;
  if (!ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const ligne = await prisma.ligneBudgetaire.findUniqueOrThrow({ where: { id } });
  if (!canRevertToBrouillon(ligne.statut)) {
    throw new Error("Seule une saisie soumise peut être renvoyée en brouillon.");
  }

  await prisma.ligneBudgetaire.update({ where: { id }, data: { statut: "BROUILLON" } });
  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: "Renvoi en brouillon",
    statutAvant: ligne.statut,
    statutApres: "BROUILLON",
    userId: session.user.id,
  });
  await notifySaisieStatutChange("ministere", ligne.id, ligne.periode, ligne.auteurId, "Saisie renvoyée en brouillon");

  revalidatePath("/saisie");
}

export async function revertLigneBudgetaireToSoumis(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const role = session.user.role as Role;
  if (!ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const ligne = await prisma.ligneBudgetaire.findUniqueOrThrow({ where: { id } });
  if (!canRevertToSoumis(ligne.statut)) {
    throw new Error("Seule une saisie validée peut être renvoyée en soumission.");
  }

  await prisma.ligneBudgetaire.update({ where: { id }, data: { statut: "SOUMIS" } });
  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: "Renvoi en soumission (DGB)",
    statutAvant: ligne.statut,
    statutApres: "SOUMIS",
    userId: session.user.id,
  });
  await notifySaisieStatutChange("ministere", ligne.id, ligne.periode, ligne.auteurId, "Saisie renvoyée en soumission");

  revalidatePath("/saisie");
}

export async function transitionLigneBudgetaire(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const ligne = await prisma.ligneBudgetaire.findUniqueOrThrow({ where: { id } });
  const next = NEXT_STATUT[ligne.statut];
  if (!next) throw new Error("Aucune transition possible depuis ce statut.");

  const role = session.user.role as Role;
  if (isOwnerTransition(ligne.statut)) {
    if (role !== "MINISTERE_FOCAL" || ligne.ministereId !== session.user.ministereId) {
      throw new Error("Non autorisé.");
    }
  } else if (!ADMIN_ROLES.includes(role)) {
    throw new Error("Non autorisé.");
  }

  await prisma.ligneBudgetaire.update({ where: { id }, data: { statut: next } });
  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: `Transition ${ligne.statut} → ${next}`,
    statutAvant: ligne.statut,
    statutApres: next,
    userId: session.user.id,
  });

  if (next === "SOUMIS") {
    await notifySaisieSoumise("ministere", ligne.id, ligne.periode);
  } else if (next === "VALIDE") {
    await notifySaisieStatutChange("ministere", ligne.id, ligne.periode, ligne.auteurId, "Saisie validée");
  } else if (next === "PUBLIE") {
    await notifySaisieStatutChange("ministere", ligne.id, ligne.periode, ligne.auteurId, "Saisie publiée");
    await notifyRole(
      "ADMIN_DGF",
      "Nouvelle saisie publiée à traiter",
      `${DOMAIN_LABELS.ministere} — période ${ligne.periode}`,
      `/saisie/ministere/${ligne.id}`,
    );
  }

  revalidatePath("/saisie");
}

export async function renvoyerValidationLigneBudgetaire(formData: FormData) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role !== "ADMIN_DGF" && !ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const id = String(formData.get("id") ?? "");
  const ligne = await prisma.ligneBudgetaire.findUniqueOrThrow({ where: { id } });
  if (ligne.statut !== "PUBLIE") {
    throw new Error("Seule une saisie publiée peut être renvoyée à la validation.");
  }

  await prisma.ligneBudgetaire.update({ where: { id }, data: { statut: "SOUMIS" } });
  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: "Renvoi à la validation (DGF)",
    statutAvant: "PUBLIE",
    statutApres: "SOUMIS",
    userId: session.user.id,
  });
  await notifyRole(
    "ADMIN_DGB",
    "Saisie renvoyée à la validation",
    `${DOMAIN_LABELS.ministere} — période ${ligne.periode}`,
    `/saisie/ministere/${ligne.id}`,
  );

  revalidatePath("/saisie");
}

export async function soumettreOrdrePaiementLigneBudgetaire(formData: FormData) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role !== "ADMIN_DGF" && !ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const id = String(formData.get("id") ?? "");
  const ligne = await prisma.ligneBudgetaire.findUniqueOrThrow({ where: { id } });
  if (ligne.statut !== "PUBLIE") {
    throw new Error("Seule une saisie publiée peut faire l'objet d'un ordre de paiement.");
  }

  await prisma.ligneBudgetaire.update({ where: { id }, data: { statut: "OP_SOUMIS" } });
  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: "Soumission de l'ordre de paiement (DGF)",
    statutAvant: "PUBLIE",
    statutApres: "OP_SOUMIS",
    userId: session.user.id,
  });
  await notifyRole(
    "BCC",
    "Ordre de paiement à exécuter",
    `${DOMAIN_LABELS.ministere} — période ${ligne.periode}`,
    `/saisie/ministere/${ligne.id}`,
  );

  revalidatePath("/saisie");
}

export async function confirmerExecutionLigneBudgetaire(formData: FormData) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role !== "BCC" && !ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const id = String(formData.get("id") ?? "");
  const ligne = await prisma.ligneBudgetaire.findUniqueOrThrow({ where: { id } });
  if (ligne.statut !== "OP_SOUMIS") {
    throw new Error("Cet ordre de paiement n'est pas en attente d'exécution.");
  }

  await prisma.ligneBudgetaire.update({ where: { id }, data: { statut: "PAYE" } });
  await logAudit({
    domain: "ministere",
    recordId: ligne.id,
    action: "Confirmation d'exécution du paiement (BCC)",
    statutAvant: "OP_SOUMIS",
    statutApres: "PAYE",
    userId: session.user.id,
  });

  const message = `${DOMAIN_LABELS.ministere} — période ${ligne.periode}`;
  const lien = `/saisie/ministere/${ligne.id}`;
  await notifyUser(ligne.auteurId, "Paiement exécuté", message, lien);
  await notifyRole("ADMIN_DGB", "Paiement exécuté", message, lien);
  await notifyRole("ADMIN_DGF", "Paiement exécuté", message, lien);

  revalidatePath("/saisie");
}

export async function getRapportLigneBudgetaire(id: string): Promise<RapportData | null> {
  const session = await requireSession();
  const role = session.user.role as Role;

  const ligne = await prisma.ligneBudgetaire.findUnique({
    where: { id },
    include: { ministere: true, entite: true },
  });
  if (!ligne) return null;

  const isAllowed =
    ADMIN_ROLES.includes(role) ||
    role === "ADMIN_DGF" ||
    role === "BCC" ||
    (role === "MINISTERE_FOCAL" && ligne.ministereId === session.user.ministereId);
  if (!isAllowed) throw new Error("Non autorisé.");

  const historique = await getAuditTrail("ministere", ligne.id);

  return {
    titre: "Demande budgétaire",
    sousTitre: `${ligne.ministere.nom} — période ${ligne.periode}`,
    fileName: `${ligne.reference}.pdf`,
    champs: [
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
    ],
    historique: historique.map((h) => ({
      action: h.action,
      statutAvant: h.statutAvant,
      statutApres: h.statutApres,
      auteur: h.auteur,
      date: h.createdAt.toLocaleString("fr-FR"),
    })),
  };
}
