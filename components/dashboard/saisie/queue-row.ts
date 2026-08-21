import type { Domain } from "@/lib/documents";
import type { StatutSaisie } from "@/lib/generated/prisma/client";
import type { RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";

export type QueueRow = {
  id: string;
  domain: Domain;
  domainLabel: string;
  reference: string;
  periode: string;
  statut: StatutSaisie;
  editHref: string;
  libelle: string;
  montant: string;
  montantValue: number | null;
  rapportAction: (id: string) => Promise<RapportData | null>;
  transitionAction: (formData: FormData) => void;
  revertAction: (formData: FormData) => void;
  revertSoumisAction: (formData: FormData) => void;
};

export type PaiementQueueRow = QueueRow & {
  domain: "ministere" | "province";
  renvoiValidationAction: (formData: FormData) => void;
  soumettreOpAction: (formData: FormData) => void;
  confirmerExecutionAction: (formData: FormData) => void;
};
