import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import type { Role } from "@/lib/roles";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmSubmitButton } from "@/components/dashboard/admin/confirm-submit-button";
import { createProvince, updateProvince, deleteProvince } from "./actions";

const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

const inputClass =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export default async function AdminProvincesPage() {
  await requireRole(SUPER_ADMIN_ONLY);

  const provinces = await prisma.province.findMany({
    orderBy: { nom: "asc" },
    include: {
      _count: { select: { users: true } },
      users: { select: { email: true }, orderBy: { email: "asc" } },
    },
  });

  return (
    <UtilityShell
      eyebrow="Configuration"
      title="Provinces"
      subtitle="Gérez le référentiel des 26 provinces de la République Démocratique du Congo."
    >
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Ajouter une province</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-2">
          <form action={createProvince} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Nom</label>
              <input name="nom" required className={inputClass} placeholder="Kinshasa (ville-province)" />
            </div>
            <Button type="submit" size="sm">Ajouter</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">{provinces.length} province(s)</CardTitle>
          <CardDescription>Les modifications s&apos;appliquent immédiatement au référentiel utilisé par les comptes et les saisies.</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2 font-semibold">Nom</th>
                  <th className="px-3 py-2 font-semibold">Comptes associés</th>
                  <th className="px-3 py-2 font-semibold">Compte(s) lié(s)</th>
                  <th className="px-3 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {provinces.map((p) => (
                  <tr key={p.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 align-top">
                      <form id={`province-${p.id}`} action={updateProvince} className="contents">
                        <input type="hidden" name="id" value={p.id} />
                      </form>
                      <input form={`province-${p.id}`} name="nom" defaultValue={p.nom} required className={inputClass} />
                    </td>
                    <td className="px-3 py-3 align-top text-xs text-muted-foreground">{p._count.users}</td>
                    <td className="px-3 py-3 align-top text-xs text-muted-foreground">
                      {p.users.length > 0 ? (
                        p.users.map((u) => <p key={u.email}>{u.email}</p>)
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 align-top">
                      <div className="flex flex-wrap gap-2">
                        <Button type="submit" form={`province-${p.id}`} size="sm" variant="outline">
                          Enregistrer
                        </Button>
                        <form action={deleteProvince}>
                          <input type="hidden" name="id" value={p.id} />
                          <ConfirmSubmitButton
                            size="sm"
                            variant="destructive"
                            confirmMessage={`Supprimer la province « ${p.nom} » ?`}
                          >
                            Supprimer
                          </ConfirmSubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
