"use client";
import { C, F, sectionLabel } from "@/app/styles";
import { t } from "@/app/LangContext";

const MUHURATS = [
  { time:"06:12 AM", en:"Brahma Muhurat",  hi:"ब्रह्म मुहूर्त",  good:true },
  { time:"11:52 AM", en:"Abhijit Muhurat", hi:"अभिजित मुहूर्त",  good:true },
  { time:"02:00 PM", en:"Rahu Kaal",       hi:"राहु काल",         good:false },
  { time:"07:18 PM", en:"Pradosh Kaal",    hi:"प्रदोष काल",       good:true },
];

const NEARBY = [
  { en:"ISKCON Bangalore",       hi:"इस्कॉन बेंगलुरु",   dist:"4.2 km", open:true,  emoji:"🌸" },
  { en:"Bull Temple",            hi:"नंदी मंदिर",         dist:"6.8 km", open:true,  emoji:"🐂" },
  { en:"Gavi Gangadhareshwara",  hi:"गवी गंगाधरेश्वर",   dist:"9.1 km", open:false, emoji:"🏔️" },
];

// Secondary features accessible from Home
const SECONDARY = [
  { icon:"🔴", en:"Live Darshan", hi:"लाइव दर्शन",   tab:"live",    bg:"#FEE2E2", col:"#CC1111" },
  { icon:"🎟️", en:"Book",         hi:"बुकिंग",        tab:"book",    bg:"#FDF3E7", col:C.saffron },
  { icon:"🙏", en:"Purohit",      hi:"पुरोहित",       tab:"purohit", bg:"#E6F1FB", col:"#1A4A8A" },
  { icon:"🔔", en:"Alerts",       hi:"सूचनाएं",       tab:"alerts",  bg:"#E1F5EE", col:C.greenText },
];

function Ring({ pct }:{ pct:number }) {
  const r=54, circ=2*Math.PI*r, dash=(pct/100)*circ;
  return (
    <div style={{ position:"relative", width:130, height:130, flexShrink:0 }}>
      <svg width="130" height="130" viewBox="0 0 130 130" style={{ position:"absolute", inset:0 }}>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <ellipse key={i}
            cx={65+44*Math.cos(a*Math.PI/180)} cy={65+44*Math.sin(a*Math.PI/180)}
            rx="3.5" ry="6.5"
            transform={`rotate(${a+90},${65+44*Math.cos(a*Math.PI/180)},${65+44*Math.sin(a*Math.PI/180)})`}
            fill="rgba(184,137,42,0.2)"/>
        ))}
        <circle cx="65" cy="65" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7"/>
        <circle cx="65" cy="65" r={r} fill="none" stroke="url(#rg)" strokeWidth="7"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 65 65)"/>
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.gold}/>
            <stop offset="100%" stopColor="#F0A855"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontFamily:F.display, fontSize:24, fontWeight:700, color:"white" }}>33%</div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginTop:1 }}>of 12</div>
        <div style={{ fontSize:10, color:C.goldLight, marginTop:1 }}>Jyotirlingas</div>
      </div>
    </div>
  );
}

interface Props { onNav:(s:string)=>void; lang:"en"|"hi"; toggle:()=>void; }

