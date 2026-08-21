"use client";

import { useRef, useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toastManager } from "@/lib/toast-manager";
import { createEntite, updateEntite, deleteEntite } from "@/app/admin/ministeres/actions";

const inputClass =
  "h-9 w-full rounded-md border border-input bg-background px-2 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

type EntiteRow = {
  id: string;
  sigle: string;
  nom: string;
  classification: string | null;
  domaine: string | null;
  rib: string | null;
};

function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Une erreur est survenue.";
}

function CreateEntiteForm({ ministereId }: { ministereId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createEntite(formData);
        toastManager.add({
          type: "success",
          title: "Entité ajoutée",
          description: "La nouvelle entité a été enregistrée.",
        });
        formRef.current?.reset();
      } catch (error) {
        toastManager.add({ type: "error", title: "Échec de l'ajout", description: errorMessage(error) });
      }
    });
  }

  return (
    <form ref={formRef} action={handleSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:items-end">
      <input type="hidden" name="ministereId" value={ministereId} />
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Sigle</label>
        <input name="sigle" required className={inputClass} placeholder="DGI" />
      </div>
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Nom</label>
        <input name="nom" required className={inputClass} placeholder="Direction Générale des Impôts" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Classification</label>
        <input name="classification" className={inputClass} placeholder="Régie financière" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-muted-foreground">Domaine</label>
        <input name="domaine" className={inputClass} placeholder="Fiscalité intérieure" />
      </div>
      <div className="lg:col-span-2">
        <label className="mb-1 block text-xs font-medium text-muted-foreground">RIB</label>
        <input name="rib" className={inputClass} placeholder="Optionnel" />
      </div>
      <Button type="submit" size="sm" disabled={isPending}>
        {isPending ? "Ajout..." : "Ajouter"}
      </Button>
    </form>
  );
}

function EntiteTableRow({ ministereId, entite }: { ministereId: string; entite: EntiteRow }) {
  const [sigle, setSigle] = useState(entite.sigle);
  const [nom, setNom] = useState(entite.nom);
  const [classification, setClassification] = useState(entite.classification ?? "");
  const [domaine, setDomaine] = useState(entite.domaine ?? "");
  const [rib, setRib] = useState(entite.rib ?? "");
  const [isSaving, startSave] = useTransition();
  const [isDeleting, startDelete] = useTransition();
  const isPending = isSaving || isDeleting;

  function handleSave() {
    startSave(async () => {
      const formData = new FormData();
      formData.set("id", entite.id);
      formData.set("ministereId", ministereId);
      formData.set("sigle", sigle);
      formData.set("nom", nom);
      formData.set("classification", classification);
      formData.set("domaine", domaine);
      formData.set("rib", rib);

      try {
        await updateEntite(formData);
        toastManager.add({
          type: "success",
          title: "Entité mise à jour",
          description: `« ${nom} » a été enregistrée.`,
        });
      } catch (error) {
        toastManager.add({ type: "error", title: "Échec de l'enregistrement", description: errorMessage(error) });
      }
    });
  }

  function handleDelete() {
    if (!window.confirm(`Supprimer l'entité « ${entite.nom} » ?`)) return;
    startDelete(async () => {
      const formData = new FormData();
      formData.set("id", entite.id);
      formData.set("ministereId", ministereId);

      try {
        await deleteEntite(formData);
        toastManager.add({
          type: "success",
          title: "Entité supprimée",
          description: `« ${entite.nom} » a été supprimée.`,
        });
      } catch (error) {
        toastManager.add({ type: "error", title: "Échec de la suppression", description: errorMessage(error) });
      }
    });
  }

  return (
    <tr className="border-b border-border last:border-0">
      <td className="px-5 py-3 align-top">
        <input value={sigle} onChange={(e) => setSigle(e.target.value)} required className={inputClass} />
      </td>
      <td className="px-3 py-3 align-top">
        <input value={nom} onChange={(e) => setNom(e.target.value)} required className={inputClass} />
      </td>
      <td className="px-3 py-3 align-top">
        <input value={classification} onChange={(e) => setClassification(e.target.value)} className={inputClass} />
      </td>
      <td className="px-3 py-3 align-top">
        <input value={domaine} onChange={(e) => setDomaine(e.target.value)} className={inputClass} />
      </td>
      <td className="px-3 py-3 align-top">
        <input value={rib} onChange={(e) => setRib(e.target.value)} className={inputClass} />
      </td>
      <td className="px-3 py-3 align-top">
        <div className="flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" disabled={isPending} onClick={handleSave}>
            {isSaving ? "Enregistrement..." : "Enregistrer"}
          </Button>
          <Button type="button" size="sm" variant="destructive" disabled={isPending} onClick={handleDelete}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </div>
      </td>
    </tr>
  );
}

export function EntitesManager({
  ministereId,
  entites,
}: {
  ministereId: string;
  entites: EntiteRow[];
}) {
  return (
    <>
      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">Ajouter une entité</CardTitle>
        </CardHeader>
        <CardContent className="px-5 pb-5 pt-2">
          <CreateEntiteForm ministereId={ministereId} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="px-5 pt-5">
          <CardTitle className="text-xs">{entites.length} entité(s)</CardTitle>
          <CardDescription>Structures sous tutelle de ce ministère.</CardDescription>
        </CardHeader>
        <CardContent className="px-0 pb-0 pt-2">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <th className="px-5 py-2 font-semibold">Sigle</th>
                  <th className="px-3 py-2 font-semibold">Nom</th>
                  <th className="px-3 py-2 font-semibold">Classification</th>
                  <th className="px-3 py-2 font-semibold">Domaine</th>
                  <th className="px-3 py-2 font-semibold">RIB</th>
                  <th className="px-3 py-2 font-semibold" />
                </tr>
              </thead>
              <tbody>
                {entites.map((e) => (
                  <EntiteTableRow key={e.id} ministereId={ministereId} entite={e} />
                ))}
                {entites.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-6 text-center text-xs text-muted-foreground">
                      Aucune entité enregistrée pour ce ministère.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
