import { describe, expect, it } from "vitest";
import { filterCountries } from "@/lib/filter";
import type { Country } from "@/types/country";

const sample: Country[] = [
  {
    countryName: "Nigeria",
    countryCode: "+234",
    currency: "Nigerian naira",
    currencyCode: "NGN",
    internetCountryCode: "NG",
  },
  {
    countryName: "France",
    countryCode: "+33",
    currency: "Euro",
    currencyCode: "EUR",
    internetCountryCode: "FR",
  },
  {
    countryName: "Côte d'Ivoire",
    countryCode: "+225",
    currency: "West African CFA franc",
    currencyCode: "XOF",
    internetCountryCode: "CI",
  },
];

describe("filterCountries", () => {
  it("returns all countries when query is empty", () => {
    expect(filterCountries(sample, "")).toHaveLength(3);
    expect(filterCountries(sample, "   ")).toHaveLength(3);
  });

  it("matches by country name (case-insensitive)", () => {
    expect(filterCountries(sample, "nig")).toEqual([sample[0]]);
    expect(filterCountries(sample, "FRANCE")).toEqual([sample[1]]);
  });

  it("matches by country code (ISO)", () => {
    expect(filterCountries(sample, "NG")).toEqual([sample[0]]);
  });

  it("matches by currency name or code", () => {
    expect(filterCountries(sample, "EUR")).toEqual([sample[1]]);
    expect(filterCountries(sample, "naira")).toEqual([sample[0]]);
  });

  it("normalizes diacritics", () => {
    expect(filterCountries(sample, "cote")).toEqual([sample[2]]);
  });

  it("returns empty when nothing matches", () => {
    expect(filterCountries(sample, "zzz")).toEqual([]);
  });
});
