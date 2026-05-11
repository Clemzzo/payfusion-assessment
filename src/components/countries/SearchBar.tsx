"use client";

import { Search, X } from "lucide-react";
import type { Ref } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  inputRef?: Ref<HTMLInputElement>;
};

export function SearchBar({ value, onChange, placeholder, inputRef }: Props) {
  return (
    <div className="group relative">
      <Search
        aria-hidden
        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/70 transition-colors group-focus-within:text-foreground"
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-14 w-full rounded-xl border border-border/70 bg-card pl-11 pr-20 text-sm shadow-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/70 focus:border-foreground/30 focus:shadow-md [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
