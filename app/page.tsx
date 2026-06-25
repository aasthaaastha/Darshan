"use client";
import { useState } from "react";
import { C, F } from "@/app/styles";
import { LangProvider, useLang, t } from "@/app/LangContext";
import HomeTab     from "@/components/HomeTab";
import PassportTab from "@/components/PassportTab";
import QuestsTab   from "@/components/QuestsTab";
import LiveTab     from "@/components/LiveTab";
import BookingsTab from "@/components/BookingsTab";
import TripTab     from "@/components/TripTab";
import PurohitTab  from "@/components/PurohitTab";
import AlertsTab   from "@/components/AlertsTab";

const TABS = [
  { id:"home",     en:"Home",     hi:"होम",      icon:"🏠" },
  { id:"passport", en:"Passport", hi:"पासपोर्ट", icon:"🪪" },
  { id:"quests",   en:"Quests",   hi:"लक्ष्य",   icon:"🗺️" },
  { id:"live",     en:"Live",     hi:"लाइव",     icon:"🔴" },
  { id:"book",     en:"Book",     hi:"बुकिंग",   icon:"🎟️" },
  { id:"trip",     en:"Plan",     hi:"यात्रा",   icon:"✈️" },
  { id:"purohit",  en:"Purohit",  hi:"पुरोहित",  icon:"🙏" },
  { id:"alerts",   en:"Alerts",   hi:"सूचनाएं",  icon:"🔔" },
];

function App() {
  const [tab, setTab] = useState("home");
  const { lang, toggle } = useLang();

  return (
    <div style={{ minHeight:"100vh", background: C.cream }}>

      {/* ── Header ── */}
      <div style={{ background:`linear-gradient(160deg,${C.maroon} 0%,#4a1212 100%)`, padding:"52px 20px 24px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:4, right:12, fontSize:80, lineHeight:1, color:"rgba(255,255,255,0.04)", fontFamily:F.display, userSelect:"none", pointerEvents:"none" }}>ॐ</div>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", position:"relative", zIndex:1 }}>
          <div>
            <div style={{ fontSize:10, letterSpacing:"0.2em", fontWeight:700, color:C.goldLight, opacity:0.7, marginBottom:6 }}>ॐ नमः शिवाय</div>
            <div style={{ fontFamily:F.display, fontSize:28, fontWeight:700, color:"white", lineHeight:1.1 }}>{t("Darshan","दर्शन",lang)}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:5 }}>{t("Your pilgrimage, remembered","आपकी तीर्थ यात्रा, सदा याद",lang)}</div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:8 }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},#F0A855)`, color:C.maroon, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, boxShadow:"0 2px 12px rgba(184,137,42,0.4)" }}>PK</div>
            <button onClick={toggle} style={{ fontSize:11, padding:"5px 12px", borderRadius:99, background:"rgba(255,255,255,0.1)", color:C.goldLight, border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer" }}>
              {lang==="en"?"हिंदी":"English"}
            </button>
          </div>
        </div>
        <div style={{ display:"flex", gap:10, marginTop:18, position:"relative", zIndex:1 }}>
          {[{en:"Temples",hi:"मंदिर",v:"5"},{en:"States",hi:"राज्य",v:"6"},{en:"Streak",hi:"लय",v:"12🔥"}].map(s=>(
            <div key={s.en} style={{ flex:1, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, padding:"10px 12px" }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginBottom:3 }}>{t(s.en,s.hi,lang)}</div>
              <div style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:"white" }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{ display:"flex", overflowX:"auto", background:C.ash, borderBottom:`1px solid ${C.border}`, boxShadow:"0 2px 8px rgba(44,10,10,0.06)", position:"sticky", top:0, zIndex:100 }}>
        {TABS.map(tb=>{
          const active = tab===tb.id;
          return (
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, minWidth:64, padding:"9px 6px 7px", background:"none", border:"none", borderBottom: active?`2.5px solid ${C.saffron}`:"2.5px solid transparent", cursor:"pointer", flexShrink:0, color: active?C.saffron:C.stone, transition:"color 0.15s" }}>
              <span style={{ fontSize:17, lineHeight:1 }}>{tb.icon}</span>
              <span style={{ fontSize:10, fontWeight:600, whiteSpace:"nowrap" }}>{t(tb.en,tb.hi,lang)}</span>
            </button>
          );
        })}
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth:480, margin:"0 auto" }}>
        {tab==="home"     && <HomeTab onNav={setTab}/>}
        {tab==="passport" && <PassportTab/>}
        {tab==="quests"   && <QuestsTab/>}
        {tab==="live"     && <LiveTab/>}
        {tab==="book"     && <BookingsTab/>}
        {tab==="trip"     && <TripTab/>}
        {tab==="purohit"  && <PurohitTab/>}
        {tab==="alerts"   && <AlertsTab/>}
      </div>
    </div>
  );
}

export default function Page() {
  return <LangProvider><App/></LangProvider>;
}
