"use client";
import { C, F, sectionLabel } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

const MUHURATS = [
  { time:"06:12 AM", en:"Brahma Muhurat",  hi:"ब्रह्म मुहूर्त",  good:true },
  { time:"11:52 AM", en:"Abhijit Muhurat", hi:"अभिजित मुहूर्त",  good:true },
  { time:"02:00 PM", en:"Rahu Kaal",       hi:"राहु काल",         good:false },
  { time:"07:18 PM", en:"Pradosh Kaal",    hi:"प्रदोष काल",       good:true },
];
const NEARBY = [
  { en:"ISKCON Bangalore",      hi:"इस्कॉन बेंगलुरु",   dist:"4.2 km", open:true,  emoji:"🌸" },
  { en:"Bull Temple",           hi:"नंदी मंदिर",         dist:"6.8 km", open:true,  emoji:"🐂" },
  { en:"Gavi Gangadhareshwara", hi:"गवी गंगाधरेश्वर",    dist:"9.1 km", open:false, emoji:"🏔️" },
];
const ACTIONS = [
  { icon:"🎟️", en:"Book",    hi:"बुकिंग",  tab:"book",    bg:"#FDF3E7" },
  { icon:"🔴",  en:"Live",    hi:"लाइव",    tab:"live",    bg:"#FEE2E2" },
  { icon:"✈️",  en:"Plan",    hi:"यात्रा",  tab:"trip",    bg:"#E6F1FB" },
  { icon:"🙏",  en:"Purohit", hi:"पुरोहित", tab:"purohit", bg:"#E1F5EE" },
];

function MandalRing({ pct }:{ pct:number }) {
  const r=54, circ=2*Math.PI*r, dash=(pct/100)*circ;
  return (
    <div style={{ position:"relative", width:140, height:140, flexShrink:0 }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ position:"absolute", inset:0 }}>
        {[0,45,90,135,180,225,270,315].map((a,i)=>(
          <ellipse key={i}
            cx={70+46*Math.cos(a*Math.PI/180)} cy={70+46*Math.sin(a*Math.PI/180)}
            rx="4" ry="7"
            transform={`rotate(${a+90},${70+46*Math.cos(a*Math.PI/180)},${70+46*Math.sin(a*Math.PI/180)})`}
            fill="rgba(184,137,42,0.18)"/>
        ))}
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7"/>
        <circle cx="70" cy="70" r={r} fill="none" stroke="url(#rg)" strokeWidth="7"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 70 70)"
          style={{ transition:"stroke-dasharray 1s ease" }}/>
        <defs>
          <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.gold}/>
            <stop offset="100%" stopColor="#F0A855"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:"white" }}>{pct}%</div>
        <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginTop:1 }}>of 12</div>
        <div style={{ fontSize:10, color:C.goldLight, marginTop:1 }}>Jyotirlingas</div>
      </div>
    </div>
  );
}

