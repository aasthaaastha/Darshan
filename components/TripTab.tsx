"use client";
import { useState } from "react";
import { C, F, sectionLabel, btnPrimary, btnGhost, inputStyle } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

const DESTINATIONS = [
  "Kedarnath, Uttarakhand","Badrinath, Uttarakhand","Gangotri, Uttarakhand","Yamunotri, Uttarakhand",
  "Kashi Vishwanath, Varanasi","Tirumala Venkateswara, Tirupati","Shirdi Sai Baba, Maharashtra",
  "Somnath, Gujarat","Dwarka, Gujarat","Vaishno Devi, J&K","Mahakaleshwar, Ujjain",
  "Jagannath Puri, Odisha","Siddhivinayak, Mumbai","Srisailam, Andhra Pradesh",
  "Amarnath, J&K","Omkareshwar, Madhya Pradesh","Trimbakeshwar, Maharashtra","Rameshwaram, Tamil Nadu",
  "Char Dham Yatra (All 4)","Jyotirlinga Circuit (North)",
];

const SOURCES = [
  "Bengaluru","Delhi","Mumbai","Chennai","Kolkata","Hyderabad",
  "Ahmedabad","Pune","Jaipur","Nawada, Bihar","Patna","Lucknow","Bhopal",
];

const BUDGETS = [
  { id:"budget",  en:"Budget",   hi:"किफायती", sub:"₹5K–10K / person" },
  { id:"mid",     en:"Mid",      hi:"मध्यम",   sub:"₹10K–25K / person" },
  { id:"premium", en:"Premium",  hi:"प्रीमियम", sub:"₹25K+ / person" },
];

interface Day   { day:number; title:string; activities:string[]; }
interface Travel{ mode:string; details:string; cost:string; }
interface Hotel { name:string; type:string; priceRange:string; note:string; }
interface Budget{ item:string; amount:string; }
interface Plan  { overview:string; bestTime:string; days:Day[]; travel:Travel[]; hotels:Hotel[]; budget:Budget[]; tips:string[]; }

