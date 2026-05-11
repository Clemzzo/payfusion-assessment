"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LABELS: Record<Locale, string> = { en: "English", fr: "Français" };

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();

  const handleChange = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next as Locale });
    });
  };

  return (
    <Select value={locale} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger
        size="sm"
        aria-label={t("language")}
        className="w-36 gap-2"
      >
        <span
          aria-hidden
          className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground"
        >
          {locale.toUpperCase()}
        </span>
        <SelectValue placeholder={t("language")} />
      </SelectTrigger>
      <SelectContent align="end">
        {routing.locales.map((l) => (
          <SelectItem key={l} value={l}>
            {LABELS[l]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
