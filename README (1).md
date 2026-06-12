# flight.bet proxy worker

Tiny Cloudflare Worker that sits between the static front-end and FlightAware AeroAPI. It exists so the AeroAPI key stays **server-side**: a key shipped in browser JS on GitHub Pages is public to anyone who views source, and would be scraped + your quota drained within hours.

It also **caches** responses at Cloudflare's edge so repeated page loads don't burn your paid quota, and **restricts origins** so random people can't ride your key.

## What it does

- `GET /api/flight?ident=AA100` — live status for one flight (origin/destination, scheduled vs actual arrival, delay in minutes, cancelled flag).
- `GET /api/airport?code=KLAX` — today's departures + cancellation share for an airport.
- `GET /api/health` — sanity check.

Caches: flight status 60s, airport counts 5min. Tune in `worker.js → TTL`.

## Why FlightAware AeroAPI

Of the realistic options:

- **AeroAPI** — usage-based, ~$5 free monthly credit, comprehensive coverage (ADS-B + ATC + radar), historical data back to 2011. Best data quality of the affordable tier.
- **AviationStack** — 100 free calls/month, paid tier from $49/mo. Easier to start, less generous, mixed reputation on data quality.
- **AeroDataBox** — niche, affordable, decent.

Pick AeroAPI for production. If you're just kicking tires, AviationStack's free tier is fine — same proxy pattern applies, just swap the endpoint and auth header.

## Deploy in 5 minutes

You'll need: a [Cloudflare account](https://cloudflare.com) (free), Node.js, and an AeroAPI key from [flightaware.com/aeroapi](https://www.flightaware.com/aeroapi).

```bash
cd worker
npx wrangler login
npx wrangler secret put AEROAPI_KEY        # paste your AeroAPI key when prompted
npx wrangler secret put ALLOWED_ORIGINS    # paste e.g. https://USERNAME.github.io,http://localhost:8000
npx wrangler deploy
```

Wrangler prints your worker URL, e.g. `https://flightbet-proxy.YOUR-SUBDOMAIN.workers.dev`. That's your API base.

## Wire it into the front-end

Open `../index.html`, find the `CONFIG` block near the top of the React script, and set:

```js
const CONFIG = {
  API_BASE: "https://flightbet-proxy.YOUR-SUBDOMAIN.workers.dev",
  // ...
};
```

That's it. The site now pulls live AeroAPI data through your worker, with the key safe on the server side. With no `API_BASE` set, the site falls back to seeded demo data — useful for local dev and as a graceful failure mode if the worker ever goes down.

## Quota & cost

Cloudflare Workers free tier: **100,000 requests/day**. With the cache TTLs above, a viral spike of 10k visitors barely dents it.

AeroAPI is usage-based — typical query is well under $0.01. With our caching the worker only hits AeroAPI once per `(flight, 60s window)` or `(airport, 5min window)`, so 10k concurrent visitors viewing the same 10 markets = ~10 AeroAPI calls per minute, not 10k.

## Frozen resolution rule (the part that matters for any real-money future)

Every market in the front-end names its settlement source. The worker fetches that source live for display, but **settlement** of a real-money market must read the official figure at a **frozen timestamp**, agreed before the bet opens — not the live drifting value. For a flight: take `actual_on` (gate-in time) recorded by AeroAPI **24h after scheduled arrival** as the canonical settlement read. For an airport's cancellation share: take the 00:00 local-time AeroAPI snapshot the next day. Build that snapshot into a separate `/api/settle?...&asOf=...` endpoint and store the snapshot in Cloudflare KV or D1 so it's auditable and immutable. That's the gate to any real-money version — and it's deliberately not built yet, since the play-money MVP doesn't need it.
