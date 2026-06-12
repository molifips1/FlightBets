# flight.bet

A play-money prediction market on flight delays — two screens (front page + insight page), inspired by bahn.bet's structure with its own visual identity. Static front-end on GitHub Pages, with an optional Cloudflare Worker for live FlightAware data.

> Not affiliated with bahn.bet, Deutsche Bahn, or any airline. Codenames (Sturmschwalbe, Teekiebitz…) are a wink at bahn.bet.

## Two pieces

```
index.html              ← static site, GitHub Pages
worker/worker.js        ← Cloudflare Worker, holds AeroAPI key + caches
worker/wrangler.toml    ← deploy config
worker/README.md        ← 5-min deploy walkthrough
```

The site works **with no worker** (seeded demo data) and lights up as **LIVE** the moment you point it at one. Both modes show the same UI; only the data source changes.

## What's in it

**Front page** — 3-column card grid, live win-ticker, search/filter row, bottom tab bar, light/dark toggle, and a **LIVE / DEMO / OFFLINE pill** in the top bar so you always know the data state.

Card types:
- **Single-flight markets** (hybrid): route, scheduled-vs-actual times, delay-distribution curve, risk bar, breakdown. Pulls live from `/api/flight?ident=…`.
- **Aggregate markets**: airline / airport rates (e.g. LAX cancellation share today). Pulls live from `/api/airport?code=…`.
- **Daily question** with early-bonus multiplier, and a **live-discussion** card.

**Detail page** (click any flight or aggregate card) — reliability grade with spirit animal, three stat tiles (avg delay / on-time % / tracked), full distribution chart, top forecasters, discussion panel, live bettable card, run-history feed.

**Mechanics** — pari-mutuel pools (the pool is the counterparty; two bettors make a market), play-money "Miles" (✦), a named settlement oracle per market, browser persistence.

## Quick start — demo only (no live data)

1. Open `index.html` directly, or `python3 -m http.server 8000` → http://localhost:8000.
2. Top bar shows **DEMO**.

## Quick start — with live data

1. Get an AeroAPI key from [flightaware.com/aeroapi](https://www.flightaware.com/aeroapi).
2. Deploy the worker (see `worker/README.md` — 5 minutes).
3. Open `index.html`, find the `CONFIG` block (~line 220), set:
   ```js
   const CONFIG = {
     API_BASE: "https://flightbet-proxy.YOUR-SUBDOMAIN.workers.dev",
     REFRESH_MS: 60 * 1000,
   };
   ```
4. Reload. Top bar shows **LIVE**. Cards now reflect real flights.

If the worker is unreachable, the pill switches to **OFFLINE** and the seeded values stay on screen — graceful degrade rather than a broken page.

## Why a proxy worker rather than calling AeroAPI directly?

Any flight API needs a secret key. **A secret key in browser JS on GitHub Pages is public to anyone who views source** and would be scraped + your quota drained within hours. The worker keeps the key server-side, caches responses (so each page load doesn't burn quota), and origin-locks requests so randos can't ride your key. Cloudflare Workers free tier covers 100k requests/day, which with caching is far more than this app needs.

## Deploy to GitHub Pages

1. New repo (e.g. `flightbet`).
2. Put `index.html`, `README.md`, `.nojekyll` at the repo root and push to `main`.
3. Settings → Pages → Deploy from a branch → `main` / `/ (root)`.
4. Live at `https://USERNAME.github.io/flightbet/` in ~1 minute.
5. (Optional) Deploy the worker per `worker/README.md`, then update `CONFIG.API_BASE`.

## Single-flight vs aggregate, briefly

Single-flight betting is fine for **play money** (bahn.bet does exactly this). For any future **real money**, the aggregate markets are the ones that stay safe — no individual traveller can move an airport- or airline-wide rate, which closes the manipulation hole that single-flight real-money betting would open.

## Frozen resolution rule (the bit that matters for real money)

The proxy fetches live data for *display*. Settlement of a real-money market would need a frozen, immutable read of the official figure at a pre-published timestamp — e.g. `actual_on` recorded by AeroAPI 24h after scheduled arrival; or the 00:00-local-time AeroAPI airport snapshot the next day — stored in Cloudflare KV/D1 so it's auditable. The MVP deliberately doesn't build this yet; play money doesn't need it. `worker/README.md` sketches the path.

## Dev controls

Bottom-left: **OPS** toggles oracle-simulation (settle a market and pay the pool out); **Reset** clears the season.

## License
MIT
