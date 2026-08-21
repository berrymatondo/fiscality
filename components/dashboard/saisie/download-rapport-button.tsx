"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { generateRapportPdf, type RapportData } from "@/components/dashboard/saisie/generate-rapport-pdf";
import { toastManager } from "@/lib/toast-manager";

export function DownloadRapportButton({
  id,
  getRapportAction,
}: {
  id: string;
  getRapportAction: (id: string) => Promise<RapportData | null>;
}) {
  const [pending, setPending] = useState(false);

  async function handleClick() {
    setPending(true);
    try {
      const data = await getRapportAction(id);
      if (!data) {
        toastManager.add({
          type: "error",
          title: "Rapport indisponible",
          description: "Cette saisie est introuvable.",
        });
        return;
      }
      await generateRapportPdf(data);
    } catch (error) {
      toastManager.add({
        type: "error",
        title: "Échec du téléchargement",
        description: error instanceof Error ? error.message : "Une erreur est survenue.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline disabled:opacity-50"
    >
      <FileDown className="h-3.5 w-3.5" />
      {pending ? "Génération..." : "PDF"}
    </button>
  );
}
