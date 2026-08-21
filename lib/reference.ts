const COMBINING_DIACRITICS = /[̀-ͯ]/g;

/** Code court utilisable dans une référence métier (majuscules, sans accents ni séparateurs). */
export function slugifyCode(input: string, maxLen = 12): string {
  const base = input.split("(")[0];
  const slug = base
    .normalize("NFD")
    .replace(COMBINING_DIACRITICS, "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "");
  return (slug || "REF").slice(0, maxLen);
}

/** Référence métier : {entité}-{période}-{séquence sur 4 chiffres}. */
export function formatReference(entiteCode: string, periode: string, sequence: number): string {
  return `${entiteCode}-${periode}-${String(sequence).padStart(4, "0")}`;
}
