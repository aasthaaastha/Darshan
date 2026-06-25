"use client";
import { useState } from "react";
import { purohits } from "@/app/data";
import { C, sectionLabel } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

const FILTERS = [
  {en:"All",hi:"सभी",v:"all"},{en:"Vivah",hi:"विवाह",v:"vivah"},
  {en:"Griha Pravesh",hi:"गृह प्रवेश",v:"griha"},{en:"Rudrabhishek",hi:"रुद्राभिषेक",v:"rudra"},
  {en:"Pitra Dosh",hi:"पितृ दोष",v:"pitra"},{en:"Mundan",hi:"मुंडन",v:"mundan"},
];

function Stars({ rating }:{ rating:number }) {
  return <span style={{ display:"inline-flex", gap:2 }}>
    {[1,2,3,4,5].map(i=>(
      <svg key={i} width="11" height="11" viewBox="0 0 12 12" fill={i<=Math.round(rating)?"#C9953B":"#E8E2D9"}>
        <path d="M6 1l1.4 2.8L10.5 4l-2.25 2.2.53 3.1L6 7.75 3.22 9.3l.53-3.1L1.5 4l3.1-.45z"/>
      </svg>
    ))}
  </span>;
}

export default function PurohitTab() {
  const { lang } = useLang();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [contacted, setContacted] = useState<number[]>([]);

  const filtered = purohits.filter(p=>{
    const ms = search===""||p.name.toLowerCase().includes(search.toLowerCase())||p.area.toLowerCase().includes(search.toLowerCase());
    const mf = filter==="all"||p.speciality.toLowerCase().includes(filter);
    return ms&&mf;
  });

  return (
    <div style={{ padding:"16px 16px 112px", animation:"fadeUp 0.25s ease" }}>
      <div style={{ position:"relative", marginBottom:12 }}>
        <svg style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.stone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("Search by name, area or puja...","नाम, क्षेत्र या पूजा खोजें...",lang)}
          style={{ width:"100%", background:C.ash, border:`1.5px solid ${C.border}`, borderRadius:12, padding:"11px 14px 11px 38px", fontSize:13, color:C.ink, outline:"none" }}/>
      </div>
      <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:4, marginBottom:12 }}>
        {FILTERS.map(f=>(
          <button key={f.v} onClick={()=>setFilter(f.v)}
            style={{ padding:"6px 14px", borderRadius:99, fontSize:12, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", border:"none", background:filter===f.v?C.maroon:C.ash, color:filter===f.v?"white":C.stone, boxShadow:filter===f.v?"none":`0 0 0 1px ${C.border}` }}>
            {t(f.en,f.hi,lang)}
          </button>
        ))}
      </div>
      <div style={{ fontSize:12, color:C.stone, marginBottom:14 }}>{filtered.length} {t("purohits near you","पुरोहित आपके पास",lang)}</div>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {filtered.map(p=>(
          <div key={p.id} style={{ borderRadius:20, overflow:"hidden", background:"white", border:`1px solid ${C.border}`, opacity:p.available?1:0.75 }}>
            <div style={{ height:3, background:`linear-gradient(90deg,${C.maroon},${C.saffron})` }}/>
            <div style={{ padding:16 }}>
              <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:12 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:C.saffronPale, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>🕉️</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.ink }}>{t(p.name,p.nameHi,lang)}</div>
                    <span style={{ fontSize:11, padding:"3px 10px", borderRadius:99, fontWeight:500, flexShrink:0, background:p.available?C.greenBg:"#F1EFE8", color:p.available?C.greenText:"#5F5E5A" }}>{p.available?t("Available","उपलब्ध",lang):t("Busy","व्यस्त",lang)}</span>
                  </div>
                  <div style={{ fontSize:11, color:C.stone, margin:"3px 0" }}>📍 {t(p.area,p.areaHi,lang)}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <Stars rating={p.rating}/>
                    <span style={{ fontSize:12, fontWeight:600, color:C.gold }}>{p.rating}</span>
                    <span style={{ fontSize:11, color:C.stone }}>({p.reviews})</span>
                  </div>
                </div>
              </div>
              <div style={{ borderRadius:12, padding:"10px 12px", background:C.saffronPale, marginBottom:12 }}>
                <div style={{ fontSize:11, fontWeight:700, color:C.saffron, marginBottom:3 }}>{t("Speciality","विशेषज्ञता",lang)}</div>
                <div style={{ fontSize:12, color:C.maroon, lineHeight:1.6 }}>{t(p.speciality,p.specialityHi,lang)}</div>
              </div>
              <div style={{ display:"flex", gap:16, marginBottom:14 }}>
                <span style={{ fontSize:12, color:C.stone }}>⏳ <strong style={{ color:C.ink }}>{t(p.experience,p.experienceHi,lang)}</strong></span>
                <span style={{ fontSize:12, color:C.stone }}>🗣️ {(lang==="hi"?p.languagesHi:p.languages).join(", ")}</span>
              </div>
              {p.available
                ? contacted.includes(p.id)
                  ? <div style={{ padding:"12px", borderRadius:12, background:C.greenBg, color:C.greenText, fontSize:13, fontWeight:700, textAlign:"center" }}>✓ {t("Request sent","अनुरोध भेजा गया",lang)}</div>
                  : <button onClick={()=>setContacted(c=>[...c,p.id])} style={{ width:"100%", padding:"12px", borderRadius:12, background:C.maroon, color:"white", fontSize:13, fontWeight:700, cursor:"pointer", border:"none" }}>
                      🙏 {t("Request Purohit","पुरोहित बुलाएं",lang)}
                    </button>
                : <button disabled style={{ width:"100%", padding:"12px", borderRadius:12, background:C.mist, color:C.stone, fontSize:13, fontWeight:600, cursor:"not-allowed", border:"none" }}>
                    {t("Currently unavailable","अभी उपलब्ध नहीं",lang)}
                  </button>
              }
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop:20, borderRadius:18, padding:16, background:C.saffronPale, border:"1px solid rgba(224,123,42,0.2)" }}>
        <div style={{ ...sectionLabel, color:C.saffron }}>🕉️ {t("Are you a purohit?","क्या आप पुरोहित हैं?",lang)}</div>
        <div style={{ fontSize:12, lineHeight:1.7, color:C.stone, marginBottom:12 }}>{t("Register on Darshan and connect with devotees in your area.","दर्शन पर रजिस्टर करें और भक्तों से जुड़ें।",lang)}</div>
        <button style={{ fontSize:12, fontWeight:700, padding:"8px 18px", borderRadius:99, background:C.saffron, color:"white", border:"none", cursor:"pointer" }}>{t("Register as Purohit →","पुरोहित के रूप में जुड़ें →",lang)}</button>
      </div>
    </div>
  );
}
