"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useDebounce } from "use-debounce";

import { useCountries } from "@/hooks/useCountries";
import { filterCountries } from "@/lib/filter";
import type { Country } from "@/types/country";
import { SearchBar } from "./SearchBar";
import { CountryCard } from "./CountryCard";
import { CountryDetailsDialog } from "./CountryDetailsDialog";
import { Pagination } from "./Pagination";
import {
  EmptyState,
  ErrorState,
  LoadingSkeleton,
} from "./CountriesStates";

const PAGE_SIZE = 20;

export function CountriesView() {
  const t = useTranslations("countries");
  const { data, isPending, isError, refetch } = useCountries();

  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 250);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Country | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const filtered = useMemo(
    () => filterCountries(data ?? [], debouncedQuery),
    [data, debouncedQuery],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const items = useMemo(
    () =>
      filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  );

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "/") return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) {
        return;
      }
      e.preventDefault();
      searchInputRef.current?.focus();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePageChange = (next: number) => {
    setPage(next);
    listRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showResults = !isPending && !isError;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-lg sm:flex-1">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t("searchPlaceholder")}
            inputRef={searchInputRef}
          />
        </div>
        {showResults && (
          <div
            className="flex items-center gap-2 self-start rounded-full border border-border/70 bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm sm:self-auto"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="tabular-nums text-foreground">
              {t("resultsCount", { count: filtered.length })}
            </span>
          </div>
        )}
      </div>

      {isPending ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorState onRetry={() => refetch()} />
      ) : filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <ul
            ref={listRef}
            role="list"
            className="grid scroll-mt-6 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {items.map((c) => (
              <li
                key={c.countryId ?? `${c.internetCountryCode}-${c.countryCode}`}
              >
                <CountryCard country={c} onSelect={setSelected} />
              </li>
            ))}
          </ul>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <CountryDetailsDialog
        country={selected}
        onOpenChange={(open) => !open && setSelected(null)}
      />
    </div>
  );
}
