import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { LANGS, LANG_META, type Lang } from "../i18n/types";
import { getTexts, type Texts } from "../i18n";
import { localizeCity } from "../i18n/cityData";
import type { City } from "../data/morocco";

const STORAGE_KEY = "sahara-lang";

function detectLanguage(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (LANGS as string[]).includes(saved)) return saved as Lang;
  } catch {
    // storage unavailable: fall back to the browser language
  }
  const browser = navigator.language.slice(0, 2).toLowerCase();
  return (LANGS as string[]).includes(browser) ? (browser as Lang) : "fr";
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Texts;
  dir: "ltr" | "rtl";
  locale: string;
  formatNumber: (n: number) => string;
  arrow: string; // points "forward" in the reading direction
  localCity: (city: City) => City; // city with its texts in the current language
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLanguage);
  const { dir, locale } = LANG_META[lang];

  // Keep <html lang> and <html dir> in sync (right-to-left layout for Arabic).
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  function setLang(next: Lang) {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // storage unavailable: the choice just won't persist
    }
  }

  const numberFormat = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        t: getTexts(lang),
        dir,
        locale,
        formatNumber: (n) => numberFormat.format(Math.round(n)),
        arrow: dir === "rtl" ? "←" : "→",
        localCity: (city) => localizeCity(city, lang),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
