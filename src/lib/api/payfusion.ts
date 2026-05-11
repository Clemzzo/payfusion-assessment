import type { CountriesResponse, Country } from "@/types/country";

const COUNTRIES_URL =
  "https://api.payfonte.com/payfusion/public/v1/countries";

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  const res = await fetch(COUNTRIES_URL, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch countries (${res.status})`);
  }
  const json = (await res.json()) as CountriesResponse;
  return json.data ?? [];
}
