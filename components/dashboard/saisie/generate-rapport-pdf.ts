export type RapportChamp = { label: string; value: string };
export type RapportEvenement = {
  action: string;
  statutAvant: string | null;
  statutApres: string | null;
  auteur: string;
  date: string;
};

export type RapportData = {
  titre: string;
  sousTitre: string;
  fileName: string;
  champs: RapportChamp[];
  historique: RapportEvenement[];
};

// jsPDF's Helvetica font uses WinAnsiEncoding, which does not include the narrow/non-breaking
// spaces Number.prototype.toLocaleString("fr-FR") uses for thousands grouping — left as-is they
// render as garbled slashes (e.g. "500/000/000"). Replace them with a plain ASCII space instead.
const NBSP_LIKE = /[    ]/g;
// Matches a trailing "(env. 123,4 USD)"-style equivalent so it can be rendered smaller/muted
// right after the main figure instead of at the same weight.
const EQUIVALENT_SUFFIX = /^(.*?)\s*(\([^)]*\))\s*$/;

function sanitizePdfText(text: string): string {
  return text.replace(NBSP_LIKE, " ");
}

function isMontantValue(value: string): boolean {
  return /\bCDF\b|\bUSD\b/.test(value) && !/CDF\s*\/\s*USD/.test(value);
}

export async function generateRapportPdf({ titre, sousTitre, champs, historique, fileName }: RapportData) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = 18;

  const addHeader = () => {
    pdf.setFillColor(15, 35, 69);
    pdf.rect(0, 0, pageWidth, 31, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(15);
    pdf.text(sanitizePdfText(titre.toUpperCase()), margin, 15);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text(sanitizePdfText(sousTitre), margin, 22);
    pdf.setTextColor(30, 41, 59);
    y = 40;
  };

  const ensure = (height: number) => {
    if (y + height > pageHeight - 16) {
      pdf.addPage();
      addHeader();
    }
  };

  addHeader();
  pdf.setFontSize(9);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`Document généré le ${new Date().toLocaleDateString("fr-FR")}`, margin, y);
  y += 9;

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(15, 35, 69);
  pdf.text("DÉTAIL DE LA SAISIE", margin, y);
  y += 7;

  champs.forEach((champ) => {
    const label = sanitizePdfText(champ.label);
    const fullValue = sanitizePdfText(champ.value || "—");
    const montant = isMontantValue(fullValue);
    const equivMatch = montant ? fullValue.match(EQUIVALENT_SUFFIX) : null;
    const mainValue = equivMatch ? equivMatch[1] : fullValue;
    const equivalent = equivMatch ? equivMatch[2] : null;

    const valueLines = pdf.splitTextToSize(mainValue, contentWidth - 55) as string[];
    const lineHeight = montant ? 5.4 : 4.5;
    const blockHeight = Math.max(7, valueLines.length * lineHeight + 2);
    ensure(blockHeight);

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(71, 85, 105);
    pdf.text(label, margin, y);

    if (montant) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(15, 35, 69);
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      pdf.setTextColor(15, 23, 42);
    }
    pdf.text(valueLines, margin + 52, y);

    if (equivalent) {
      const lastLine = valueLines[valueLines.length - 1] ?? mainValue;
      const lastLineWidth = pdf.getTextWidth(lastLine);
      const lastLineY = y + (valueLines.length - 1) * lineHeight;
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(8);
      pdf.setTextColor(100, 116, 139);
      pdf.text(equivalent, margin + 52 + lastLineWidth + 2.5, lastLineY);
    }

    y += blockHeight;
  });

  y += 4;
  ensure(14);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(15, 35, 69);
  pdf.text("HISTORIQUE DE TRAITEMENT", margin, y);
  y += 7;

  if (historique.length === 0) {
    ensure(8);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.setTextColor(100, 116, 139);
    pdf.text("Aucun évènement enregistré.", margin, y);
    y += 8;
  }

  historique.forEach((evt) => {
    ensure(14);
    pdf.setDrawColor(218, 225, 234);
    pdf.setFillColor(252, 253, 255);
    pdf.roundedRect(margin, y, contentWidth, 12, 2, 2, "FD");
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    pdf.setTextColor(15, 23, 42);
    pdf.text(sanitizePdfText(evt.action), margin + 4, y + 5);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    pdf.setTextColor(100, 116, 139);
    pdf.text(sanitizePdfText(`${evt.auteur} — ${evt.date}`), margin + 4, y + 9.5);
    if (evt.statutApres) {
      pdf.setFontSize(7.5);
      pdf.setTextColor(71, 85, 105);
      pdf.text(sanitizePdfText(evt.statutApres), pageWidth - margin - 4, y + 7, { align: "right" });
    }
    y += 15;
  });

  pdf.save(fileName);
}
