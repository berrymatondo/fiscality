"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession, ADMIN_ROLES } from "@/lib/rbac";
import type { Role } from "@/lib/roles";

async function requireAdmin() {
  const session = await requireSession();
  if (!ADMIN_ROLES.includes(session.user.role as Role)) {
    throw new Error("Seuls les administrateurs peuvent modifier le taux de change.");
  }
  return session;
}

function checkExercice(exercice: number) {
  if (!Number.isInteger(exercice) || exercice < 2000 || exercice > 2100) {
    throw new Error("Exercice invalide.");
  }
}

/** Enregistre le taux USD/CDF retenu pour un exercice. */
export async function saveTauxExercice(exercice: number, taux: number) {
  const session = await requireAdmin();
  checkExercice(exercice);
  if (!Number.isFinite(taux) || taux <= 0) throw new Error("Saisissez un taux supérieur à zéro.");

  await prisma.tauxChangeExercice.upsert({
    where: { exercice },
    create: { exercice, taux, modifieParId: session.user.id },
    update: { taux, modifieParId: session.user.id },
  });
  revalidatePath("/", "layout");
}

/** Supprime le taux configuré : l'exercice repasse au taux par défaut. */
export async function resetTauxExercice(exercice: number) {
  await requireAdmin();
  checkExercice(exercice);
  await prisma.tauxChangeExercice.deleteMany({ where: { exercice } });
  revalidatePath("/", "layout");
}
