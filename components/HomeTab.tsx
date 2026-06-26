"use client";
import { useState } from "react";
import { C, F, sectionLabel } from "@/app/styles";
import { t } from "@/app/LangContext";
import { visits } from "@/app/data";
import { jyotirlingas, charDham } from "@/app/data";

const MUHURATS = [
  { time:"06:12 AM", en:"Brahma Muhurat",  hi:"ब्रह्म मुहूर्त",  good:true },
  { time:"11:52 AM", en:"Abhijit Muhurat", hi:"अभिजित मुहूर्त",  good:true },
  { time:"02:00 PM", en:"Rahu Kaal",       hi:"राहु काल",         good:false },
  { time:"07:18 PM", en:"Pradosh Kaal",    hi:"प्रदोष काल",       good:true },
];

const NEARBY = [
  { en:"ISKCON Bangalore",      hi:"इस्कॉन बेंगलुरु",  dist:"4.2 km", open:true,  emoji:"🌸" },
  { en:"Bull Temple",           hi:"नंदी मंदिर",        dist:"6.8 km", open:true,  emoji:"🐂" },
  { en:"Gavi Gangadhareshwara", hi:"गवी गंगाधरेश्वर",  dist:"9.1 km", open:false, emoji:"🏔️" },
];

const QUICK = [
  { icon:"🔴", en:"Live Darshan", hi:"लाइव दर्शन", tab:"live",    bg:"#FEE2E2", sub_en:"Streaming now",  sub_hi:"अभी लाइव" },
  { icon:"🔔", en:"Alerts",       hi:"सूचनाएं",    tab:"alerts",  bg:"#E1F5EE", sub_en:"3 active",      sub_hi:"3 सक्रिय" },
];

function Ring({ pct }:{ pct:number }) {
  const r=46, circ=2*Math.PI*r, dash=(pct/100)*circ;
  return (
    <div style={{ position:"relative", width:110, height:110, flexShrink:0 }}>
      <svg width="110" height="110" viewBox="0 0 110 110" style={{ position:"absolute", inset:0 }}>
        {[0,60,120,180,240,300].map((a,i)=>(
          <ellipse key={i}
            cx={55+38*Math.cos(a*Math.PI/180)} cy={55+38*Math.sin(a*Math.PI/180)}
            rx="3" ry="5.5"
            transform={`rotate(${a+90},${55+38*Math.cos(a*Math.PI/180)},${55+38*Math.sin(a*Math.PI/180)})`}
            fill="rgba(184,137,42,0.22)"/>
        ))}
        <circle cx="55" cy="55" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6"/>
        <circle cx="55" cy="55" r={r} fill="none" stroke="url(#rg2)" strokeWidth="6"
          strokeLinecap="round" strokeDasharray={`${dash} ${circ}`} transform="rotate(-90 55 55)"/>
        <defs>
          <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={C.gold}/><stop offset="100%" stopColor="#F0A855"/>
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <div style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:"white" }}>{pct}%</div>
        <div style={{ fontSize:9, color:"rgba(255,255,255,0.45)", marginTop:1 }}>of 12</div>
        <div style={{ fontSize:9, color:C.goldLight, marginTop:1 }}>Jyotirlingas</div>
      </div>
    </div>
  );
}

interface Props { onNav:(s:string)=>void; lang:"en"|"hi"; toggle:()=>void; }

