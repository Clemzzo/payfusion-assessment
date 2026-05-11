import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Globe } from "lucide-react";

export async function AppHeader({ rightSlot }: { rightSlot?: ReactNode }) {
  const t = await getTranslations("common");
  return (
    <header className="border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-30">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4 font-semibold">
          <Globe className="h-5 w-5" aria-hidden />
          <span>{t("appName")}</span>
        </div>
        <div className="flex items-center gap-2">
          {rightSlot}
        </div>
      </div>
    </header>
  );
}
