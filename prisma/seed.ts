import { prisma } from "../lib/prisma";
import { budgetSections } from "../lib/budget-sections";
import { mefEntites } from "../lib/mef-entites";

const MEF_MINISTERE_NOM = "FINANCES";

const rdcProvinces = [
  "Bas-Uélé",
  "Équateur",
  "Haut-Katanga",
  "Haut-Lomami",
  "Haut-Uélé",
  "Ituri",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Kinshasa (ville-province)",
  "Kongo-Central",
  "Kwango",
  "Kwilu",
  "Lomami",
  "Lualaba",
  "Mai-Ndombe",
  "Maniema",
  "Mongala",
  "Nord-Kivu",
  "Nord-Ubangi",
  "Sankuru",
  "Sud-Kivu",
  "Sud-Ubangi",
  "Tanganyika",
  "Tshopo",
  "Tshuapa",
];

async function main() {
  for (const s of budgetSections) {
    await prisma.ministere.upsert({
      where: { nom: s.section },
      update: {},
      create: { nom: s.section },
    });
  }

  for (const nom of rdcProvinces) {
    await prisma.province.upsert({
      where: { nom },
      update: {},
      create: { nom },
    });
  }

  const mef = await prisma.ministere.findUnique({ where: { nom: MEF_MINISTERE_NOM } });
  if (mef) {
    for (const e of mefEntites) {
      await prisma.entite.upsert({
        where: { ministereId_sigle: { ministereId: mef.id, sigle: e.sigle } },
        update: { nom: e.nom, classification: e.classification, domaine: e.domaine },
        create: {
          ministereId: mef.id,
          sigle: e.sigle,
          nom: e.nom,
          classification: e.classification,
          domaine: e.domaine,
        },
      });
    }
  }

  console.log(
    `Seed terminé : ${budgetSections.length} ministères/sections, ${rdcProvinces.length} provinces, ${mef ? mefEntites.length : 0} entités (Finances).`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
