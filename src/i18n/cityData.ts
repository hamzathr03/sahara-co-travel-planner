import type { City } from "../data/morocco";
import type { Lang } from "./types";
import { localizeActivity, localizeHotels, type LocalizedActivity } from "./activityData";

export type { LocalizedActivity };

// Translated city texts. The French texts stay in data/morocco.ts (the source).
interface CityTexts {
  name: string;
  region: string;
  tagline: string;
  description: string;
  highlights: string[];
  bestTime: string;
}

const en: Record<string, CityTexts> = {
  marrakech: {
    name: "Marrakech",
    region: "Marrakech-Safi",
    tagline: "The red city, beating heart of Morocco",
    description:
      "Marrakech enchants with its UNESCO-listed medina, Jemaa el-Fna square, colourful souks and lavish gardens. Between traditional riads and trendy rooftops, the red city blends tradition and modernity.",
    highlights: ["Jemaa el-Fna", "Majorelle Garden", "Medina & Souks", "Bahia Palace"],
    bestTime: "March – May / Sept – Nov",
  },
  fes: {
    name: "Fez",
    region: "Fez-Meknes",
    tagline: "The spiritual and cultural capital",
    description:
      "Fez is home to the world's largest car-free medina. Between ancient tanneries, centuries-old madrasas and leather craftsmanship, it is an authentic dive into medieval Morocco.",
    highlights: ["Chouara Tannery", "Bou Inania Madrasa", "Al Quaraouiyine University", "Bab Boujloud"],
    bestTime: "April – June / Sept – Oct",
  },
  chefchaouen: {
    name: "Chefchaouen",
    region: "Tangier-Tetouan-Al Hoceima",
    tagline: "The blue pearl of the Rif",
    description:
      "Nestled in the Rif Mountains, Chefchaouen charms with its blue-washed lanes, peaceful atmosphere and spectacular mountain scenery, ideal for photography and relaxation.",
    highlights: ["Blue Medina", "Outa el Hammam Square", "Akchour Waterfalls", "Kasbah Museum"],
    bestTime: "April – June / Sept – Oct",
  },
  essaouira: {
    name: "Essaouira",
    region: "Marrakech-Safi",
    tagline: "The windy city on the Atlantic",
    description:
      "Formerly Mogador, Essaouira charms with its ramparts facing the ocean, its lively fishing port and its bohemian atmosphere. A world-class surf and kitesurf spot, ideal for seafood lovers.",
    highlights: ["Ramparts & Skala", "Fishing Port", "Essaouira Beach", "UNESCO Medina"],
    bestTime: "May – Sept",
  },
  casablanca: {
    name: "Casablanca",
    region: "Casablanca-Settat",
    tagline: "The modern economic metropolis",
    description:
      "Casablanca, Morocco's largest city, impresses with the majestic Hassan II Mosque, its Art Deco architecture and its lively nightlife. A perfect blend of tradition and urban modernity.",
    highlights: ["Hassan II Mosque", "Aïn Diab Corniche", "Habous Quarter", "Downtown Art Deco"],
    bestTime: "All year round",
  },
  rabat: {
    name: "Rabat",
    region: "Rabat-Salé-Kénitra",
    tagline: "The royal capital, between history and elegance",
    description:
      "Morocco's administrative capital, Rabat charms with the Kasbah of the Udayas, the Hassan Tower and its wide avenues. A calm, green city rich in history on the shores of the ocean.",
    highlights: ["Kasbah of the Udayas", "Hassan Tower", "Mohammed V Mausoleum", "Rabat Medina"],
    bestTime: "March – June / Sept – Nov",
  },
  agadir: {
    name: "Agadir",
    region: "Souss-Massa",
    tagline: "Sun, beach and relaxation all year round",
    description:
      "Agadir is the families' favourite seaside resort, with its large sandy beach, mild climate all year round and plenty of water sports and golf.",
    highlights: ["Agadir Beach", "Agadir Oufella Kasbah", "Agadir Marina", "Paradise Valley"],
    bestTime: "All year round",
  },
  merzouga: {
    name: "Merzouga (Sahara)",
    region: "Drâa-Tafilalet",
    tagline: "In the heart of the Erg Chebbi dunes",
    description:
      "Merzouga is the gateway to the Moroccan Sahara. Between the golden dunes of Erg Chebbi, bivouacs under the stars and camel rides, it is an unforgettable adventure in the heart of the desert.",
    highlights: ["Erg Chebbi Dunes", "Desert Bivouac", "Sunrise by Camel", "Khamlia Oasis"],
    bestTime: "Oct – April",
  },
};

