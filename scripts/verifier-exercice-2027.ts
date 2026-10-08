// Contrôle de cohérence des données du PLF 2027 (lib/exercices/2027.ts).
// Usage : npx tsx scripts/verifier-exercice-2027.ts

import {
  depensesPlf2027,
  equilibrePlf2027,
  piliersPag2027,
  recettesPlf2027,
  retrocessionProvinces2027,
  type PlfTable,
} from "../lib/exercices/2027";

const anomalies: string[] = [];
const fmt = (v: number) => (v / 1e9).toLocaleString("fr-FR", { maximumFractionDigits: 1 });
const check = (label: string, attendu: number, obtenu: number, tolerance = 2) => {
  if (Math.abs(attendu - obtenu) > tolerance) {
    anomalies.push(`${label} : attendu ${fmt(attendu)} Mrd, somme ${fmt(obtenu)} Mrd (écart ${fmt(obtenu - attendu)})`);
  }
};

function verifierTable(table: PlfTable) {
  table.rows.forEach((row, i) => {
    const enfants = [];
    for (let j = i + 1; j < table.rows.length && table.rows[j].level > row.level; j++) {
      if (table.rows[j].level === row.level + 1) enfants.push(table.rows[j]);
    }
    if (enfants.length === 0) return;
    for (const key of ["lfr", "plf"] as const) {
      if (row[key] === null) continue;
      check(`${table.id} · ${row.code ?? ""} ${row.label} (${key})`, row[key]!, enfants.reduce((s, e) => s + (e[key] ?? 0), 0));
    }
  });
  for (const key of ["lfr", "plf"] as const) {
    const niveau0 = table.rows.filter((r) => r.level === 0).reduce((s, r) => s + (r[key] ?? 0), 0);
    check(`${table.id} · total (${key})`, table.total[key]!, niveau0);
  }
  // Évolution publiée vs recalculée par rapport à la LFR 2026.
  table.rows.forEach((row) => {
    if (row.lfr && row.plf !== null && row.accrLfr !== null) {
      const calcule = ((row.plf - row.lfr) / row.lfr) * 100;
      if (Math.abs(calcule - row.accrLfr) > 0.15) {
        anomalies.push(`${table.id} · ${row.label} : évolution publiée ${row.accrLfr} %, recalculée ${calcule.toFixed(1)} %`);
      }
    }
  });
}

verifierTable(recettesPlf2027);
verifierTable(depensesPlf2027);
check("Équilibre recettes = dépenses (PLF)", recettesPlf2027.total.plf!, depensesPlf2027.total.plf!, 0);

const cascade = (n: string) => retrocessionProvinces2027.find((r) => r.label.startsWith(n))!;
for (const key of ["lfr", "plf"] as const) {
  check(`Tableau 4 · 3 = 1 - 2 (${key})`, cascade("3.")[key], cascade("1.")[key] - cascade("2.")[key]);
  check(`Tableau 4 · 5 = 3 - 4 (${key})`, cascade("5.")[key], cascade("3.")[key] - cascade("4.")[key]);
  check(`Tableau 4 · 7 = 5 - 6 (${key})`, cascade("7.")[key], cascade("5.")[key] - cascade("6.")[key]);
}
check("Tableau 4 · transfert provinces = rémunérations + fonctionnement + investissement",
  cascade("9.").plf,
  retrocessionProvinces2027.slice(retrocessionProvinces2027.indexOf(cascade("9.")) + 1, retrocessionProvinces2027.indexOf(cascade("9.")) + 4).reduce((s, r) => s + r.plf, 0));

check("Tableau 5 · ressources", equilibrePlf2027.total, equilibrePlf2027.ressources.reduce((s, r) => s + r.montant, 0));
check("Tableau 5 · emplois", equilibrePlf2027.total, equilibrePlf2027.emplois.reduce((s, r) => s + r.montant, 0));

const partsPag = piliersPag2027.reduce((s, p) => s + p.part, 0);
if (Math.abs(partsPag - 100) > 0.05) anomalies.push(`Piliers du PAG : somme des parts ${partsPag} %`);

if (anomalies.length === 0) {
  console.log("✔ Données PLF 2027 cohérentes.");
} else {
  console.log(`⚠ ${anomalies.length} écart(s) détecté(s) dans les données publiées :`);
  anomalies.forEach((a) => console.log(`  - ${a}`));
}
