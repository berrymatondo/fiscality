-- Add a nullable business reference (entité-période-séquence) to every saisie table.
-- Kept nullable here so existing rows can be backfilled before the NOT NULL pass.

ALTER TABLE "lignes_budgetaires" ADD COLUMN "reference" TEXT;
CREATE UNIQUE INDEX "lignes_budgetaires_reference_key" ON "lignes_budgetaires"("reference");

ALTER TABLE "saisies_provinces" ADD COLUMN "reference" TEXT;
CREATE UNIQUE INDEX "saisies_provinces_reference_key" ON "saisies_provinces"("reference");

ALTER TABLE "saisies_tresor" ADD COLUMN "reference" TEXT;
CREATE UNIQUE INDEX "saisies_tresor_reference_key" ON "saisies_tresor"("reference");

ALTER TABLE "saisies_dette" ADD COLUMN "reference" TEXT;
CREATE UNIQUE INDEX "saisies_dette_reference_key" ON "saisies_dette"("reference");

ALTER TABLE "saisies_recettes" ADD COLUMN "reference" TEXT;
CREATE UNIQUE INDEX "saisies_recettes_reference_key" ON "saisies_recettes"("reference");

ALTER TABLE "saisies_macro" ADD COLUMN "reference" TEXT;
CREATE UNIQUE INDEX "saisies_macro_reference_key" ON "saisies_macro"("reference");
