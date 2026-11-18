import type { Activity, City } from "../data/morocco";
import type { Lang } from "./types";

// Activities keep their French name as identity (saved trips store it): translations are shown
// through extra "label" fields and never replace the original values the filters rely on.
export interface LocalizedActivity extends Activity {
  label: string;
  categoryLabel: string;
  durationLabel: string;
}

interface Texts {
  name: string;
  description: string;
}

const activitiesEn: Record<string, Record<string, Texts>> = {
  marrakech: {
    "Visite guidée de la médina & souks": { name: "Guided tour of the medina & souks", description: "Guided walk through the medina and souks with a licensed guide. Monument entrance fees are usually not included." },
    "Jardin Majorelle & musée berbère": { name: "Majorelle Garden & Berber Museum", description: "Garden created by the painter Jacques Majorelle and later restored by Yves Saint Laurent. Booking a ticket online is recommended." },
    "Excursion vallée de l'Ourika": { name: "Day trip to the Ourika Valley", description: "Berber villages and a walk to the Setti Fatma waterfalls. Lunch is included or not depending on the offer." },
    "Balade en montgolfière au lever du soleil": { name: "Hot-air balloon ride at sunrise", description: "Flight of about an hour over the Marrakech plain, with views of the Atlas. Breakfast and hotel transfer depending on the offer." },
    "Spectacle & dîner à Chez Ali": { name: "Show & dinner at Chez Ali", description: "Moroccan dinner and fantasia show in the palm grove. Hotel transfer depending on the offer." },
    "Hammam & spa traditionnel": { name: "Traditional hammam & spa", description: "Black-soap scrub and massage. Expect 10 to 45 MAD for a public hammam, 250 to 550 MAD for a hammam-spa with treatments." },
  },
  fes: {
    "Visite des tanneries Chouara": { name: "Chouara Tannery visit", description: "View of the dye vats from the terraces of the leather shops. Access is generally free, with a customary tip." },
    "Tour de la médina avec guide": { name: "Guided tour of the medina", description: "Guided walk through the medina: madrasas, souks, Nejjarine fountain. Monument entrance fees are extra (about 20 to 40 MAD each)." },
    "Cours de cuisine marocaine": { name: "Moroccan cooking class", description: "Market visit, preparing a tagine and salads with a local cook, then a shared meal." },
    "Excursion à Meknès & Volubilis": { name: "Day trip to Meknes & Volubilis", description: "Meknes, the imperial city, and the Roman ruins of Volubilis (UNESCO site). Site entrance fees are often extra." },
  },
  chefchaouen: {
    "Randonnée aux cascades d'Akchour": { name: "Hike to the Akchour waterfalls", description: "About 35 minutes by taxi from Chefchaouen, then about 2 hours of walking with a guide. The waterfalls' flow varies with the season." },
    "Visite guidée de la médina bleue": { name: "Guided tour of the blue medina", description: "Blue lanes, Outa el Hammam square and the Ras el-Maa spring with a local guide. Kasbah entrance is not included." },
    "Visite de la Kasbah & musée": { name: "Kasbah & museum visit", description: "Fortress founded in the 15th century on Outa el Hammam square, with a garden, a panoramic tower and an ethnographic museum. The foreigner's rate observed ranges from 60 to 100 MAD." },
    "Atelier tissage berbère": { name: "Berber weaving workshop", description: "Introduction to weaving on a traditional loom with local artisans." },
  },
  essaouira: {
    "Cours de surf": { name: "Surf lesson", description: "Group lesson of 2 hours, board and wetsuit provided. Expect 270 to 550 MAD depending on the school and group size." },
    "Balade en chameau sur la plage": { name: "Camel ride on the beach", description: "Camel ride along the beach, towards Diabat. Expect 150 to 250 MAD per hour, to negotiate before getting on." },
    "Visite des remparts & port": { name: "Ramparts & port visit", description: "The Skala de la Ville is free; the Skala du Port is paid (30 to 60 MAD according to recent sources). The fish market is open to all." },
    "Dégustation de fruits de mer au port": { name: "Seafood tasting at the port", description: "Grilled fish and seafood at the port stalls. A dish costs 80 to 150 MAD, to agree on before sitting down." },
    "Cours de kitesurf": { name: "Kitesurf lesson", description: "Group lesson of 2 hours (4 people maximum), equipment and insurance included. The wind is strong from April to October. A private lesson costs about 1,600 MAD." },
  },
  casablanca: {
    "Visite guidée de la Mosquée Hassan II": { name: "Guided visit of the Hassan II Mosque", description: "Official guided visit of about 45 minutes, compulsory for non-Muslims. The adult rate for foreigners is 130 to 140 MAD according to the official page." },
    "Balade sur la Corniche": { name: "Walk along the Corniche", description: "Seaside stroll, cafés and restaurants facing the Atlantic." },
    "Shopping au Morocco Mall": { name: "Shopping at Morocco Mall", description: "Africa's largest shopping mall, with a giant aquarium." },
  },
  rabat: {
    "Kasbah des Oudayas & musée des Bijoux": { name: "Kasbah of the Udayas & Jewellery Museum", description: "12th-century fortress facing the Atlantic. Access to the kasbah and the Andalusian gardens is free; the national Jewellery Museum is paid (about 60 MAD)." },
    "Tour Hassan & Mausolée Mohammed V": { name: "Hassan Tower & Mohammed V Mausoleum", description: "Emblematic monuments of the capital, free entry." },
    "Balade en barque sur le Bouregreg": { name: "Boat ride on the Bouregreg", description: "Ride in a traditional rowing boat on the river, 30 to 100 MAD depending on the duration, to negotiate on the spot. The simple Rabat–Salé crossing costs 2.5 MAD." },
    "Visite du musée Mohammed VI d'art moderne": { name: "Mohammed VI Museum of Modern Art", description: "Museum of modern and contemporary art, closed on Tuesdays. The entrance fee observed ranges from 20 to 60 MAD depending on the source and date." },
  },
  agadir: {
    "Journée plage & sports nautiques": { name: "Beach day & water sports", description: "Jet ski, banana boat and parasol included." },
    "Excursion vallée du Paradis": { name: "Trip to Paradise Valley", description: "Departure from the hotel, walking and swimming in the natural pools. Expect 140 to 230 MAD in a small group, plus about 30 MAD in fees paid on the spot. Lunch optional." },
    "Golf sur parcours 18 trous": { name: "18-hole golf round", description: "Green fee for 18 holes, from 595 to 850 MAD depending on the course (Golf du Soleil, Golf Les Dunes, Golf de l'Océan). Equipment rental extra." },
    "Visite de la Kasbah Agadir Oufella": { name: "Agadir Oufella Kasbah visit", description: "Panoramic view of the city and Agadir bay." },
  },
  merzouga: {
    "Trek en dromadaire au coucher du soleil": { name: "Camel trek at sunset", description: "Crossing the Erg Chebbi dunes at sunset." },
    "Nuit en bivouac avec dîner & musique": { name: "Overnight bivouac with dinner & music", description: "Camel ride to the camp, night in a tent, dinner and breakfast. Expect 700 to 1,100 MAD in a standard camp and 1,200 to 1,400 MAD in a luxury camp." },
    "Sandboard sur les dunes": { name: "Sandboarding on the dunes", description: "Sliding down the sand dunes, thrills guaranteed." },
    "Excursion 4x4 dans le désert": { name: "4x4 desert excursion", description: "Exploring oases, fossils and Berber villages by 4x4." },
    "Balade en quad dans les dunes": { name: "Quad ride in the dunes", description: "Guided ride of about 1 hour in the Erg Chebbi dunes, for about €45 per person." },
  },
};