const ar: Record<string, CityTexts> = {
  marrakech: {
    name: "مراكش",
    region: "مراكش-آسفي",
    tagline: "المدينة الحمراء، قلب المغرب النابض",
    description:
      "تسحر مراكش زوّارها بمدينتها العتيقة المصنّفة ضمن التراث العالمي لليونسكو، وساحة جامع الفنا، وأسواقها الملوّنة وحدائقها الفاخرة. وبين الرياض التقليدية والمطاعم العصرية على الأسطح، تمزج المدينة الحمراء بين الأصالة والحداثة.",
    highlights: ["ساحة جامع الفنا", "حديقة ماجوريل", "المدينة العتيقة والأسواق", "قصر الباهية"],
    bestTime: "مارس - ماي / شتنبر - نونبر",
  },
  fes: {
    name: "فاس",
    region: "فاس-مكناس",
    tagline: "العاصمة الروحية والثقافية",
    description:
      "تضم فاس أكبر مدينة عتيقة للمشاة في العالم. وبين المدابغ العريقة والمدارس العلمية التي يعود تاريخها إلى قرون وحرفة الجلد، تأخذك في رحلة أصيلة إلى المغرب في العصور الوسطى.",
    highlights: ["مدابغ الشوارة", "المدرسة البوعنانية", "جامعة القرويين", "باب بوجلود"],
    bestTime: "أبريل - يونيو / شتنبر - أكتوبر",
  },
  chefchaouen: {
    name: "شفشاون",
    region: "طنجة-تطوان-الحسيمة",
    tagline: "لؤلؤة الريف الزرقاء",
    description:
      "تقع شفشاون وسط جبال الريف، وتسحر الزائر بأزقتها الزرقاء وأجوائها الهادئة ومناظرها الجبلية الخلابة، وهي مثالية للتصوير وللاسترخاء.",
    highlights: ["المدينة الزرقاء", "ساحة وطاء الحمام", "شلالات أقشور", "متحف القصبة"],
    bestTime: "أبريل - يونيو / شتنبر - أكتوبر",
  },
  essaouira: {
    name: "الصويرة",
    region: "مراكش-آسفي",
    tagline: "مدينة الرياح على المحيط الأطلسي",
    description:
      "الصويرة، موكادور القديمة، تأسر الزوار بأسوارها المطلّة على المحيط وميناء الصيد النابض بالحياة وأجوائها البوهيمية. وهي وجهة عالمية لركوب الأمواج والكيت سورف، ومثالية لمحبي المأكولات البحرية.",
    highlights: ["الأسوار والسقالة", "ميناء الصيد", "شاطئ الصويرة", "المدينة العتيقة (اليونسكو)"],
    bestTime: "ماي - شتنبر",
  },
  casablanca: {
    name: "الدار البيضاء",
    region: "الدار البيضاء-سطات",
    tagline: "العاصمة الاقتصادية العصرية",
    description:
      "تبهر الدار البيضاء، أكبر مدن المغرب، زوّارها بمسجد الحسن الثاني المهيب وهندستها المعمارية على طراز الآرت ديكو وحياتها الليلية الصاخبة. مزيج مثالي بين الأصالة والحداثة الحضرية.",
    highlights: ["مسجد الحسن الثاني", "كورنيش عين الذئاب", "حي الأحباس", "طراز الآرت ديكو في وسط المدينة"],
    bestTime: "طوال السنة",
  },
  rabat: {
    name: "الرباط",
    region: "الرباط-سلا-القنيطرة",
    tagline: "العاصمة الملكية بين التاريخ والأناقة",
    description:
      "الرباط، العاصمة الإدارية للمغرب، تأسر الزوار بقصبة الأوداية وصومعة حسان وشوارعها الواسعة. مدينة هادئة وخضراء وغنية بالتاريخ على ضفاف المحيط.",
    highlights: ["قصبة الأوداية", "صومعة حسان", "ضريح محمد الخامس", "مدينة الرباط العتيقة"],
    bestTime: "مارس - يونيو / شتنبر - نونبر",
  },
  agadir: {
    name: "أكادير",
    region: "سوس-ماسة",
    tagline: "شمس وشاطئ واسترخاء طوال السنة",
    description:
      "أكادير هي المنتجع الشاطئي المفضّل للعائلات بشاطئها الرملي الواسع ومناخها المعتدل طوال السنة وأنشطتها المائية وملاعب الغولف الكثيرة.",
    highlights: ["شاطئ أكادير", "قصبة أكادير أوفلا", "مارينا أكادير", "وادي الجنة"],
    bestTime: "طوال السنة",
  },
  merzouga: {
    name: "مرزوكة (الصحراء)",
    region: "درعة-تافيلالت",
    tagline: "في قلب كثبان عرق الشبي",
    description:
      "مرزوكة هي بوابة الصحراء المغربية. بين كثبان عرق الشبي الذهبية والمبيت في المخيمات تحت النجوم وجولات الجِمال، تعيش مغامرة لا تُنسى في قلب الصحراء.",
    highlights: ["كثبان عرق الشبي", "مخيم صحراوي", "شروق الشمس على ظهر الجمل", "واحة خاملية"],
    bestTime: "أكتوبر - أبريل",
  },
};

// A city whose texts are in the chosen language. Activities carry extra translated fields
// (label, categoryLabel, durationLabel) next to the original French ones.
export interface LocalizedCity extends Omit<City, "activities"> {
  activities: LocalizedActivity[];
}

export function localizeCity(city: City, lang: Lang): LocalizedCity {
  const texts = lang === "fr" ? undefined : (lang === "en" ? en : ar)[city.id];
  return {
    ...city,
    ...texts,
    activities: city.activities.map((a) => localizeActivity(city.id, a, lang)),
    hotels: localizeHotels(city, lang),
  };
}
