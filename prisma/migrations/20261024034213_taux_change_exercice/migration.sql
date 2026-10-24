-- CreateTable
CREATE TABLE "taux_change_exercices" (
    "exercice" INTEGER NOT NULL,
    "taux" DECIMAL(65,30) NOT NULL,
    "modifieParId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "taux_change_exercices_pkey" PRIMARY KEY ("exercice")
);