const activitiesAr: Record<string, Record<string, Texts>> = {
  marrakech: {
    "Visite guidée de la médina & souks": { name: "جولة مع مرشد في المدينة العتيقة والأسواق", description: "جولة مشي مع مرشد مرخّص في المدينة العتيقة والأسواق. رسوم دخول المآثر غير مشمولة عادةً." },
    "Jardin Majorelle & musée berbère": { name: "حديقة ماجوريل والمتحف الأمازيغي", description: "حديقة أنشأها الرسام جاك ماجوريل ثم رمّمها إيف سان لوران. يُفضّل حجز التذكرة عبر الإنترنت." },
    "Excursion vallée de l'Ourika": { name: "رحلة إلى وادي أوريكا", description: "قرى أمازيغية ومشي نحو شلالات ستّي فاطمة. الغداء مشمول أو غير مشمول حسب العرض." },
    "Balade en montgolfière au lever du soleil": { name: "رحلة بالمنطاد عند شروق الشمس", description: "رحلة تدوم نحو ساعة فوق سهل مراكش مع إطلالة على جبال الأطلس. الفطور والنقل من الفندق حسب العرض." },
    "Spectacle & dîner à Chez Ali": { name: "عشاء وعرض في «شيز علي»", description: "عشاء مغربي وعرض الفانتازيا في النخيل. النقل من الفندق حسب العرض." },
    "Hammam & spa traditionnel": { name: "حمّام تقليدي وسبا", description: "تقشير بالصابون البلدي الأسود وتدليك. تتراوح الأسعار بين 10 و45 درهمًا للحمّام العمومي، وبين 250 و550 درهمًا لحمّام السبا مع العلاجات." },
  },
  fes: {
    "Visite des tanneries Chouara": { name: "زيارة مدابغ الشوارة", description: "إطلالة على أحواض الصباغة من شرفات محلات الجلد. الدخول عادةً مجاني مع بقشيش معتاد." },
    "Tour de la médina avec guide": { name: "جولة في المدينة العتيقة مع مرشد", description: "جولة مشي في المدينة العتيقة: المدارس والأسواق وسقاية النجارين. رسوم دخول المآثر إضافية (نحو 20 إلى 40 درهمًا لكل معلمة)." },
    "Cours de cuisine marocaine": { name: "درس في الطبخ المغربي", description: "زيارة السوق وتحضير طاجين وسلطات مع طباخ محلي، ثم وجبة مشتركة." },
    "Excursion à Meknès & Volubilis": { name: "رحلة إلى مكناس ووليلي", description: "مكناس المدينة الإمبراطورية، والآثار الرومانية لوليلي (موقع تابع لليونسكو). رسوم دخول المواقع غالبًا إضافية." },
  },
  chefchaouen: {
    "Randonnée aux cascades d'Akchour": { name: "رحلة مشي إلى شلالات أقشور", description: "نحو 35 دقيقة بسيارة الأجرة من شفشاون، ثم نحو ساعتين من المشي مع مرشد. يتغيّر منسوب الشلالات حسب الفصل." },
    "Visite guidée de la médina bleue": { name: "جولة مع مرشد في المدينة الزرقاء", description: "الأزقة الزرقاء وساحة وطاء الحمام وعين رأس الماء مع مرشد محلي. رسوم دخول القصبة غير مشمولة." },
    "Visite de la Kasbah & musée": { name: "زيارة القصبة والمتحف", description: "قلعة تأسست في القرن الخامس عشر في ساحة وطاء الحمام، وفيها حديقة وبرج للإطلالة ومتحف إثنوغرافي. يتراوح السعر المسجّل للأجانب بين 60 و100 درهم." },
    "Atelier tissage berbère": { name: "ورشة النسيج الأمازيغي", description: "تعلّم أولي للنسيج على النول التقليدي مع حرفيين محليين." },
  },
  essaouira: {
    "Cours de surf": { name: "درس في ركوب الأمواج", description: "درس جماعي مدته ساعتان، مع توفير اللوح وبدلة الغطس. تتراوح الأسعار بين 270 و550 درهمًا حسب المدرسة وحجم المجموعة." },
    "Balade en chameau sur la plage": { name: "جولة على الجمل في الشاطئ", description: "جولة على ظهر الجمل على طول الشاطئ نحو ديابات. يتراوح السعر بين 150 و250 درهمًا للساعة، ويُتفاوض عليه قبل الركوب." },
    "Visite des remparts & port": { name: "زيارة الأسوار والميناء", description: "سقالة المدينة مجانية، أما سقالة الميناء فبمقابل (من 30 إلى 60 درهمًا حسب المصادر الحديثة). سوق السمك مفتوح للجميع." },
    "Dégustation de fruits de mer au port": { name: "تذوّق المأكولات البحرية في الميناء", description: "سمك ومأكولات بحرية مشوية في أكشاك الميناء. يكلّف الطبق من 80 إلى 150 درهمًا، ويُتّفق على الثمن قبل الجلوس." },
    "Cours de kitesurf": { name: "درس في الكيت سورف", description: "درس جماعي مدته ساعتان (4 أشخاص كحد أقصى)، يشمل المعدات والتأمين. تشتدّ الرياح من أبريل إلى أكتوبر. ويكلّف الدرس الخاص نحو 1600 درهم." },
  },
  casablanca: {
    "Visite guidée de la Mosquée Hassan II": { name: "زيارة مع مرشد لمسجد الحسن الثاني", description: "زيارة رسمية مع مرشد مدتها نحو 45 دقيقة، وهي إلزامية لغير المسلمين. سعر البالغين الأجانب بين 130 و140 درهمًا حسب الصفحة الرسمية." },
    "Balade sur la Corniche": { name: "نزهة على الكورنيش", description: "نزهة على شاطئ البحر مع مقاهٍ ومطاعم تطل على المحيط الأطلسي." },
    "Shopping au Morocco Mall": { name: "التسوق في موروكو مول", description: "أكبر مركز تجاري في إفريقيا، وفيه حوض أسماك ضخم." },
  },
  rabat: {
    "Kasbah des Oudayas & musée des Bijoux": { name: "قصبة الأوداية ومتحف الحلي", description: "قلعة من القرن الثاني عشر تطل على المحيط الأطلسي. الدخول إلى القصبة والحدائق الأندلسية مجاني، أما المتحف الوطني للحلي فبمقابل (نحو 60 درهمًا)." },
    "Tour Hassan & Mausolée Mohammed V": { name: "صومعة حسان وضريح محمد الخامس", description: "معلمتان رمزيتان للعاصمة، والدخول مجاني." },
    "Balade en barque sur le Bouregreg": { name: "جولة بالقارب على أبي رقراق", description: "جولة بقارب تقليدي على النهر، من 30 إلى 100 درهم حسب المدة، ويُتفاوض عليها في عين المكان. أما العبور البسيط بين الرباط وسلا فيكلّف 2.5 درهم." },
    "Visite du musée Mohammed VI d'art moderne": { name: "زيارة متحف محمد السادس للفن الحديث", description: "متحف للفن الحديث والمعاصر، مغلق يوم الثلاثاء. يتراوح سعر الدخول المسجّل بين 20 و60 درهمًا حسب المصدر والتاريخ." },
  },
  agadir: {
    "Journée plage & sports nautiques": { name: "يوم على الشاطئ ورياضات مائية", description: "يشمل الجت سكي والموز المسحوب والمظلة." },
    "Excursion vallée du Paradis": { name: "رحلة إلى وادي الجنة", description: "الانطلاق من الفندق، مشي وسباحة في الأحواض الطبيعية. تتراوح الأسعار بين 140 و230 درهمًا في مجموعة صغيرة، إضافةً إلى نحو 30 درهمًا رسومًا تُؤدّى في عين المكان. الغداء اختياري." },
    "Golf sur parcours 18 trous": { name: "جولة غولف من 18 حفرة", description: "رسوم اللعب على 18 حفرة، من 595 إلى 850 درهمًا حسب الملعب (غولف دو سوليل، غولف ليه دون، غولف المحيط). كراء المعدات إضافي." },
    "Visite de la Kasbah Agadir Oufella": { name: "زيارة قصبة أكادير أوفلا", description: "إطلالة بانورامية على المدينة وخليج أكادير." },
  },
  merzouga: {
    "Trek en dromadaire au coucher du soleil": { name: "جولة على الجمال عند الغروب", description: "عبور كثبان عرق الشبي عند غروب الشمس." },
    "Nuit en bivouac avec dîner & musique": { name: "ليلة في مخيم مع عشاء وموسيقى", description: "الوصول إلى المخيم على ظهر الجمل، وليلة تحت الخيمة مع العشاء والفطور. تتراوح الأسعار بين 700 و1100 درهم في المخيم العادي، وبين 1200 و1400 درهم في المخيم الفاخر." },
    "Sandboard sur les dunes": { name: "التزلج على الرمال في الكثبان", description: "انزلاق على كثبان الرمال، ومتعة مضمونة." },
    "Excursion 4x4 dans le désert": { name: "جولة بسيارة رباعية الدفع في الصحراء", description: "اكتشاف الواحات والحفريات والقرى الأمازيغية بسيارة رباعية الدفع." },
    "Balade en quad dans les dunes": { name: "جولة بالكواد في الكثبان", description: "جولة مع مرشد مدتها نحو ساعة في كثبان عرق الشبي، مقابل نحو 45 أورو للشخص." },
  },
};

