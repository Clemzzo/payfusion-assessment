import type { Country } from "@/types/country";

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function filterCountries(
  countries: Country[],
  query: string,
): Country[] {
  const q = normalize(query.trim());
  if (!q) return countries;

  return countries.filter((c) => {
    const haystack = [
      c.countryName,
      c.internetCountryCode,
      c.countryCode,
      c.currency,
      c.currencyCode,
    ]
      .filter(Boolean)
      .map((v) => normalize(String(v)))
      .join(" ");
    return haystack.includes(q);
  });
}
