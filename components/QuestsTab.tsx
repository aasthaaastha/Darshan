"use client";
import { useState } from "react";
import { jyotirlingas as initJ, charDham as initC, recommendations } from "@/app/data";
import { C, F, sectionLabel } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

const QUESTS = [
  { id:"jyoti",    en:"12 Jyotirlingas", hi:"12 ज्योतिर्लिंग", total:12, icon:"🔱", g:`linear-gradient(135deg,${C.maroon},#7a2a10)` },
  { id:"chardham", en:"Char Dham",       hi:"चार धाम",          total:4,  icon:"🏔️", g:"linear-gradient(135deg,#0a1a2c,#105c7a)" },
  { id:"shakti",   en:"Shakti Peethas",  hi:"शक्ति पीठ",        total:51, icon:"🌸", g:"linear-gradient(135deg,#2c0a2c,#7a108b)" },
];

export default function QuestsTab() {
  const [aq, setAq] = useState("jyoti");
  const [jyoti, setJyoti] = useState(initJ);
  const [charDham, setCharDham] = useState(initC);
  const { lang } = useLang();

  const items = aq==="jyoti"?jyoti:aq==="chardham"?charDham:[];
  const toggle = (id:number) => {
    if (aq==="jyoti")    setJyoti(p=>p.map(j=>j.id===id?{...j,done:!j.done}:j));
    if (aq==="chardham") setCharDham(p=>p.map(j=>j.id===id?{...j,done:!j.done}:j));
  };
  const done  = items.filter(i=>i.done).length;
  const total = QUESTS.find(q=>q.id===aq)?.total ?? items.length;
  const pct   = Math.round((done/total)*100);
  const recs  = recommendations[aq as keyof typeof recommendations] ?? [];
  const aqd   = QUESTS.find(q=>q.id===aq)!;
  const counts: Record<string,number> = { jyoti:jyoti.filter(j=>j.done).length, chardham:charDham.filter(j=>j.done).length, shakti:0 };

  return (
    <div style={{ padding:"16px 16px 112px", animation:"fadeUp 0.25s ease" }}>
      {/* Selector */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:16 }}>
        {QUESTS.map(q=>{
          const active=aq===q.id;
          return (
            <button key={q.id} onClick={()=>setAq(q.id)}
              style={{ borderRadius:16, padding:"12px 8px", textAlign:"left", cursor:"pointer", border:"none", background:active?q.g:C.ash, boxShadow:active?"0 4px 16px rgba(44,10,10,0.25)":`0 0 0 1px ${C.border}`, transition:"all 0.15s" }}>
              <span style={{ fontSize:20, display:"block", marginBottom:6 }}>{q.icon}</span>
              <span style={{ fontSize:11, fontWeight:700, color:active?"white":C.ink, display:"block", lineHeight:1.3 }}>{t(q.en,q.hi,lang)}</span>
              <span style={{ fontSize:11, color:active?"rgba(255,255,255,0.5)":C.stone, display:"block", marginTop:2 }}>{counts[q.id]}/{q.total}</span>
            </button>
          );
        })}
      </div>

      {/* Progress */}
      <div style={{ borderRadius:24, padding:20, background:aqd.g, boxShadow:"0 6px 24px rgba(44,10,10,0.2)", position:"relative", overflow:"hidden", marginBottom:16 }}>
        <div style={{ position:"absolute", top:10, right:14, fontSize:52, opacity:0.06, lineHeight:1 }}>{aqd.icon}</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:12 }}>
          <div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginBottom:4 }}>{t("Completed","पूर्ण",lang)}</div>
            <div style={{ fontFamily:F.display, fontSize:36, fontWeight:700, color:"white", lineHeight:1 }}>
              {done}<span style={{ fontSize:18, fontWeight:400, color:"rgba(255,255,255,0.4)" }}>/{total}</span>
            </div>
          </div>
          <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ fontFamily:F.display, fontSize:18, fontWeight:700, color:pct>0?"#F0A855":"rgba(255,255,255,0.2)" }}>{pct}%</span>
          </div>
        </div>
        <div style={{ height:6, borderRadius:99, background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
          <div style={{ height:"100%", borderRadius:99, width:`${pct}%`, background:`linear-gradient(90deg,${C.saffron},${C.goldLight})`, transition:"width 0.7s ease" }}/>
        </div>
      </div>

      {/* Grid */}
      {items.length > 0
        ? <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
            {items.map(item=>(
              <button key={item.id} onClick={()=>toggle(item.id)}
                style={{ textAlign:"left", borderRadius:16, padding:"12px", display:"flex", alignItems:"center", gap:10, cursor:"pointer", border:"none", background:item.done?C.greenBg:C.ash, boxShadow:item.done?`0 0 0 1px ${C.greenBorder}`:`0 0 0 1px ${C.border}`, transition:"all 0.12s" }}>
                <div style={{ width:28, height:28, borderRadius:"50%", background:item.done?"#1D9E75":"white", border:item.done?"none":`1.5px solid ${C.mist}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                  {item.done
                    ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : <span style={{ fontSize:11 }}>{item.emoji}</span>
                  }
                </div>
                <div style={{ minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:item.done?C.greenText:C.ink, lineHeight:1.3, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(item.name,item.nameHi,lang)}</div>
                  <div style={{ fontSize:11, color:item.done?"#1D9E75":C.stone, marginTop:2 }}>{t(item.state,item.stateHi,lang)}</div>
                </div>
              </button>
            ))}
          </div>
        : <div style={{ textAlign:"center", padding:"40px 0", color:C.stone }}>
            <div style={{ fontSize:32, marginBottom:8 }}>🗺️</div>
            <div style={{ fontSize:13 }}>{t("Start your journey","यात्रा शुरू करें",lang)}</div>
          </div>
      }

      {/* Recommendations */}
      {recs.length > 0 && (
        <div style={{ borderRadius:18, padding:16, background:C.goldPale, border:"1px solid rgba(184,137,42,0.2)" }}>
          <div style={{ ...sectionLabel, color:C.gold, marginBottom:12 }}>✨ {t("Recommended Next","अगली यात्रा",lang)}</div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {recs.map((r,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:C.gold, flexShrink:0 }}/>
                <span style={{ fontSize:13, flex:1, color:C.ink }}>{t(r.name,r.nameHi,lang)}</span>
                <span style={{ fontSize:11, color:C.stone }}>{t(r.state,r.stateHi,lang)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