const categories: Record<"en" | "ar", Record<string, string>> = {
  en: { Culture: "Culture", Nature: "Nature", Aventure: "Adventure", Divertissement: "Entertainment", "Bien-être": "Wellness", Gastronomie: "Food", Histoire: "History", Artisanat: "Crafts", Sport: "Sport", Détente: "Relaxation", Shopping: "Shopping", Art: "Art", Expérience: "Experience" },
  ar: { Culture: "ثقافة", Nature: "طبيعة", Aventure: "مغامرة", Divertissement: "ترفيه", "Bien-être": "عافية", Gastronomie: "مأكولات", Histoire: "تاريخ", Artisanat: "حِرف تقليدية", Sport: "رياضة", Détente: "استرخاء", Shopping: "تسوق", Art: "فن", Expérience: "تجربة" },
};

const durationWords: Record<"en" | "ar", Record<string, string>> = {
  en: { Journée: "Full day", "Demi-journée": "Half day", Soirée: "Evening", Nuit: "Overnight" },
  ar: { Journée: "يوم كامل", "Demi-journée": "نصف يوم", Soirée: "أمسية", Nuit: "ليلة" },
};

// "1h30" -> "1h30" (EN) / "1 س 30 د" (AR); "4h à 6h" -> "4h to 6h"; "Journée" -> "Full day"...
export function translateDuration(duration: string, lang: Lang): string {
  if (lang === "fr") return duration;
  const word = durationWords[lang][duration];
  if (word) return word;
  if (lang === "en") return duration.replace(" à ", " to ");
  return duration
    .replace(/(\d+)h(\d+)?/g, (_, h: string, m?: string) => `${h} س${m ? ` ${m} د` : ""}`)
    .replace(/(\d+) min/g, "$1 د")
    .replace(" à ", " إلى ");
}

