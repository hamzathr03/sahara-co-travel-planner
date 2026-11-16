import type { Lang } from "./types";

const fr = {
  brandTagline: "Travel Planner Morocco",
  home: "Accueil",
  cities: "Villes",
  activities: "Activités",
  map: "Carte",
  trip: "Mon voyage",
  trips: "Mes voyages",
  budget: "Budget",
  contact: "Contact",
  account: "Mon compte",
  login: "Connexion",
  cta: "Planifier mon voyage",
  menu: "Menu",
  language: "Langue",
};

type NavTexts = typeof fr;

const en: NavTexts = {
  brandTagline: "Travel Planner Morocco",
  home: "Home",
  cities: "Cities",
  activities: "Activities",
  map: "Map",
  trip: "My trip",
  trips: "My trips",
  budget: "Budget",
  contact: "Contact",
  account: "My account",
  login: "Log in",
  cta: "Plan my trip",
  menu: "Menu",
  language: "Language",
};

const ar: NavTexts = {
  brandTagline: "مخطط رحلات المغرب",
  home: "الرئيسية",
  cities: "المدن",
  activities: "الأنشطة",
  map: "الخريطة",
  trip: "رحلتي",
  trips: "رحلاتي",
  budget: "الميزانية",
  contact: "اتصل بنا",
  account: "حسابي",
  login: "تسجيل الدخول",
  cta: "خطّط لرحلتك",
  menu: "القائمة",
  language: "اللغة",
};

export const nav: Record<Lang, NavTexts> = { fr, en, ar };
