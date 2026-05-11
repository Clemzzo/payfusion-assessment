import type { CountriesResponse, Country } from "@/types/country";

const COUNTRIES_URL = process.env.NEXT_PUBLIC_PAYFUSION_COUNTRIES_URL;

export async function fetchCountries(signal?: AbortSignal): Promise<Country[]> {
  if (!COUNTRIES_URL) {
    throw new Error(
      "Missing NEXT_PUBLIC_PAYFUSION_COUNTRIES_URL environment variable.",
    );
  }

  const res = await fetch(COUNTRIES_URL, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch countries (${res.status})`);
  }
  const json = (await res.json()) as CountriesResponse;
  return json.data ?? [];
}