export function localizeActivity(cityId: string, activity: Activity, lang: Lang): LocalizedActivity {
  if (lang === "fr") {
    return { ...activity, label: activity.name, categoryLabel: activity.category, durationLabel: activity.duration };
  }
  const tx = (lang === "en" ? activitiesEn : activitiesAr)[cityId]?.[activity.name];
  return {
    ...activity,
    description: tx?.description ?? activity.description,
    label: tx?.name ?? activity.name,
    categoryLabel: categories[lang][activity.category] ?? activity.category,
    durationLabel: translateDuration(activity.duration, lang),
  };
}

// Accommodation types: [type label, base description]. The price sentence is built from the data.
const hotelsEn: Record<string, [string, string]> = {
  "marrakech.economique": ["Simple riad or hotel", "Simple room in the medina or the new town, basic amenities."],
  "marrakech.confort": ["Charming riad", "Restored riad around a patio, with a terrace. Breakfast is often included."],
  "marrakech.luxe": ["Luxury riad or palace", "High-end riads and palaces with spa and pool. The grandest palaces go well beyond this range."],
  "fes.economique": ["Guesthouse or simple hotel", "Family guesthouse or small hotel, in or near the medina."],
  "fes.confort": ["Charming riad", "Restored riad with patio and terrace, in the Fez medina."],
  "fes.luxe": ["Luxury riad", "Riad or palace turned into a high-end hotel, with spa."],
  "chefchaouen.economique": ["Simple guesthouse", "Simple room in the blue medina, the most affordable accommodation in the country."],
  "chefchaouen.confort": ["Charming riad", "Comfortable riad or guesthouse, with a terrace and views over the town."],
  "chefchaouen.luxe": ["High-end boutique hotel", "Charming hotel with high-end services. Luxury options are limited."],
  "essaouira.economique": ["Simple riad or hotel", "Simple room in the medina or near the beach."],
  "essaouira.confort": ["Charming riad", "Restored riad with a terrace, in the Essaouira medina."],
  "essaouira.luxe": ["Luxury hotel or riad", "High-end hotel facing the ocean or luxury riad with spa."],
  "casablanca.economique": ["Simple hotel", "Budget-category hotel, downtown or near the station."],
  "casablanca.confort": ["4-star hotel", "Upper-category hotel downtown or on the seafront."],
  "casablanca.luxe": ["5-star hotel", "Large 5-star hotel with spa, restaurants and full services."],
  "rabat.economique": ["Guesthouse or simple hotel", "Simple room, in the medina or the new town."],
  "rabat.confort": ["Charming riad or hotel", "Restored riad or comfortable hotel, near the medina and the kasbah."],
  "rabat.luxe": ["5-star hotel", "Large high-end hotel with spa and restaurants."],
  "agadir.economique": ["Simple hotel", "Budget-category hotel, a few streets from the beach."],
  "agadir.confort": ["4-star hotel", "Seafront hotel with a pool."],
  "agadir.luxe": ["5-star resort", "High-end seafront resort, with spa and several restaurants."],
  "merzouga.economique": ["Hostel or homestay room", "Simple room in a village near the Erg Chebbi dunes."],
  "merzouga.confort": ["Kasbah-hotel or charming camp", "Kasbah-hotel with a pool or comfortable camp at the foot of the dunes."],
  "merzouga.luxe": ["Luxury tented camp", "Furnished tent with a private bathroom in the heart of the dunes. Dinner is often included."],
};

