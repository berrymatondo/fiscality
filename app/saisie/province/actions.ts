"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole, requireSession, ADMIN_ROLES } from "@/lib/rbac";
import { NEXT_STATUT, isOwnerTransition, canRevertToBrouillon, canRevertToSoumis } from "@/lib/workflow";
import { notifySaisieSoumise, notifySaisieStatutChange, notifyRole, notifyUser } from "@/lib/notifications";
import { DOMAIN_LABELS } from "@/lib/documents";
import { logAudit, getAuditTrail } from "@/lib/audit";
import { slugifyCode, formatReference } from "@/lib/reference";
import { STATUT_LABELS, formatMontant } from "@/components/dashboard/saisie/shared";
import type { RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";
import type { Role } from "@/lib/roles";

function parseAmount(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  return raw === "" ? null : raw;
}

export async function saveSaisieProvince(formData: FormData) {
  const session = await requireRole(["PROVINCE_FOCAL"]);
  const provinceId = session.user.provinceId;

  if (!provinceId) {
    throw new Error("Ce compte n'est rattaché à aucune province.");
  }

  const periode = String(formData.get("periode") ?? "");
  if (!/^\d{4}-\d{2}$/.test(periode)) {
    throw new Error("Période invalide.");
  }

  const existing = await prisma.saisieProvince.findUnique({
    where: { provinceId_periode: { provinceId, periode } },
  });
  if (existing && existing.statut !== "BROUILLON") {
    throw new Error("Cette saisie a été soumise et ne peut plus être modifiée directement.");
  }

  const exercice = Number(periode.slice(0, 4));
  const intent = String(formData.get("intent") ?? "brouillon");
  const statut = intent === "soumettre" ? "SOUMIS" : "BROUILLON";

  const data = {
    exercice,
    tauxExecution: parseAmount(formData.get("tauxExecution")),
    recettesPropres: parseAmount(formData.get("recettesPropres")),
    retrocessions: parseAmount(formData.get("retrocessions")),
    commentaire: String(formData.get("commentaire") ?? "").trim() || null,
    statut,
    auteurId: session.user.id,
  } as const;

  let reference: string | undefined;
  if (!existing) {
    const province = await prisma.province.findUniqueOrThrow({ where: { id: provinceId } });
    const code = slugifyCode(province.nom);
    const seq = (await prisma.saisieProvince.count({ where: { provinceId, periode } })) + 1;
    reference = formatReference(code, periode, seq);
  }

  const saisie = await prisma.saisieProvince.upsert({
    where: { provinceId_periode: { provinceId, periode } },
    create: { provinceId, periode, reference: reference!, ...data },
    update: data,
  });

  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: existing ? "Modification" : "Création",
    statutAvant: existing?.statut ?? null,
    statutApres: statut,
    userId: session.user.id,
  });

  if (statut === "SOUMIS") {
    await notifySaisieSoumise("province", saisie.id, saisie.periode);
  }

  revalidatePath("/saisie");
  redirect("/saisie");
}

export async function deleteSaisieProvince(formData: FormData) {
  const session = await requireRole(["PROVINCE_FOCAL"]);
  const id = String(formData.get("id") ?? "");

  const saisie = await prisma.saisieProvince.findUnique({ where: { id } });
  if (!saisie || saisie.provinceId !== session.user.provinceId) {
    throw new Error("Saisie introuvable.");
  }
  if (saisie.statut !== "BROUILLON") {
    throw new Error("Seule une saisie en brouillon peut être supprimée.");
  }

  await prisma.saisieProvince.delete({ where: { id } });
  await logAudit({
    domain: "province",
    recordId: id,
    action: "Suppression",
    statutAvant: saisie.statut,
    statutApres: null,
    userId: session.user.id,
  });

  revalidatePath("/saisie");
}

export async function revertSaisieProvinceToBrouillon(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const role = session.user.role as Role;
  if (!ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const saisie = await prisma.saisieProvince.findUniqueOrThrow({ where: { id } });
  if (!canRevertToBrouillon(saisie.statut)) {
    throw new Error("Seule une saisie soumise peut être renvoyée en brouillon.");
  }

  await prisma.saisieProvince.update({ where: { id }, data: { statut: "BROUILLON" } });
  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: "Renvoi en brouillon",
    statutAvant: saisie.statut,
    statutApres: "BROUILLON",
    userId: session.user.id,
  });
  await notifySaisieStatutChange("province", saisie.id, saisie.periode, saisie.auteurId, "Saisie renvoyée en brouillon");

  revalidatePath("/saisie");
}

export async function revertSaisieProvinceToSoumis(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const role = session.user.role as Role;
  if (!ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const saisie = await prisma.saisieProvince.findUniqueOrThrow({ where: { id } });
  if (!canRevertToSoumis(saisie.statut)) {
    throw new Error("Seule une saisie validée peut être renvoyée en soumission.");
  }

  await prisma.saisieProvince.update({ where: { id }, data: { statut: "SOUMIS" } });
  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: "Renvoi en soumission (DGB)",
    statutAvant: saisie.statut,
    statutApres: "SOUMIS",
    userId: session.user.id,
  });
  await notifySaisieStatutChange("province", saisie.id, saisie.periode, saisie.auteurId, "Saisie renvoyée en soumission");

  revalidatePath("/saisie");
}

