"use client";
import { useState } from "react";
import { alerts as INIT } from "@/app/data";
import { C, F, sectionLabel, btnGhost } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

export default function AlertsTab() {
  const [alerts, setAlerts] = useState(INIT);
  const { lang } = useLang();
  const toggle = (id:number) => setAlerts(p=>p.map(a=>a.id===id?{...a,active:!a.active}:a));

  return (
    <div style={{ padding:"16px 16px 112px", animation:"fadeUp 0.25s ease" }}>
      <div style={{ background:`linear-gradient(135deg,${C.maroon},#5c1a0a)`, boxShadow:"0 4px 16px rgba(44,10,10,0.2)", borderRadius:20, padding:16, display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
        <span style={{ fontSize:28 }}>🔔</span>
        <div>
          <div style={{ fontFamily:F.display, fontSize:18, fontWeight:700, color:"white" }}>{alerts.filter(a=>a.active).length} {t("Active Alerts","सक्रिय सूचनाएं",lang)}</div>
          <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:3 }}>{t("Notified when slots open","स्लॉट खुलते ही सूचना",lang)}</div>
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:12, marginBottom:16 }}>
        {alerts.map(a=>(
          <div key={a.id} style={{ borderRadius:18, overflow:"hidden", background:C.ash, border:`1px solid ${a.active?"rgba(224,123,42,0.4)":C.border}`, boxShadow:a.active?"0 2px 12px rgba(224,123,42,0.08)":"none" }}>
            {a.active && <div style={{ height:2, background:`linear-gradient(90deg,${C.saffron},${C.gold})` }}/>}
            <div style={{ padding:16 }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:8 }}>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>{t(a.name,a.nameHi,lang)}</div>
                  <div style={{ fontSize:11, color:C.stone, marginTop:3 }}>📍 {t(a.state,a.stateHi,lang)}</div>
                </div>
                <button onClick={()=>toggle(a.id)} style={{ position:"relative", width:44, height:24, background:"none", border:"none", cursor:"pointer", flexShrink:0, marginTop:2 }}>
                  <div style={{ position:"absolute", inset:0, borderRadius:99, background:a.active?C.saffron:C.mist, transition:"background 0.2s" }}/>
                  <div style={{ position:"absolute", top:4, left:a.active?24:4, width:16, height:16, borderRadius:"50%", background:"white", boxShadow:"0 1px 4px rgba(0,0,0,0.2)", transition:"left 0.2s" }}/>
                </button>
              </div>
              <div style={{ fontSize:12, color:C.stone, marginBottom:12 }}>{t(a.desc,a.descHi,lang)}</div>
              <span style={{ fontSize:11, padding:"5px 12px", borderRadius:99, fontWeight:500, background:a.active?C.saffronPale:C.mist, color:a.active?C.saffron:C.stone }}>
                {a.active?"🔔":"🔕"} {a.active?`${t("Active","चालू",lang)} · ${t(a.type,a.typeHi,lang)}`:t("Off","बंद",lang)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <button style={btnGhost}>+ {t("Add temple alert","मंदिर सूचना जोड़ें",lang)}</button>
      <div style={{ marginTop:16, borderRadius:18, padding:16, background:C.goldPale, border:"1px solid rgba(184,137,42,0.18)" }}>
        <div style={{ fontSize:11, fontWeight:700, color:C.gold, marginBottom:6 }}>ℹ️ {t("How alerts work","सूचनाएं कैसे काम करती हैं",lang)}</div>
        <div style={{ fontSize:12, lineHeight:1.7, color:C.stone }}>{t("We scan temple websites weekly. Slots or festival dates open — you get a push notification instantly.","हम हर सप्ताह मंदिर वेबसाइट जांचते हैं। स्लॉट खुलते ही तुरंत सूचना मिलेगी।",lang)}</div>
      </div>
    </div>
  );
}
