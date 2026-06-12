// flight.bet — proxy worker for FlightAware AeroAPI
//
// Why this exists: AeroAPI requires a secret key. You can't put that in the
// browser on GitHub Pages — it's public to anyone who views source and gets
// scraped within hours. This worker holds the key server-side, caches
// responses (so each page load doesn't burn paid quota), restricts which
// origins can call it (so randos can't ride your key), and returns clean
// normalized JSON the front-end can render.
//
// Deploy: see worker/README.md. Free tier on Cloudflare Workers covers
// 100k requests/day, which with caching is far more than this app needs.

const AEROAPI = "https://aeroapi.flightaware.com/aeroapi";

// How long to cache each kind of response in the edge cache. Tune these.
// Static-ish data (an airline's monthly on-time rate, an airport's daily
// cancellation count) is cached longer; live flight status is cached shorter.
const TTL = {
  flightStatus: 60,        // seconds — live flight, refreshes often
  airportCancels: 5 * 60,  // seconds — recomputed every 5 min is fine
  airlineOnTime: 60 * 60,  // seconds — monthly stat, hourly is plenty
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // ---- CORS preflight ----
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders(request, env) });
    }

    // ---- Origin lock ----
    // Comma-separated list in env.ALLOWED_ORIGINS, e.g.:
    //   https://USERNAME.github.io,http://localhost:8000
    const origin = request.headers.get("Origin") || "";
    const allowed = (env.ALLOWED_ORIGINS || "")
      .split(",").map(s => s.trim()).filter(Boolean);
    if (allowed.length && origin && !allowed.includes(origin)) {
      return json({ error: "origin_not_allowed", origin }, 403, request, env);
    }

    // ---- Routes ----
    try {
      if (url.pathname === "/api/flight") {
        // /api/flight?ident=AAL100  (or AA100 — we normalize)
        const ident = url.searchParams.get("ident");
        if (!ident) return json({ error: "missing_ident" }, 400, request, env);
        const data = await getFlight(ident, env, ctx, request);
        return json(data, 200, request, env);
      }

      if (url.pathname === "/api/airport") {
        // /api/airport?code=KLAX
        const code = url.searchParams.get("code");
        if (!code) return json({ error: "missing_code" }, 400, request, env);
        const data = await getAirport(code, env, ctx, request);
        return json(data, 200, request, env);
      }

      if (url.pathname === "/api/health") {
        return json({ ok: true, ts: Date.now() }, 200, request, env);
      }

      return json({ error: "not_found" }, 404, request, env);
    } catch (err) {
      return json({ error: "upstream_error", message: String(err?.message || err) }, 502, request, env);
    }
  },
};

// ---------- Handlers ----------

async function getFlight(identRaw, env, ctx, req) {
  const ident = identRaw.replace(/\s+/g, "").toUpperCase();

  const cacheKey = new Request(`https://cache.local/flight/${ident}`, req);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return await cached.clone().json();

  // AeroAPI: GET /flights/{ident} — most recent + scheduled occurrences.
  const r = await aeroFetch(`/flights/${encodeURIComponent(ident)}`, env);
  if (!r.ok) throw new Error(`aeroapi ${r.status}`);
  const body = await r.json();

  // Pick the most relevant occurrence: prefer in-progress, else next scheduled,
  // else the most recent landed. AeroAPI returns them in `flights[]`.
  const flights = body.flights || [];
  const inProgress = flights.find(f => f.actual_off && !f.actual_on);
  const upcoming   = flights.find(f => !f.actual_off && f.scheduled_off);
  const recent     = flights.find(f => f.actual_on);
  const f = inProgress || upcoming || recent || flights[0];
  if (!f) throw new Error("no_flight_data");

  const out = normalizeFlight(ident, f);

  const resp = new Response(JSON.stringify(out), {
    headers: { "content-type": "application/json", "cache-control": `public, max-age=${TTL.flightStatus}` },
  });
  ctx.waitUntil(cache.put(cacheKey, resp.clone()));
  return out;
}

async function getAirport(codeRaw, env, ctx, req) {
  const code = codeRaw.toUpperCase();

  const cacheKey = new Request(`https://cache.local/airport/${code}`, req);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  if (cached) return await cached.clone().json();

  // AeroAPI: /airports/{id}/flights gives scheduled/arrived/departed/cancelled
  // counts plus full lists. We just want today's cancellation share.
  const r = await aeroFetch(`/airports/${encodeURIComponent(code)}/flights/counts`, env);
  if (!r.ok) throw new Error(`aeroapi ${r.status}`);
  const body = await r.json();

  const totalDep = (body.departures?.scheduled || 0) + (body.departures?.actual || 0);
  const cancelled = body.departures?.cancelled || 0;
  const sharePct = totalDep > 0 ? (cancelled / totalDep) * 100 : 0;

  const out = {
    code,
    departures: {
      scheduled: body.departures?.scheduled || 0,
      actual:    body.departures?.actual    || 0,
      cancelled,
      cancelSharePct: round(sharePct, 2),
    },
    asOf: new Date().toISOString(),
    source: "FlightAware AeroAPI · /airports/{id}/flights/counts",
  };

  const resp = new Response(JSON.stringify(out), {
    headers: { "content-type": "application/json", "cache-control": `public, max-age=${TTL.airportCancels}` },
  });
  ctx.waitUntil(cache.put(cacheKey, resp.clone()));
  return out;
}

// ---------- Helpers ----------

function aeroFetch(path, env) {
  return fetch(AEROAPI + path, {
    headers: {
      "x-apikey": env.AEROAPI_KEY,
      "accept": "application/json",
    },
  });
}

function normalizeFlight(ident, f) {
  // FlightAware times are ISO strings. We compute the delay as
  // (actual_on || estimated_on || scheduled_on) minus scheduled_on, in minutes.
  const sched = f.scheduled_on || f.scheduled_in;
  const actual = f.actual_on || f.estimated_on || f.estimated_in;
  let delayMin = null;
  if (sched && actual) {
    delayMin = Math.round((new Date(actual) - new Date(sched)) / 60000);
  } else if (typeof f.arrival_delay === "number") {
    delayMin = Math.round(f.arrival_delay / 60);
  }

  return {
    ident,
    operator: f.operator || f.operator_iata || null,
    origin: f.origin ? {
      code: f.origin.code_iata || f.origin.code,
      name: f.origin.name,
      city: f.origin.city,
    } : null,
    destination: f.destination ? {
      code: f.destination.code_iata || f.destination.code,
      name: f.destination.name,
      city: f.destination.city,
    } : null,
    scheduledDep: f.scheduled_off || f.scheduled_out || null,
    scheduledArr: sched || null,
    actualArr:    actual || null,
    status:       f.status || null,
    cancelled:    !!f.cancelled,
    delayMin,
    source: "FlightAware AeroAPI · /flights/{ident}",
    asOf: new Date().toISOString(),
  };
}

function corsHeaders(req, env) {
  const origin = req.headers.get("Origin") || "";
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
  const allow = allowed.length === 0 ? "*"
              : (allowed.includes(origin) ? origin : allowed[0]);
  return {
    "access-control-allow-origin": allow,
    "access-control-allow-methods": "GET, OPTIONS",
    "access-control-allow-headers": "content-type",
    "vary": "Origin",
  };
}

function json(obj, status, req, env) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...corsHeaders(req, env) },
  });
}

function round(n, d) { const k = 10 ** d; return Math.round(n * k) / k; }