export default function HomeTab({ onNav, lang, toggle }:Props) {
  const dateStr = new Date().toLocaleDateString(lang==="hi"?"hi-IN":"en-IN",{ weekday:"long", day:"numeric", month:"long" });
  const doneVisits = visits.filter(v=>v.done);
  const jDone = jyotirlingas.filter(j=>j.done).length;
  const cDone = charDham.filter(j=>j.done).length;
  const jPct  = Math.round((jDone/12)*100);

  return (
    <div style={{ animation:"fadeUp 0.25s ease forwards" }}>

      {/* ── Hero header ── */}
      <div style={{ background:`linear-gradient(160deg,${C.maroon} 0%,#4a1212 100%)`, padding:"52px 20px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:0, right:0, fontSize:130, lineHeight:1, color:"rgba(255,255,255,0.03)", fontFamily:F.display, userSelect:"none", pointerEvents:"none" }}>ॐ</div>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", position:"relative", zIndex:1, marginBottom:18 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", fontWeight:700, color:C.goldLight, opacity:0.7, marginBottom:6 }}>ॐ नमः शिवाय</div>
            <div style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:"white", lineHeight:1.1 }}>{t("Darshan","दर्शन",lang)}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:4 }}>{t("Your pilgrimage, remembered","आपकी तीर्थ यात्रा, सदा याद",lang)}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:42, height:42, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},#F0A855)`, color:C.maroon, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, boxShadow:"0 2px 12px rgba(184,137,42,0.4)" }}>PK</div>
            <button onClick={toggle} style={{ fontSize:11, padding:"5px 12px", borderRadius:99, background:"rgba(255,255,255,0.1)", color:C.goldLight, border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer" }}>
              {lang==="en"?"हिंदी":"English"}
            </button>
          </div>
        </div>
        {/* Stats row */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, position:"relative", zIndex:1 }}>
          {[
            { en:"Temples",   hi:"मंदिर",   v: doneVisits.length },
            { en:"States",    hi:"राज्य",   v: 6 },
            { en:"Streak",    hi:"लय",      v: "12🔥" },
          ].map(s=>(
            <div key={s.en} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"10px 12px" }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginBottom:3 }}>{t(s.en,s.hi,lang)}</div>
              <div style={{ fontFamily:F.display, fontSize:20, fontWeight:700, color:"white" }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:"18px 16px 100px" }}>

        {/* ── Passport mini card ── */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div style={sectionLabel}>{t("MY PASSPORT","मेरा पासपोर्ट",lang)}</div>
            <button onClick={()=>onNav("passport")} style={{ fontSize:12, fontWeight:600, color:C.saffron, background:"none", border:"none", cursor:"pointer" }}>{t("See all →","सब देखें →",lang)}</button>
          </div>
          <div style={{ background:`linear-gradient(135deg,${C.maroon} 0%,#5c1a0a 100%)`, borderRadius:20, padding:16, position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${C.gold},transparent)` }}/>
            <div style={{ position:"absolute", bottom:-6, right:-2, fontSize:70, color:"rgba(255,255,255,0.04)", fontFamily:F.display, userSelect:"none", lineHeight:1 }}>ॐ</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div>
                <div style={{ fontSize:10, letterSpacing:"0.14em", fontWeight:700, color:C.goldLight, opacity:0.65, marginBottom:4 }}>{t("PILGRIMAGE PASSPORT","तीर्थ पासपोर्ट",lang)}</div>
                <div style={{ fontFamily:F.display, fontSize:18, fontWeight:700, color:"white" }}>{t("Prince Kumar","प्रिंस कुमार",lang)}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:2 }}>{t("Since 2023 · Nawada, Bihar","2023 से · नवादा, बिहार",lang)}</div>
              </div>
              <div style={{ fontSize:22 }}>🕉️</div>
            </div>
            {/* Recent visits */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {doneVisits.slice(0,3).map(v=>(
                <div key={v.id} style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.07)", borderRadius:12, padding:"8px 10px" }}>
                  <span style={{ fontSize:16 }}>{v.emoji}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:600, color:"white", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(v.name,v.nameHi,lang)}</div>
                    <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginTop:1 }}>{t(v.date,v.dateHi,lang)}</div>
                  </div>
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="#5DCAA5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              ))}
            </div>
            <button onClick={()=>onNav("passport")} style={{ marginTop:12, width:"100%", padding:"9px", borderRadius:11, background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)", border:"none", cursor:"pointer", fontSize:12, fontWeight:600 }}>
              + {t("Log a visit","यात्रा जोड़ें",lang)}
            </button>
          </div>
        </div>

        {/* ── Quests mini card ── */}
        <div style={{ marginBottom:20 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
            <div style={sectionLabel}>{t("MY QUESTS","मेरे लक्ष्य",lang)}</div>
            <button onClick={()=>onNav("quests")} style={{ fontSize:12, fontWeight:600, color:C.saffron, background:"none", border:"none", cursor:"pointer" }}>{t("See all →","सब देखें →",lang)}</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {/* Jyotirlinga */}
            <button onClick={()=>onNav("quests")}
              style={{ background:`linear-gradient(135deg,${C.maroon},#7a2a10)`, borderRadius:18, padding:14, border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:8, boxShadow:"0 4px 16px rgba(44,10,10,0.2)" }}>
              <Ring pct={jPct}/>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:12, fontWeight:700, color:"white" }}>{t("12 Jyotirlingas","12 ज्योतिर्लिंग",lang)}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.5)", marginTop:2 }}>{jDone}/12 {t("done","पूर्ण",lang)}</div>
              </div>
            </button>
            {/* Char Dham + Shakti */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <button onClick={()=>onNav("quests")}
                style={{ flex:1, background:"linear-gradient(135deg,#0a1a2c,#105c7a)", borderRadius:14, padding:"12px 14px", border:"none", cursor:"pointer", textAlign:"left", boxShadow:"0 4px 16px rgba(10,26,44,0.25)" }}>
                <div style={{ fontSize:18, marginBottom:6 }}>🏔️</div>
                <div style={{ fontSize:12, fontWeight:700, color:"white" }}>{t("Char Dham","चार धाम",lang)}</div>
                <div style={{ marginTop:6, height:4, borderRadius:99, background:"rgba(255,255,255,0.12)", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(cDone/4)*100}%`, background:"linear-gradient(90deg,#38bdf8,#7dd3fc)", borderRadius:99 }}/>
                </div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginTop:4 }}>{cDone}/4 {t("done","पूर्ण",lang)}</div>
              </button>
              <button onClick={()=>onNav("quests")}
                style={{ flex:1, background:"linear-gradient(135deg,#2c0a2c,#7a108b)", borderRadius:14, padding:"12px 14px", border:"none", cursor:"pointer", textAlign:"left", boxShadow:"0 4px 16px rgba(44,10,44,0.25)" }}>
                <div style={{ fontSize:18, marginBottom:6 }}>🌸</div>
                <div style={{ fontSize:12, fontWeight:700, color:"white" }}>{t("Shakti Peethas","शक्ति पीठ",lang)}</div>
                <div style={{ marginTop:6, height:4, borderRadius:99, background:"rgba(255,255,255,0.12)", overflow:"hidden" }}>
                  <div style={{ height:"100%", width:"0%", background:"linear-gradient(90deg,#f9a8d4,#fbcfe8)", borderRadius:99 }}/>
                </div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.5)", marginTop:4 }}>0/51 {t("done","पूर्ण",lang)}</div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Quick access: Live + Alerts ── */}
        <div style={{ marginBottom:20 }}>
          <div style={sectionLabel}>{t("QUICK ACCESS","शीघ्र पहुँच",lang)}</div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {QUICK.map(q=>(
              <button key={q.tab} onClick={()=>onNav(q.tab)}
                style={{ background:q.bg, border:"none", borderRadius:16, padding:"14px 12px", cursor:"pointer", display:"flex", alignItems:"center", gap:10, textAlign:"left" }}>
                <span style={{ fontSize:24, flexShrink:0 }}>{q.icon}</span>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:C.ink }}>{t(q.en,q.hi,lang)}</div>
                  <div style={{ fontSize:11, color:C.stone, marginTop:2 }}>{t(q.sub_en,q.sub_hi,lang)}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Temple of the Day ── */}
        <div style={{ marginBottom:20 }}>
          <div style={sectionLabel}>{t("TEMPLE OF THE DAY","आज का मंदिर",lang)}</div>
          <div style={{ borderRadius:22, overflow:"hidden", background:"linear-gradient(135deg,#1a0530,#3d0c5c 60%,#6b1a8b)", boxShadow:"0 6px 24px rgba(44,10,10,0.2)" }}>
            <div style={{ padding:18 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:"rgba(255,255,255,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🕉️</div>
                <span style={{ fontSize:11, padding:"4px 11px", borderRadius:99, background:"rgba(255,255,255,0.12)", color:"rgba(255,255,255,0.8)" }}>{t("Today's pick","आज की पसंद",lang)}</span>
              </div>
              <div style={{ fontFamily:F.display, fontSize:17, fontWeight:700, color:"white", marginBottom:3 }}>{t("Mahakaleshwar Jyotirlinga","महाकालेश्वर ज्योतिर्लिंग",lang)}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:10 }}>📍 {t("Ujjain, Madhya Pradesh","उज्जैन, मध्य प्रदेश",lang)}</div>
              <div style={{ fontSize:12, lineHeight:1.7, color:"rgba(255,255,255,0.6)" }}>{t("The only south-facing Jyotirlinga. Bhasma Aarti at 4 AM is the most sacred ritual in Shaivism.","एकमात्र दक्षिणमुखी ज्योतिर्लिंग। भस्म आरती भोर 4 बजे होती है।",lang)}</div>
              <button onClick={()=>onNav("book")} style={{ marginTop:14, width:"100%", padding:"10px", borderRadius:12, background:"rgba(255,255,255,0.14)", color:"white", border:"1px solid rgba(255,255,255,0.2)", cursor:"pointer", fontSize:13, fontWeight:700 }}>
                {t("Book Darshan →","दर्शन बुक करें →",lang)}
              </button>
            </div>
          </div>
        </div>

        {/* ── Today's Muhurat ── */}
        <div style={{ marginBottom:20 }}>
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
        <div style={{ marginBottom:20 }}>
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