const hotelsAr: Record<string, [string, string]> = {
  "marrakech.economique": ["رياض أو فندق بسيط", "غرفة بسيطة في المدينة العتيقة أو المدينة الجديدة بتجهيزات أساسية."],
  "marrakech.confort": ["رياض ساحر", "رياض مرمَّم حول صحن داخلي مع شرفة. غالبًا ما يكون الفطور مشمولًا."],
  "marrakech.luxe": ["رياض فاخر أو قصر", "رياض وقصور راقية مع سبا ومسبح. أفخم القصور تتجاوز هذه الفئة بكثير."],
  "fes.economique": ["دار ضيافة أو فندق بسيط", "دار ضيافة عائلية أو فندق صغير داخل المدينة العتيقة أو بالقرب منها."],
  "fes.confort": ["رياض ساحر", "رياض مرمَّم بصحن وشرفة في المدينة العتيقة بفاس."],
  "fes.luxe": ["رياض فاخر", "رياض أو قصر حُوِّل إلى فندق راقٍ مع سبا."],
  "chefchaouen.economique": ["دار ضيافة بسيطة", "غرفة بسيطة في المدينة الزرقاء، وهي أرخص أماكن الإقامة في البلاد."],
  "chefchaouen.confort": ["رياض ساحر", "رياض أو دار ضيافة مريحة مع شرفة وإطلالة على المدينة."],
  "chefchaouen.luxe": ["فندق بوتيك راقٍ", "فندق ساحر بخدمات راقية. العروض الفاخرة هنا محدودة."],
  "essaouira.economique": ["رياض أو فندق بسيط", "غرفة بسيطة في المدينة العتيقة أو قرب الشاطئ."],
  "essaouira.confort": ["رياض ساحر", "رياض مرمَّم مع شرفة في المدينة العتيقة بالصويرة."],
  "essaouira.luxe": ["فندق أو رياض فاخر", "فندق راقٍ مطلّ على المحيط أو رياض فاخر مع سبا."],
  "casablanca.economique": ["فندق بسيط", "فندق من الفئة الاقتصادية وسط المدينة أو قرب المحطة."],
  "casablanca.confort": ["فندق 4 نجوم", "فندق من فئة عليا وسط المدينة أو على الواجهة البحرية."],
  "casablanca.luxe": ["فندق 5 نجوم", "فندق كبير من 5 نجوم مع سبا ومطاعم وخدمات كاملة."],
  "rabat.economique": ["دار ضيافة أو فندق بسيط", "غرفة بسيطة في المدينة العتيقة أو المدينة الجديدة."],
  "rabat.confort": ["رياض أو فندق ساحر", "رياض مرمَّم أو فندق مريح قرب المدينة العتيقة والقصبة."],
  "rabat.luxe": ["فندق 5 نجوم", "فندق كبير وراقٍ مع سبا ومطاعم."],
  "agadir.economique": ["فندق بسيط", "فندق من الفئة الاقتصادية على بُعد بضعة شوارع من الشاطئ."],
  "agadir.confort": ["فندق 4 نجوم", "فندق على شاطئ البحر مع مسبح."],
  "agadir.luxe": ["منتجع 5 نجوم", "منتجع راقٍ على شاطئ البحر مع سبا وعدة مطاعم."],
  "merzouga.economique": ["نُزُل أو غرفة عند الساكنة", "غرفة بسيطة في قرية قرب كثبان عرق الشبي."],
  "merzouga.confort": ["فندق قصبة أو مخيم ساحر", "فندق قصبة مع مسبح أو مخيم مريح عند سفح الكثبان."],
  "merzouga.luxe": ["مخيم فاخر تحت الخيام", "خيمة مجهّزة بحمّام خاص في قلب الكثبان. غالبًا ما يكون العشاء مشمولًا."],
};

export function localizeHotels(city: City, lang: Lang): City["hotels"] {
  if (lang === "fr") return city.hotels;
  const table = lang === "en" ? hotelsEn : hotelsAr;
  return city.hotels.map((h) => {
    const tx = table[`${city.id}.${h.tier}`];
    if (!tx) return h;
    const [lo, hi] = h.priceRange;
    const range =
      lang === "en"
        ? `Expect about ${lo} to ${hi} MAD per night for a double room.`
        : `تتراوح الأسعار تقريبًا بين ${lo} و${hi} درهمًا لليلة في غرفة مزدوجة.`;
    return { ...h, name: tx[0], description: `${tx[1]} ${range}` };
  });
}
