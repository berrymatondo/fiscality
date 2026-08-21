import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import type { Role } from "@/lib/roles";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { EntitesManager } from "@/components/dashboard/admin/entites-manager";

const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

export default async function AdminMinistereEntitesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireRole(SUPER_ADMIN_ONLY);
  const { id } = await params;

  const ministere = await prisma.ministere.findUnique({
    where: { id },
    include: { entites: { orderBy: { sigle: "asc" } } },
  });

  if (!ministere) notFound();

  return (
    <UtilityShell
      eyebrow="Configuration"
      title={`Entités — ${ministere.nom}`}
      subtitle={ministere.description ?? "Structures sous tutelle de ce ministère."}
    >
      <Link
        href="/admin/ministeres"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Retour aux ministères
      </Link>

      <EntitesManager ministereId={ministere.id} entites={ministere.entites} />
    </UtilityShell>
  );
}
