export type HotelTier = "economique" | "confort" | "luxe";

export interface Hotel {
  name: string;
  tier: HotelTier;
  pricePerNight: number; // MAD, typical price per night for a double room (used by the budget)
  priceRange: [number, number]; // MAD, observed range per night (double room)
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
    hotels: [
      { name: "Riad ou hôtel simple", tier: "economique", pricePerNight: 350, priceRange: [250, 480], description: "Chambre simple dans la médina ou en ville nouvelle, équipement de base. Comptez environ 250 à 480 MAD la nuit pour une chambre double." },
      { name: "Riad de charme", tier: "confort", pricePerNight: 850, priceRange: [600, 1150], description: "Riad restauré autour d'un patio, avec terrasse. Le petit-déjeuner est souvent inclus. Comptez environ 600 à 1150 MAD la nuit pour une chambre double." },
      { name: "Riad de luxe ou palace", tier: "luxe", pricePerNight: 2800, priceRange: [1900, 3800], description: "Riads haut de gamme et palaces avec spa et piscine. Les plus grands palaces dépassent largement la fourchette. Comptez environ 1900 à 3800 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Visite guidée de la médina & souks", price: 250, duration: "3h", category: "Culture", description: "Marche guidée dans la médina et les souks avec un guide agréé. Les entrées des monuments ne sont généralement pas incluses." },
      { name: "Jardin Majorelle & musée berbère", price: 150, duration: "1h30", category: "Culture", description: "Jardin créé par le peintre Jacques Majorelle puis restauré par Yves Saint Laurent. Billet à réserver en ligne de préférence." },
      { name: "Excursion vallée de l'Ourika", price: 250, duration: "Journée", category: "Nature", description: "Villages berbères et marche vers les cascades de Setti Fatma. Le déjeuner est inclus ou non selon l'offre." },
      { name: "Balade en montgolfière au lever du soleil", price: 1900, duration: "4h à 6h", category: "Aventure", description: "Vol d'environ une heure au-dessus de la plaine de Marrakech, avec vue sur l'Atlas. Petit-déjeuner et transfert depuis l'hôtel selon l'offre." },
      { name: "Spectacle & dîner à Chez Ali", price: 700, duration: "Soirée", category: "Divertissement", description: "Dîner marocain et spectacle de fantasia dans la palmeraie. Transfert depuis l'hôtel selon l'offre." },
      { name: "Hammam & spa traditionnel", price: 250, duration: "1h30", category: "Bien-être", description: "Gommage au savon noir et massage. Comptez 10 à 45 MAD pour un hammam public, 250 à 550 MAD pour un hammam-spa avec soins." },
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
    hotels: [
      { name: "Maison d'hôtes ou hôtel simple", tier: "economique", pricePerNight: 400, priceRange: [250, 570], description: "Maison d'hôtes familiale ou petit hôtel, dans la médina ou à proximité. Comptez environ 250 à 570 MAD la nuit pour une chambre double." },
      { name: "Riad de charme", tier: "confort", pricePerNight: 750, priceRange: [600, 1200], description: "Riad restauré avec patio et terrasse, dans la médina de Fès. Comptez environ 600 à 1200 MAD la nuit pour une chambre double." },
      { name: "Riad de luxe", tier: "luxe", pricePerNight: 2500, priceRange: [1900, 3800], description: "Riad ou palais transformé en hôtel haut de gamme, avec spa. Comptez environ 1900 à 3800 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Visite des tanneries Chouara", price: 0, duration: "1h", category: "Culture", description: "Vue sur les cuves de teinture depuis les terrasses des boutiques de cuir. L'accès est généralement gratuit, avec un pourboire d'usage." },
      { name: "Tour de la médina avec guide", price: 180, duration: "4h", category: "Culture", description: "Marche guidée dans la médina : médersas, souks, fontaine Nejjarine. Les entrées des monuments sont en supplément (environ 20 à 40 MAD chacune)." },
      { name: "Cours de cuisine marocaine", price: 500, duration: "3h à 4h", category: "Gastronomie", description: "Visite du marché, préparation d'un tajine et de salades avec un cuisinier local, puis repas partagé." },
      { name: "Excursion à Meknès & Volubilis", price: 400, duration: "Journée", category: "Histoire", description: "Meknès, ville impériale, et ruines romaines de Volubilis (site UNESCO). Les entrées des sites sont souvent en supplément." },
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
    hotels: [
      { name: "Maison d'hôtes simple", tier: "economique", pricePerNight: 200, priceRange: [115, 300], description: "Chambre simple dans la médina bleue, l'hébergement le plus abordable du pays. Comptez environ 115 à 300 MAD la nuit pour une chambre double." },
      { name: "Riad de charme", tier: "confort", pricePerNight: 600, priceRange: [475, 760], description: "Riad ou maison d'hôtes confortable, avec terrasse et vue sur la ville. Comptez environ 475 à 760 MAD la nuit pour une chambre double." },
      { name: "Boutique-hôtel haut de gamme", tier: "luxe", pricePerNight: 1400, priceRange: [950, 1900], description: "Hôtel de charme avec services haut de gamme. L'offre de luxe est limitée. Comptez environ 950 à 1900 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Randonnée aux cascades d'Akchour", price: 300, duration: "Journée", category: "Nature", description: "Trajet en taxi d'environ 35 min depuis Chefchaouen, puis environ 2 h de marche avec un guide. Le débit des cascades varie selon la saison." },
      { name: "Visite guidée de la médina bleue", price: 400, duration: "2h30", category: "Culture", description: "Ruelles bleues, place Outa el Hammam et source Ras el-Maa avec un guide local. L'entrée de la Kasbah n'est pas incluse." },
      { name: "Visite de la Kasbah & musée", price: 80, duration: "1h", category: "Histoire", description: "Forteresse fondée au 15e siècle sur la place Outa el Hammam, avec jardin, tour panoramique et musée ethnographique. Le tarif étranger observé va de 60 à 100 MAD." },
      { name: "Atelier tissage berbère", price: 450, duration: "1h30", category: "Artisanat", description: "Initiation au tissage sur métier traditionnel avec des artisans locaux." },
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
    hotels: [
      { name: "Riad ou hôtel simple", tier: "economique", pricePerNight: 300, priceRange: [190, 475], description: "Chambre simple dans la médina ou près de la plage. Comptez environ 190 à 475 MAD la nuit pour une chambre double." },
      { name: "Riad de charme", tier: "confort", pricePerNight: 600, priceRange: [475, 760], description: "Riad restauré avec terrasse, dans la médina d'Essaouira. Comptez environ 475 à 760 MAD la nuit pour une chambre double." },
      { name: "Hôtel ou riad de luxe", tier: "luxe", pricePerNight: 1500, priceRange: [950, 1900], description: "Hôtel haut de gamme face à l'océan ou riad de luxe avec spa. Comptez environ 950 à 1900 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Cours de surf", price: 350, duration: "2h", category: "Sport", description: "Cours collectif de 2 heures, planche et combinaison fournies. Comptez 270 à 550 MAD selon l'école et la taille du groupe." },
      { name: "Balade en chameau sur la plage", price: 220, duration: "1h", category: "Aventure", description: "Balade à dos de chameau le long de la plage, vers Diabat. Comptez 150 à 250 MAD l'heure, à négocier avant de monter." },
      { name: "Visite des remparts & port", price: 50, duration: "2h", category: "Culture", description: "La Skala de la Ville est gratuite, la Skala du Port est payante (30 à 60 MAD selon les sources récentes). Le marché aux poissons est en accès libre." },
      { name: "Dégustation de fruits de mer au port", price: 120, duration: "1h", category: "Gastronomie", description: "Poisson et fruits de mer grillés sur les étals du port. Un plat coûte de 80 à 150 MAD, à convenir avant de s'asseoir." },
      { name: "Cours de kitesurf", price: 820, duration: "2h", category: "Sport", description: "Cours collectif de 2 heures (4 personnes maximum), équipement et assurance inclus. Le vent est fort d'avril à octobre. Un cours privé coûte environ 1 600 MAD." },
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
    hotels: [
      { name: "Hôtel simple", tier: "economique", pricePerNight: 420, priceRange: [285, 570], description: "Hôtel de catégorie économique, en centre-ville ou près de la gare. Comptez environ 285 à 570 MAD la nuit pour une chambre double." },
      { name: "Hôtel 4 étoiles", tier: "confort", pricePerNight: 950, priceRange: [760, 1140], description: "Hôtel de catégorie supérieure en centre-ville ou en bord de mer. Comptez environ 760 à 1140 MAD la nuit pour une chambre double." },
      { name: "Hôtel 5 étoiles", tier: "luxe", pricePerNight: 2100, priceRange: [1425, 2850], description: "Grand hôtel 5 étoiles avec spa, restaurants et services complets. Comptez environ 1425 à 2850 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Visite guidée de la Mosquée Hassan II", price: 140, duration: "1h", category: "Culture", description: "Visite guidée officielle, obligatoire pour les non-musulmans, d'environ 45 minutes. Le tarif adulte étranger est de 130 à 140 MAD selon la page officielle." },
      { name: "Balade sur la Corniche", price: 0, duration: "2h", category: "Détente", description: "Promenade en bord de mer, cafés et restaurants face à l'Atlantique." },
      { name: "Shopping au Morocco Mall", price: 0, duration: "3h", category: "Shopping", description: "Plus grand centre commercial d'Afrique avec aquarium géant." },
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
    hotels: [
      { name: "Maison d'hôtes ou hôtel simple", tier: "economique", pricePerNight: 300, priceRange: [190, 475], description: "Chambre simple, en médina ou en ville nouvelle. Comptez environ 190 à 475 MAD la nuit pour une chambre double." },
      { name: "Riad ou hôtel de charme", tier: "confort", pricePerNight: 600, priceRange: [475, 760], description: "Riad restauré ou hôtel confortable, près de la médina et de la kasbah. Comptez environ 475 à 760 MAD la nuit pour une chambre double." },
      { name: "Hôtel 5 étoiles", tier: "luxe", pricePerNight: 1500, priceRange: [950, 1900], description: "Grand hôtel haut de gamme avec spa et restaurants. Comptez environ 950 à 1900 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Kasbah des Oudayas & musée des Bijoux", price: 60, duration: "2h", category: "Culture", description: "Forteresse du 12e siècle face à l'Atlantique. L'accès à la kasbah et aux jardins andalous est gratuit, le musée national des Bijoux est payant (environ 60 MAD)." },
      { name: "Tour Hassan & Mausolée Mohammed V", price: 0, duration: "1h", category: "Histoire", description: "Monuments emblématiques de la capitale, entrée libre." },
      { name: "Balade en barque sur le Bouregreg", price: 50, duration: "30 min", category: "Détente", description: "Promenade en barque traditionnelle sur le fleuve, de 30 à 100 MAD selon la durée, à négocier sur place. La simple traversée Rabat-Salé coûte 2,5 MAD." },
      { name: "Visite du musée Mohammed VI d'art moderne", price: 60, duration: "1h30", category: "Art", description: "Musée d'art moderne et contemporain, fermé le mardi. Le tarif d'entrée observé va de 20 à 60 MAD selon la source et la date." },
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
    hotels: [
      { name: "Hôtel simple", tier: "economique", pricePerNight: 300, priceRange: [190, 475], description: "Hôtel de catégorie économique, à quelques rues de la plage. Comptez environ 190 à 475 MAD la nuit pour une chambre double." },
      { name: "Hôtel 4 étoiles", tier: "confort", pricePerNight: 600, priceRange: [475, 760], description: "Hôtel en bord de mer avec piscine. Comptez environ 475 à 760 MAD la nuit pour une chambre double." },
      { name: "Resort 5 étoiles", tier: "luxe", pricePerNight: 1500, priceRange: [950, 1900], description: "Resort haut de gamme en bord de mer, avec spa et plusieurs restaurants. Comptez environ 950 à 1900 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Journée plage & sports nautiques", price: 200, duration: "Journée", category: "Sport", description: "Jet-ski, banane tractée et parasol inclus." },
      { name: "Excursion vallée du Paradis", price: 220, duration: "Demi-journée", category: "Nature", description: "Départ de l'hôtel, marche et baignade dans les bassins naturels. Comptez 140 à 230 MAD en petit groupe, plus environ 30 MAD de frais à payer sur place. Déjeuner en option." },
      { name: "Golf sur parcours 18 trous", price: 700, duration: "Demi-journée", category: "Sport", description: "Droit de jeu pour 18 trous, de 595 à 850 MAD selon le parcours (Golf du Soleil, Golf Les Dunes, Golf de l'Océan). Location du matériel en supplément." },
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
    hotels: [
      { name: "Auberge ou chambre chez l'habitant", tier: "economique", pricePerNight: 250, priceRange: [150, 350], description: "Chambre simple dans un village près des dunes de l'Erg Chebbi. Comptez environ 150 à 350 MAD la nuit pour une chambre double." },
      { name: "Kasbah-hôtel ou camp de charme", tier: "confort", pricePerNight: 600, priceRange: [475, 760], description: "Kasbah-hôtel avec piscine ou camp confortable au pied des dunes. Comptez environ 475 à 760 MAD la nuit pour une chambre double." },
      { name: "Camp de luxe sous tente", tier: "luxe", pricePerNight: 1500, priceRange: [1200, 2400], description: "Tente aménagée avec salle de bain privée au cœur des dunes. Le dîner est souvent inclus. Comptez environ 1200 à 2400 MAD la nuit pour une chambre double." },
    ],
    activities: [
      { name: "Trek en dromadaire au coucher du soleil", price: 250, duration: "2h", category: "Aventure", description: "Traversée des dunes de l'Erg Chebbi au coucher du soleil." },
      { name: "Nuit en bivouac avec dîner & musique", price: 900, duration: "Nuit", category: "Expérience", description: "Trajet en dromadaire jusqu'au camp, nuit sous tente, dîner et petit-déjeuner. Comptez 700 à 1 100 MAD en camp standard et 1 200 à 1 400 MAD en camp de luxe." },
      { name: "Sandboard sur les dunes", price: 150, duration: "2h", category: "Sport", description: "Glisse sur les dunes de sable, sensations garanties." },
      { name: "Excursion 4x4 dans le désert", price: 450, duration: "Demi-journée", category: "Aventure", description: "Exploration des oasis, fossiles et villages berbères en 4x4." },
      { name: "Balade en quad dans les dunes", price: 490, duration: "1h", category: "Aventure", description: "Balade guidée d'environ 1 heure dans les dunes de l'Erg Chebbi, pour environ 45 € par personne." },
    ],
  },
];

export function getCityById(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}
