# PayFusion Countries

A small Next.js 16 (App Router) + TypeScript + Tailwind app that lists countries
from the [PayFusion public API](https://api.payfonte.com/payfusion/public/v1/countries),
with debounced search, a details dialog, locale switching, and infinite scroll.

Built for the PayFusion frontend assessment in `assess/frontend_developer_test.md`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000  (redirects to /en/countries)
npm run build      # production build
npm run start      # serve the production build
npm run test       # unit tests (Vitest)
npm run lint       # ESLint
```

Requires Node 20+.

## What it does

- Fetches the country list once (4xx/5xx → error state, abort handled by React Query).
- Renders **name, ISO code, currency, locale** per card.
- **Search** by name, ISO code, phone code, currency, or currency code; debounced 250 ms; client-side; accent-insensitive.
- **States**: loading skeletons, retryable error state, empty-result state.
- **Country details dialog** (shadcn `Dialog`) shows ISO code, phone code, locale, currency name + code + symbol, flag image and alt text.
- **Locale switcher** in the header — `en` / `fr` (next-intl, URL-prefixed: `/en/...`, `/fr/...`).
- **Infinite scroll** via IntersectionObserver, 24 items per page.

## Architecture

```
src/
  app/[locale]/         # localized routes (next-intl)
    layout.tsx          # html/body + providers
    page.tsx            # redirects to /countries
    countries/page.tsx  # server shell (title/subtitle)
  components/
    countries/          # SearchBar, CountryCard, CountryDetailsDialog,
                        # CountriesStates, CountriesView (client orchestrator)
    layout/AppHeader.tsx
    providers/          # QueryProvider, LocaleSwitcher
    ui/                 # shadcn primitives
  hooks/useCountries.ts # React Query hook
  i18n/                 # routing, request config, navigation helpers
  lib/
    api/payfusion.ts    # typed fetch
    filter.ts           # pure, unit-tested
  messages/{en,fr}.json
  test/                 # vitest setup + unit tests
  types/country.ts
  proxy.ts              # next-intl locale routing (Next 16 proxy convention)
```

The server page is a thin shell; all interactivity lives in `CountriesView`
(one client component) so the route stays mostly static.

## Key decisions

- **App Router + `[locale]` segment** — clean URLs, SSG of localized shells,
  and next-intl handles message loading per request.
- **Single `useQuery` + client-side filter** instead of `useInfiniteQuery`. The
  API returns the full list in one response, so server-side pagination would
  be artificial; "infinite scroll" is implemented as progressive client-side
  rendering of the filtered array (24/page) to keep the DOM light.
- **`use-debounce`** for input debouncing — well-tested, ~1 KB.
- **Pure `filterCountries`** so search is trivially unit-testable; diacritics
  are normalized so "cote" finds "Côte d'Ivoire".
- **shadcn/ui** primitives for `Dialog`, `Input`, `Card`, `Badge`, `Skeleton`,
  `Button` — accessible defaults, styled with the project Tailwind tokens.
- **React Query** with `staleTime: 60s` and `refetchOnWindowFocus: false`:
  countries change rarely, so background refetches would be noise.
- **No backend route** — the API is public and called directly from the
  client through React Query.

## Tests

`npm run test` runs:

- `src/test/filter.test.ts` — name / ISO / currency matching, empty query,
  diacritic normalization, no-match.
- `src/test/SearchBar.test.tsx` — controlled input + onChange semantics.

## API

`GET https://api.payfonte.com/payfusion/public/v1/countries`

Response shape (typed in `src/types/country.ts`):

```jsonc
{
  "statusCode": 200,
  "data": [
    {
      "countryName": "Nigeria",
      "countryCode": "+234",
      "currency": "Nigerian naira",
      "currencyCode": "NGN",
      "currencyIcon": "₦",
      "flag": "🇳🇬",
      "flagURL": { "png": "...", "svg": "...", "alt": "..." },
      "internetCountryCode": "NG",
      "countryId": "..."
    }
  ]
}
```

`flagURL` is sometimes an empty string instead of an object (e.g. the synthetic
`GLOBAL` entry), so `CountryDetailsDialog` falls back to the flag emoji.

## Manual test plan

1. `npm run dev`, open <http://localhost:3000> → redirected to `/en/countries`.
2. Verify list renders with skeletons → cards. Each card shows flag, name,
   ISO badge, currency.
3. Search `nig`, `NGN`, `naira`, `+234` — all filter to Nigeria. Search `cote`
   — finds Côte d'Ivoire.
4. Click a card → dialog opens with full details and flag image. Close it.
5. Scroll to bottom → more cards load.
6. Switch the header language to **Français** — URL becomes `/fr/countries`
   and chrome is translated.
7. Block the network and reload → error state with retry button.
