<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
  <title>FlightBet — Bet on Flight Delays</title>
  <meta name="description" content="Play-money prediction markets on aggregate flight delays." />
  <meta name="theme-color" content="#1B5BD8" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="FlightBet — Bet on Flight Delays" />
  <meta property="og:description" content="Play-money prediction markets on aggregate flight delays." />
  <!-- TODO: add og:image (1200x630) once you have one -->
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root{
      --bg:#F1F3F6; --card:#FFFFFF; --ink:#10141B; --muted:#69727E;
      --line:#E6E9EE; --blue:#1B5BD8; --blue-dk:#1648AC;
      --good:#15A36B; --mid:#E0961A; --bad:#E1453E; --coin:#1B5BD8;
    }
    *{box-sizing:border-box}
    html,body{margin:0}
    body{
      background:var(--bg); color:var(--ink);
      font-family:Inter,system-ui,-apple-system,sans-serif;
      -webkit-font-smoothing:antialiased;
    }
    .mono{font-family:'IBM Plex Mono',monospace}
    .wrap{max-width:600px;margin:0 auto;padding:0 14px 64px}
    .topbar{
      position:sticky;top:0;z-index:20;background:rgba(241,243,246,.86);
      backdrop-filter:saturate(1.4) blur(8px);
      display:flex;align-items:center;justify-content:space-between;
      padding:14px 2px;margin-bottom:6px;border-bottom:1px solid var(--line);
    }
    .brand{font-weight:800;font-size:21px;letter-spacing:-.4px;color:var(--ink)}
    .brand b{color:var(--blue)}
    .wallet{font-family:'IBM Plex Mono',monospace;font-size:13px;font-weight:600;
      background:var(--blue);color:#fff;border-radius:999px;padding:8px 13px}
    .tabs{display:flex;gap:18px;padding:10px 2px 14px;font-size:14px;font-weight:600;color:var(--muted)}
    .tabs .on{color:var(--ink);position:relative}
    .tabs .on::after{content:"";position:absolute;left:0;right:0;bottom:-14px;height:2px;background:var(--blue)}
    .card{background:var(--card);border:1px solid var(--line);border-radius:16px;
      padding:16px;margin-bottom:14px;box-shadow:0 1px 2px rgba(16,20,27,.04)}
    .chrow{display:flex;align-items:baseline;justify-content:space-between;gap:10px}
    .code{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:13px;color:var(--blue)}
    .codename{color:var(--muted);font-size:13px;font-weight:500}
    .pool{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:14px;color:var(--ink);white-space:nowrap}
    .scope{display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:var(--muted);font-size:13px;margin:10px 0 4px}
    .scope .t{font-family:'IBM Plex Mono',monospace;color:var(--ink)}
    .pbar{display:flex;height:8px;border-radius:6px;overflow:hidden;margin:12px 0 10px;background:var(--line)}
    .pbar span{display:block;height:100%}
    .headline{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;margin-bottom:2px}
    .pill{font-family:'IBM Plex Mono',monospace;font-size:10px;font-weight:600;letter-spacing:.5px;
      padding:3px 7px;border-radius:5px;color:#fff}
    .brk{margin-top:10px;display:flex;flex-direction:column;gap:7px}
    .brkrow{display:flex;align-items:center;gap:9px;font-size:13px}
    .dot{width:9px;height:9px;border-radius:50%;flex:none}
    .brkrow .lab{color:var(--ink)}
    .brkrow .pct{margin-left:auto;font-family:'IBM Plex Mono',monospace;color:var(--muted);font-size:12px}
    .foot{display:flex;align-items:center;justify-content:space-between;margin-top:14px}
    .cmt{color:var(--muted);font-size:13px}
    .bet{appearance:none;border:none;cursor:pointer;font-weight:700;font-size:14px;
      background:var(--blue);color:#fff;border-radius:10px;padding:10px 22px;transition:filter .15s,transform .1s}
    .bet:hover{filter:brightness(1.07)} .bet:active{transform:scale(.98)}
    .bet.ghost{background:#EEF2FB;color:var(--blue)}
    .panel{margin-top:14px;border-top:1px solid var(--line);padding-top:14px}
    .chips{display:flex;gap:8px;flex-wrap:wrap}
    .chip{flex:1 1 150px;text-align:left;background:#F7F9FC;border:1.5px solid var(--line);
      border-radius:11px;padding:11px 12px;cursor:pointer;transition:border-color .15s,background .15s}
    .chip.sel{border-color:var(--blue);background:#EEF3FE}
    .chip .cl{font-size:13px;font-weight:600;margin-bottom:6px}
    .chip .cx{display:flex;align-items:baseline;justify-content:space-between}
    .chip .mult{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:17px;color:var(--blue)}
    .chip .cp{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted)}
    .stake{background:#F7F9FC;border:1px solid var(--line);border-radius:11px;padding:13px 14px;margin-top:12px}
    .stake .lh{display:flex;justify-content:space-between;align-items:center}
    input[type=range]{-webkit-appearance:none;appearance:none;width:100%;height:4px;border-radius:4px;background:#D7DEE8;margin:14px 0}
    input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--blue);cursor:pointer;border:2px solid #fff;box-shadow:0 1px 3px rgba(0,0,0,.25)}
    input[type=range]::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:var(--blue);cursor:pointer;border:2px solid #fff}
    .ret{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:19px;color:var(--good)}
    .ops{margin-top:12px;border-top:1px dashed var(--line);padding-top:12px}
    .opsbtn{font-family:'IBM Plex Mono',monospace;font-size:11px;background:#fff;border:1px solid var(--line);
      border-radius:7px;padding:6px 9px;cursor:pointer;color:var(--ink);margin:0 6px 6px 0}
    .note{color:var(--muted);font-size:11px;line-height:1.7;font-family:'IBM Plex Mono',monospace;margin-top:8px}
    .resolved{color:var(--muted);font-size:13px;font-family:'IBM Plex Mono',monospace}
    .toast{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);background:var(--ink);color:#fff;
      font-family:'IBM Plex Mono',monospace;font-size:12px;padding:10px 16px;border-radius:9px;
      box-shadow:0 8px 30px rgba(0,0,0,.25);max-width:92vw;text-align:center;z-index:50}
    .toolbar{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:8px 2px 0}
    .linkbtn{background:none;border:none;color:var(--muted);font-size:12px;cursor:pointer;text-decoration:underline}
    .opstoggle{font-family:'IBM Plex Mono',monospace;font-size:11px;border:1px solid var(--line);background:#fff;
      color:var(--muted);border-radius:7px;padding:7px 11px;cursor:pointer;letter-spacing:.5px}
    .opstoggle.on{background:var(--blue);border-color:var(--blue);color:#fff}
    @media (prefers-reduced-motion:reduce){*{animation:none!important}}
  </style>
</head>
<body>
  <div id="root"></div>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <script type="text/babel" data-presets="react">
    const { useState, useEffect, useRef } = React;

    const RAKE = 0.05;
    const fmt = n => Math.round(n).toLocaleString("en-US");
    const TONE = { good:"var(--good)", mid:"var(--mid)", bad:"var(--bad)" };
    const MOOD = { good:["ON TRACK","var(--good)"], mid:["SHAKY","var(--mid)"], bad:["MELTDOWN","var(--bad)"] };

    const store = {
      get(k, fb){ try { const v = localStorage.getItem(k); return v==null?fb:JSON.parse(v); } catch(e){ return fb; } },
      set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} },
      clear(){ try { localStorage.clear(); } catch(e){} }
    };

    // Aggregate-only markets — airline / airport rates no single traveller can move.
    // Codenames are a wink at bahn.bet's "Heldmarienkäfer" style.
    const SEED = [
      { id:"m1", code:"AA 0628", name:"🛫 Sturmschwalbe", pool:13800, comments:212,
        scope:["🇺🇸 American Airlines · system-wide", "on-time arrivals · June"],
        settles:"US DOT / BTS monthly on-time report",
        outcomes:[
          {id:"a", label:"Under 76%", tone:"bad",  pool:4200},
          {id:"b", label:"76 – 82%",  tone:"mid",  pool:6100},
          {id:"c", label:"Over 82%",  tone:"good", pool:3500},
        ]},
      { id:"m2", code:"LAX 24", name:"🛫 Nebelkojote", pool:10300, comments:older(88),
        scope:["🇺🇸 Los Angeles LAX · all departures","share cancelled today"],
        settles:"FlightAware end-of-day airport totals (00:00 PT)",
        outcomes:[
          {id:"a", label:"Under 1%", tone:"good", pool:3100},
          {id:"b", label:"1 – 3%",   tone:"mid",  pool:5400},
          {id:"c", label:"Over 3%",  tone:"bad",  pool:1800},
        ]},
      { id:"m3", code:"NAT 07", name:"🛫 Orkanseeschwalbe", pool:11800, comments:341,
        scope:["🇺🇸 JFK","✈","🇬🇧 LHR corridor · 6 carriers","avg arrival delay · Fri storm"],
        settles:"Eurocontrol + airline feeds, Fri 22:00 UTC",
        outcomes:[
          {id:"a", label:"Under 30 min", tone:"good", pool:1900},
          {id:"b", label:"30 – 75 min",  tone:"mid",  pool:4700},
          {id:"c", label:"Over 75 min",  tone:"bad",  pool:5200},
        ]},
      { id:"m4", code:"HUB VS", name:"🛫 Chaosfink", pool:9900, comments:127,
        scope:["🇺🇸 Worst US hub this weekend","by cancellation rate"],
        settles:"Weekend airport cancellation totals (Sun 23:59 ET)",
        outcomes:[
          {id:"a", label:"ORD Chicago", tone:"bad", pool:3600},
          {id:"b", label:"EWR Newark",  tone:"bad", pool:4100},
          {id:"c", label:"ATL Atlanta", tone:"bad", pool:2200},
        ]},
      { id:"m5", code:"LHR 09", name:"🛫 Teekiebitz", pool:10900, comments:64,
        scope:["🇬🇧 London Heathrow · this week","on-time departures"],
        settles:"CAA / airport weekly punctuality data",
        outcomes:[
          {id:"a", label:"Under 70%", tone:"bad",  pool:2700},
          {id:"b", label:"70 – 80%",  tone:"mid",  pool:4900},
          {id:"c", label:"Over 80%",  tone:"good", pool:3300},
        ]},
    ];
    function older(n){ return n } // tiny helper kept for readability

    function App(){
      const [markets, setMarkets] = useState(() => store.get("fb_markets", SEED));
      const [wallet, setWallet]   = useState(() => store.get("fb_wallet", 1000));
      const [positions, setPos]   = useState(() => store.get("fb_pos", {}));
      const [open, setOpen]   = useState(null);
      const [pick, setPick]   = useState(null);
      const [stake, setStake] = useState(100);
      const [ops, setOps]     = useState(false);
      const [toast, setToast] = useState(null);

      useEffect(()=>store.set("fb_markets", markets),[markets]);
      useEffect(()=>store.set("fb_wallet", wallet),[wallet]);
      useEffect(()=>store.set("fb_pos", positions),[positions]);
      useEffect(()=>{ if(!toast) return; const t=setTimeout(()=>setToast(null),2600); return ()=>clearTimeout(t); },[toast]);

      const total = m => m.outcomes.reduce((s,o)=>s+o.pool,0);
      const prob  = (m,o) => o.pool / (total(m)||1);
      const mult  = (m,o) => total(m) / (o.pool||1);
      const projected = (m,o,s) => {
        const newPool=o.pool+s, newTotal=total(m)+s;
        return (s/newPool) * newTotal * (1-RAKE);
      };
      const modal = m => m.outcomes.reduce((a,b)=> b.pool>a.pool?b:a, m.outcomes[0]);
      const myStakeOn = (mid,oid) => (positions[mid]||{})[oid] || 0;
      const myTotal = mid => Object.values(positions[mid]||{}).reduce((s,v)=>s+v,0);

      function bet(m,o){
        if(stake<=0 || stake>wallet) return;
        setWallet(w=>w-stake);
        setMarkets(ms=>ms.map(mm=> mm.id!==m.id?mm:
          {...mm, outcomes:mm.outcomes.map(oo=> oo.id===o.id?{...oo,pool:oo.pool+stake}:oo)}));
        setPos(p=>{ const c={...(p[m.id]||{})}; c[o.id]=(c[o.id]||0)+stake; return {...p,[m.id]:c}; });
        setToast(`Staked ${fmt(stake)} ◇ on “${o.label}”`);
      }
      function settle(m,winId){
        const t=total(m), net=t*(1-RAKE);
        const win=m.outcomes.find(o=>o.id===winId);
        const ms=myStakeOn(m.id,winId);
        const payout = ms>0 ? (ms/(win.pool||1))*net : 0;
        if(payout>0) setWallet(w=>w+payout);
        setMarkets(arr=>arr.map(mm=> mm.id===m.id?{...mm,status:"RESOLVED",winner:winId}:mm));
        setToast(ms>0 ? `“${win.label}” settled — ${payout>=ms?"won":"returned"} ${fmt(payout)} ◇`
                      : `“${win.label}” settled — no position`);
      }
      function reset(){ store.clear(); setMarkets(SEED); setWallet(1000); setPos({}); setOpen(null); setPick(null);
        setToast("New season — leaderboard reset, balance restored"); }

      return (
        <div className="wrap">
          <div className="topbar">
            <div className="brand">Flight<b>Bet</b></div>
            <div className="wallet">◇ {fmt(wallet)} MILES</div>
          </div>
          <div className="tabs"><span className="on">Flights</span><span>Airports</span><span>Compete</span></div>

          {markets.map(m=>{
            const md = modal(m);
            const [moodWord,moodCol] = MOOD[md.tone];
            const delayChance = Math.round(m.outcomes.filter(o=>o.tone!=="good").reduce((s,o)=>s+prob(m,o),0)*100);
            const isOpen = open===m.id;
            const resolved = m.status==="RESOLVED";
            return (
              <div className="card" key={m.id}>
                <div className="chrow">
                  <div>
                    <span className="code">{m.code}</span>{" "}
                    <span className="codename">{m.name}</span>
                  </div>
                  <div className="pool">{fmt(total(m))} ◇</div>
                </div>

                <div className="scope">
                  {m.scope.map((s,i)=><span key={i} className={s.length<=3?"t":""}>{s}</span>)}
                </div>

                <div className="pbar">
                  {m.outcomes.map(o=>(
                    <span key={o.id} style={{width:(prob(m,o)*100)+"%", background:TONE[o.tone]}} />
                  ))}
                </div>

                <div className="headline">
                  <span className="pill" style={{background:moodCol}}>{moodWord}</span>
                  <span>Consensus: {md.label}</span>
                  <span style={{marginLeft:"auto",color:"var(--muted)",fontWeight:500,fontSize:13}} className="mono">
                    behind: {delayChance}%
                  </span>
                </div>

                <div className="brk">
                  {m.outcomes.map(o=>(
                    <div className="brkrow" key={o.id}>
                      <span className="dot" style={{background:TONE[o.tone]}} />
                      <span className="lab">{o.label}</span>
                      <span className="pct">{Math.round(prob(m,o)*100)}% · {mult(m,o).toFixed(2)}×</span>
                    </div>
                  ))}
                </div>

                <div className="foot">
                  <span className="cmt">💬 {fmt(m.comments)} comments{myTotal(m.id)>0?` · your stake ${fmt(myTotal(m.id))} ◇`:""}</span>
                  {!resolved &&
                    <button className={"bet"+(isOpen?" ghost":"")} onClick={()=>{ setOpen(isOpen?null:m.id); setPick(null); }}>
                      {isOpen?"Close":"Bet"}
                    </button>}
                </div>

                {isOpen && !resolved &&
                  <div className="panel">
                    <div className="chips">
                      {m.outcomes.map(o=>(
                        <button key={o.id} className={"chip"+(pick===o.id?" sel":"")} onClick={()=>setPick(o.id)}>
                          <div className="cl">{o.label}</div>
                          <div className="cx">
                            <span className="mult">{mult(m,o).toFixed(2)}×</span>
                            <span className="cp">{fmt(o.pool)} ◇</span>
                          </div>
                        </button>
                      ))}
                    </div>

                    {pick &&
                      <div className="stake">
                        <div className="lh">
                          <span className="mono" style={{fontSize:11,color:"var(--muted)"}}>STAKE</span>
                          <span className="mono" style={{fontWeight:600}}>{fmt(Math.min(stake,wallet))} ◇</span>
                        </div>
                        <input type="range" min={10} max={Math.max(10,wallet)} step={10}
                          value={Math.min(stake,wallet)} onChange={e=>setStake(+e.target.value)} />
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:12,flexWrap:"wrap"}}>
                          <div>
                            <div className="mono" style={{fontSize:11,color:"var(--muted)",marginBottom:3}}>PROJECTED RETURN</div>
                            <div className="ret">{fmt(projected(m, m.outcomes.find(o=>o.id===pick), Math.min(stake,wallet)))} ◇
                              <span style={{color:"var(--muted)",fontSize:12,marginLeft:6}}>after {RAKE*100}% rake</span>
                            </div>
                          </div>
                          <button className="bet" disabled={stake>wallet}
                            onClick={()=>bet(m, m.outcomes.find(o=>o.id===pick))}
                            style={stake>wallet?{background:"#C9CFD8",cursor:"default"}:null}>
                            {stake>wallet?"Not enough Miles":"Place bet"}
                          </button>
                        </div>
                      </div>}

                    <div className="note">Settles on: {m.settles}.</div>

                    {ops &&
                      <div className="ops">
                        <div className="mono" style={{fontSize:10,color:"var(--muted)",marginBottom:7,letterSpacing:".5px"}}>
                          ⚙ SIMULATE THE ORACLE — the official figure becomes the source of truth
                        </div>
                        {m.outcomes.map(o=>(
                          <button key={o.id} className="opsbtn" onClick={()=>settle(m,o.id)}>settle ▸ {o.label}</button>
                        ))}
                      </div>}
                  </div>}

                {resolved &&
                  <div className="panel resolved">
                    LANDED · settled on “{m.outcomes.find(o=>o.id===m.winner).label}”.
                  </div>}
              </div>
            );
          })}

          <div className="toolbar">
            <span className="note" style={{marginTop:0}}>
              ◇ Miles are play money · markets are aggregate-only · each names its settlement source.
            </span>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <button className="linkbtn" onClick={reset}>Reset season</button>
              <button className={"opstoggle"+(ops?" on":"")} onClick={()=>setOps(v=>!v)}>OPS {ops?"ON":"OFF"}</button>
            </div>
          </div>

          {toast && <div className="toast">{toast}</div>}
        </div>
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
