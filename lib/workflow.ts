import type { StatutSaisie } from "@/lib/generated/prisma/client";

export const NEXT_STATUT: Record<StatutSaisie, StatutSaisie | null> = {
  BROUILLON: "SOUMIS",
  SOUMIS: "VALIDE",
  VALIDE: "PUBLIE",
  PUBLIE: null,
  OP_SOUMIS: null,
  PAYE: null,
};

export const TRANSITION_LABELS: Record<StatutSaisie, string> = {
  BROUILLON: "Soumettre pour validation",
  SOUMIS: "Valider",
  VALIDE: "Publier",
  PUBLIE: "",
  OP_SOUMIS: "",
  PAYE: "",
};

/** BROUILLON → SOUMIS est réservé au point focal propriétaire de la saisie. */
export function isOwnerTransition(statut: StatutSaisie) {
  return statut === "BROUILLON";
}

/** SOUMIS → VALIDE et VALIDE → PUBLIE sont réservés aux rôles d'administration. */
export function isAdminTransition(statut: StatutSaisie) {
  return statut === "SOUMIS" || statut === "VALIDE";
}

/** Une saisie n'est modifiable par son auteur que tant qu'elle est en brouillon. */
export function isEditable(statut: StatutSaisie) {
  return statut === "BROUILLON";
}

export const REVERT_LABEL = "Renvoyer en brouillon";

/** Seul un rôle d'administration peut renvoyer une saisie soumise en brouillon. */
export function canRevertToBrouillon(statut: StatutSaisie) {
  return statut === "SOUMIS";
}

export const REVERT_SOUMIS_LABEL = "Renvoyer en soumission";

/** La DGB peut renvoyer une saisie validée en soumission (pour la revalider). */
export function canRevertToSoumis(statut: StatutSaisie) {
  return statut === "VALIDE";
}
