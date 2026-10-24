import "server-only";
import { prisma } from "@/lib/prisma";
import { rateForExercice, type TauxParExercice } from "@/lib/settings";

/** Taux USD/CDF configurés, indexés par exercice. */
export async function getTauxParExercice(): Promise<TauxParExercice> {
  const rows = await prisma.tauxChangeExercice.findMany();
  return Object.fromEntries(rows.map((r) => [r.exercice, Number(r.taux)]));
}

/** Taux USD/CDF retenu pour un exercice (taux par défaut s'il n'a pas été configuré). */
export async function getTauxExercice(exercice: number): Promise<number> {
  const row = await prisma.tauxChangeExercice.findUnique({ where: { exercice } });
  return rateForExercice(row ? { [exercice]: Number(row.taux) } : {}, exercice);
}
