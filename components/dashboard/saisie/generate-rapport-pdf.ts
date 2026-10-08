import {
  PDF_ACCENTS,
  PDF_COLORS,
  drawFooters,
  drawPageHeader,
  drawSectionTitle,
  drawStatusBadge,
  fill,
  ink,
  sanitizePdfText,
  statusStyle,
  stroke,
  tint,
} from "@/lib/pdf-theme";

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

// Matches a trailing "(env. 123,4 USD)"-style equivalent so it can be rendered smaller/muted
// right below the main figure instead of at the same weight.
const EQUIVALENT_SUFFIX = /^(.*?)\s*(\([^)]*\))\s*$/;
// Champs repris dans le bandeau de synthèse plutôt que dans le tableau de détail.
const SUMMARY_LABELS = ["Référence", "Période", "Statut"];

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
  const labelWidth = 58;

  let y = drawPageHeader(pdf, { title: `Rapport de saisie · ${titre}`, subtitle: sousTitre });

  const ensure = (height: number) => {
    if (y + height > pageHeight - 18) {
      pdf.addPage();
      y = drawPageHeader(pdf, { title: `Rapport de saisie · ${titre}`, compact: true });
    }
  };

  // Bandeau de synthèse : référence, période, statut.
  const summary = SUMMARY_LABELS.map((label) => champs.find((c) => c.label === label)).filter(
    (c): c is RapportChamp => Boolean(c),
  );
  if (summary.length) {
    const cardWidth = (contentWidth - (summary.length - 1) * 4) / summary.length;
    summary.forEach((champ, index) => {
      const x = margin + index * (cardWidth + 4);
      const accent = champ.label === "Statut" ? statusStyle(champ.value).fg : PDF_ACCENTS[index];
      fill(pdf, tint(accent, 0.92));
      pdf.roundedRect(x, y, cardWidth, 17, 2.5, 2.5, "F");
      fill(pdf, accent);
      pdf.roundedRect(x, y, 1.6, 17, 0.8, 0.8, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(7);
      ink(pdf, PDF_COLORS.muted);
      pdf.text(sanitizePdfText(champ.label.toUpperCase()), x + 5, y + 6);
      if (champ.label === "Statut") {
        drawStatusBadge(pdf, x + 5, y + 12.5, champ.value);
      } else {
        pdf.setFontSize(11);
        ink(pdf, PDF_COLORS.navy);
        const value = pdf.splitTextToSize(sanitizePdfText(champ.value || "—"), cardWidth - 8) as string[];
        pdf.text(value[0], x + 5, y + 12.5);
      }
    });
    y += 25;
  }

  // Tableau de détail.
  y = drawSectionTitle(pdf, y, "Détail de la saisie");
  const details = champs.filter((c) => !SUMMARY_LABELS.includes(c.label));

  fill(pdf, PDF_COLORS.navy);
  pdf.roundedRect(margin, y, contentWidth, 8, 1.5, 1.5, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(7.5);
  ink(pdf, PDF_COLORS.white);
  pdf.text("RUBRIQUE", margin + 5, y + 5.3);
  pdf.text("VALEUR", margin + labelWidth + 4, y + 5.3);
  y += 8;

  let accentIndex = 0;
  details.forEach((champ, index) => {
    const fullValue = sanitizePdfText(champ.value || "—");
    const montant = isMontantValue(fullValue);
    const equivMatch = montant ? fullValue.match(EQUIVALENT_SUFFIX) : null;
    const mainValue = equivMatch ? equivMatch[1] : fullValue;
    const equivalent = equivMatch ? equivMatch[2] : null;

    pdf.setFont("helvetica", montant ? "bold" : "normal");
    pdf.setFontSize(montant ? 10.5 : 9);
    const valueLines = pdf.splitTextToSize(mainValue, contentWidth - labelWidth - 8) as string[];
    const lineHeight = montant ? 5 : 4.4;
    const rowHeight = Math.max(9, valueLines.length * lineHeight + (equivalent ? 4.5 : 0) + 4.5);
    ensure(rowHeight);

    fill(pdf, index % 2 === 0 ? PDF_COLORS.white : PDF_COLORS.zebra);
    pdf.rect(margin, y, contentWidth, rowHeight, "F");
    stroke(pdf, PDF_COLORS.border);
    pdf.setLineWidth(0.2);
    pdf.line(margin, y + rowHeight, margin + contentWidth, y + rowHeight);

    if (montant) {
      const accent = PDF_ACCENTS[accentIndex++ % PDF_ACCENTS.length];
      fill(pdf, accent);
      pdf.circle(margin + 3, y + 5.6, 1.1, "F");
    }

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8.5);
    ink(pdf, [71, 85, 105]);
    pdf.text(sanitizePdfText(champ.label), margin + (montant ? 6 : 5), y + 6.3);

    const valueX = margin + labelWidth + 4;
    if (montant) {
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(10.5);
      ink(pdf, PDF_COLORS.navy);
    } else {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(9);
      ink(pdf, PDF_COLORS.ink);
    }
    pdf.text(valueLines, valueX, y + 6.3);

    if (equivalent) {
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(7.5);
      ink(pdf, PDF_COLORS.muted);
      pdf.text(equivalent, valueX, y + 6.3 + valueLines.length * lineHeight);
    }

    y += rowHeight;
  });

  // Historique sous forme de frise.
  y += 10;
  ensure(20);
  y = drawSectionTitle(pdf, y, "Historique de traitement", [5, 150, 105]);

  if (historique.length === 0) {
    ensure(12);
    fill(pdf, PDF_COLORS.zebra);
    pdf.roundedRect(margin, y, contentWidth, 10, 2, 2, "F");
    pdf.setFont("helvetica", "italic");
    pdf.setFontSize(8.5);
    ink(pdf, PDF_COLORS.muted);
    pdf.text("Aucun évènement enregistré.", margin + 5, y + 6.3);
    y += 12;
  }

  const timelineX = margin + 4;
  historique.forEach((evt, index) => {
    const cardHeight = 13;
    ensure(cardHeight + 4);
    const color = evt.statutApres ? statusStyle(evt.statutApres).fg : PDF_COLORS.muted;

    if (index < historique.length - 1) {
      stroke(pdf, PDF_COLORS.border);
      pdf.setLineWidth(0.6);
      pdf.line(timelineX, y + 6.5, timelineX, y + cardHeight + 4 + 6.5);
    }
    fill(pdf, PDF_COLORS.white);
    pdf.circle(timelineX, y + 6.5, 2.6, "F");
    fill(pdf, color);
    pdf.circle(timelineX, y + 6.5, 1.8, "F");

    const cardX = margin + 10;
    const cardWidth = contentWidth - 10;
    fill(pdf, tint(color, 0.94));
    stroke(pdf, tint(color, 0.75));
    pdf.setLineWidth(0.25);
    pdf.roundedRect(cardX, y, cardWidth, cardHeight, 2, 2, "FD");

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(9);
    ink(pdf, PDF_COLORS.ink);
    pdf.text(sanitizePdfText(evt.action), cardX + 4, y + 5.3);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7.5);
    ink(pdf, PDF_COLORS.muted);
    pdf.text(sanitizePdfText(`${evt.auteur} · ${evt.date}`), cardX + 4, y + 10);

    if (evt.statutApres) {
      const right = cardX + cardWidth - 4;
      const width = drawStatusBadge(pdf, right, y + 7.6, evt.statutApres, "right");
      if (evt.statutAvant && evt.statutAvant !== evt.statutApres) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(8);
        ink(pdf, PDF_COLORS.muted);
        pdf.text("»", right - width - 2.5, y + 7.8, { align: "right" });
        drawStatusBadge(pdf, right - width - 6, y + 7.6, evt.statutAvant, "right");
      }
    }
    y += cardHeight + 4;
  });

  drawFooters(pdf, `Ministère du Budget · RDC — ${titre} · document généré le ${new Date().toLocaleDateString("fr-FR")}`);
  pdf.save(fileName);
}
