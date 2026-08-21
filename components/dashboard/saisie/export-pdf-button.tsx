"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateRapportPdf, type RapportChamp, type RapportEvenement } from "@/components/dashboard/saisie/generate-rapport-pdf";

export type { RapportChamp, RapportEvenement };

export function ExportPdfButton({
  titre,
  sousTitre,
  champs,
  historique,
  fileName,
}: {
  titre: string;
  sousTitre: string;
  champs: RapportChamp[];
  historique: RapportEvenement[];
  fileName: string;
}) {
  const [exporting, setExporting] = useState(false);

  async function handleExport() {
    setExporting(true);
    try {
      await generateRapportPdf({ titre, sousTitre, champs, historique, fileName });
    } finally {
      setExporting(false);
    }
  }

  return (
    <Button type="button" variant="outline" disabled={exporting} onClick={handleExport}>
      <FileDown className="h-4 w-4" />
      {exporting ? "Génération..." : "Rapport PDF"}
    </Button>
  );
}
