export interface RoadLeg {
  km: number;
  minutes: number;
}

// [city A, city B, road km, driving minutes, origin]
// "guide": taken from travel guides. "calcul": sum of guide legs through a hub city (the direct road may be shorter).
type Row = [string, string, number, number, "guide" | "calcul"];

const ROWS: Row[] = [
  ["casablanca", "marrakech", 240, 165, "guide"],
  ["casablanca", "fes", 295, 225, "guide"],
  ["casablanca", "chefchaouen", 338, 330, "guide"],
  ["casablanca", "rabat", 88, 60, "guide"],
  ["casablanca", "essaouira", 372, 255, "guide"],
  ["marrakech", "fes", 530, 400, "guide"],
  ["marrakech", "chefchaouen", 573, 510, "guide"],
  ["marrakech", "agadir", 250, 180, "guide"],
  ["marrakech", "merzouga", 560, 570, "guide"],
  ["marrakech", "rabat", 323, 225, "guide"],
  ["marrakech", "essaouira", 180, 150, "guide"],
  ["fes", "chefchaouen", 200, 225, "guide"],
  ["fes", "rabat", 207, 150, "guide"],
  ["fes", "merzouga", 463, 400, "guide"],
  ["rabat", "chefchaouen", 250, 270, "guide"],
  ["agadir", "essaouira", 175, 180, "guide"],
  ["essaouira", "chefchaouen", 680, 530, "guide"],
  ["casablanca", "agadir", 490, 345, "calcul"],
  ["casablanca", "merzouga", 758, 625, "calcul"],
  ["rabat", "agadir", 578, 405, "calcul"],
  ["rabat", "essaouira", 460, 315, "calcul"],
  ["rabat", "merzouga", 670, 550, "calcul"],
  ["fes", "essaouira", 667, 480, "calcul"],
  ["fes", "agadir", 785, 570, "calcul"],
  ["chefchaouen", "agadir", 828, 675, "calcul"],
  ["chefchaouen", "merzouga", 663, 625, "calcul"],
  ["essaouira", "merzouga", 740, 720, "calcul"],
  ["agadir", "merzouga", 810, 750, "calcul"],
];

const pairKey = (a: string, b: string) => [a, b].sort().join("|");

const TABLE = new Map<string, RoadLeg>(ROWS.map(([a, b, km, minutes]) => [pairKey(a, b), { km, minutes }]));

export function roadLeg(a: string, b: string): RoadLeg | null {
  return TABLE.get(pairKey(a, b)) ?? null;
}
