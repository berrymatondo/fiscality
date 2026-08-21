-- Drop the `numero` column from `ministeres` and make `nom` unique instead.
DROP INDEX IF EXISTS "ministeres_numero_key";

ALTER TABLE "ministeres" DROP COLUMN "numero";

CREATE UNIQUE INDEX "ministeres_nom_key" ON "ministeres"("nom");
