import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { CountriesView } from "@/components/countries/CountriesView";

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("countries");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-1 text-muted-foreground">{t("subtitle")}</p>
      </header>
      <CountriesView />
    </div>
  );
}
