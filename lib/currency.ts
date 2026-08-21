export function parseFrenchNumber(value: string) {
  return Number(value.replaceAll(" ", "").replace(",", "."));
}

export function formatUsdFromCdf(cdf: number, rate: number, maximumFractionDigits = 2) {
  return (cdf / rate).toLocaleString("fr-FR", { maximumFractionDigits });
}
