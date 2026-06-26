"use client";
import { useState } from "react";
import { templeBookings } from "@/app/data";
import { C, F, sectionLabel } from "@/app/styles";
import { useLang, t } from "@/app/LangContext";

const CATEGORIES = [
  { v:"all",        en:"All",          hi:"सभी"          },
  { v:"Jyotirlinga",en:"Jyotirlingas", hi:"ज्योतिर्लिंग" },
  { v:"Char Dham",  en:"Char Dham",    hi:"चार धाम"      },
  { v:"Famous",     en:"Famous",       hi:"प्रसिद्ध"      },
];

const SERVICE_FILTERS = [
  { v:"all",         en:"All Services",  hi:"सभी"         },
  { v:"darshan",     en:"Darshan",       hi:"दर्शन"        },
  { v:"helicopter",  en:"Helicopter",    hi:"हेलिकॉप्टर"  },
  { v:"accommodation",en:"Stay",         hi:"आवास"         },
  { v:"puja",        en:"Puja",          hi:"पूजा"         },
];

export default function BookingsTab() {
  const { lang } = useLang();
  const [category,   setCategory]   = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [search,     setSearch]     = useState("");
  const [copied,     setCopied]     = useState<number|null>(null);

  const filtered = templeBookings.filter(b => {
    const matchCat  = category === "all" || b.category === category;
    const matchSvc  = serviceFilter === "all" || b.services.some(s => s.toLowerCase().includes(serviceFilter));
    const matchSearch = search === "" ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase()) ||
      b.nameHi.includes(search);
    return matchCat && matchSvc && matchSearch;
  });

  const copy = (id: number, url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div style={{ paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg,${C.maroon},#5c1a0a)`, padding: "16px 16px 20px" }}>
        <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.goldLight, opacity: 0.7, marginBottom: 4, fontWeight: 700 }}>
          {t("TEMPLE BOOKING PORTAL", "मंदिर बुकिंग पोर्टल", lang)}
        </div>
        <div style={{ fontFamily: F.display, fontSize: 22, fontWeight: 700, color: "white", marginBottom: 2 }}>
          {t("Book your Darshan", "दर्शन बुक करें", lang)}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 14 }}>
          {templeBookings.length} {t("official portals · all verified", "आधिकारिक पोर्टल · सभी सत्यापित", lang)}
        </div>
        {/* Search */}
        <div style={{ position: "relative" }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder={t("Search temple, city...", "मंदिर, शहर खोजें...", lang)}
            style={{ width: "100%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "10px 14px 10px 38px", fontSize: 13, color: "white", outline: "none" }}/>
        </div>
      </div>

      <div style={{ padding: "14px 16px 0" }}>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 10, overflowX: "auto" }}>
          {CATEGORIES.map(c => (
            <button key={c.v} onClick={() => setCategory(c.v)}
              style={{ padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", border: "none", flexShrink: 0,
                background: category === c.v ? C.maroon : C.ash,
                color: category === c.v ? "white" : C.stone,
                boxShadow: category === c.v ? "none" : `0 0 0 1px ${C.border}` }}>
              {t(c.en, c.hi, lang)}
            </button>
          ))}
        </div>

        {/* Service filter pills */}
        <div style={{ display: "flex", gap: 6, marginBottom: 14, overflowX: "auto" }}>
          {SERVICE_FILTERS.map(f => (
            <button key={f.v} onClick={() => setServiceFilter(f.v)}
              style={{ padding: "5px 12px", borderRadius: 99, fontSize: 11, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", border: "none", flexShrink: 0,
                background: serviceFilter === f.v ? C.saffron : C.cream,
                color: serviceFilter === f.v ? "white" : C.stone,
                boxShadow: serviceFilter === f.v ? "none" : `0 0 0 1px ${C.border}` }}>
              {t(f.en, f.hi, lang)}
            </button>
          ))}
        </div>

        <div style={{ fontSize: 12, color: C.stone, marginBottom: 14 }}>
          {filtered.length} {t("portals found", "पोर्टल मिले", lang)}
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map(b => (
            <div key={b.id} style={{ borderRadius: 20, overflow: "hidden", background: "white", border: `1px solid ${C.border}` }}>
              {/* Color top bar */}
              <div style={{ height: 3, background: `linear-gradient(90deg,${C.maroon},${C.saffron})` }}/>
              <div style={{ padding: 16 }}>

                {/* Temple name + badge */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: b.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                    {b.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, flexWrap: "wrap", marginBottom: 3 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>{t(b.name, b.nameHi, lang)}</div>
                      <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 99, fontWeight: 700, background: b.tagBg, color: b.tagColor, flexShrink: 0 }}>{t(b.tag, b.tagHi, lang)}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.stone }}>📍 {t(b.location, b.locationHi, lang)}</div>
                  </div>
                </div>

                {/* Services */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                  {(lang === "hi" ? b.servicesHi : b.services).map((s, i) => (
                    <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 99, background: C.saffronPale, color: C.maroon, border: "1px solid rgba(224,123,42,0.2)" }}>{s}</span>
                  ))}
                </div>

                {/* URL row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 10, background: C.cream, border: `1px solid ${C.border}`, marginBottom: 10 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.stone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  <span style={{ fontSize: 11, flex: 1, color: C.stone, fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {b.url.replace("https://", "")}
                  </span>
                  <button onClick={() => copy(b.id, b.url)}
                    style={{ fontSize: 11, fontWeight: 700, color: copied === b.id ? C.greenText : C.saffron, background: "none", border: "none", cursor: "pointer", flexShrink: 0 }}>
                    {copied === b.id ? t("✓ Copied", "✓ कॉपी", lang) : t("Copy", "कॉपी", lang)}
                  </button>
                </div>

                {/* Book button */}
                <a href={b.url} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px", borderRadius: 12, background: C.maroon, color: "white", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
                  {t("Book Now", "अभी बुक करें", lang)}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ marginTop: 20, marginBottom: 8, borderRadius: 16, padding: 14, background: C.saffronPale, border: "1px solid rgba(224,123,42,0.2)" }}>
          <div style={{ ...sectionLabel, color: C.saffron, marginBottom: 4 }}>ℹ️ {t("Important", "महत्वपूर्ण", lang)}</div>
          <div style={{ fontSize: 12, lineHeight: 1.7, color: C.stone }}>
            {t("All links redirect to official temple or government portals. Darshan does not handle payments — always book directly on the official site.",
               "सभी लिंक आधिकारिक मंदिर या सरकारी पोर्टल पर जाते हैं। दर्शन ऐप कोई भुगतान नहीं लेता।", lang)}
          </div>
        </div>

      </div>
    </div>
  );
}
