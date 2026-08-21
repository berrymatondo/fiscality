import "server-only";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/roles";
import { DOMAIN_LABELS, type Domain } from "@/lib/documents";

export async function notifyUser(userId: string, titre: string, message: string | null, lien: string | null) {
  await prisma.notification.create({ data: { userId, titre, message, lien } });
}

export async function notifyRole(role: Role, titre: string, message: string | null, lien: string | null) {
  const users = await prisma.user.findMany({ where: { role }, select: { id: true } });
  if (users.length === 0) return;
  await prisma.notification.createMany({
    data: users.map((u) => ({ userId: u.id, titre, message, lien })),
  });
}

/** Notifie la DGB (Direction Générale du Budget) qu'une saisie vient d'être soumise pour validation. */
export async function notifySaisieSoumise(domain: Domain, recordId: string, periode: string) {
  await notifyRole(
    "ADMIN_DGB",
    "Nouvelle saisie à valider",
    `${DOMAIN_LABELS[domain]} — période ${periode}`,
    `/saisie/${domain}/${recordId}`,
  );
}

/** Notifie l'auteur d'une saisie que son statut a changé (validée, publiée, renvoyée en brouillon). */
export async function notifySaisieStatutChange(
  domain: Domain,
  recordId: string,
  periode: string,
  auteurId: string,
  titre: string,
) {
  await notifyUser(auteurId, titre, `${DOMAIN_LABELS[domain]} — période ${periode}`, `/saisie/${domain}/${recordId}`);
}
