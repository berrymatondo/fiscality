import "server-only";
import { prisma } from "@/lib/prisma";
import type { Domain } from "@/lib/documents";

export async function logAudit({
  domain,
  recordId,
  action,
  statutAvant,
  statutApres,
  userId,
  details,
}: {
  domain: Domain;
  recordId: string;
  action: string;
  statutAvant?: string | null;
  statutApres?: string | null;
  userId: string;
  details?: string | null;
}) {
  await prisma.journalAudit.create({
    data: {
      domain,
      recordId,
      action,
      statutAvant: statutAvant ?? null,
      statutApres: statutApres ?? null,
      userId,
      details: details ?? null,
    },
  });
}

export async function getAuditTrail(domain: Domain, recordId: string) {
  const entries = await prisma.journalAudit.findMany({
    where: { domain, recordId },
    include: { user: { select: { name: true, email: true } } },
    orderBy: { createdAt: "asc" },
  });

  return entries.map((e) => ({
    id: e.id,
    action: e.action,
    statutAvant: e.statutAvant,
    statutApres: e.statutApres,
    details: e.details,
    auteur: e.user.name,
    auteurEmail: e.user.email,
    createdAt: e.createdAt,
  }));
}
