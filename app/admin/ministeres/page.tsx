import Link from "next/link";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import type { Role } from "@/lib/roles";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConfirmSubmitButton } from "@/components/dashboard/admin/confirm-submit-button";
import { createMinistere, updateMinistere, deleteMinistere } from "./actions";

const SUPER_ADMIN_ONLY: Role[] = ["SUPER_ADMIN"];

const inputClass =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

export default async function AdminMinisteresPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  await requireRole(SUPER_ADMIN_ONLY);

  const { q } = await searchParams;
  const query = q?.trim() ?? "";

  const ministeres = await prisma.ministere.findMany({
    where: query
      ? {
          OR: [
            { nom: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    orderBy: { nom: "asc" },
    include: {
      _count: { select: { entites: true, users: true } },
      users: { select: { email: true }, orderBy: { email: "asc" } },
    },
  });

  return (
    <UtilityShell
      eyebrow="Configuration"
      title="Ministères"
      subtitle="Gérez le référentiel des ministères et leurs entités sous tutelle."
    >
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Ajouter un ministère</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-2">
          <form action={createMinistere} className="grid gap-3 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Nom</label>
              <input name="nom" required className={inputClass} placeholder="FINANCES" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Description</label>
              <input name="description" className={inputClass} placeholder="Optionnel" />
            </div>
            <Button type="submit" size="sm">Ajouter</Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">
            {ministeres.length} ministère(s){query ? ` pour « ${query} »` : ""}
          </CardTitle>
          <CardDescription>Les modifications s&apos;appliquent immédiatement au référentiel utilisé par les comptes et les saisies.</CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-0 pt-2">
          <form action="/admin/ministeres" className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Rechercher un ministère..."
              className={`${inputClass} pl-8`}
            />
          </form>
        </CardContent>
        <CardContent className="px-0 pb-0 pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2 font-semibold">Nom</th>
                  <th className="px-3 py-2 font-semibold">Description</th>
                  <th className="px-3 py-2 font-semibold">Entités</th>
                  <th className="px-3 py-2 font-semibold">Compte(s) lié(s)</th>
                  <th className="px-3 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {ministeres.map((m) => (
                  <tr key={m.id} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 align-top">
                      <form id={`ministere-${m.id}`} action={updateMinistere} className="contents">
                        <input type="hidden" name="id" value={m.id} />
                      </form>
                      <input
                        form={`ministere-${m.id}`}
                        name="nom"
                        defaultValue={m.nom}
                        required
                        className={inputClass}
                      />
                    </td>
                    <td className="px-3 py-3 align-top">
                      <input
                        form={`ministere-${m.id}`}
                        name="description"
                        defaultValue={m.description ?? ""}
                        className={inputClass}
                      />
                    </td>
                    <td className="px-3 py-3 align-top text-xs text-muted-foreground">
                      <Link href={`/admin/ministeres/${m.id}`} className="text-primary underline-offset-2 hover:underline">
                        {m._count.entites} entité(s)
                      </Link>
                      <p>{m._count.users} compte(s)</p>
                    </td>
                    <td className="px-3 py-3 align-top text-xs text-muted-foreground">
                      {m.users.length > 0 ? (
                        m.users.map((u) => <p key={u.email}>{u.email}</p>)
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 align-top">
                      <div className="flex flex-wrap gap-2">
                        <Button type="submit" form={`ministere-${m.id}`} size="sm" variant="outline">
                          Enregistrer
                        </Button>
                        <form action={deleteMinistere}>
                          <input type="hidden" name="id" value={m.id} />
                          <ConfirmSubmitButton
                            size="sm"
                            variant="destructive"
                            confirmMessage={`Supprimer le ministère « ${m.nom} » ? Cette action est irréversible.`}
                          >
                            Supprimer
                          </ConfirmSubmitButton>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
                {ministeres.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-6 text-center text-xs text-muted-foreground">
                      Aucun ministère ne correspond à cette recherche.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
