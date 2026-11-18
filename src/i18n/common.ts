import type { Lang } from "./types";

const fr = {
  currency: "MAD",
  free: "Gratuit",
  perPerson: "/ pers.",
  all: "Toutes",
  tiers: { economique: "Économique", confort: "Confort", luxe: "Luxe" },
};

type CommonTexts = typeof fr;

const en: CommonTexts = {
  currency: "MAD",
  free: "Free",
  perPerson: "/ person",
  all: "All",
  tiers: { economique: "Budget", confort: "Comfort", luxe: "Luxury" },
};

const ar: CommonTexts = {
  currency: "درهم",
  free: "مجاني",
  perPerson: "/ للشخص",
  all: "الكل",
  tiers: { economique: "اقتصادي", confort: "مريح", luxe: "فاخر" },
};

export const common: Record<Lang, CommonTexts> = { fr, en, ar };
