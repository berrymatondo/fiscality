"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import type { StatutReforme, SeveriteAlerte } from "@/lib/generated/prisma/client";

const ROLE = "SUIVI_EVALUATION" as const;
const STATUTS_REFORME: StatutReforme[] = ["EN_COURS", "REALISE", "RETARDE"];
const SEVERITES: SeveriteAlerte[] = ["INFO", "AVERTISSEMENT", "CRITIQUE"];

export async function saveReforme(formData: FormData) {
  const session = await requireRole([ROLE]);

  const nom = String(formData.get("nom") ?? "").trim();
  const statutRaw = String(formData.get("statut") ?? "EN_COURS");
  const avancementRaw = String(formData.get("avancement") ?? "").trim();
  const prochainJalon = String(formData.get("prochainJalon") ?? "").trim() || null;
  const commentaire = String(formData.get("commentaire") ?? "").trim() || null;

  if (!nom) {
    throw new Error("Le nom de la réforme est requis.");
  }
  if (!STATUTS_REFORME.includes(statutRaw as StatutReforme)) {
    throw new Error("Statut invalide.");
  }
  const statut = statutRaw as StatutReforme;

  const avancement = avancementRaw === "" ? null : Math.max(0, Math.min(100, Number(avancementRaw)));

  const data = { statut, avancement, prochainJalon, commentaire, auteurId: session.user.id } as const;

  await prisma.reforme.upsert({
    where: { nom },
    create: { nom, ...data },
    update: data,
  });

  revalidatePath("/saisie/reformes");
}

export async function createAlerte(formData: FormData) {
  const session = await requireRole([ROLE]);

  const texte = String(formData.get("texte") ?? "").trim();
  const section = String(formData.get("section") ?? "").trim() || null;
  const severiteRaw = String(formData.get("severite") ?? "INFO");

  if (!texte) {
    throw new Error("Le texte de l'alerte est requis.");
  }
  if (!SEVERITES.includes(severiteRaw as SeveriteAlerte)) {
    throw new Error("Sévérité invalide.");
  }
  const severite = severiteRaw as SeveriteAlerte;

  await prisma.alerte.create({
    data: { texte, section, severite, auteurId: session.user.id },
  });

  revalidatePath("/saisie/reformes");
}

export async function resolveAlerte(formData: FormData) {
  await requireRole([ROLE]);

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Alerte invalide.");

  await prisma.alerte.update({
    where: { id },
    data: { statut: "TRAITEE" },
  });

  revalidatePath("/saisie/reformes");
}

export async function deleteReforme(formData: FormData) {
  await requireRole([ROLE]);

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Réforme invalide.");

  await prisma.reforme.delete({ where: { id } });

  revalidatePath("/saisie/reformes");
}

export async function deleteAlerte(formData: FormData) {
  await requireRole([ROLE]);

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Alerte invalide.");

  await prisma.alerte.delete({ where: { id } });

  revalidatePath("/saisie/reformes");
}
