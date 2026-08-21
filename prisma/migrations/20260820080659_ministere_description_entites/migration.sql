-- AlterTable
ALTER TABLE "ministeres" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "entites" (
    "id" TEXT NOT NULL,
    "sigle" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "classification" TEXT,
    "domaine" TEXT,
    "rib" TEXT,
    "ministereId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "entites_ministereId_sigle_key" ON "entites"("ministereId", "sigle");

-- AddForeignKey
ALTER TABLE "entites" ADD CONSTRAINT "entites_ministereId_fkey" FOREIGN KEY ("ministereId") REFERENCES "ministeres"("id") ON DELETE CASCADE ON UPDATE CASCADE;
