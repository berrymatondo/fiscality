-- CreateEnum
CREATE TYPE "StatutSaisie" AS ENUM ('BROUILLON', 'SOUMIS', 'VALIDE', 'PUBLIE');

-- CreateTable
CREATE TABLE "lignes_budgetaires" (
    "id" TEXT NOT NULL,
    "ministereId" TEXT NOT NULL,
    "exercice" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "engage" DECIMAL(65,30),
    "liquide" DECIMAL(65,30),
    "ordonnance" DECIMAL(65,30),
    "paye" DECIMAL(65,30),
    "commentaire" TEXT,
    "statut" "StatutSaisie" NOT NULL DEFAULT 'BROUILLON',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lignes_budgetaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisies_provinces" (
    "id" TEXT NOT NULL,
    "provinceId" TEXT NOT NULL,
    "exercice" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "tauxExecution" DECIMAL(65,30),
    "recettesPropres" DECIMAL(65,30),
    "retrocessions" DECIMAL(65,30),
    "commentaire" TEXT,
    "statut" "StatutSaisie" NOT NULL DEFAULT 'BROUILLON',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saisies_provinces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lignes_budgetaires_ministereId_periode_key" ON "lignes_budgetaires"("ministereId", "periode");

-- CreateIndex
CREATE UNIQUE INDEX "saisies_provinces_provinceId_periode_key" ON "saisies_provinces"("provinceId", "periode");

-- AddForeignKey
ALTER TABLE "lignes_budgetaires" ADD CONSTRAINT "lignes_budgetaires_ministereId_fkey" FOREIGN KEY ("ministereId") REFERENCES "ministeres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lignes_budgetaires" ADD CONSTRAINT "lignes_budgetaires_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisies_provinces" ADD CONSTRAINT "saisies_provinces_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisies_provinces" ADD CONSTRAINT "saisies_provinces_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
