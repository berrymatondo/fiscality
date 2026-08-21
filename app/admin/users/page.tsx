import { prisma } from "@/lib/prisma";
import { requireRole, ADMIN_ROLES } from "@/lib/rbac";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreateUserForm } from "@/components/dashboard/admin/create-user-form";
import { UserAccountRow } from "@/components/dashboard/admin/user-account-row";

export default async function AdminUsersPage() {
  const session = await requireRole(ADMIN_ROLES);

  const [users, ministeres, provinces] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "asc" },
    }),
    prisma.ministere.findMany({ orderBy: { nom: "asc" } }),
    prisma.province.findMany({ orderBy: { nom: "asc" } }),
  ]);

  return (
    <UtilityShell
      eyebrow="Administration"
      title="Comptes utilisateurs"
      subtitle="Créez des comptes et attribuez un profil et, le cas échéant, un ministère ou une province."
    >
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Créer un compte</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-2">
          <CreateUserForm ministeres={ministeres} provinces={provinces} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">{users.length} compte(s)</CardTitle>
          <CardDescription>Un rôle « Point focal » n&apos;est effectif que si un périmètre lui est associé. Le champ Ministère ou Province ne devient modifiable que pour le rôle concerné.</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2 font-semibold">Utilisateur</th>
                  <th className="px-3 py-2 font-semibold">Rôle</th>
                  <th className="px-3 py-2 font-semibold">Ministère</th>
                  <th className="px-3 py-2 font-semibold">Province</th>
                  <th className="px-3 py-2 font-semibold">Mot de passe</th>
                  <th className="px-3 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <UserAccountRow
                    key={user.id}
                    user={user}
                    ministeres={ministeres}
                    provinces={provinces}
                    canDelete={user.id !== session.user.id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
