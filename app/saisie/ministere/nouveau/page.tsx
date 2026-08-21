import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/rbac";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LigneBudgetaireForm } from "@/components/dashboard/saisie/ligne-budgetaire-form";
import { getRubriquesForMinistere } from "@/lib/rubriques";

export default async function NouvelleSaisieMinisterePage() {
  const session = await requireRole(["MINISTERE_FOCAL"]);

  if (!session.user.ministereId) {
    return (
      <UtilityShell eyebrow="Point focal Ministère" title="Saisie non disponible">
        <Card>
          <CardContent className="px-5 py-5 text-sm text-muted-foreground">
            Votre compte n&apos;est rattaché à aucun ministère. Contactez un administrateur.
          </CardContent>
        </Card>
      </UtilityShell>
    );
  }

  const [ministere, entites] = await Promise.all([
    prisma.ministere.findUniqueOrThrow({ where: { id: session.user.ministereId } }),
    prisma.entite.findMany({ where: { ministereId: session.user.ministereId }, orderBy: { sigle: "asc" } }),
  ]);

  const rubriques = getRubriquesForMinistere(ministere.nom);

  return (
    <UtilityShell eyebrow="Point focal Ministère" title="Nouvelle saisie" subtitle={ministere.nom}>
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Nouvelle demande budgétaire</CardTitle>
          <CardDescription>
            Sélectionnez l&apos;entité concernée et le type de prévision pour faire apparaître les champs adaptés.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          {entites.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucune entité n&apos;est enregistrée pour votre ministère. Ajoutez-en une depuis « Configuration → Mes
              entités » avant de créer une saisie.
            </p>
          ) : (
            <LigneBudgetaireForm entites={entites} rubriques={rubriques} />
          )}
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
