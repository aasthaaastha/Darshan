"use client";
import { useState } from "react";
import { C, F } from "@/app/styles";
import { LangProvider, useLang, t } from "@/app/LangContext";
import HomeTab     from "@/components/HomeTab";
import PassportTab from "@/components/PassportTab";
import QuestsTab   from "@/components/QuestsTab";
import TripTab     from "@/components/TripTab";
import LiveTab     from "@/components/LiveTab";
import BookingsTab from "@/components/BookingsTab";
import PurohitTab  from "@/components/PurohitTab";
import AlertsTab   from "@/components/AlertsTab";

// Only 4 in the bottom nav
const NAV = [
  { id:"home",     en:"Home",     hi:"होम",      icon:"🏠" },
  { id:"passport", en:"Passport", hi:"पासपोर्ट", icon:"🪪" },
  { id:"quests",   en:"Quests",   hi:"लक्ष्य",   icon:"🗺️" },
  { id:"trip",     en:"Plan",     hi:"यात्रा",   icon:"✈️" },
];

function App() {
  const [tab, setTab] = useState("home");
  const { lang, toggle } = useLang();

  // Header only shows on non-home tabs
  const showHeader = tab !== "home";

  return (
    <div style={{ minHeight:"100vh", background:C.cream, paddingBottom:72 }}>

      {/* ── Compact header for inner tabs ── */}
      {showHeader && (
        <div style={{ background:`linear-gradient(160deg,${C.maroon} 0%,#4a1212 100%)`, padding:"48px 20px 20px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:4, right:12, fontSize:60, lineHeight:1, color:"rgba(255,255,255,0.04)", fontFamily:F.display, userSelect:"none", pointerEvents:"none" }}>ॐ</div>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", zIndex:1 }}>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.2em", fontWeight:700, color:C.goldLight, opacity:0.7, marginBottom:4 }}>ॐ नमः शिवाय</div>
              <div style={{ fontFamily:F.display, fontSize:22, fontWeight:700, color:"white" }}>{t("Darshan","दर्शन",lang)}</div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button onClick={toggle} style={{ fontSize:11, padding:"5px 12px", borderRadius:99, background:"rgba(255,255,255,0.1)", color:C.goldLight, border:"1px solid rgba(255,255,255,0.15)", cursor:"pointer" }}>
                {lang==="en"?"हिंदी":"English"}
              </button>
              <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${C.gold},#F0A855)`, color:C.maroon, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700 }}>PK</div>
            </div>
          </div>
        </div>
      )}

      {/* ── Content ── */}
      <div style={{ maxWidth:480, margin:"0 auto" }}>
        {tab==="home"     && <HomeTab onNav={setTab} lang={lang} toggle={toggle}/>}
        {tab==="passport" && <PassportTab/>}
        {tab==="quests"   && <QuestsTab/>}
        {tab==="trip"     && <TripTab/>}
        {tab==="live"     && <LiveTab/>}
        {tab==="book"     && <BookingsTab/>}
        {tab==="purohit"  && <PurohitTab/>}
        {tab==="alerts"   && <AlertsTab/>}
      </div>

      {/* ── Bottom nav ── */}
      <div style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:100,
        background:"white",
        borderTop:`1px solid ${C.border}`,
        boxShadow:"0 -4px 20px rgba(44,10,10,0.08)",
        display:"flex",
        paddingBottom:"env(safe-area-inset-bottom)",
        maxWidth:480,
        margin:"0 auto",
      }}>
        {NAV.map(tb => {
          const active = tab === tb.id;
          return (
            <button key={tb.id} onClick={()=>setTab(tb.id)}
              style={{
                flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                gap:3, padding:"10px 4px 8px", background:"none", border:"none", cursor:"pointer",
                color: active ? C.saffron : C.stone,
                position:"relative",
              }}>
              {/* Active indicator dot */}
              {active && (
                <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:32, height:3, borderRadius:"0 0 4px 4px", background:C.saffron }}/>
              )}
              <span style={{ fontSize:20, lineHeight:1 }}>{tb.icon}</span>
              <span style={{ fontSize:10, fontWeight:active?700:500, whiteSpace:"nowrap" }}>{t(tb.en,tb.hi,lang)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Page() {
  return <LangProvider><App/></LangProvider>;
}
