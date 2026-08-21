import Link from "next/link";
import { requireRole } from "@/lib/rbac";
import { UtilityShell } from "@/components/dashboard/utility-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, currentPeriode } from "@/components/dashboard/saisie/shared";
import { AmountInput } from "@/components/dashboard/saisie/amount-input";
import { saveSaisieTresor } from "../actions";

export default async function NouvelleSaisieTresorPage() {
  await requireRole(["TRESOR_DGTCP"]);

  return (
    <UtilityShell eyebrow="Direction Générale du Trésor" title="Nouvelle saisie" subtitle="Situation de trésorerie.">
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Nouvelle saisie</CardTitle>
          <CardDescription>
            Si une saisie existe déjà pour la période choisie, l&apos;enregistrer la mettra à jour.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-5 pb-5">
          <form action={saveSaisieTresor} className="flex flex-col gap-4">
            <Field label="Période">
              <input
                type="month"
                name="periode"
                required
                defaultValue={currentPeriode()}
                className="h-9 w-fit rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </Field>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Field label="Solde du compte général (CDF)">
                <AmountInput name="soldeCompteGeneral" />
              </Field>
              <Field label="Solde bancaire (CDF)">
                <AmountInput name="soldeBancaire" />
              </Field>
              <Field label="Engagements en attente (CDF)">
                <AmountInput name="engagementsAttente" />
              </Field>
              <Field label="Arriérés de paiement (CDF)">
                <AmountInput name="arrieres" />
              </Field>
            </div>

            <Field label="Commentaire">
              <textarea
                name="commentaire"
                rows={3}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              />
            </Field>

            <p className="text-xs text-muted-foreground">
              Vous pourrez joindre des documents justificatifs une fois la saisie enregistrée.
            </p>

            <div className="flex items-center gap-3">
              <Button type="submit" name="intent" value="brouillon" variant="outline">
                Enregistrer en brouillon
              </Button>
              <Button type="submit" name="intent" value="soumettre">
                Soumettre pour validation
              </Button>
              <Link href="/saisie" className="text-xs font-medium text-muted-foreground hover:underline">
                Annuler
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </UtilityShell>
  );
}
