import type { Lang } from "./types";

const fr = {
  back: "Retour aux villes",
  about: (name: string) => `À propos de ${name}`,
  practicalInfo: "Infos pratiques",
  bestTime: "Meilleure période",
  budgetEco: "Budget économique / jour",
  budgetComfort: "Budget confort / jour",
  budgetLuxe: "Budget luxe / jour",
  budgetNote: "Estimation par personne pour deux voyageurs dans une chambre double (hébergement, repas et transport local).",
  addToTrip: "Ajouter à mon voyage 🧭",
  seeInTrip: "Voir dans mon voyage",
  sleepTitle: "Où dormir 🏨",
  hotelsNote:
    "Types d'hébergement et fourchettes de prix indicatives, d'après des guides de voyage. Les tarifs réels dépendent de la saison et de la disponibilité.",
  doubleRoom: "Chambre double, par nuit",
  range: (lo: string, hi: string) => `Fourchette : ${lo} à ${hi} MAD`,
  activitiesTitle: "Activités populaires 🎒",
  others: "Autres destinations à découvrir",
};

type CityDetailTexts = typeof fr;

const en: CityDetailTexts = {
  back: "Back to cities",
  about: (name: string) => `About ${name}`,
  practicalInfo: "Practical information",
  bestTime: "Best time to visit",
  budgetEco: "Budget / day (budget)",
  budgetComfort: "Budget / day (comfort)",
  budgetLuxe: "Budget / day (luxury)",
  budgetNote: "Estimate per person for two travellers sharing a double room (accommodation, meals and local transport).",
  addToTrip: "Add to my trip 🧭",
  seeInTrip: "See in my trip",
  sleepTitle: "Where to stay 🏨",
  hotelsNote:
    "Types of accommodation and indicative price ranges, based on travel guides. Actual rates depend on the season and availability.",
  doubleRoom: "Double room, per night",
  range: (lo: string, hi: string) => `Range: ${lo} to ${hi} MAD`,
  activitiesTitle: "Popular activities 🎒",
  others: "More destinations to discover",
};

const ar: CityDetailTexts = {
  back: "العودة إلى المدن",
  about: (name: string) => `نبذة عن ${name}`,
  practicalInfo: "معلومات عملية",
  bestTime: "أفضل وقت للزيارة",
  budgetEco: "الميزانية اليومية (اقتصادية)",
  budgetComfort: "الميزانية اليومية (مريحة)",
  budgetLuxe: "الميزانية اليومية (فاخرة)",
  budgetNote: "تقدير للشخص الواحد لمسافرَين يتقاسمان غرفة مزدوجة (الإقامة والوجبات والنقل المحلي).",
  addToTrip: "أضف إلى رحلتي 🧭",
  seeInTrip: "عرض في رحلتي",
  sleepTitle: "أين تقيم 🏨",
  hotelsNote:
    "أنواع الإقامة ونطاقات أسعار تقريبية، مأخوذة من أدلة سفر. الأسعار الفعلية تتغيّر حسب الفصل والتوفّر.",
  doubleRoom: "غرفة مزدوجة، لليلة",
  range: (lo: string, hi: string) => `النطاق: من ${lo} إلى ${hi} درهم`,
  activitiesTitle: "أنشطة شائعة 🎒",
  others: "وجهات أخرى للاكتشاف",
};

export const cityDetail: Record<Lang, CityDetailTexts> = { fr, en, ar };
