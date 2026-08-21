import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "@/lib/session";
import { assertSaisieAccess, type Domain } from "@/lib/documents";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getCurrentSession();
  if (!session) return new NextResponse(null, { status: 401 });

  const { id } = await params;
  const doc = await prisma.pieceJointe.findUnique({ where: { id } });
  if (!doc) return new NextResponse(null, { status: 404 });

  const domainByField: [string | null, Domain][] = [
    [doc.ligneBudgetaireId, "ministere"],
    [doc.saisieProvinceId, "province"],
    [doc.saisieTresorId, "tresor"],
    [doc.saisieDetteId, "dette"],
    [doc.saisieRecettesId, "recettes"],
    [doc.saisieMacroId, "macro"],
  ];
  const match = domainByField.find(([recordId]) => recordId);
  if (!match || !match[0]) return new NextResponse(null, { status: 404 });

  try {
    await assertSaisieAccess(match[1], match[0], session.user);
  } catch {
    return new NextResponse(null, { status: 403 });
  }

  return new NextResponse(new Uint8Array(doc.contenu), {
    headers: {
      "Content-Type": doc.typeMime,
      "Content-Disposition": `attachment; filename="${encodeURIComponent(doc.nom)}"`,
      "Content-Length": String(doc.taille),
    },
  });
}