export default function HomeTab({ onNav }:{ onNav:(s:string)=>void }) {
  const { lang } = useLang();
  const dateStr = new Date().toLocaleDateString(lang==="hi"?"hi-IN":"en-IN",{ weekday:"long", day:"numeric", month:"long" });

  return (
    <div style={{ padding:"16px 16px 112px", animation:"fadeUp 0.25s ease forwards" }}>

      {/* Journey card */}
      <div style={{ background:`linear-gradient(135deg,${C.maroon} 0%,#5c1a0a 60%,#7a2a10 100%)`, boxShadow:"0 8px 32px rgba(44,10,10,0.3)", borderRadius:24, padding:20, position:"relative", overflow:"hidden", marginBottom:16 }}>
        <div style={{ position:"absolute", bottom:-8, right:-4, fontSize:110, color:"rgba(255,255,255,0.04)", fontFamily:F.display, userSelect:"none", lineHeight:1, pointerEvents:"none" }}>ॐ</div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.18em", fontWeight:700, color:C.goldLight, opacity:0.65, marginBottom:4 }}>{t("YOUR JOURNEY","आपकी यात्रा",lang)}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{dateStr}</div>
          </div>
          <div style={{ fontSize:11, padding:"6px 12px", borderRadius:99, background:"rgba(224,123,42,0.2)", color:"#F0A855", border:"1px solid rgba(224,123,42,0.3)", whiteSpace:"nowrap" }}>🔥 {t("12 day streak","12 दिन की लय",lang)}</div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:20 }}>
          <MandalRing pct={33}/>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[{v:"5",en:"Temples visited",hi:"मंदिर दर्शन"},{v:"6",en:"States covered",hi:"राज्य भ्रमण"},{v:"4/12",en:"Jyotirlingas",hi:"ज्योतिर्लिंग"}].map(s=>(
              <div key={s.en}>
                <span style={{ fontFamily:F.display, fontSize:20, fontWeight:700, color:"white", marginRight:6 }}>{s.v}</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{t(s.en,s.hi,lang)}</span>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop:16, paddingTop:14, borderTop:"1px solid rgba(255,255,255,0.08)", display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:14 }}>🎯</span>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>{t("Next: Omkareshwar · 8 Jyotirlingas left","अगला: ओंकारेश्वर · 8 ज्योतिर्लिंग शेष",lang)}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8, marginBottom:20 }}>
        {ACTIONS.map(a=>(
          <button key={a.tab} onClick={()=>onNav(a.tab)}
            style={{ background:a.bg, border:"none", borderRadius:16, padding:"12px 4px", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:22 }}>{a.icon}</span>
            <span style={{ fontSize:11, fontWeight:600, color:C.ink }}>{t(a.en,a.hi,lang)}</span>
          </button>
        ))}
      </div>

      {/* Muhurat */}
      <div style={{ marginBottom:20 }}>
        <div style={sectionLabel}>{t("Today's Muhurat","आज का मुहूर्त",lang)}</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
          {MUHURATS.map((m,i)=>(
            <div key={i} style={{ background:m.good?"white":"#FFF5F5", border:`1px solid ${m.good?C.border:"#FECACA"}`, borderRadius:14, padding:"10px 12px" }}>
              <div style={{ fontSize:12, fontWeight:700, color:m.good?C.gold:C.redText, marginBottom:3 }}>{m.good?"✨":"⚠️"} {m.time}</div>
              <div style={{ fontSize:12, color:C.ink }}>{t(m.en,m.hi,lang)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Temple of day */}
      <div style={{ marginBottom:20 }}>
        <div style={sectionLabel}>{t("Temple of the Day","आज का मंदिर",lang)}</div>
        <div style={{ borderRadius:24, overflow:"hidden", background:"linear-gradient(135deg,#1a0530 0%,#3d0c5c 60%,#6b1a8b 100%)", boxShadow:"0 6px 24px rgba(44,10,10,0.2)" }}>
          <div style={{ padding:20 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
              <div style={{ width:52, height:52, borderRadius:16, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26 }}>🕉️</div>
              <span style={{ fontSize:11, padding:"5px 12px", borderRadius:99, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)" }}>{t("Today's pick","आज की पसंद",lang)}</span>
            </div>
            <div style={{ fontFamily:F.display, fontSize:18, fontWeight:700, color:"white", marginBottom:4 }}>{t("Mahakaleshwar Jyotirlinga","महाकालेश्वर ज्योतिर्लिंग",lang)}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:12 }}>📍 {t("Ujjain, Madhya Pradesh","उज्जैन, मध्य प्रदेश",lang)}</div>
            <div style={{ fontSize:12, lineHeight:1.7, color:"rgba(255,255,255,0.6)" }}>{t("The only south-facing Jyotirlinga. Bhasma Aarti at 4 AM is the most sacred ritual in Shaivism.","एकमात्र दक्षिणमुखी ज्योतिर्लिंग। भस्म आरती भोर 4 बजे होती है।",lang)}</div>
            <button onClick={()=>onNav("book")} style={{ marginTop:14, width:"100%", padding:"11px", borderRadius:12, background:"rgba(255,255,255,0.14)", color:"white", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontSize:13, fontWeight:700 }}>
              {t("Book Darshan →","दर्शन बुक करें →",lang)}
            </button>
          </div>
        </div>
      </div>

      {/* Nearby */}
      <div style={{ marginBottom:20 }}>
        <div style={sectionLabel}>{t("Near You · Bengaluru","आपके पास · बेंगलुरु",lang)}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {NEARBY.map((n,i)=>(
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:`1px solid ${C.border}`, borderRadius:16, padding:"12px 14px" }}>
              <div style={{ width:40, height:40, borderRadius:12, background:C.saffronPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{n.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:C.ink, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(n.en,n.hi,lang)}</div>
                <div style={{ fontSize:11, color:C.stone, marginTop:2 }}>{n.dist} away</div>
              </div>
              <span style={{ fontSize:11, padding:"4px 10px", borderRadius:99, fontWeight:500, flexShrink:0, background:n.open?C.greenBg:"#F1EFE8", color:n.open?C.greenText:"#5F5E5A" }}>{n.open?t("Open","खुला",lang):t("Closed","बंद",lang)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quote */}
      <div style={{ borderRadius:20, padding:20, background:C.goldPale, border:"1px solid rgba(184,137,42,0.2)" }}>
        <div style={{ fontFamily:F.display, fontSize:13, fontStyle:"italic", lineHeight:1.8, color:C.maroon, marginBottom:8 }}>
          {t('"The journey to the temple is not just through roads — it is through the self."','"मंदिर की यात्रा केवल सड़कों से नहीं — यह स्वयं के भीतर से होती है।"',lang)}
        </div>
        <div style={{ fontSize:11, color:C.gold, fontWeight:500 }}>— {t("Ancient Vedic wisdom","प्राचीन वैदिक ज्ञान",lang)}</div>
      </div>
    </div>
  );
}
