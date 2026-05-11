"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle, SearchX, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const SKELETON_KEYS = Array.from({ length: 12 }, (_, i) => `s-${i}`);

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {SKELETON_KEYS.map((key) => (
        <div
          key={key}
          className="overflow-hidden rounded-2xl border border-border/60 bg-card"
        >
          <div className="flex items-center gap-3 px-5 py-4">
            <div className="h-11 w-11 shrink-0 animate-pulse rounded-xl bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-3.5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-2.5 w-1/3 animate-pulse rounded bg-muted/70" />
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border/60 border-t border-border/60 bg-muted/20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="space-y-1.5 px-3.5 py-3">
                <div className="h-2 w-1/2 animate-pulse rounded bg-muted/70" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  const t = useTranslations("countries");
  const c = useTranslations("common");
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-14 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 ring-1 ring-destructive/20">
        <AlertTriangle
          className="h-5 w-5 text-destructive"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold tracking-tight">{t("errorTitle")}</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {t("errorBody")}
        </p>
      </div>
      <Button type="button" onClick={onRetry} variant="outline" size="sm">
        <RefreshCw className="h-3.5 w-3.5" />
        {c("retry")}
      </Button>
    </div>
  );
}

export function EmptyState() {
  const t = useTranslations("countries");
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-border/70">
        <SearchX
          className="h-5 w-5 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold tracking-tight">{t("emptyTitle")}</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          {t("emptyBody")}
        </p>
      </div>
    </div>
  );
}
