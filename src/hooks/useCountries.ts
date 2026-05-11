"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "@/lib/api/payfusion";

export function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: ({ signal }) => fetchCountries(signal),
  });
}
