import "dotenv/config";
import { randomUUID } from "node:crypto";
import { hashPassword } from "better-auth/crypto";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";

// Crée (ou met à jour) le compte du Décideur DG/DGA, profil de lecture simplifiée du tableau de bord.
// Usage : npx tsx scripts/create-decideur.ts

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const EMAIL = "decideur@budget.cd";
const NAME = "Décideur DG/DGA";
const PASSWORD = "password1234";

async function main() {
  const passwordHash = await hashPassword(PASSWORD);
  const existing = await prisma.user.findUnique({ where: { email: EMAIL }, include: { accounts: true } });

  if (existing) {
    await prisma.user.update({ where: { id: existing.id }, data: { name: NAME, role: "DECIDEUR", emailVerified: true } });
    const credential = existing.accounts.find((a) => a.providerId === "credential");
    if (credential) {
      await prisma.account.update({ where: { id: credential.id }, data: { password: passwordHash } });
    } else {
      await prisma.account.create({
        data: { id: randomUUID(), userId: existing.id, accountId: existing.id, providerId: "credential", issuer: "local:credential", password: passwordHash },
      });
    }
    console.log(`Compte mis à jour : ${EMAIL} (DECIDEUR)`);
    return;
  }

  const userId = randomUUID();
  await prisma.user.create({
    data: {
      id: userId,
      name: NAME,
      email: EMAIL,
      emailVerified: true,
      role: "DECIDEUR",
      accounts: {
        create: { id: randomUUID(), accountId: userId, providerId: "credential", issuer: "local:credential", password: passwordHash },
      },
    },
  });
  console.log(`Compte créé : ${EMAIL} (DECIDEUR)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
