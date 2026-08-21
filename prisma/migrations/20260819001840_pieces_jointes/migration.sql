-- CreateTable
CREATE TABLE "pieces_jointes" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "typeMime" TEXT NOT NULL,
    "taille" INTEGER NOT NULL,
    "contenu" BYTEA NOT NULL,
    "auteurId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ligneBudgetaireId" TEXT,
    "saisieProvinceId" TEXT,
    "saisieTresorId" TEXT,
    "saisieDetteId" TEXT,
    "saisieRecettesId" TEXT,
    "saisieMacroId" TEXT,

    CONSTRAINT "pieces_jointes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_auteurId_fkey" FOREIGN KEY ("auteurId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_ligneBudgetaireId_fkey" FOREIGN KEY ("ligneBudgetaireId") REFERENCES "lignes_budgetaires"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_saisieProvinceId_fkey" FOREIGN KEY ("saisieProvinceId") REFERENCES "saisies_provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_saisieTresorId_fkey" FOREIGN KEY ("saisieTresorId") REFERENCES "saisies_tresor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_saisieDetteId_fkey" FOREIGN KEY ("saisieDetteId") REFERENCES "saisies_dette"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_saisieRecettesId_fkey" FOREIGN KEY ("saisieRecettesId") REFERENCES "saisies_recettes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pieces_jointes" ADD CONSTRAINT "pieces_jointes_saisieMacroId_fkey" FOREIGN KEY ("saisieMacroId") REFERENCES "saisies_macro"("id") ON DELETE CASCADE ON UPDATE CASCADE;
