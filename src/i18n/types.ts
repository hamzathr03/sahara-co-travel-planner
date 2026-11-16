export type Lang = "fr" | "en" | "ar";

export const LANGS: Lang[] = ["fr", "en", "ar"];

export const LANG_META: Record<Lang, { label: string; short: string; dir: "ltr" | "rtl"; locale: string }> = {
  fr: { label: "Français", short: "FR", dir: "ltr", locale: "fr-FR" },
  en: { label: "English", short: "EN", dir: "ltr", locale: "en-GB" },
  // "ar-MA" keeps Western digits (0-9), as usually written in Morocco.
  ar: { label: "العربية", short: "عربي", dir: "rtl", locale: "ar-MA" },
};
