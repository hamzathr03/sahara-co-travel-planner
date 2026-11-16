import type { Lang } from "./types";

const fr = {
  eyebrow: "Destinations",
  title: "Toutes les villes touristiques du Maroc",
  intro:
    "Des médinas impériales aux dunes du Sahara, en passant par les plages atlantiques : trouvez la destination qui correspond à votre prochain voyage.",
  placeholder: "Rechercher une ville ou un site (ex: désert, médina...)",
  allRegions: "Toutes",
  count: (n: number) => `${n} destination${n > 1 ? "s" : ""} trouvée${n > 1 ? "s" : ""}`,
  empty: "Aucune ville ne correspond à votre recherche.",
};

type CitiesPageTexts = typeof fr;

const en: CitiesPageTexts = {
  eyebrow: "Destinations",
  title: "All the tourist cities of Morocco",
  intro:
    "From imperial medinas to the dunes of the Sahara, by way of Atlantic beaches: find the destination that fits your next trip.",
  placeholder: "Search for a city or a site (e.g. desert, medina...)",
  allRegions: "All regions",
  count: (n: number) => `${n} destination${n === 1 ? "" : "s"} found`,
  empty: "No city matches your search.",
};

const ar: CitiesPageTexts = {
  eyebrow: "الوجهات",
  title: "جميع المدن السياحية في المغرب",
  intro:
    "من المدن العتيقة الإمبراطورية إلى كثبان الصحراء، مرورًا بشواطئ المحيط الأطلسي: اعثر على الوجهة التي تناسب رحلتك القادمة.",
  placeholder: "ابحث عن مدينة أو موقع (مثال: صحراء، مدينة عتيقة...)",
  allRegions: "جميع الجهات",
  count: (n: number) => `عدد الوجهات: ${n}`,
  empty: "لا توجد مدينة تطابق بحثك.",
};

export const citiesPage: Record<Lang, CitiesPageTexts> = { fr, en, ar };
