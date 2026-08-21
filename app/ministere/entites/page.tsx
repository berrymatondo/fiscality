import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import type { Role } from "@/lib/roles";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { EntitesManager } from "@/components/dashboard/admin/entites-manager";

const MINISTERE_FOCAL_ONLY: Role[] = ["MINISTERE_FOCAL"];

export default async function MinistereEntitesPage() {
  const session = await requireRole(MINISTERE_FOCAL_ONLY);
  const ministereId = session.user.ministereId;

  if (!ministereId) {
    return (
      <UtilityShell
        eyebrow="Configuration"
        title="Mes entités"
        subtitle="Aucun ministère n'est associé à votre compte."
      >
        <p className="text-sm text-muted-foreground">
          Contactez un administrateur pour associer votre compte à un ministère.
        </p>
      </UtilityShell>
    );
  }

  const ministere = await prisma.ministere.findUnique({
    where: { id: ministereId },
    include: { entites: { orderBy: { sigle: "asc" } } },
  });

  if (!ministere) {
    return (
      <UtilityShell eyebrow="Configuration" title="Mes entités" subtitle="Ministère introuvable.">
        <p className="text-sm text-muted-foreground">
          Le ministère associé à votre compte n&apos;existe plus. Contactez un administrateur.
        </p>
      </UtilityShell>
    );
  }

  return (
    <UtilityShell
      eyebrow="Configuration"
      title={`Mes entités — ${ministere.nom}`}
      subtitle={ministere.description ?? "Gérez les structures sous tutelle de votre ministère."}
    >
      <EntitesManager ministereId={ministere.id} entites={ministere.entites} />
    </UtilityShell>
  );
}
