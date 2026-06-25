"use client";
import { useState } from "react";
import { visits as INIT } from "@/app/data";
import { C, F, sectionLabel, btnGhost } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

export default function PassportTab() {
  const [visits, setVisits] = useState(INIT);
  const { lang } = useLang();
  const done = visits.filter(v=>v.done);
  const planned = visits.filter(v=>!v.done);

  const addVisit = () => {
    if (visits.length >= INIT.length + 2) return;
    setVisits(v => [...v, { id: Date.now(), name:"Vaishno Devi", nameHi:"वैष्णो देवी", location:"J&K", locationHi:"जम्मू & कश्मीर", date:"2026", dateHi:"2026", emoji:"🏔️", color:C.greenBg, done:true }]);
  };

  const VisitCard = ({ v }: { v: typeof INIT[0] }) => (
    <div style={{ display:"flex", alignItems:"center", gap:12, background:"white", border:`1px solid ${C.border}`, borderRadius:16, padding:"12px 14px" }}>
      <div style={{ width:44, height:44, borderRadius:14, background:v.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{v.emoji}</div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:13, fontWeight:600, color:C.ink, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(v.name,v.nameHi,lang)}</div>
        <div style={{ fontSize:11, color:C.stone, marginTop:3 }}>{t(v.location,v.locationHi,lang)} · {t(v.date,v.dateHi,lang)}</div>
      </div>
      {v.done
        ? <div style={{ width:28, height:28, borderRadius:"50%", background:C.greenBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke={C.greenText} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        : <span style={{ fontSize:11, padding:"4px 10px", borderRadius:99, background:C.amberBg, color:C.amberText, fontWeight:500, flexShrink:0 }}>{t("Planned","योजना",lang)}</span>
      }
    </div>
  );

  return (
    <div style={{ padding:"16px 16px 112px", animation:"fadeUp 0.25s ease" }}>
      {/* Passport card */}
      <div style={{ background:`linear-gradient(135deg,${C.maroon} 0%,#5c1a0a 60%,#8b3a10 100%)`, boxShadow:"0 8px 32px rgba(44,10,10,0.28)", borderRadius:24, padding:20, position:"relative", overflow:"hidden", marginBottom:20 }}>
        <div style={{ position:"absolute", top:0, left:0, right:0, height:2, background:`linear-gradient(90deg,transparent,${C.gold},transparent)` }}/>
        <div style={{ position:"absolute", bottom:-8, right:-4, fontSize:110, color:"rgba(255,255,255,0.04)", fontFamily:F.display, userSelect:"none", lineHeight:1 }}>ॐ</div>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.18em", fontWeight:700, color:C.goldLight, opacity:0.65, marginBottom:8 }}>{t("PILGRIMAGE PASSPORT","तीर्थ पासपोर्ट",lang)}</div>
            <div style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:"white" }}>{t("Prince Kumar","प्रिंस कुमार",lang)}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginTop:4 }}>{t("Since 2023 · Nawada, Bihar","2023 से · नवादा, बिहार",lang)}</div>
          </div>
          <div style={{ width:48, height:48, borderRadius:14, background:"rgba(184,137,42,0.2)", border:"1px solid rgba(184,137,42,0.35)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22 }}>🕉️</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, paddingTop:16, borderTop:"1px solid rgba(255,255,255,0.08)" }}>
          {[{en:"Visited",hi:"दर्शन",v:done.length},{en:"States",hi:"राज्य",v:6},{en:"This Year",hi:"इस वर्ष",v:2}].map(s=>(
            <div key={s.en}>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.38)", marginBottom:4 }}>{t(s.en,s.hi,lang)}</div>
              <div style={{ fontFamily:F.display, fontSize:26, fontWeight:700, color:"white" }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {done.length > 0 && <>
        <div style={{ ...sectionLabel }}>✅ {t("Completed","पूर्ण दर्शन",lang)} ({done.length})</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>{done.map(v=><VisitCard key={v.id} v={v}/>)}</div>
      </>}
      {planned.length > 0 && <>
        <div style={{ ...sectionLabel }}>📅 {t("Planned","योजना में",lang)} ({planned.length})</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>{planned.map(v=><VisitCard key={v.id} v={v}/>)}</div>
      </>}

      <button onClick={addVisit} style={btnGhost}>+ {t("Log a new visit","नई यात्रा जोड़ें",lang)}</button>
    </div>
  );
}
