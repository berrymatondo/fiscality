-- Simplify the demande-budgétaire form: drop programme, quantite, coutUnitaire,
-- sourceFinancement, localisation and the type-de-prévision-specific JSON details.

ALTER TABLE "lignes_budgetaires"
  DROP COLUMN "programme",
  DROP COLUMN "quantite",
  DROP COLUMN "coutUnitaire",
  DROP COLUMN "sourceFinancement",
  DROP COLUMN "localisation",
  DROP COLUMN "detailsSpecifiques";
