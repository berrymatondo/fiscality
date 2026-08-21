import type { TypePrevision } from "@/lib/generated/prisma/client";

/** Socle de rubriques commun à tous les ministères. */
export const RUBRIQUES_TRONC_COMMUN = [
  "Fonctionnement général",
  "Frais de mission et déplacement",
  "Entretien et maintenance",
  "Communication et sensibilisation",
  "Formation et renforcement des capacités",
  "Études et audits",
  "Équipements et mobilier de bureau",
  "Loyers et charges locatives",
];

/** Rubriques spécialisées, activées selon des mots-clés reconnus dans le nom du ministère. */
const RUBRIQUES_SECTORIELLES: { motsCles: string[]; rubriques: string[] }[] = [
  {
    motsCles: ["SANTE"],
    rubriques: ["Nombre de patients", "Médicaments", "Équipements médicaux", "Formations sanitaires"],
  },
  {
    motsCles: ["EDUCATION", "ENSEIGNEMENT", "ÉDUCATION"],
    rubriques: ["Nombre d'élèves", "Salles de classe", "Enseignants", "Établissements scolaires"],
  },
  {
    motsCles: ["AGRICULTURE"],
    rubriques: ["Superficie cultivée", "Cultures", "Intrants agricoles", "Agriculteurs bénéficiaires"],
  },
  {
    motsCles: ["INFRASTRUCTURE", "TRAVAUX PUBLICS", "URBANISME", "HABITAT", "AMENAGEMENT"],
    rubriques: ["Kilométrage", "Ouvrage", "Matériaux", "État d'avancement"],
  },
  {
    motsCles: ["DEFENSE", "DÉFENSE", "SECURITE", "SÉCURITÉ", "INTERIEUR", "INTÉRIEUR"],
    rubriques: ["Équipements", "Effectifs", "Besoins opérationnels"],
  },
  {
    motsCles: ["MINES", "HYDROCARBURES"],
    rubriques: ["Sites miniers", "Inspections", "Permis", "Production"],
  },
  {
    motsCles: ["JUSTICE"],
    rubriques: ["Juridictions", "Détenus", "Établissements pénitentiaires"],
  },
  {
    motsCles: ["TRANSPORT"],
    rubriques: ["Routes", "Véhicules", "Infrastructures de transport", "Passagers"],
  },
  {
    motsCles: ["AFFAIRES SOCIALES", "SOLIDARITE", "SOLIDARITÉ", "GENRE", "HUMANITAIRE"],
    rubriques: ["Nombre de bénéficiaires", "Catégories de bénéficiaires", "Programmes sociaux"],
  },
];

/** Rubriques disponibles pour un ministère : tronc commun + rubriques sectorielles pertinentes. */
export function getRubriquesForMinistere(nomMinistere: string): string[] {
  const upper = nomMinistere.toUpperCase();
  const specifiques = RUBRIQUES_SECTORIELLES.filter((s) => s.motsCles.some((mc) => upper.includes(mc))).flatMap(
    (s) => s.rubriques,
  );
  return [...RUBRIQUES_TRONC_COMMUN, ...specifiques];
}

export const TYPE_PREVISION_LABELS: Record<TypePrevision, string> = {
  INVESTISSEMENT: "Investissement",
  BIENS_SERVICES: "Biens et services",
  PERSONNEL: "Personnel",
};

export const PRIORITES = ["Haute", "Moyenne", "Basse"] as const;