export default function TripTab() {
  const { lang } = useLang();
  const [dest,   setDest]   = useState("");
  const [src,    setSrc]    = useState("Bengaluru");
  const [days,   setDays]   = useState("4");
  const [pax,    setPax]    = useState("2");
  const [budget, setBudget] = useState("mid");
  const [loading,setLoading]= useState(false);
  const [plan,   setPlan]   = useState<Plan|null>(null);
  const [error,  setError]  = useState("");

  const generate = async () => {
    if (!dest) { setError(t("Please select a destination","कृपया गंतव्य चुनें",lang)); return; }
    setError(""); setLoading(true); setPlan(null);

    const budgetLabel = BUDGETS.find(b=>b.id===budget)?.sub ?? "";
    const prompt = `You are an expert Indian pilgrimage travel planner. Create a ${days}-day trip plan.

Details:
- Destination: ${dest}
- Travelling from: ${src}
- Travellers: ${pax} people
- Budget: ${budget} (${budgetLabel})

Respond ONLY with a valid JSON object, no markdown, no backticks, exactly this shape:
{
  "overview": "2-3 sentences summarizing the trip",
  "bestTime": "Best season/months to visit with reason",
  "days": [{"day":1,"title":"Day title","activities":["activity 1","activity 2","activity 3"]}],
  "travel": [{"mode":"Train/Flight/Bus","details":"specific route and options","cost":"₹X per person"}],
  "hotels": [{"name":"Hotel/dharamshala name","type":"Budget/Mid/Premium","priceRange":"₹X-Y/night","note":"why recommended"}],
  "budget": [{"item":"Category name","amount":"₹X for ${pax} people"}],
  "tips": ["tip 1","tip 2","tip 3","tip 4","tip 5"]
}

Be specific: name real trains (like Shatabdi, Rajdhani), real dharamshalas, actual darshan timings. Return ONLY the JSON.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ model:"claude-sonnet-4-6", max_tokens:1500, messages:[{ role:"user", content:prompt }] }),
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text ?? "";
      const clean = raw.replace(/```json|```/g,"").trim();
      setPlan(JSON.parse(clean) as Plan);
    } catch {
      setError(t("Could not generate plan. Please try again.","योजना नहीं बन पाई। पुनः प्रयास करें।",lang));
    } finally {
      setLoading(false);
    }
  };

  const sel: React.CSSProperties = { ...inputStyle, appearance:"none" as const, paddingRight:32, cursor:"pointer" };
  const chevron = <svg style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M1 1l5 5 5-5" stroke={C.stone} strokeWidth="1.5" strokeLinecap="round"/></svg>;

  return (
    <div style={{ padding:"16px 16px 112px", animation:"fadeUp 0.25s ease" }}>

      {/* Hero */}
      <div style={{ background:`linear-gradient(135deg,${C.maroon},#5c1a0a 60%,#7a2a10)`, boxShadow:"0 8px 32px rgba(44,10,10,0.28)", borderRadius:24, padding:20, position:"relative", overflow:"hidden", marginBottom:20 }}>
        <div style={{ position:"absolute", bottom:-8, right:-4, fontSize:80, color:"rgba(255,255,255,0.05)", userSelect:"none", lineHeight:1 }}>✈️</div>
        <div style={{ fontSize:10, letterSpacing:"0.18em", fontWeight:700, color:C.goldLight, opacity:0.65, marginBottom:6 }}>{t("AI TRIP PLANNER","AI यात्रा योजनाकार",lang)}</div>
        <div style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:"white", marginBottom:6 }}>{t("Plan your Yatra","अपनी यात्रा योजना बनाएं",lang)}</div>
        <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)", lineHeight:1.7 }}>{t("Pick your destination and we'll plan everything — flights, hotels, darshan slots, packing list and budget.","गंतव्य चुनें और हम सब तैयार करेंगे — यात्रा, होटल, दर्शन, पैकिंग और बजट।",lang)}</div>
      </div>

      {/* Form */}
      {!plan && (
        <div style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:20, padding:18, marginBottom:16 }}>

          {/* Destination */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.ink, display:"block", marginBottom:6 }}>{t("🛕 Destination","🛕 गंतव्य",lang)}</label>
            <div style={{ position:"relative" }}>
              <select value={dest} onChange={e=>setDest(e.target.value)} style={sel}>
                <option value="">{t("Select pilgrimage site...","तीर्थ स्थल चुनें...",lang)}</option>
                {DESTINATIONS.map(d=><option key={d} value={d}>{d}</option>)}
              </select>
              {chevron}
            </div>
          </div>

          {/* Source */}
          <div style={{ marginBottom:14 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.ink, display:"block", marginBottom:6 }}>{t("🏠 Travelling from","🏠 यहाँ से",lang)}</label>
            <div style={{ position:"relative" }}>
              <select value={src} onChange={e=>setSrc(e.target.value)} style={sel}>
                {SOURCES.map(s=><option key={s} value={s}>{s}</option>)}
              </select>
              {chevron}
            </div>
          </div>

          {/* Days + Pax */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.ink, display:"block", marginBottom:6 }}>{t("📅 Days","📅 दिन",lang)}</label>
              <div style={{ position:"relative" }}>
                <select value={days} onChange={e=>setDays(e.target.value)} style={sel}>
                  {["2","3","4","5","6","7","10","14"].map(d=><option key={d} value={d}>{d} {t("days","दिन",lang)}</option>)}
                </select>
                {chevron}
              </div>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.ink, display:"block", marginBottom:6 }}>{t("👥 Travellers","👥 यात्री",lang)}</label>
              <div style={{ position:"relative" }}>
                <select value={pax} onChange={e=>setPax(e.target.value)} style={sel}>
                  {["1","2","3","4","5","6","8","10","15","20+"].map(p=><option key={p} value={p}>{p}</option>)}
                </select>
                {chevron}
              </div>
            </div>
          </div>

          {/* Budget */}
          <div style={{ marginBottom:18 }}>
            <label style={{ fontSize:12, fontWeight:700, color:C.ink, display:"block", marginBottom:8 }}>{t("💰 Budget","💰 बजट",lang)}</label>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {BUDGETS.map(b=>(
                <button key={b.id} onClick={()=>setBudget(b.id)}
                  style={{ padding:"10px 6px", borderRadius:12, border:"none", cursor:"pointer", background:budget===b.id?C.maroon:C.ash, boxShadow:budget===b.id?"none":`0 0 0 1px ${C.border}`, transition:"all 0.15s", textAlign:"center" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:budget===b.id?"white":C.ink }}>{t(b.en,b.hi,lang)}</div>
                  <div style={{ fontSize:10, color:budget===b.id?"rgba(255,255,255,0.55)":C.stone, marginTop:2 }}>{b.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {error && <div style={{ fontSize:12, color:C.redText, marginBottom:10, padding:"8px 12px", background:C.redBg, borderRadius:10 }}>{error}</div>}

          <button onClick={generate} disabled={loading}
            style={{ ...btnPrimary, background:loading?C.stone:`linear-gradient(135deg,${C.maroon},#7a2a10)`, cursor:loading?"not-allowed":"pointer", fontSize:15 }}>
            {loading ? t("✨ Planning your Yatra...","✨ यात्रा योजना बन रही है...",lang) : t("✨ Plan My Yatra","✨ मेरी यात्रा योजना बनाएं",lang)}
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ textAlign:"center", padding:"40px 20px" }}>
          <div style={{ fontSize:44, display:"inline-block", animation:"spin 2s linear infinite", marginBottom:14 }}>🕉️</div>
          <div style={{ fontFamily:F.display, fontSize:18, color:C.maroon, marginBottom:6 }}>{t("Seeking divine guidance...","दिव्य मार्गदर्शन लिया जा रहा है...",lang)}</div>
          <div style={{ fontSize:12, color:C.stone }}>{t("Crafting your perfect pilgrimage plan","आपकी पूर्ण तीर्थ यात्रा योजना तैयार हो रही है",lang)}</div>
        </div>
      )}

      {/* Plan output */}
      {plan && (
        <div style={{ animation:"fadeUp 0.3s ease forwards" }}>

          {/* Overview banner */}
          <div style={{ background:`linear-gradient(135deg,${C.maroon},#5c1a0a)`, boxShadow:"0 6px 20px rgba(44,10,10,0.2)", borderRadius:20, padding:18, marginBottom:16 }}>
            <div style={{ fontSize:10, letterSpacing:"0.18em", fontWeight:700, color:C.goldLight, opacity:0.7, marginBottom:8 }}>✈️ {t("YOUR YATRA PLAN","आपकी यात्रा योजना",lang)}</div>
            <div style={{ fontFamily:F.display, fontSize:18, fontWeight:700, color:"white", marginBottom:8 }}>{dest}</div>
            <div style={{ fontSize:12, lineHeight:1.7, color:"rgba(255,255,255,0.65)" }}>{plan.overview}</div>
            {plan.bestTime && (
              <div style={{ marginTop:12, padding:"10px 14px", borderRadius:12, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.1)" }}>
                <span style={{ fontSize:12, color:C.goldLight, fontWeight:700 }}>🗓 {t("Best time: ","सर्वोत्तम समय: ",lang)}</span>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{plan.bestTime}</span>
              </div>
            )}
          </div>

          {/* Day by day */}
          {plan.days?.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={sectionLabel}>📅 {t("Day-by-Day Itinerary","दिन-प्रतिदिन यात्रा",lang)}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {plan.days.map((d,i)=>(
                  <div key={i} style={{ borderRadius:16, overflow:"hidden", border:`1px solid ${C.border}` }}>
                    <div style={{ padding:"10px 14px", display:"flex", alignItems:"center", gap:10, background:i%2===0?C.saffronPale:C.cream }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:C.maroon, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, flexShrink:0 }}>{d.day}</div>
                      <div style={{ fontSize:13, fontWeight:700, color:C.ink }}>{d.title}</div>
                    </div>
                    <div style={{ padding:"12px 14px", background:"white", display:"flex", flexDirection:"column", gap:8 }}>
                      {d.activities?.map((a,j)=>(
                        <div key={j} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                          <div style={{ width:6, height:6, borderRadius:"50%", background:C.saffron, flexShrink:0, marginTop:6 }}/>
                          <div style={{ fontSize:13, color:C.ink, lineHeight:1.6 }}>{a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Travel */}
          {plan.travel?.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={sectionLabel}>🚆 {t("Getting There","कैसे पहुँचें",lang)}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {plan.travel.map((tr,i)=>(
                  <div key={i} style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:16, padding:"14px 16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>🚌 {tr.mode}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:C.saffron, background:C.saffronPale, padding:"3px 10px", borderRadius:99 }}>{tr.cost}</div>
                    </div>
                    <div style={{ fontSize:12, color:C.stone, lineHeight:1.6 }}>{tr.details}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hotels */}
          {plan.hotels?.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={sectionLabel}>🏨 {t("Where to Stay","कहाँ ठहरें",lang)}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {plan.hotels.map((h,i)=>(
                  <div key={i} style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:16, padding:"14px 16px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                      <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>{h.name}</div>
                      <div style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:99, background:C.greenBg, color:C.greenText, flexShrink:0 }}>{h.priceRange}</div>
                    </div>
                    <div style={{ fontSize:11, fontWeight:600, color:C.saffron, marginBottom:4 }}>{h.type}</div>
                    <div style={{ fontSize:12, color:C.stone, lineHeight:1.6 }}>{h.note}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Budget */}
          {plan.budget?.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={sectionLabel}>💰 {t("Estimated Budget","अनुमानित बजट",lang)}</div>
              <div style={{ background:"white", border:`1px solid ${C.border}`, borderRadius:16, padding:"4px 16px" }}>
                {plan.budget.map((b,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 0", borderBottom: i<plan.budget.length-1?`1px solid ${C.border}`:"none" }}>
                    <div style={{ fontSize:13, color:C.ink }}>{b.item}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:C.maroon }}>{b.amount}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {plan.tips?.length > 0 && (
            <div style={{ marginBottom:20 }}>
              <div style={sectionLabel}>💡 {t("Pilgrimage Tips","तीर्थ यात्रा सुझाव",lang)}</div>
              <div style={{ background:C.goldPale, border:"1px solid rgba(184,137,42,0.2)", borderRadius:16, padding:"4px 16px" }}>
                {plan.tips.map((tip,i)=>(
                  <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"12px 0", borderBottom: i<plan.tips.length-1?`1px solid rgba(184,137,42,0.15)`:"none" }}>
                    <span style={{ fontSize:16, flexShrink:0 }}>🙏</span>
                    <span style={{ fontSize:12, color:C.ink, lineHeight:1.7 }}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button onClick={()=>setPlan(null)} style={btnGhost}>↺ {t("Plan a different trip","अलग यात्रा योजना बनाएं",lang)}</button>
        </div>
      )}
    </div>
  );
}
