import type { Lang } from "./types";
import { nav } from "./nav";
import { footer } from "./footer";
import { notFound } from "./notFound";

// Each section lives in its own file with the three languages side by side.
// Adding a section = one import and one line below.
export function getTexts(lang: Lang) {
  return {
    nav: nav[lang],
    footer: footer[lang],
    notFound: notFound[lang],
  };
}

export type Texts = ReturnType<typeof getTexts>;
