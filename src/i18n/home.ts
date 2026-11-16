import type { Lang } from "./types";

const fr = {
  heroAlt: "Paysage du Maroc",
  badge: "✨ Votre aventure marocaine commence ici",
  h1Before: "Planifiez votre voyage au ",
  h1Highlight: "Maroc",
  h1After: ", étape par étape",
  intro:
    "Villes incontournables, hébergements pour tous les budgets, activités authentiques et estimation de votre budget — tout ce qu'il faut pour organiser le séjour marocain parfait.",
  exploreCities: "Explorer les villes",
  estimateBudget: "Estimer mon budget",
  statCities: "Villes couvertes",
  statActivities: "Activités proposées",
  statComfort: "Niveaux de confort",
  statRegions: "Régions traversées",
  howEyebrow: "Comment ça marche",
  howTitle: "Un voyage organisé en 4 étapes simples",
  steps: [
    { icon: "🗺️", title: "Choisissez vos villes", text: "Explorez Marrakech, Fès, Chefchaouen, le Sahara et bien d'autres destinations marocaines." },
    { icon: "🏨", title: "Comparez les hébergements", text: "Du riad économique au palace de luxe, trouvez l'hébergement adapté à votre style de voyage." },
    { icon: "🎒", title: "Choisissez vos activités", text: "Désert, surf, souks, randonnées... construisez un séjour sur-mesure selon vos envies." },
    { icon: "💰", title: "Calculez votre budget", text: "Obtenez une estimation détaillée du coût total de votre voyage en quelques clics." },
  ],
  destEyebrow: "Destinations",
  destTitle: "Villes incontournables du Maroc",
  seeAll: "Voir toutes les villes",
  budgetEyebrow: "Planificateur de budget",
  budgetTitle: "Combien coûte un voyage au Maroc ? Estimez-le en 2 minutes.",
  budgetText:
    "Construisez votre itinéraire, indiquez le nombre de voyageurs et votre niveau de confort : obtenez une estimation détaillée (hébergement, nourriture, activités, transport).",
  budgetButton: "Estimer mon budget 💰",
};

type HomeTexts = typeof fr;

const en: HomeTexts = {
  heroAlt: "Moroccan landscape",
  badge: "✨ Your Moroccan adventure starts here",
  h1Before: "Plan your trip to ",
  h1Highlight: "Morocco",
  h1After: ", step by step",
  intro:
    "Must-see cities, places to stay for every budget, authentic activities and a budget estimate — everything you need to organise the perfect trip to Morocco.",
  exploreCities: "Explore the cities",
  estimateBudget: "Estimate my budget",
  statCities: "Cities covered",
  statActivities: "Activities",
  statComfort: "Comfort levels",
  statRegions: "Regions visited",
  howEyebrow: "How it works",
  howTitle: "A trip organised in 4 simple steps",
  steps: [
    { icon: "🗺️", title: "Choose your cities", text: "Explore Marrakech, Fez, Chefchaouen, the Sahara and many other Moroccan destinations." },
    { icon: "🏨", title: "Compare places to stay", text: "From budget riads to luxury palaces, find the accommodation that suits your travel style." },
    { icon: "🎒", title: "Pick your activities", text: "Desert, surf, souks, hikes... build a trip tailored to what you love." },
    { icon: "💰", title: "Work out your budget", text: "Get a detailed estimate of the total cost of your trip in a few clicks." },
  ],
  destEyebrow: "Destinations",
  destTitle: "Morocco's must-see cities",
  seeAll: "See all cities",
  budgetEyebrow: "Budget planner",
  budgetTitle: "How much does a trip to Morocco cost? Estimate it in 2 minutes.",
  budgetText:
    "Build your itinerary, enter the number of travellers and your comfort level: get a detailed estimate (accommodation, food, activities, transport).",
  budgetButton: "Estimate my budget 💰",
};

const ar: HomeTexts = {
  heroAlt: "منظر طبيعي مغربي",
  badge: "✨ مغامرتك المغربية تبدأ من هنا",
  h1Before: "خطّط لرحلتك إلى ",
  h1Highlight: "المغرب",
  h1After: "، خطوة بخطوة",
  intro:
    "مدن لا تُفوَّت، وأماكن إقامة لكل الميزانيات، وأنشطة أصيلة، وتقدير لميزانيتك — كل ما تحتاجه لتنظيم الرحلة المغربية المثالية.",
  exploreCities: "اكتشف المدن",
  estimateBudget: "قدّر ميزانيتي",
  statCities: "مدن مغطاة",
  statActivities: "أنشطة",
  statComfort: "مستويات الراحة",
  statRegions: "جهات تمرّ بها الرحلة",
  howEyebrow: "كيف يعمل",
  howTitle: "رحلة منظّمة في 4 خطوات بسيطة",
  steps: [
    { icon: "🗺️", title: "اختر مدنك", text: "اكتشف مراكش وفاس وشفشاون والصحراء ووجهات مغربية أخرى كثيرة." },
    { icon: "🏨", title: "قارن أماكن الإقامة", text: "من الرياض الاقتصادية إلى القصور الفاخرة، اعثر على الإقامة التي تناسب أسلوب سفرك." },
    { icon: "🎒", title: "اختر أنشطتك", text: "الصحراء وركوب الأمواج والأسواق والمشي في الجبال... ابنِ رحلة على مقاسك." },
    { icon: "💰", title: "احسب ميزانيتك", text: "احصل على تقدير مفصّل للتكلفة الإجمالية لرحلتك ببضع نقرات." },
  ],
  destEyebrow: "الوجهات",
  destTitle: "أهم مدن المغرب",
  seeAll: "عرض جميع المدن",
  budgetEyebrow: "مخطط الميزانية",
  budgetTitle: "كم تكلّف رحلة إلى المغرب؟ قدّرها في دقيقتين.",
  budgetText:
    "ابنِ مسار رحلتك، وحدّد عدد المسافرين ومستوى الراحة: ستحصل على تقدير مفصّل (الإقامة والطعام والأنشطة والنقل).",
  budgetButton: "قدّر ميزانيتي 💰",
};

export const home: Record<Lang, HomeTexts> = { fr, en, ar };
