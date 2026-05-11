"use client";

import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { Country } from "@/types/country";

type Props = {
  country: Country;
  onSelect: (country: Country) => void;
};

export function CountryCard({ country, onSelect }: Props) {
  const t = useTranslations("countries.fields");

  return (
    <button
      type="button"
      onClick={() => onSelect(country)}
      aria-label={`${country.countryName} — ${country.currencyCode}`}
      className="group relative flex h-full w-full flex-col gap-5 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-foreground/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />

      <div className="flex items-start gap-3.5">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-muted/80 to-muted/40 text-2xl leading-none ring-1 ring-inset ring-border/60 shadow-sm"
          aria-hidden
        >
          {country.flag || "🏳️"}
        </span>

        <div className="min-w-0 flex-1 pt-0.5">
          <h3 className="truncate text-[15px] font-semibold leading-tight tracking-tight text-foreground">
            {country.countryName}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="font-mono font-medium uppercase tracking-wider">
              {country.internetCountryCode}
            </span>
            <span aria-hidden className="text-muted-foreground/40">
              ·
            </span>
            <span className="font-mono uppercase tracking-wider">
              {country.countryCode}
            </span>
          </p>
        </div>

        <ArrowUpRight
          aria-hidden
          className="h-4 w-4 shrink-0 text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
        />
      </div>

      <div className="mt-auto flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
            {t("currency")}
          </p>
          <p
            className="mt-1 truncate text-sm font-medium text-foreground"
            title={country.currency}
          >
            {country.currency}
          </p>
        </div>
        <span className="shrink-0 rounded-md bg-foreground/4 px-2.5 py-1 font-mono text-xs font-semibold tracking-wide text-foreground ring-1 ring-inset ring-border/60">
          {country.currencyCode}
        </span>
      </div>
    </button>
  );
}
