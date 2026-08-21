export const ROLES = [
  "SUPER_ADMIN",
  "ADMIN_DGB",
  "ADMIN_DGF",
  "BCC",
  "DIRECTION",
  "MINISTERE_FOCAL",
  "PROVINCE_FOCAL",
  "TRESOR_DGTCP",
  "DETTE_DGDP",
  "REGIE_FINANCIERE",
  "CELLULE_MACRO",
  "SUIVI_EVALUATION",
  "LECTEUR",
] as const;

export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Super-administrateur",
  ADMIN_DGB: "Administrateur fonctionnel (DGB)",
  ADMIN_DGF: "Administrateur fonctionnel (DGF)",
  BCC: "Banque centrale (BCC)",
  DIRECTION: "Direction / Cabinet",
  MINISTERE_FOCAL: "Point focal Ministère",
  PROVINCE_FOCAL: "Point focal Province",
  TRESOR_DGTCP: "Trésor (DGTCP)",
  DETTE_DGDP: "Dette publique (DGDP)",
  REGIE_FINANCIERE: "Régie financière (DGI/DGDA/DGRAD)",
  CELLULE_MACRO: "Cellule macroéconomique",
  SUIVI_EVALUATION: "Suivi-Évaluation des réformes",
  LECTEUR: "Lecteur / Partenaire",
};

export const ADMIN_ROLES: Role[] = ["SUPER_ADMIN", "ADMIN_DGB"];

export const SAISIE_HREF_BY_ROLE: Partial<Record<Role, string>> = {
  MINISTERE_FOCAL: "/saisie",
  PROVINCE_FOCAL: "/saisie",
  TRESOR_DGTCP: "/saisie",
  DETTE_DGDP: "/saisie",
  REGIE_FINANCIERE: "/saisie",
  CELLULE_MACRO: "/saisie",
  SUIVI_EVALUATION: "/saisie",
  SUPER_ADMIN: "/saisie",
  ADMIN_DGB: "/saisie",
  ADMIN_DGF: "/saisie",
  BCC: "/saisie",
};

/** Libellé du lien de navigation vers /saisie, adapté au rôle du compte connecté. */
export function saisieNavLabel(role: Role): string {
  if (ADMIN_ROLES.includes(role)) return "Validation des saisies";
  if (role === "ADMIN_DGF") return "Saisies publiées";
  if (role === "BCC") return "Ordres de paiement";
  return "Mes saisies";
}

/** Libellé du lien "retour" depuis le détail d'une saisie, adapté au rôle du compte connecté. */
export function retourSaisieLabel(role: Role): string {
  if (ADMIN_ROLES.includes(role)) return "Retour à la validation";
  if (role === "ADMIN_DGF") return "Retour aux saisies publiées";
  if (role === "BCC") return "Retour aux ordres de paiements";
  return "Retour à mes saisies";
}
