"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import type { Role } from "@/lib/roles";

const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

export async function createProvince(formData: FormData) {
  await requireRole(SUPER_ADMIN_ONLY);

  const nom = String(formData.get("nom") ?? "").trim();
  if (!nom) throw new Error("Le nom de la province est requis.");

  await prisma.province.create({ data: { nom } });
  revalidatePath("/admin/provinces");
}

export async function updateProvince(formData: FormData) {
  await requireRole(SUPER_ADMIN_ONLY);

  const id = String(formData.get("id") ?? "");
  const nom = String(formData.get("nom") ?? "").trim();
  if (!id || !nom) throw new Error("Requête invalide.");

  await prisma.province.update({ where: { id }, data: { nom } });
  revalidatePath("/admin/provinces");
}

export async function deleteProvince(formData: FormData) {
  await requireRole(SUPER_ADMIN_ONLY);

  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Requête invalide.");

  try {
    await prisma.province.delete({ where: { id } });
  } catch {
    throw new Error(
      "Impossible de supprimer cette province : des comptes ou saisies y sont encore associés.",
    );
  }

  revalidatePath("/admin/provinces");
}
