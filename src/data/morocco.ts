export type HotelTier = "economique" | "confort" | "luxe";

export interface Hotel {
  name: string;
  tier: HotelTier;
  pricePerNight: number; // MAD, per room/night (double)
  rating: number; // out of 5
  description: string;
}

export interface Activity {
  name: string;
  price: number; // MAD per person
  duration: string;
  category: string;
  description: string;
}

export interface City {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  bestTime: string;
  avgDailyBudget: { economique: number; confort: number; luxe: number };
  hotels: Hotel[];
  activities: Activity[];
}

export const tierLabels: Record<HotelTier, string> = {
  economique: "Économique",
  confort: "Confort",
  luxe: "Luxe",
};

export const cities: City[] = [
  {
    id: "marrakech",
    name: "Marrakech",
    region: "Marrakech-Safi",
    tagline: "La ville rouge, cœur battant du Maroc",
    description:
      "Marrakech envoûte avec sa médina classée à l'UNESCO, la place Jemaa el-Fna, ses souks colorés et ses jardins somptueux. Entre riads traditionnels et rooftops branchés, la ville rouge mélange tradition et modernité.",
    image:
      "https://images.pexels.com/photos/25489943/pexels-photo-25489943.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Jemaa el-Fna", "Jardin Majorelle", "Médina & Souks", "Palais Bahia"],
    bestTime: "Mars - Mai / Sept - Nov",
    avgDailyBudget: { economique: 350, confort: 700, luxe: 1800 },
    hotels: [
      {
        name: "Riad Dar Zellij",
        tier: "economique",
        pricePerNight: 280,
        rating: 4.2,
        description: "Riad authentique au cœur de la médina, patio traditionnel et petit-déjeuner berbère.",
      },
      {
        name: "Riad Atlas Confort",
        tier: "confort",
        pricePerNight: 650,
        rating: 4.5,
        description: "Riad rénové avec piscine, terrasse panoramique et hammam privé.",
      },
      {
        name: "Palace Majorelle Luxe",
        tier: "luxe",
        pricePerNight: 2200,
        rating: 4.9,
        description: "Palace 5 étoiles, spa primé, suites avec jardins privés et service de majordome.",
      },
    ],
    activities: [
      { name: "Visite guidée de la médina & souks", price: 150, duration: "3h", category: "Culture", description: "Découverte des ruelles, artisans et souks traditionnels avec guide local." },
      { name: "Excursion vallée de l'Ourika", price: 300, duration: "Journée", category: "Nature", description: "Randonnée dans l'Atlas et visite des cascades de Setti Fatma." },
      { name: "Balade en montgolfière au lever du soleil", price: 1300, duration: "4h", category: "Aventure", description: "Survol de la palmeraie et des montagnes de l'Atlas." },
      { name: "Spectacle & dîner à Chez Ali", price: 450, duration: "Soirée", category: "Divertissement", description: "Fantasia équestre, danses et dîner traditionnel sous tente caïdale." },
      { name: "Hammam & spa traditionnel", price: 250, duration: "1h30", category: "Bien-être", description: "Gommage au savon noir et massage à l'huile d'argan." },
    ],
  },
  {
    id: "fes",
    name: "Fès",
    region: "Fès-Meknès",
    tagline: "La capitale spirituelle et culturelle",
    description:
      "Fès abrite la plus grande médina piétonne du monde. Entre tanneries ancestrales, médersas millénaires et artisanat du cuir, c'est une plongée authentique dans le Maroc médiéval.",
    image:
      "https://images.pexels.com/photos/38112164/pexels-photo-38112164.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Tanneries Chouara", "Médersa Bou Inania", "Université Al Quaraouiyine", "Bab Boujloud"],
    bestTime: "Avril - Juin / Sept - Oct",
    avgDailyBudget: { economique: 300, confort: 600, luxe: 1500 },
    hotels: [
      { name: "Dar Fes Authentique", tier: "economique", pricePerNight: 250, rating: 4.1, description: "Maison d'hôtes familiale dans la médina, ambiance chaleureuse." },
      { name: "Riad Medina Confort", tier: "confort", pricePerNight: 550, rating: 4.4, description: "Riad restauré avec patio fleuri et restaurant gastronomique." },
      { name: "Palais Fassi Luxe", tier: "luxe", pricePerNight: 1900, rating: 4.8, description: "Ancien palais royal transformé en hôtel de luxe avec spa." },
    ],
    activities: [
      { name: "Visite des tanneries Chouara", price: 100, duration: "1h30", category: "Culture", description: "Observation du tannage traditionnel du cuir depuis les terrasses." },
      { name: "Tour de la médina avec guide", price: 180, duration: "4h", category: "Culture", description: "Exploration des médersas, souks et monuments historiques." },
      { name: "Cours de cuisine marocaine", price: 350, duration: "4h", category: "Gastronomie", description: "Préparation d'un tajine et de pâtisseries avec un chef local." },
      { name: "Excursion à Meknès & Volubilis", price: 400, duration: "Journée", category: "Histoire", description: "Visite de la ville impériale et des ruines romaines de Volubilis." },
    ],
  },
  {
    id: "chefchaouen",
    name: "Chefchaouen",
    region: "Tanger-Tétouan-Al Hoceïma",
    tagline: "La perle bleue du Rif",
    description:
      "Nichée dans les montagnes du Rif, Chefchaouen séduit par ses ruelles bleutées, son ambiance paisible et ses paysages montagneux spectaculaires, idéale pour la photographie et la détente.",
    image:
      "https://images.pexels.com/photos/25070537/pexels-photo-25070537.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Médina bleue", "Place Outa el Hammam", "Cascades d'Akchour", "Kasbah Museum"],
    bestTime: "Avril - Juin / Sept - Oct",
    avgDailyBudget: { economique: 250, confort: 500, luxe: 1200 },
    hotels: [
      { name: "Dar Azul Hostel", tier: "economique", pricePerNight: 200, rating: 4.0, description: "Guesthouse colorée avec vue sur les montagnes, ambiance backpacker." },
      { name: "Riad Cherifa Confort", tier: "confort", pricePerNight: 480, rating: 4.5, description: "Riad bleu typique avec terrasse panoramique sur la médina." },
      { name: "Lodge Rif Luxe", tier: "luxe", pricePerNight: 1400, rating: 4.7, description: "Lodge de charme en périphérie avec piscine et vue sur les montagnes du Rif." },
    ],
    activities: [
      { name: "Randonnée aux cascades d'Akchour", price: 200, duration: "Journée", category: "Nature", description: "Randonnée guidée jusqu'au pont de Dieu et aux cascades." },
      { name: "Balade photo dans la médina bleue", price: 120, duration: "2h", category: "Culture", description: "Parcours des plus belles ruelles bleues avec guide photographe." },
      { name: "Visite de la Kasbah & musée", price: 80, duration: "1h", category: "Histoire", description: "Découverte de la forteresse du 15e siècle et de son musée ethnographique." },
      { name: "Atelier tissage berbère", price: 150, duration: "2h", category: "Artisanat", description: "Initiation au tissage traditionnel avec des artisanes locales." },
    ],
  },
  {
    id: "essaouira",
    name: "Essaouira",
    region: "Marrakech-Safi",
    tagline: "La cité des vents sur l'Atlantique",
    description:
      "Ancienne Mogador, Essaouira charme par ses remparts face à l'océan, son port de pêcheurs animé et son ambiance bohème. Spot mondial de surf et kitesurf, idéale pour les amateurs de fruits de mer.",
    image:
      "https://images.pexels.com/photos/37442059/pexels-photo-37442059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Remparts & Skala", "Port de pêche", "Plage d'Essaouira", "Médina UNESCO"],
    bestTime: "Mai - Sept",
    avgDailyBudget: { economique: 300, confort: 600, luxe: 1400 },
    hotels: [
      { name: "Dar Mogador", tier: "economique", pricePerNight: 260, rating: 4.1, description: "Maison d'hôtes simple proche des remparts, accueil chaleureux." },
      { name: "Riad Atlantique Confort", tier: "confort", pricePerNight: 580, rating: 4.4, description: "Riad avec vue mer, terrasse et petit-déjeuner inclus." },
      { name: "Villa Ocean Luxe", tier: "luxe", pricePerNight: 1700, rating: 4.8, description: "Villa de luxe en bord de plage avec piscine chauffée et spa." },
    ],
    activities: [
      { name: "Cours de surf ou kitesurf", price: 350, duration: "2h", category: "Sport", description: "Initiation encadrée par des moniteurs professionnels." },
      { name: "Balade en chameau sur la plage", price: 250, duration: "1h30", category: "Aventure", description: "Promenade à dos de chameau au coucher du soleil." },
      { name: "Visite des remparts & port", price: 90, duration: "2h", category: "Culture", description: "Découverte de la Skala de la ville et du port de pêche animé." },
      { name: "Dégustation de fruits de mer au port", price: 180, duration: "1h", category: "Gastronomie", description: "Poisson grillé fraîchement pêché, choisi directement sur l'étal." },
    ],
  },
  {
    id: "casablanca",
    name: "Casablanca",
    region: "Casablanca-Settat",
    tagline: "La métropole économique moderne",
    description:
      "Casablanca, plus grande ville du Maroc, impressionne par la majestueuse mosquée Hassan II, son architecture Art déco et sa vie nocturne trépidante. Un parfait mélange entre tradition et modernité urbaine.",
    image:
      "https://images.pexels.com/photos/6587429/pexels-photo-6587429.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Mosquée Hassan II", "Corniche d'Aïn Diab", "Quartier Habous", "Art déco du centre-ville"],
    bestTime: "Toute l'année",
    avgDailyBudget: { economique: 350, confort: 750, luxe: 2000 },
    hotels: [
      { name: "Hôtel Centre Ville", tier: "economique", pricePerNight: 300, rating: 4.0, description: "Hôtel simple et bien situé près du centre-ville historique." },
      { name: "Hôtel Corniche Confort", tier: "confort", pricePerNight: 700, rating: 4.4, description: "Hôtel moderne avec piscine sur la corniche d'Aïn Diab." },
      { name: "Four Seasons Style Luxe", tier: "luxe", pricePerNight: 2500, rating: 4.9, description: "Hôtel 5 étoiles vue mer avec spa, rooftop et restaurants gastronomiques." },
    ],
    activities: [
      { name: "Visite guidée de la Mosquée Hassan II", price: 150, duration: "1h30", category: "Culture", description: "L'une des plus grandes mosquées du monde, avec minaret de 210m." },
      { name: "Balade sur la Corniche", price: 0, duration: "2h", category: "Détente", description: "Promenade en bord de mer, cafés et restaurants face à l'Atlantique." },
      { name: "Shopping au Morocco Mall", price: 0, duration: "3h", category: "Shopping", description: "Plus grand centre commercial d'Afrique avec aquarium géant." },
      { name: "Sortie vie nocturne & rooftop", price: 300, duration: "Soirée", category: "Divertissement", description: "Bars rooftop et clubs branchés du quartier Gauthier." },
    ],
  },
  {
    id: "rabat",
    name: "Rabat",
    region: "Rabat-Salé-Kénitra",
    tagline: "La capitale royale, entre histoire et élégance",
    description:
      "Capitale administrative du Maroc, Rabat séduit par la Kasbah des Oudayas, la tour Hassan et ses larges avenues. Une ville paisible, verte et chargée d'histoire au bord de l'océan.",
    image:
      "https://images.pexels.com/photos/37229546/pexels-photo-37229546.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Kasbah des Oudayas", "Tour Hassan", "Mausolée Mohammed V", "Médina de Rabat"],
    bestTime: "Mars - Juin / Sept - Nov",
    avgDailyBudget: { economique: 300, confort: 600, luxe: 1600 },
    hotels: [
      { name: "Dar Rabat Simple", tier: "economique", pricePerNight: 260, rating: 4.0, description: "Maison d'hôtes conviviale proche de la médina." },
      { name: "Riad Oudayas Confort", tier: "confort", pricePerNight: 600, rating: 4.5, description: "Riad élégant près de la Kasbah avec vue sur l'estuaire du Bouregreg." },
      { name: "Sofitel Style Luxe", tier: "luxe", pricePerNight: 2000, rating: 4.8, description: "Hôtel 5 étoiles au cœur de la capitale avec spa et piscine extérieure." },
    ],
    activities: [
      { name: "Visite de la Kasbah des Oudayas", price: 60, duration: "2h", category: "Culture", description: "Jardins andalous, ruelles bleues et vue sur l'océan." },
      { name: "Tour Hassan & Mausolée Mohammed V", price: 0, duration: "1h", category: "Histoire", description: "Monuments emblématiques de la capitale, entrée libre." },
      { name: "Balade en bateau sur le Bouregreg", price: 120, duration: "1h", category: "Détente", description: "Traversée entre Rabat et Salé en bateau traditionnel." },
      { name: "Visite du musée Mohammed VI d'art moderne", price: 60, duration: "1h30", category: "Art", description: "Collection d'art marocain moderne et contemporain." },
    ],
  },
  {
    id: "agadir",
    name: "Agadir",
    region: "Souss-Massa",
    tagline: "Soleil, plage et détente toute l'année",
    description:
      "Agadir est la station balnéaire préférée des familles avec sa grande plage de sable fin, son climat doux toute l'année et ses nombreuses activités nautiques et golfiques.",
    image:
      "https://images.pexels.com/photos/35871028/pexels-photo-35871028.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Plage d'Agadir", "Kasbah Agadir Oufella", "Marina d'Agadir", "Vallée du Paradis"],
    bestTime: "Toute l'année",
    avgDailyBudget: { economique: 300, confort: 650, luxe: 1700 },
    hotels: [
      { name: "Résidence Soleil", tier: "economique", pricePerNight: 280, rating: 4.0, description: "Résidence simple à 5 minutes de la plage." },
      { name: "Hôtel Marina Confort", tier: "confort", pricePerNight: 620, rating: 4.4, description: "Hôtel avec piscine, proche de la marina et de la plage." },
      { name: "Resort All-Inclusive Luxe", tier: "luxe", pricePerNight: 2100, rating: 4.7, description: "Resort 5 étoiles tout compris avec spa et accès plage privée." },
    ],
    activities: [
      { name: "Journée plage & sports nautiques", price: 200, duration: "Journée", category: "Sport", description: "Jet-ski, banane tractée et parasol inclus." },
      { name: "Excursion vallée du Paradis", price: 280, duration: "Demi-journée", category: "Nature", description: "Randonnée et baignade dans les piscines naturelles." },
      { name: "Golf sur parcours 18 trous", price: 500, duration: "Demi-journée", category: "Sport", description: "Parcours de golf avec vue sur l'océan Atlantique." },
      { name: "Visite de la Kasbah Agadir Oufella", price: 50, duration: "1h30", category: "Histoire", description: "Vue panoramique sur la ville et la baie d'Agadir." },
    ],
  },
  {
    id: "merzouga",
    name: "Merzouga (Sahara)",
    region: "Drâa-Tafilalet",
    tagline: "Au cœur des dunes de l'Erg Chebbi",
    description:
      "Merzouga est la porte d'entrée du désert du Sahara marocain. Entre dunes dorées de l'Erg Chebbi, bivouacs sous les étoiles et balades à dos de dromadaire, une aventure inoubliable au cœur du désert.",
    image:
      "https://images.pexels.com/photos/12214734/pexels-photo-12214734.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=800&w=1200",
    highlights: ["Dunes de l'Erg Chebbi", "Bivouac désertique", "Lever de soleil en dromadaire", "Oasis de Khamlia"],
    bestTime: "Oct - Avril",
    avgDailyBudget: { economique: 350, confort: 700, luxe: 1900 },
    hotels: [
      { name: "Camp Désert Simple", tier: "economique", pricePerNight: 300, rating: 4.2, description: "Bivouac simple avec tentes berbères partagées et dîner traditionnel." },
      { name: "Camp de Luxe Confort", tier: "confort", pricePerNight: 750, rating: 4.6, description: "Tentes confortables avec salle de bain privée au milieu des dunes." },
      { name: "Désert Palace Luxe", tier: "luxe", pricePerNight: 2300, rating: 4.9, description: "Camp de luxe avec tentes privatives climatisées, piscine et spa dans le désert." },
    ],
    activities: [
      { name: "Trek en dromadaire au coucher du soleil", price: 250, duration: "2h", category: "Aventure", description: "Traversée des dunes de l'Erg Chebbi au coucher du soleil." },
      { name: "Nuit en bivouac avec dîner & musique", price: 400, duration: "Nuit", category: "Expérience", description: "Dîner traditionnel, musique gnaoua autour du feu et nuit sous les étoiles." },
      { name: "Sandboard sur les dunes", price: 150, duration: "2h", category: "Sport", description: "Glisse sur les dunes de sable, sensations garanties." },
      { name: "Excursion 4x4 dans le désert", price: 450, duration: "Demi-journée", category: "Aventure", description: "Exploration des oasis, fossiles et villages berbères en 4x4." },
    ],
  },
];

export function getCityById(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}
