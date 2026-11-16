import type { Lang } from "./types";
import { nav } from "./nav";
import { footer } from "./footer";
import { notFound } from "./notFound";
import { home } from "./home";
import { citiesPage } from "./citiesPage";
import { cityCard } from "./cityCard";

// Each section lives in its own file with the three languages side by side.
// Adding a section = one import and one line below.
export function getTexts(lang: Lang) {
  return {
    nav: nav[lang],
    footer: footer[lang],
    notFound: notFound[lang],
    home: home[lang],
    citiesPage: citiesPage[lang],
    cityCard: cityCard[lang],
  };
}

export type Texts = ReturnType<typeof getTexts>;
