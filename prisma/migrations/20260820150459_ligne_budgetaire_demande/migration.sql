-- Restructure lignes_budgetaires from "exécution" tracking (engagé/liquidé/ordonnancé/payé)
-- to a "demande budgétaire" model (entité, rubrique, type de prévision, montant demandé, ...).

CREATE TYPE "TypePrevision" AS ENUM ('INVESTISSEMENT', 'BIENS_SERVICES', 'PERSONNEL');

DROP INDEX IF EXISTS "lignes_budgetaires_ministereId_periode_key";

ALTER TABLE "lignes_budgetaires"
  DROP COLUMN "engage",
  DROP COLUMN "liquide",
  DROP COLUMN "ordonnance",
  DROP COLUMN "paye",
  ADD COLUMN "entiteId" TEXT,
  ADD COLUMN "typePrevision" "TypePrevision" NOT NULL DEFAULT 'BIENS_SERVICES',
  ADD COLUMN "rubrique" TEXT NOT NULL DEFAULT '',
  ADD COLUMN "objet" TEXT,
  ADD COLUMN "programme" TEXT,
  ADD COLUMN "quantite" DECIMAL(65,30),
  ADD COLUMN "coutUnitaire" DECIMAL(65,30),
  ADD COLUMN "montantDemande" DECIMAL(65,30),
  ADD COLUMN "sourceFinancement" TEXT,
  ADD COLUMN "localisation" TEXT,
  ADD COLUMN "priorite" TEXT,
  ADD COLUMN "detailsSpecifiques" JSONB;

ALTER TABLE "lignes_budgetaires" ALTER COLUMN "typePrevision" DROP DEFAULT;
ALTER TABLE "lignes_budgetaires" ALTER COLUMN "rubrique" DROP DEFAULT;

ALTER TABLE "lignes_budgetaires"
  ADD CONSTRAINT "lignes_budgetaires_entiteId_fkey"
  FOREIGN KEY ("entiteId") REFERENCES "entites"("id") ON DELETE SET NULL ON UPDATE CASCADE;
