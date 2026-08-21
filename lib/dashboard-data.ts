import "server-only";
import { prisma } from "@/lib/prisma";

const MOIS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

/**
 * Période affichée par défaut quand aucune n'est demandée dans l'URL. Les données de référence
 * (lib/data.ts, lib/budget-sections.ts) reflètent l'exécution de l'exercice 2025 arrêtée au
 * 31/12/2025 — le repli doit correspondre à ce que le tableau de bord affiche réellement, pas à
 * la date du jour.
 */
const DEFAULT_PERIODE = "2025-12";

/** Résout l'exercice/la période affichés à partir des paramètres d'URL, avec un repli sur la période de référence. */
export function resolvePeriode(searchParams: { exercice?: string; periode?: string }) {
  const periode =
    searchParams.periode && /^\d{4}-\d{2}$/.test(searchParams.periode) ? searchParams.periode : DEFAULT_PERIODE;
  const exercice =
    searchParams.exercice && /^\d{4}$/.test(searchParams.exercice)
      ? Number(searchParams.exercice)
      : Number(periode.slice(0, 4));
  return { exercice, periode };
}

export function formatPeriodeLabel(periode: string): string {
  const monthIndex = Number(periode.slice(5, 7)) - 1;
  const year = periode.slice(0, 4);
  return `${MOIS_FR[monthIndex] ?? ""} ${year}`.trim();
}

/**
 * Années sélectionnables : l'exercice de référence (2025, celui des données statiques), l'année
 * en cours, et toute année pour laquelle une saisie existe réellement en base.
 */
export async function getExercicesDisponibles(): Promise<number[]> {
  const [a, b, c, d, e, f] = await Promise.all([
    prisma.ligneBudgetaire.findMany({ select: { exercice: true }, distinct: ["exercice"] }),
    prisma.saisieProvince.findMany({ select: { exercice: true }, distinct: ["exercice"] }),
    prisma.saisieTresor.findMany({ select: { exercice: true }, distinct: ["exercice"] }),
    prisma.saisieDette.findMany({ select: { exercice: true }, distinct: ["exercice"] }),
    prisma.saisieRecettes.findMany({ select: { exercice: true }, distinct: ["exercice"] }),
    prisma.saisieMacro.findMany({ select: { exercice: true }, distinct: ["exercice"] }),
  ]);
  const currentYear = new Date().getFullYear();
  const referenceYear = Number(DEFAULT_PERIODE.slice(0, 4));
  const years = new Set<number>([
    referenceYear,
    currentYear,
    ...[a, b, c, d, e, f].flat().map((r) => r.exercice),
  ]);
  return Array.from(years).sort((x, y) => y - x);
}

/** Taux d'exécution par province, uniquement pour les saisies publiées de la période donnée. */
export async function getProvincesPubliees(periode: string) {
  const rows = await prisma.saisieProvince.findMany({
    where: { periode, statut: "PUBLIE" },
    include: { province: true },
    orderBy: { province: { nom: "asc" } },
  });
  if (rows.length === 0) return null;
  return rows.map((r) => ({
    name: r.province.nom,
    taux: r.tauxExecution !== null ? Number(r.tauxExecution) : 0,
  }));
}
