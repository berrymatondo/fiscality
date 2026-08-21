import "server-only";
import { prisma } from "@/lib/prisma";
import { ADMIN_ROLES, type Role } from "@/lib/roles";

export const DOMAINS = ["ministere", "province", "tresor", "dette", "recettes", "macro"] as const;
export type Domain = (typeof DOMAINS)[number];

export const DOMAIN_LABELS: Record<Domain, string> = {
  ministere: "Ministère",
  province: "Province",
  tresor: "Trésorerie",
  dette: "Dette publique",
  recettes: "Recettes",
  macro: "Macroéconomie",
};

const FOCAL_ROLE: Record<Domain, Role> = {
  ministere: "MINISTERE_FOCAL",
  province: "PROVINCE_FOCAL",
  tresor: "TRESOR_DGTCP",
  dette: "DETTE_DGDP",
  recettes: "REGIE_FINANCIERE",
  macro: "CELLULE_MACRO",
};

type SessionUser = { role: string; ministereId?: string | null; provinceId?: string | null };

/** Vérifie que l'utilisateur peut voir/modifier la saisie donnée, et lève une erreur sinon. */
export async function assertSaisieAccess(domain: Domain, recordId: string, user: SessionUser) {
  if (ADMIN_ROLES.includes(user.role as Role)) return;
  if (user.role !== FOCAL_ROLE[domain]) throw new Error("Non autorisé.");

  if (domain === "ministere") {
    const record = await prisma.ligneBudgetaire.findUnique({ where: { id: recordId } });
    if (!record || record.ministereId !== user.ministereId) throw new Error("Non autorisé.");
  } else if (domain === "province") {
    const record = await prisma.saisieProvince.findUnique({ where: { id: recordId } });
    if (!record || record.provinceId !== user.provinceId) throw new Error("Non autorisé.");
  }
}

export function linkField(domain: Domain, recordId: string) {
  switch (domain) {
    case "ministere":
      return { ligneBudgetaireId: recordId };
    case "province":
      return { saisieProvinceId: recordId };
    case "tresor":
      return { saisieTresorId: recordId };
    case "dette":
      return { saisieDetteId: recordId };
    case "recettes":
      return { saisieRecettesId: recordId };
    case "macro":
      return { saisieMacroId: recordId };
  }
}

export const MAX_UPLOAD_SIZE = 5 * 1024 * 1024;
