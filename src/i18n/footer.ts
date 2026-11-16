import type { Lang } from "./types";

const fr = {
  about: "Votre compagnon de voyage pour explorer le Maroc : villes, hébergements, activités et planification de budget, tout en un seul endroit.",
  popularCities: "Villes populaires",
  navigation: "Navigation",
  home: "Accueil",
  allCities: "Toutes les villes",
  tripPlanner: "Planificateur de voyage",
  budgetPlanner: "Planificateur de budget",
  contact: "Contact",
  contactForm: "Formulaire de contact",
  copyright: (year: number) => `© ${year} Sahara&Co Travel Planner — Fait avec ❤️ pour les voyageurs du Maroc.`,
};

type FooterTexts = typeof fr;

const en: FooterTexts = {
  about: "Your travel companion for exploring Morocco: cities, places to stay, activities and budget planning, all in one place.",
  popularCities: "Popular cities",
  navigation: "Navigation",
  home: "Home",
  allCities: "All cities",
  tripPlanner: "Trip planner",
  budgetPlanner: "Budget planner",
  contact: "Contact",
  contactForm: "Contact form",
  copyright: (year: number) => `© ${year} Sahara&Co Travel Planner — Made with ❤️ for travellers to Morocco.`,
};

const ar: FooterTexts = {
  about: "رفيقك في السفر لاستكشاف المغرب: المدن وأماكن الإقامة والأنشطة وتخطيط الميزانية، كل ذلك في مكان واحد.",
  popularCities: "المدن الشائعة",
  navigation: "التنقّل",
  home: "الرئيسية",
  allCities: "جميع المدن",
  tripPlanner: "مخطط الرحلة",
  budgetPlanner: "مخطط الميزانية",
  contact: "اتصل بنا",
  contactForm: "نموذج الاتصال",
  copyright: (year: number) => `© ${year} Sahara&Co Travel Planner — صُنع بحب لمسافري المغرب.`,
};

export const footer: Record<Lang, FooterTexts> = { fr, en, ar };