export async function transitionSaisieProvince(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const saisie = await prisma.saisieProvince.findUniqueOrThrow({ where: { id } });
  const next = NEXT_STATUT[saisie.statut];
  if (!next) throw new Error("Aucune transition possible depuis ce statut.");

  const role = session.user.role as Role;
  if (isOwnerTransition(saisie.statut)) {
    if (role !== "PROVINCE_FOCAL" || saisie.provinceId !== session.user.provinceId) {
      throw new Error("Non autorisé.");
    }
  } else if (!ADMIN_ROLES.includes(role)) {
    throw new Error("Non autorisé.");
  }

  await prisma.saisieProvince.update({ where: { id }, data: { statut: next } });
  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: `Transition ${saisie.statut} → ${next}`,
    statutAvant: saisie.statut,
    statutApres: next,
    userId: session.user.id,
  });

  if (next === "SOUMIS") {
    await notifySaisieSoumise("province", saisie.id, saisie.periode);
  } else if (next === "VALIDE") {
    await notifySaisieStatutChange("province", saisie.id, saisie.periode, saisie.auteurId, "Saisie validée");
  } else if (next === "PUBLIE") {
    await notifySaisieStatutChange("province", saisie.id, saisie.periode, saisie.auteurId, "Saisie publiée");
    await notifyRole(
      "ADMIN_DGF",
      "Nouvelle saisie publiée à traiter",
      `${DOMAIN_LABELS.province} — période ${saisie.periode}`,
      `/saisie/province/${saisie.id}`,
    );
  }

  revalidatePath("/saisie");
}

export async function renvoyerValidationSaisieProvince(formData: FormData) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role !== "ADMIN_DGF" && !ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const id = String(formData.get("id") ?? "");
  const saisie = await prisma.saisieProvince.findUniqueOrThrow({ where: { id } });
  if (saisie.statut !== "PUBLIE") {
    throw new Error("Seule une saisie publiée peut être renvoyée à la validation.");
  }

  await prisma.saisieProvince.update({ where: { id }, data: { statut: "SOUMIS" } });
  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: "Renvoi à la validation (DGF)",
    statutAvant: "PUBLIE",
    statutApres: "SOUMIS",
    userId: session.user.id,
  });
  await notifyRole(
    "ADMIN_DGB",
    "Saisie renvoyée à la validation",
    `${DOMAIN_LABELS.province} — période ${saisie.periode}`,
    `/saisie/province/${saisie.id}`,
  );

  revalidatePath("/saisie");
}

export async function soumettreOrdrePaiementSaisieProvince(formData: FormData) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role !== "ADMIN_DGF" && !ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const id = String(formData.get("id") ?? "");
  const saisie = await prisma.saisieProvince.findUniqueOrThrow({ where: { id } });
  if (saisie.statut !== "PUBLIE") {
    throw new Error("Seule une saisie publiée peut faire l'objet d'un ordre de paiement.");
  }

  await prisma.saisieProvince.update({ where: { id }, data: { statut: "OP_SOUMIS" } });
  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: "Soumission de l'ordre de paiement (DGF)",
    statutAvant: "PUBLIE",
    statutApres: "OP_SOUMIS",
    userId: session.user.id,
  });
  await notifyRole(
    "BCC",
    "Ordre de paiement à exécuter",
    `${DOMAIN_LABELS.province} — période ${saisie.periode}`,
    `/saisie/province/${saisie.id}`,
  );

  revalidatePath("/saisie");
}

export async function confirmerExecutionSaisieProvince(formData: FormData) {
  const session = await requireSession();
  const role = session.user.role as Role;
  if (role !== "BCC" && !ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const id = String(formData.get("id") ?? "");
  const saisie = await prisma.saisieProvince.findUniqueOrThrow({ where: { id } });
  if (saisie.statut !== "OP_SOUMIS") {
    throw new Error("Cet ordre de paiement n'est pas en attente d'exécution.");
  }

  await prisma.saisieProvince.update({ where: { id }, data: { statut: "PAYE" } });
  await logAudit({
    domain: "province",
    recordId: saisie.id,
    action: "Confirmation d'exécution du paiement (BCC)",
    statutAvant: "OP_SOUMIS",
    statutApres: "PAYE",
    userId: session.user.id,
  });

  const message = `${DOMAIN_LABELS.province} — période ${saisie.periode}`;
  const lien = `/saisie/province/${saisie.id}`;
  await notifyUser(saisie.auteurId, "Paiement exécuté", message, lien);
  await notifyRole("ADMIN_DGB", "Paiement exécuté", message, lien);
  await notifyRole("ADMIN_DGF", "Paiement exécuté", message, lien);

  revalidatePath("/saisie");
}

export async function getRapportSaisieProvince(id: string): Promise<RapportData | null> {
  const session = await requireSession();
  const role = session.user.role as Role;

  const saisie = await prisma.saisieProvince.findUnique({
    where: { id },
    include: { province: true },
  });
  if (!saisie) return null;

  const isAllowed =
    ADMIN_ROLES.includes(role) ||
    role === "ADMIN_DGF" ||
    role === "BCC" ||
    (role === "PROVINCE_FOCAL" && saisie.provinceId === session.user.provinceId);
  if (!isAllowed) throw new Error("Non autorisé.");

  const historique = await getAuditTrail("province", saisie.id);

  return {
    titre: "Saisie province",
    sousTitre: `${saisie.province.nom} — période ${saisie.periode}`,
    fileName: `${saisie.reference}.pdf`,
    champs: [
      { label: "Référence", value: saisie.reference },
      { label: "Province", value: saisie.province.nom },
      { label: "Période", value: saisie.periode },
      { label: "Taux d'exécution", value: formatMontant(saisie.tauxExecution, " %") },
      { label: "Recettes propres", value: formatMontant(saisie.recettesPropres) },
      { label: "Rétrocessions", value: formatMontant(saisie.retrocessions) },
      { label: "Statut", value: STATUT_LABELS[saisie.statut] },
      { label: "Commentaire", value: saisie.commentaire ?? "—" },
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
