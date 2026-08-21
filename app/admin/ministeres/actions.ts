"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole, requireMinistereAccess } from "@/lib/rbac";
import type { Role } from "@/lib/roles";

const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

function revalidateEntitesPaths(ministereId: string) {
  revalidatePath(`/admin/ministeres/${ministereId}`);
  revalidatePath("/ministere/entites");
}

export async function createMinistere(formData: FormData) {
  await requireRole(SUPER_ADMIN_ONLY);

  const nom = String(formData.get("nom") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!nom) {
    throw new Error("Le nom du ministère est requis.");
  }

  await prisma.ministere.create({ data: { nom, description } });
  revalidatePath("/admin/ministeres");
}

export async function updateMinistere(formData: FormData) {
  await requireRole(SUPER_ADMIN_ONLY);

  const id = String(formData.get("id") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim() || null;

  if (!id || !nom) {
    throw new Error("Requête invalide.");
  }

  await prisma.ministere.update({ where: { id }, data: { nom, description } });
  revalidatePath("/admin/ministeres");
  revalidatePath(`/admin/ministeres/${id}`);
}

export async function deleteMinistere(formData: FormData) {
  await requireRole(SUPER_ADMIN_ONLY);

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Requête invalide.");

  try {
    await prisma.ministere.delete({ where: { id } });
  } catch {
    throw new Error(
      "Impossible de supprimer ce ministère : des comptes, saisies ou entités y sont encore associés.",
    );
  }

  revalidatePath("/admin/ministeres");
}

export async function createEntite(formData: FormData) {
  const ministereId = String(formData.get("ministereId") ?? "");
  if (!ministereId) throw new Error("Requête invalide.");
  await requireMinistereAccess(ministereId);

  const sigle = String(formData.get("sigle") ?? "").trim();
  const nom = String(formData.get("nom") ?? "").trim();
  const classification = String(formData.get("classification") ?? "").trim() || null;
  const domaine = String(formData.get("domaine") ?? "").trim() || null;
  const rib = String(formData.get("rib") ?? "").trim() || null;

  if (!sigle || !nom) {
    throw new Error("Le sigle et le nom de l'entité sont requis.");
  }

  await prisma.entite.create({
    data: { ministereId, sigle, nom, classification, domaine, rib },
  });
  revalidateEntitesPaths(ministereId);
}

export async function updateEntite(formData: FormData) {
  const ministereId = String(formData.get("ministereId") ?? "");
  if (!ministereId) throw new Error("Requête invalide.");
  await requireMinistereAccess(ministereId);

  const id = String(formData.get("id") ?? "");
  const sigle = String(formData.get("sigle") ?? "").trim();
  const nom = String(formData.get("nom") ?? "").trim();
  const classification = String(formData.get("classification") ?? "").trim() || null;
  const domaine = String(formData.get("domaine") ?? "").trim() || null;
  const rib = String(formData.get("rib") ?? "").trim() || null;

  if (!id || !sigle || !nom) {
    throw new Error("Requête invalide.");
  }

  await prisma.entite.updateMany({
    where: { id, ministereId },
    data: { sigle, nom, classification, domaine, rib },
  });
  revalidateEntitesPaths(ministereId);
}

export async function deleteEntite(formData: FormData) {
  const ministereId = String(formData.get("ministereId") ?? "");
  if (!ministereId) throw new Error("Requête invalide.");
  await requireMinistereAccess(ministereId);

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Requête invalide.");

  await prisma.entite.deleteMany({ where: { id, ministereId } });
  revalidateEntitesPaths(ministereId);
}
