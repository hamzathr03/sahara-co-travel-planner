import type { Lang } from "./types";

const fr = { budgetFrom: "Budget / jour dès", currency: "MAD", discover: "Découvrir" };
type CityCardTexts = typeof fr;
const en: CityCardTexts = { budgetFrom: "Budget / day from", currency: "MAD", discover: "Discover" };
const ar: CityCardTexts = { budgetFrom: "الميزانية / اليوم ابتداءً من", currency: "درهم", discover: "اكتشف" };

export const cityCard: Record<Lang, CityCardTexts> = { fr, en, ar };
