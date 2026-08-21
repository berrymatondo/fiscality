"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole, requireSession, ADMIN_ROLES } from "@/lib/rbac";
import { NEXT_STATUT, isOwnerTransition, canRevertToBrouillon, canRevertToSoumis } from "@/lib/workflow";
import { notifySaisieSoumise, notifySaisieStatutChange } from "@/lib/notifications";
import { logAudit, getAuditTrail } from "@/lib/audit";
import { formatReference } from "@/lib/reference";
import { STATUT_LABELS, formatMontant } from "@/components/dashboard/saisie/shared";
import type { RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";
import type { Role } from "@/lib/roles";

function parseAmount(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  return raw === "" ? null : raw;
}

export async function saveSaisieTresor(formData: FormData) {
  const session = await requireRole(["TRESOR_DGTCP"]);

  const periode = String(formData.get("periode") ?? "");
  if (!/^\d{4}-\d{2}$/.test(periode)) {
    throw new Error("Période invalide.");
  }

  const existing = await prisma.saisieTresor.findUnique({ where: { periode } });
  if (existing && existing.statut !== "BROUILLON") {
    throw new Error("Cette saisie a été soumise et ne peut plus être modifiée directement.");
  }

  const exercice = Number(periode.slice(0, 4));
  const intent = String(formData.get("intent") ?? "brouillon");
  const statut = intent === "soumettre" ? "SOUMIS" : "BROUILLON";

  const data = {
    exercice,
    soldeCompteGeneral: parseAmount(formData.get("soldeCompteGeneral")),
    soldeBancaire: parseAmount(formData.get("soldeBancaire")),
    engagementsAttente: parseAmount(formData.get("engagementsAttente")),
    arrieres: parseAmount(formData.get("arrieres")),
    commentaire: String(formData.get("commentaire") ?? "").trim() || null,
    statut,
    auteurId: session.user.id,
  } as const;

  let reference: string | undefined;
  if (!existing) {
    const seq = (await prisma.saisieTresor.count({ where: { periode } })) + 1;
    reference = formatReference("DGTCP", periode, seq);
  }

  const saisie = await prisma.saisieTresor.upsert({
    where: { periode },
    create: { periode, reference: reference!, ...data },
    update: data,
  });

  await logAudit({
    domain: "tresor",
    recordId: saisie.id,
    action: existing ? "Modification" : "Création",
    statutAvant: existing?.statut ?? null,
    statutApres: statut,
    userId: session.user.id,
  });

  if (statut === "SOUMIS") {
    await notifySaisieSoumise("tresor", saisie.id, saisie.periode);
  }

  revalidatePath("/saisie");
  redirect("/saisie");
}

export async function deleteSaisieTresor(formData: FormData) {
  const session = await requireRole(["TRESOR_DGTCP"]);
  const id = String(formData.get("id") ?? "");

  const saisie = await prisma.saisieTresor.findUnique({ where: { id } });
  if (!saisie) throw new Error("Saisie introuvable.");
  if (saisie.statut !== "BROUILLON") {
    throw new Error("Seule une saisie en brouillon peut être supprimée.");
  }

  await prisma.saisieTresor.delete({ where: { id } });
  await logAudit({
    domain: "tresor",
    recordId: id,
    action: "Suppression",
    statutAvant: saisie.statut,
    statutApres: null,
    userId: session.user.id,
  });

  revalidatePath("/saisie");
}

export async function revertSaisieTresorToBrouillon(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const role = session.user.role as Role;
  if (!ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const saisie = await prisma.saisieTresor.findUniqueOrThrow({ where: { id } });
  if (!canRevertToBrouillon(saisie.statut)) {
    throw new Error("Seule une saisie soumise peut être renvoyée en brouillon.");
  }

  await prisma.saisieTresor.update({ where: { id }, data: { statut: "BROUILLON" } });
  await logAudit({
    domain: "tresor",
    recordId: saisie.id,
    action: "Renvoi en brouillon",
    statutAvant: saisie.statut,
    statutApres: "BROUILLON",
    userId: session.user.id,
  });
  await notifySaisieStatutChange("tresor", saisie.id, saisie.periode, saisie.auteurId, "Saisie renvoyée en brouillon");

  revalidatePath("/saisie");
}

export async function revertSaisieTresorToSoumis(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const role = session.user.role as Role;
  if (!ADMIN_ROLES.includes(role)) throw new Error("Non autorisé.");

  const saisie = await prisma.saisieTresor.findUniqueOrThrow({ where: { id } });
  if (!canRevertToSoumis(saisie.statut)) {
    throw new Error("Seule une saisie validée peut être renvoyée en soumission.");
  }

  await prisma.saisieTresor.update({ where: { id }, data: { statut: "SOUMIS" } });
  await logAudit({
    domain: "tresor",
    recordId: saisie.id,
    action: "Renvoi en soumission (DGB)",
    statutAvant: saisie.statut,
    statutApres: "SOUMIS",
    userId: session.user.id,
  });
  await notifySaisieStatutChange("tresor", saisie.id, saisie.periode, saisie.auteurId, "Saisie renvoyée en soumission");

  revalidatePath("/saisie");
}

export async function transitionSaisieTresor(formData: FormData) {
  const session = await requireSession();
  const id = String(formData.get("id") ?? "");

  const saisie = await prisma.saisieTresor.findUniqueOrThrow({ where: { id } });
  const next = NEXT_STATUT[saisie.statut];
  if (!next) throw new Error("Aucune transition possible depuis ce statut.");

  const role = session.user.role as Role;
  if (isOwnerTransition(saisie.statut)) {
    if (role !== "TRESOR_DGTCP") throw new Error("Non autorisé.");
  } else if (!ADMIN_ROLES.includes(role)) {
    throw new Error("Non autorisé.");
  }

  await prisma.saisieTresor.update({ where: { id }, data: { statut: next } });
  await logAudit({
    domain: "tresor",
    recordId: saisie.id,
    action: `Transition ${saisie.statut} → ${next}`,
    statutAvant: saisie.statut,
    statutApres: next,
    userId: session.user.id,
  });

  if (next === "SOUMIS") {
    await notifySaisieSoumise("tresor", saisie.id, saisie.periode);
  } else if (next === "VALIDE") {
    await notifySaisieStatutChange("tresor", saisie.id, saisie.periode, saisie.auteurId, "Saisie validée");
  } else if (next === "PUBLIE") {
    await notifySaisieStatutChange("tresor", saisie.id, saisie.periode, saisie.auteurId, "Saisie publiée");
  }

  revalidatePath("/saisie");
}

export async function getRapportSaisieTresor(id: string): Promise<RapportData | null> {
  const session = await requireSession();
  const role = session.user.role as Role;

  const saisie = await prisma.saisieTresor.findUnique({ where: { id } });
  if (!saisie) return null;

  const isAllowed = ADMIN_ROLES.includes(role) || role === "TRESOR_DGTCP";
  if (!isAllowed) throw new Error("Non autorisé.");

  const historique = await getAuditTrail("tresor", saisie.id);

  return {
    titre: "Situation de trésorerie",
    sousTitre: `Direction Générale du Trésor — période ${saisie.periode}`,
    fileName: `${saisie.reference}.pdf`,
    champs: [
      { label: "Référence", value: saisie.reference },
      { label: "Période", value: saisie.periode },
      { label: "Solde du compte général", value: formatMontant(saisie.soldeCompteGeneral) },
      { label: "Solde bancaire", value: formatMontant(saisie.soldeBancaire) },
      { label: "Engagements en attente", value: formatMontant(saisie.engagementsAttente) },
      { label: "Arriérés de paiement", value: formatMontant(saisie.arrieres) },
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
