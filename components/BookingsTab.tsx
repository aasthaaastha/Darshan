"use client";
import { useState } from "react";
import { templeBookings } from "@/app/data";
import { C, sectionLabel } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

const FILTERS = [
  {en:"All",hi:"सभी",v:"all"},{en:"Darshan",hi:"दर्शन",v:"darshan"},
  {en:"Helicopter",hi:"हेलिकॉप्टर",v:"helicopter"},{en:"Accommodation",hi:"आवास",v:"accommodation"},
  {en:"Puja",hi:"पूजा",v:"puja"},{en:"Prasad",hi:"प्रसाद",v:"prasad"},
];

export default function BookingsTab() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<number|null>(null);

  const filtered = templeBookings.filter(b=>{
    const ms = search===""||b.temple.toLowerCase().includes(search.toLowerCase())||b.templeHi.includes(search);
    const mf = filter==="all"||b.services.some(s=>s.toLowerCase().includes(filter));
    return ms&&mf;
  });

  return (
    <div style={{ paddingBottom:112 }}>
      <div style={{ padding:"16px 16px 20px", background:`linear-gradient(135deg,${C.maroon},#5c1a0a)` }}>
        <div style={{ fontSize:10, letterSpacing:"0.18em", color:C.goldLight, opacity:0.7, marginBottom:4, fontWeight:700 }}>{t("TEMPLE BOOKING PORTAL","मंदिर बुकिंग पोर्टल",lang)}</div>
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"white", marginBottom:2 }}>{t("Book your Darshan","दर्शन बुक करें",lang)}</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:14 }}>{templeBookings.length} {t("official portals","आधिकारिक पोर्टल",lang)}</div>
        <div style={{ position:"relative" }}>
          <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("Search temple...","मंदिर खोजें...",lang)}
            style={{ width:"100%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:12, padding:"11px 14px 11px 38px", fontSize:13, color:"white", outline:"none" }}/>
        </div>
      </div>
      <div style={{ padding:"14px 16px 0" }}>
        <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:10 }}>
          {FILTERS.map(f=>(
            <button key={f.v} onClick={()=>setFilter(f.v)}
              style={{ padding:"6px 14px", borderRadius:99, fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", border:"none", background:filter===f.v?C.maroon:C.ash, color:filter===f.v?"white":C.stone, boxShadow:filter===f.v?"none":`0 0 0 1px ${C.border}` }}>
              {t(f.en,f.hi,lang)}
            </button>
          ))}
        </div>
        <div style={{ fontSize:12, color:C.stone, marginBottom:14 }}>{filtered.length} {t("portals found","पोर्टल मिले",lang)}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {filtered.map(b=>(
            <div key={b.id} style={{ borderRadius:20, overflow:"hidden", background:"white", border:`1px solid ${C.border}` }}>
              <div style={{ height:3, background:`linear-gradient(90deg,${C.maroon},${C.saffron})` }}/>
              <div style={{ padding:16 }}>
                <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                  <div style={{ width:44, height:44, borderRadius:14, background:b.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{b.emoji}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:8, flexWrap:"wrap" }}>
                      <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>{t(b.temple,b.templeHi,lang)}</div>
                      <span style={{ fontSize:11, padding:"3px 10px", borderRadius:99, fontWeight:600, background:b.tagBg, color:b.tagColor }}>{t(b.tag,b.tagHi,lang)}</span>
                    </div>
                    <div style={{ fontSize:11, color:C.stone, marginTop:3 }}>📍 {t(b.location,b.locationHi,lang)}</div>
                  </div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                  {(lang==="hi"?b.servicesHi:b.services).map((s,i)=>(
                    <span key={i} style={{ fontSize:11, padding:"5px 12px", borderRadius:99, background:C.saffronPale, color:C.maroon, border:"1px solid rgba(224,123,42,0.2)" }}>{s}</span>
                  ))}
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:12, background:C.cream, border:`1px solid ${C.border}`, marginBottom:12 }}>
                  <span style={{ fontSize:12, flex:1, color:C.stone, fontFamily:"monospace", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.url.replace("https://","")}</span>
                  <button onClick={()=>{ navigator.clipboard.writeText(b.url); setCopied(b.id); setTimeout(()=>setCopied(null),2000); }}
                    style={{ fontSize:12, fontWeight:600, color:copied===b.id?C.greenText:C.saffron, background:"none", border:"none", cursor:"pointer", flexShrink:0 }}>
                    {copied===b.id?t("✓ Copied","✓ कॉपी",lang):t("Copy","कॉपी",lang)}
                  </button>
                </div>
                <a href={b.url} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", borderRadius:12, background:C.maroon, color:"white", fontSize:13, fontWeight:700 }}>
                  {t("Book Now","अभी बुक करें",lang)}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop:20, marginBottom:4, borderRadius:18, padding:16, background:C.saffronPale, border:"1px solid rgba(224,123,42,0.2)" }}>
          <div style={{ ...sectionLabel, color:C.saffron }}>ℹ️ {t("Important Note","महत्वपूर्ण जानकारी",lang)}</div>
          <div style={{ fontSize:12, lineHeight:1.7, color:C.stone }}>{t("All links go to official portals. Darshan does not handle payments.","सभी लिंक आधिकारिक पोर्टल पर जाते हैं। दर्शन ऐप कोई भुगतान नहीं लेता।",lang)}</div>
        </div>
      </div>
    </div>
  );
}
