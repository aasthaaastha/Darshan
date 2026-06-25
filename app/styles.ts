export const C = {
  maroon:      "#2C0A0A",
  maroonMid:   "#5C1A1A",
  maroonLight: "#8B3A3A",
  saffron:     "#E07B2A",
  saffronPale: "#FDF3E7",
  gold:        "#B8892A",
  goldLight:   "#D4AE5A",
  goldPale:    "#FAF0D7",
  cream:       "#F7F2EA",
  ash:         "#FDFAF6",
  ink:         "#1C1410",
  stone:       "#7A6E65",
  mist:        "#E5DED6",
  border:      "#EDE6DC",
  greenBg:     "#E1F5EE",
  greenText:   "#085041",
  greenBorder: "#5DCAA5",
  amberBg:     "#FAEEDA",
  amberText:   "#633806",
  redBg:       "#FEE2E2",
  redText:     "#DC2626",
} as const;

export const F = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'Inter', -apple-system, sans-serif",
} as const;

// Reusable style fragments
export const card = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: C.ash,
  border: `1px solid ${C.border}`,
  borderRadius: 16,
  padding: "14px 16px",
  ...extra,
});

export const heroGrad: React.CSSProperties = {
  background: `linear-gradient(135deg, ${C.maroon} 0%, #5c1a0a 60%, #8b3a10 100%)`,
  boxShadow: "0 8px 32px rgba(44,10,10,0.28)",
  borderRadius: 24,
  padding: 20,
  position: "relative",
  overflow: "hidden",
};

export const sectionLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.16em",
  color: C.stone,
  textTransform: "uppercase",
  marginBottom: 12,
};

export const pill = (active: boolean): React.CSSProperties => ({
  padding: "6px 14px",
  borderRadius: 99,
  fontSize: 12,
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
  border: "none",
  background: active ? C.maroon : C.ash,
  color: active ? "white" : C.stone,
  boxShadow: active ? "none" : `0 0 0 1px ${C.border}`,
  transition: "all 0.15s",
});

export const btnPrimary: React.CSSProperties = {
  width: "100%",
  padding: "13px",
  borderRadius: 14,
  background: C.maroon,
  color: "white",
  fontSize: 14,
  fontWeight: 700,
  cursor: "pointer",
  border: "none",
  transition: "opacity 0.15s",
};

export const btnGhost: React.CSSProperties = {
  width: "100%",
  padding: "13px",
  borderRadius: 14,
  border: `1.5px dashed ${C.mist}`,
  background: C.saffronPale,
  color: C.saffron,
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
};

export const inputStyle: React.CSSProperties = {
  width: "100%",
  background: C.ash,
  border: `1.5px solid ${C.border}`,
  borderRadius: 12,
  padding: "11px 14px",
  fontSize: 13,
  color: C.ink,
  outline: "none",
};
