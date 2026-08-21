"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Field, currentPeriode } from "@/components/dashboard/saisie/shared";
import { AmountInput, toNumericString } from "@/components/dashboard/saisie/amount-input";
import { useExchangeRate, formatUsdFromCdf } from "@/components/dashboard/currency";
import { TYPE_PREVISION_LABELS, PRIORITES } from "@/lib/rubriques";
import { saveLigneBudgetaire } from "@/app/saisie/ministere/actions";
import type { TypePrevision } from "@/lib/generated/prisma/client";

const inputClass =
  "h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50";

type EntiteOption = { id: string; sigle: string; nom: string };

type LigneDefaults = {
  entiteId?: string | null;
  typePrevision?: TypePrevision;
  rubrique?: string;
  objet?: string | null;
  montantDemande?: unknown;
  priorite?: string | null;
  commentaire?: string | null;
};

export function LigneBudgetaireForm({
  ligneId,
  defaultPeriode,
  entites,
  rubriques,
  defaults,
}: {
  ligneId?: string;
  defaultPeriode?: string;
  entites: EntiteOption[];
  rubriques: string[];
  defaults?: LigneDefaults;
}) {
  const [typePrevision, setTypePrevision] = useState<TypePrevision>(defaults?.typePrevision ?? "BIENS_SERVICES");
  const [montantDemande, setMontantDemande] = useState(
    defaults?.montantDemande !== null && defaults?.montantDemande !== undefined ? String(defaults.montantDemande) : "",
  );
  const rate = useExchangeRate();

  const montantNumber = Number(toNumericString(montantDemande));
  const usdEquivalent = Number.isFinite(montantNumber) && montantNumber > 0 ? formatUsdFromCdf(montantNumber, rate) : null;

  return (
    <form action={saveLigneBudgetaire} className="flex flex-col gap-5">
      {ligneId && <input type="hidden" name="id" value={ligneId} />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Période">
          <input
            type="month"
            name="periode"
            required
            defaultValue={defaultPeriode ?? currentPeriode()}
            className={inputClass}
          />
        </Field>
        <Field label="Entité">
          <select name="entiteId" defaultValue={defaults?.entiteId ?? ""} required className={inputClass}>
            <option value="" disabled>
              Sélectionner...
            </option>
            {entites.map((e) => (
              <option key={e.id} value={e.id}>
                {e.sigle} — {e.nom}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Type de prévision">
          <select
            name="typePrevision"
            value={typePrevision}
            onChange={(e) => setTypePrevision(e.target.value as TypePrevision)}
            className={inputClass}
          >
            {Object.entries(TYPE_PREVISION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Rubrique">
          <select name="rubrique" defaultValue={defaults?.rubrique ?? ""} required className={inputClass}>
            <option value="" disabled>
              Sélectionner...
            </option>
            {rubriques.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Objet de la demande">
          <input name="objet" defaultValue={defaults?.objet ?? ""} className={inputClass} />
        </Field>
        <Field label="Montant demandé (CDF)">
          <AmountInput name="montantDemande" defaultValue={defaults?.montantDemande} onRawChange={setMontantDemande} />
          {usdEquivalent && <span className="mt-1 text-[11px] text-muted-foreground">≈ {usdEquivalent} USD</span>}
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Priorité">
          <select name="priorite" defaultValue={defaults?.priorite ?? ""} className={inputClass}>
            <option value="">—</option>
            {PRIORITES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Justification / Commentaire">
        <textarea
          name="commentaire"
          rows={3}
          defaultValue={defaults?.commentaire ?? ""}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      </Field>

      {!ligneId && (
        <Field label="Justificatifs (optionnel)">
          <input
            type="file"
            name="fichiers"
            multiple
            className="text-sm text-foreground file:mr-3 file:rounded-md file:border file:border-input file:bg-background file:px-3 file:py-1.5 file:text-xs file:font-medium hover:file:bg-accent"
          />
          <span className="mt-1 text-[11px] text-muted-foreground">5 Mo maximum par fichier.</span>
        </Field>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit" name="intent" value="brouillon" variant="outline">
          {ligneId ? "Enregistrer" : "Enregistrer en brouillon"}
        </Button>
        <Button type="submit" name="intent" value="soumettre">
          Soumettre pour validation
        </Button>
        <Link href="/saisie" className="text-xs font-medium text-muted-foreground hover:underline">
          Annuler
        </Link>
      </div>
    </form>
  );
}
