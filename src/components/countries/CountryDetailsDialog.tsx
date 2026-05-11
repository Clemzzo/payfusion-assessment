"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import type { Country } from "@/types/country";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  country: Country | null;
  onOpenChange: (open: boolean) => void;
};

function flagSrc(country: Country): string | null {
  const { flagURL } = country;
  if (!flagURL) return null;
  if (typeof flagURL === "string") return flagURL || null;
  return flagURL.svg || flagURL.png || null;
}

export function CountryDetailsDialog({ country, onOpenChange }: Props) {
  const t = useTranslations("countries.fields");
  const open = !!country;
  const src = country ? flagSrc(country) : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden p-0 sm:max-w-md">
        {country && (
          <>
            <div className="flex items-center justify-center border-b border-border/60 bg-muted/30 px-6 py-8">
              {src ? (
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={108}
                  className="h-24 w-36 rounded-md object-cover ring-1 ring-border/70 shadow-sm"
                  unoptimized
                />
              ) : (
                <span
                  className="flex h-24 w-36 items-center justify-center rounded-md bg-background text-6xl ring-1 ring-border/70 shadow-sm"
                  aria-hidden
                >
                  {country.flag || "🏳️"}
                </span>
              )}
            </div>

            <div className="space-y-5 px-6 pb-6 pt-5">
              <DialogHeader className="gap-1">
                <DialogTitle className="text-xl font-semibold tracking-tight">
                  {country.countryName}
                </DialogTitle>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {country.internetCountryCode}
                </p>
              </DialogHeader>

              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border/60 ring-1 ring-border/60">
                <Field label={t("name")} value={country.countryName} />
                <Field label={t("code")} value={country.countryCode} mono />
                <Field
                  label={t("currency")}
                  value={country.currencyCode}
                  hint={country.currency}
                  mono
                />
                <Field
                  label={t("locale")}
                  value={country.internetCountryCode}
                  mono
                />
              </dl>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  value,
  hint,
  mono,
}: {
  label: string;
  value: string;
  hint?: string;
  mono?: boolean;
}) {
  return (
    <div className="min-w-0 bg-card px-4 py-3">
      <dt className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/80">
        {label}
      </dt>
      <dd
        className={`mt-1 truncate text-sm font-medium text-foreground ${
          mono ? "font-mono" : ""
        }`}
        title={hint ?? value}
      >
        {value}
      </dd>
      {hint && (
        <p className="mt-0.5 truncate text-[11px] text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