export default function HomeTab({ onNav, lang, toggle }:Props) {
  const dateStr = new Date().toLocaleDateString(lang==="hi"?"hi-IN":"en-IN",{ weekday:"long", day:"numeric", month:"long" });

  return (
    <div style={{ animation:"fadeUp 0.25s ease forwards" }}>

      {/* ── Full-bleed hero header ── */}
      <div style={{ background:`linear-gradient(160deg,${C.maroon} 0%,#4a1212 100%)`, padding:"52px 20px 28px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, right:0, fontSize:140, lineHeight:1, color:"rgba(255,255,255,0.03)", fontFamily:F.display, userSelect:"none", pointerEvents:"none", marginTop:-10 }}>ॐ</div>

        {/* Top row */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", position:"relative", zIndex:1, marginBottom:20 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", fontWeight:700, color:C.goldLight, opacity:0.7, marginBottom:6 }}>ॐ नमः शिवाय</div>
            <div style={{ fontFamily:F.display, fontSize:28, fontWeight:700, color:"white", lineHeight:1.1 }}>{t("Darshan","दर्शन",lang)}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:4 }}>{t("Your pilgrimage, remembered","आपकी तीर्थ यात्रा, सदा याद",lang)}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},#F0A855)`, color:C.maroon, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, boxShadow:"0 2px 12px rgba(184,137,42,0.4)" }}>PK</div>
            <button onClick={toggle} style={{ fontSize:11, padding:"5px 12px", borderRadius:99, background:"rgba(255,255,255,0.1)", color:C.goldLight, border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer" }}>
              {lang==="en"?"हिंदी":"English"}
            </button>
          </div>
        </div>

        {/* Journey card inside header */}
        <div style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:16, position:"relative", zIndex:1 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.16em", fontWeight:700, color:C.goldLight, opacity:0.65, marginBottom:3 }}>{t("YOUR JOURNEY","आपकी यात्रा",lang)}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{dateStr}</div>
            </div>
            <div style={{ fontSize:11, padding:"5px 11px", borderRadius:99, background:"rgba(224,123,42,0.25)", color:"#F0A855", border:"1px solid rgba(224,123,42,0.3)", whiteSpace:"nowrap" }}>🔥 {t("12 day streak","12 दिन",lang)}</div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
            <Ring pct={33}/>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[
                {v:"5",  en:"Temples",  hi:"मंदिर"},
                {v:"6",  en:"States",   hi:"राज्य"},
                {v:"4/12",en:"Jyotirlingas",hi:"ज्योतिर्लिंग"},
              ].map(s=>(
                <div key={s.en}>
                  <span style={{ fontFamily:F.display, fontSize:18, fontWeight:700, color:"white", marginRight:5 }}>{s.v}</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{t(s.en,s.hi,lang)}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid rgba(255,255,255,0.07)", display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:13 }}>🎯</span>
            <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{t("Next: Omkareshwar · 8 remaining","अगला: ओंकारेश्वर · 8 शेष",lang)}</span>
          </div>
        </div>
      </div>

      <div style={{ padding:"20px 16px 100px" }}>

        {/* ── Secondary features grid ── */}
        <div style={{ marginBottom:24 }}>
          <div style={sectionLabel}>{t("QUICK ACCESS","शीघ्र पहुँच",lang)}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {SECONDARY.map(a=>(
              <button key={a.tab} onClick={()=>onNav(a.tab)}
                style={{ background:a.bg, border:"none", borderRadius:18, padding:"16px 14px", cursor:"pointer", display:"flex", alignItems:"center", gap:12, textAlign:"left" }}>
                <span style={{ fontSize:26, flexShrink:0 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>{t(a.en,a.hi,lang)}</div>
                  <div style={{ fontSize:11, color:C.stone, marginTop:2 }}>
                    {a.tab==="live"    ? t("Streaming now","अभी लाइव",lang)   :
                     a.tab==="book"    ? t("12 portals","12 पोर्टल",lang)     :
                     a.tab==="purohit" ? t("Near Bengaluru","पास में",lang)   :
                                        t("3 active","3 सक्रिय",lang)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Temple of the Day ── */}
        <div style={{ marginBottom:24 }}>
          <div style={sectionLabel}>{t("TEMPLE OF THE DAY","आज का मंदिर",lang)}</div>
          <div style={{ borderRadius:22, overflow:"hidden", background:"linear-gradient(135deg,#1a0530 0%,#3d0c5c 60%,#6b1a8b 100%)", boxShadow:"0 6px 24px rgba(44,10,10,0.2)" }}>
            <div style={{ padding:18 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ width:50, height:50, borderRadius:14, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🕉️</div>
                <span style={{ fontSize:11, padding:"4px 11px", borderRadius:99, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)" }}>{t("Today's pick","आज की पसंद",lang)}</span>
              </div>
              <div style={{ fontFamily:F.display, fontSize:17, fontWeight:700, color:"white", marginBottom:3 }}>{t("Mahakaleshwar Jyotirlinga","महाकालेश्वर ज्योतिर्लिंग",lang)}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:10 }}>📍 {t("Ujjain, Madhya Pradesh","उज्जैन, मध्य प्रदेश",lang)}</div>
              <div style={{ fontSize:12, lineHeight:1.7, color:"rgba(255,255,255,0.6)" }}>{t("The only south-facing Jyotirlinga. Bhasma Aarti at 4 AM is the most sacred ritual in Shaivism.","एकमात्र दक्षिणमुखी ज्योतिर्लिंग। भस्म आरती भोर 4 बजे — शैव परंपरा का सर्वोच्च अनुष्ठान।",lang)}</div>
              <button onClick={()=>onNav("book")} style={{ marginTop:14, width:"100%", padding:"10px", borderRadius:12, background:"rgba(255,255,255,0.14)", color:"white", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontSize:13, fontWeight:700 }}>
                {t("Book Darshan →","दर्शन बुक करें →",lang)}
              </button>
            </div>
          </div>
        </div>

        {/* ── Today's Muhurat ── */}
        <div style={{ marginBottom:24 }}>
          <div style={sectionLabel}>{t("TODAY'S MUHURAT","आज का मुहूर्त",lang)}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
            {MUHURATS.map((m,i)=>(
              <div key={i} style={{ background:m.good?"white":"#FFF5F5", border:`1px solid ${m.good?C.border:"#FECACA"}`, borderRadius:14, padding:"11px 13px" }}>
                <div style={{ fontSize:12, fontWeight:700, color:m.good?C.gold:C.redText, marginBottom:3 }}>{m.good?"✨":"⚠️"} {m.time}</div>
                <div style={{ fontSize:12, color:C.ink }}>{t(m.en,m.hi,lang)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Nearby ── */}
        <div style={{ marginBottom:24 }}>
          <div style={sectionLabel}>{t("NEAR YOU · BENGALURU","आपके पास · बेंगलुरु",lang)}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {NEARBY.map((n,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:`1px solid ${C.border}`, borderRadius:16, padding:"12px 14px" }}>
                <div style={{ width:40, height:40, borderRadius:12, background:C.saffronPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{n.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:C.ink, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(n.en,n.hi,lang)}</div>
                  <div style={{ fontSize:11, color:C.stone, marginTop:2 }}>{n.dist} away</div>
                </div>
                <span style={{ fontSize:11, padding:"4px 10px", borderRadius:99, fontWeight:500, flexShrink:0, background:n.open?C.greenBg:"#F1EFE8", color:n.open?C.greenText:"#5F5E5A" }}>
                  {n.open?t("Open","खुला",lang):t("Closed","बंद",lang)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Quote ── */}
        <div style={{ borderRadius:20, padding:20, background:C.goldPale, border:"1px solid rgba(184,137,42,0.2)" }}>
          <div style={{ fontFamily:F.display, fontSize:13, fontStyle:"italic", lineHeight:1.8, color:C.maroon, marginBottom:8 }}>
            {t('"The journey to the temple is not just through roads — it is through the self."','"मंदिर की यात्रा केवल सड़कों से नहीं — यह स्वयं के भीतर से होती है।"',lang)}
          </div>
          <div style={{ fontSize:11, color:C.gold, fontWeight:500 }}>— {t("Ancient Vedic wisdom","प्राचीन वैदिक ज्ञान",lang)}</div>
        </div>

      </div>
    </div>
  );
}
