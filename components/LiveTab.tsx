"use client";
import { useState } from "react";
import { liveStreams } from "@/app/data";
import { C } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

export default function LiveTab() {
  const { lang } = useLang();
  const [filter, setFilter] = useState<"all"|"live">("all");
  const filtered = filter==="live"?liveStreams.filter(s=>s.isLive):liveStreams;

  return (
    <div style={{ paddingBottom:112 }}>
      <div style={{ padding:"16px 16px 14px", background:"linear-gradient(135deg,#1a0a0a,#3D0C0C)" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <span style={{ position:"relative", width:10, height:10, display:"inline-flex", alignItems:"center" }}>
                <span style={{ position:"absolute", inset:0, borderRadius:"50%", background:"#FF4444", animation:"livePing 1s cubic-bezier(0,0,.2,1) infinite", opacity:0.75 }}/>
                <span style={{ position:"relative", width:10, height:10, borderRadius:"50%", background:"#FF4444", display:"inline-block" }}/>
              </span>
              <span style={{ fontSize:11, fontWeight:700, letterSpacing:"0.18em", color:"#FF8080" }}>{t("LIVE DARSHAN","लाइव दर्शन",lang)}</span>
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{liveStreams.filter(s=>s.isLive).length} {t("streaming now","अभी लाइव",lang)}</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {(["all","live"] as const).map(f=>(
              <button key={f} onClick={()=>setFilter(f)} style={{ fontSize:11, padding:"6px 14px", borderRadius:99, cursor:"pointer", border:"none", fontWeight:600, background:filter===f?"#FF4444":"rgba(255,255,255,0.1)", color:filter===f?"white":"rgba(255,255,255,0.5)" }}>
                {f==="all"?t("All","सभी",lang):t("Live","लाइव",lang)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ margin:"12px 16px", borderRadius:14, padding:"10px 14px", background:C.saffronPale, border:"1px solid rgba(224,123,42,0.2)", display:"flex", alignItems:"center", gap:10 }}>
        <span style={{ fontSize:16 }}>🕯️</span>
        <span style={{ fontSize:12, color:C.stone }}>{t("Aarti most active: 5:00 AM · 12:00 PM · 7:00 PM","आरती: सुबह 5 बजे · दोपहर 12 बजे · शाम 7 बजे",lang)}</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12, padding:"0 16px" }}>
        {filtered.map(s=>(
          <a key={s.id} href={`https://www.youtube.com/watch?v=${s.youtubeId}`} target="_blank" rel="noopener noreferrer"
            style={{ borderRadius:20, overflow:"hidden", background:"white", border:`1px solid ${s.isLive?"rgba(255,68,68,0.3)":C.border}`, display:"block", boxShadow:s.isLive?"0 2px 12px rgba(255,68,68,0.08)":"none" }}>
            <div style={{ position:"relative", paddingBottom:"52%", background:s.color }}>
              <img src={`https://img.youtube.com/vi/${s.youtubeId}/mqdefault.jpg`} alt={s.temple} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }}/>
              <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.28)" }}/>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(255,255,255,0.92)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 12px rgba(0,0,0,0.3)" }}>
                  <svg width="14" height="16" viewBox="0 0 14 16" fill="none"><path d="M1 1l12 7L1 15V1z" fill="#1a0a0a"/></svg>
                </div>
              </div>
              {s.isLive
                ? <div style={{ position:"absolute", top:10, left:10, display:"flex", alignItems:"center", gap:4, padding:"4px 10px", borderRadius:8, background:"#FF4444" }}>
                    <span style={{ width:6, height:6, borderRadius:"50%", background:"white", display:"inline-block" }}/>
                    <span style={{ color:"white", fontSize:10, fontWeight:800, letterSpacing:"0.5px" }}>LIVE</span>
                  </div>
                : <div style={{ position:"absolute", top:10, left:10, padding:"4px 10px", borderRadius:8, background:"rgba(0,0,0,0.55)" }}>
                    <span style={{ color:"white", fontSize:10 }}>{t("Offline","ऑफलाइन",lang)}</span>
                  </div>
              }
              {s.isLive && <div style={{ position:"absolute", bottom:10, right:10, padding:"3px 8px", borderRadius:8, background:"rgba(0,0,0,0.6)" }}>
                <span style={{ color:"white", fontSize:11, fontWeight:600 }}>👁 {s.viewers}</span>
              </div>}
            </div>
            <div style={{ padding:"12px 14px", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:s.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{s.emoji}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:C.ink, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(s.temple,s.templeHi,lang)}</div>
                <div style={{ fontSize:11, color:C.stone, marginTop:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{t(s.channelName,s.channelNameHi,lang)}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.stone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
