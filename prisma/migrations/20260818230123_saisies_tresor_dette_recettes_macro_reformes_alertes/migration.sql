-- CreateEnum
CREATE TYPE "StatutReforme" AS ENUM ('EN_COURS', 'REALISE', 'RETARDE');

-- CreateEnum
CREATE TYPE "SeveriteAlerte" AS ENUM ('INFO', 'AVERTISSEMENT', 'CRITIQUE');

-- CreateEnum
CREATE TYPE "StatutAlerte" AS ENUM ('OUVERTE', 'TRAITEE');

-- CreateTable
CREATE TABLE "saisies_tresor" (
    "id" TEXT NOT NULL,
    "exercice" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "soldeCompteGeneral" DECIMAL(65,30),
    "soldeBancaire" DECIMAL(65,30),
    "engagementsAttente" DECIMAL(65,30),
    "arrieres" DECIMAL(65,30),
    "commentaire" TEXT,
    "statut" "StatutSaisie" NOT NULL DEFAULT 'BROUILLON',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saisies_tresor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisies_dette" (
    "id" TEXT NOT NULL,
    "exercice" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "encoursExterieure" DECIMAL(65,30),
    "encoursInterieure" DECIMAL(65,30),
    "serviceDetteDu" DECIMAL(65,30),
    "serviceDettePaye" DECIMAL(65,30),
    "ratioDettePib" DECIMAL(65,30),
    "nouveauxEmprunts" TEXT,
    "commentaire" TEXT,
    "statut" "StatutSaisie" NOT NULL DEFAULT 'BROUILLON',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saisies_dette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisies_recettes" (
    "id" TEXT NOT NULL,
    "exercice" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "recettesFiscales" DECIMAL(65,30),
    "recettesDouanieres" DECIMAL(65,30),
    "recettesMinieres" DECIMAL(65,30),
    "recettesNonFiscales" DECIMAL(65,30),
    "dons" DECIMAL(65,30),
    "commentaire" TEXT,
    "statut" "StatutSaisie" NOT NULL DEFAULT 'BROUILLON',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saisies_recettes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saisies_macro" (
    "id" TEXT NOT NULL,
    "exercice" INTEGER NOT NULL,
    "periode" TEXT NOT NULL,
    "pib" DECIMAL(65,30),
    "croissance" DECIMAL(65,30),
    "inflation" DECIMAL(65,30),
    "tauxChange" DECIMAL(65,30),
    "coursCuivre" DECIMAL(65,30),
    "coursPetrole" DECIMAL(65,30),
    "reserves" DECIMAL(65,30),
    "commentaire" TEXT,
    "statut" "StatutSaisie" NOT NULL DEFAULT 'BROUILLON',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "saisies_macro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reformes" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "statut" "StatutReforme" NOT NULL DEFAULT 'EN_COURS',
    "avancement" INTEGER,
    "prochainJalon" TEXT,
    "commentaire" TEXT,
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reformes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alertes" (
    "id" TEXT NOT NULL,
    "texte" TEXT NOT NULL,
    "section" TEXT,
    "severite" "SeveriteAlerte" NOT NULL DEFAULT 'INFO',
    "statut" "StatutAlerte" NOT NULL DEFAULT 'OUVERTE',
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alertes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "saisies_tresor_periode_key" ON "saisies_tresor"("periode");

-- CreateIndex
CREATE UNIQUE INDEX "saisies_dette_periode_key" ON "saisies_dette"("periode");

-- CreateIndex
CREATE UNIQUE INDEX "saisies_recettes_periode_key" ON "saisies_recettes"("periode");

-- CreateIndex
CREATE UNIQUE INDEX "saisies_macro_periode_key" ON "saisies_macro"("periode");

-- CreateIndex
CREATE UNIQUE INDEX "reformes_nom_key" ON "reformes"("nom");

-- AddForeignKey
ALTER TABLE "saisies_tresor" ADD CONSTRAINT "saisies_tresor_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisies_dette" ADD CONSTRAINT "saisies_dette_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisies_recettes" ADD CONSTRAINT "saisies_recettes_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saisies_macro" ADD CONSTRAINT "saisies_macro_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reformes" ADD CONSTRAINT "reformes_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alertes" ADD CONSTRAINT "alertes_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
