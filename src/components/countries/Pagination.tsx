"use client";

import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPageItems(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("…");
  for (let i = start; i <= end; i++) items.push(i);
  if (end < total - 1) items.push("…");

  items.push(total);
  return items;
}

export function Pagination({ page, totalPages, onPageChange }: Props) {
  const t = useTranslations("countries");
  const c = useTranslations("common");

  if (totalPages <= 1) return null;

  const items = getPageItems(page, totalPages);
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <nav
      aria-label={t("pageOf", { current: page, total: totalPages })}
      className="flex flex-col items-center gap-3 pt-2 sm:flex-row sm:justify-between"
    >
      <p className="text-xs text-muted-foreground tabular-nums">
        {t("pageOf", { current: page, total: totalPages })}
      </p>

      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            onClick={() => canPrev && onPageChange(page - 1)}
            disabled={!canPrev}
            aria-label={c("previous")}
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-border/70 bg-card px-3 text-sm font-medium text-foreground shadow-sm transition hover:border-foreground/20 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border/70 disabled:hover:bg-card"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">{c("previous")}</span>
          </button>
        </li>

        {items.map((item, idx) =>
          item === "…" ? (
            <li
              key={`ellipsis-${idx}`}
              aria-hidden
              className="px-1.5 text-sm text-muted-foreground/60 select-none"
            >
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                onClick={() => onPageChange(item)}
                aria-label={t("goToPage", { page: item })}
                aria-current={item === page ? "page" : undefined}
                className={
                  item === page
                    ? "inline-flex h-9 min-w-9 items-center justify-center rounded-lg bg-foreground px-3 text-sm font-semibold tabular-nums text-background shadow-sm"
                    : "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border border-border/70 bg-card px-3 text-sm font-medium tabular-nums text-foreground shadow-sm transition hover:border-foreground/20 hover:bg-muted/40"
                }
              >
                {item}
              </button>
            </li>
          ),
        )}

        <li>
          <button
            type="button"
            onClick={() => canNext && onPageChange(page + 1)}
            disabled={!canNext}
            aria-label={c("next")}
            className="inline-flex h-9 items-center gap-1 rounded-lg border border-border/70 bg-card px-3 text-sm font-medium text-foreground shadow-sm transition hover:border-foreground/20 hover:bg-muted/40 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border/70 disabled:hover:bg-card"
          >
            <span className="hidden sm:inline">{c("next")}</span>
            <ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        </li>
      </ul>
    </nav>
  );
}
