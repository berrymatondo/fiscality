"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireSession } from "@/lib/rbac";
import { DOMAINS, assertSaisieAccess, linkField, MAX_UPLOAD_SIZE, type Domain } from "@/lib/documents";

function isDomain(value: string): value is Domain {
  return (DOMAINS as readonly string[]).includes(value);
}

export async function uploadDocument(formData: FormData) {
  const session = await requireSession();

  const domain = String(formData.get("domain") ?? "");
  const recordId = String(formData.get("recordId") ?? "");
  const file = formData.get("fichier");

  if (!isDomain(domain) || !recordId) {
    throw new Error("Requête invalide.");
  }
  await assertSaisieAccess(domain, recordId, session.user);

  if (!(file instanceof File) || file.size === 0) {
    throw new Error("Aucun fichier sélectionné.");
  }
  if (file.size > MAX_UPLOAD_SIZE) {
    throw new Error("Fichier trop volumineux (5 Mo maximum).");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  await prisma.pieceJointe.create({
    data: {
      nom: file.name,
      typeMime: file.type || "application/octet-stream",
      taille: file.size,
      contenu: buffer,
      auteurId: session.user.id,
      ...linkField(domain, recordId),
    },
  });

  revalidatePath(`/saisie/${domain}/${recordId}`);
}

export async function deleteDocument(formData: FormData) {
  const session = await requireSession();

  const id = String(formData.get("id") ?? "");
  const domain = String(formData.get("domain") ?? "");
  const recordId = String(formData.get("recordId") ?? "");

  if (!isDomain(domain) || !recordId || !id) {
    throw new Error("Requête invalide.");
  }
  await assertSaisieAccess(domain, recordId, session.user);

  await prisma.pieceJointe.delete({ where: { id } });

  revalidatePath(`/saisie/${domain}/${recordId}`);
}
