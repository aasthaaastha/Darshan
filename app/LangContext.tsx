"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Lang = "en" | "hi";
const LangContext = createContext<{ lang: Lang; toggle: () => void }>({ lang: "en", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const toggle = () => setLang((l) => (l === "en" ? "hi" : "en"));
  return <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function t(en: string, hi: string, lang: Lang) {
  return lang === "hi" ? hi : en;
}
