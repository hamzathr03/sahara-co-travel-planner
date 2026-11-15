import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { cities, type Activity, type City } from "../data/morocco";
import { useTrip } from "../context/TripContext";
import { cn } from "../utils/cn";

type DurationBucket = "court" | "demi" | "journee" | "soiree";
type PriceRange = "all" | "low" | "mid" | "high" | "free";
type Sort = "default" | "price-asc" | "price-desc";

interface Row {
  id: string;
  city: City;
  activity: Activity;
}

const ROWS: Row[] = cities.flatMap((city) =>
  city.activities.map((activity) => ({ id: `${city.id}::${activity.name}`, city, activity }))
);
const CATEGORIES = Array.from(new Set(ROWS.map((r) => r.activity.category))).sort((a, b) => a.localeCompare(b, "fr"));

const DURATION_LABELS: Record<DurationBucket, string> = {
  court: "Moins de 2 h",
  demi: "Demi-journée",
  journee: "Journée",
  soiree: "Soirée ou nuit",
};
const PRICE_LABELS: Record<Exclude<PriceRange, "all">, string> = {
  free: "Gratuit",
  low: "Moins de 200 MAD",
  mid: "200 à 500 MAD",
  high: "Plus de 500 MAD",
};

function durationBucket(duration: string): DurationBucket {
  const s = duration.toLowerCase();
  if (s.includes("soirée") || s.includes("nuit")) return "soiree";
  if (s.includes("demi")) return "demi";
  if (s.includes("journée")) return "journee";
  const hours = /(\d+)\s*h\s*(\d+)?/.exec(s);
  const mins = /(\d+)\s*min/.exec(s);
  const minutes = hours ? Number(hours[1]) * 60 + Number(hours[2] ?? 0) : mins ? Number(mins[1]) : 0;
  return minutes <= 120 ? "court" : "demi";
}

function inPriceRange(price: number, range: PriceRange): boolean {
  switch (range) {
    case "free":
      return price === 0;
    case "low":
      return price < 200;
    case "mid":
      return price >= 200 && price <= 500;
    case "high":
      return price > 500;
    default:
      return true;
  }
}

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
const toggle = <T,>(list: T[], value: T): T[] => (list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);

const FAV_KEY = "sahara-favorites";
function loadFavorites(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(FAV_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
function saveFavorites(list: string[]) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable (private mode): favorites just won't persist
  }
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-semibold transition",
        active ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900"
      )}
    >
      {children}
    </button>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="text-sm font-semibold text-stone-700">{title}</p>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function Activities() {
  const { stops, addStop, toggleActivity } = useTrip();
  const [query, setQuery] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceRange>("all");
  const [duration, setDuration] = useState<DurationBucket | "all">("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [sort, setSort] = useState<Sort>("default");
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(loadFavorites);

  const q = normalize(query.trim());
  let results = ROWS.filter(({ id, city, activity }) => {
    if (selectedCities.length > 0 && !selectedCities.includes(city.id)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(activity.category)) return false;
    if (duration !== "all" && durationBucket(activity.duration) !== duration) return false;
    if (!inPriceRange(activity.price, price)) return false;
    if (onlyFavorites && !favorites.includes(id)) return false;
    if (q && !normalize(`${activity.name} ${activity.description} ${activity.category} ${city.name}`).includes(q)) return false;
    return true;
  });
  if (sort !== "default") {
    results = [...results].sort((a, b) =>
      sort === "price-asc" ? a.activity.price - b.activity.price : b.activity.price - a.activity.price
    );
  }

  const activeFilters =
    selectedCities.length + selectedCategories.length + (price !== "all" ? 1 : 0) + (duration !== "all" ? 1 : 0) + (onlyFavorites ? 1 : 0);

  function resetFilters() {
    setQuery("");
    setSelectedCities([]);
    setSelectedCategories([]);
    setPrice("all");
    setDuration("all");
    setOnlyFavorites(false);
  }

  function toggleFavorite(id: string) {
    const next = toggle(favorites, id);
    setFavorites(next);
    saveFavorites(next);
  }

  function toggleInTrip(city: City, activity: Activity) {
    if (!stops.some((s) => s.cityId === city.id)) addStop(city.id);
    toggleActivity(city.id, activity.name);
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Toutes les activités</h1>
        <p className="mt-4 text-stone-500">
          Cherchez, filtrez par prix, ville, type ou durée, mettez vos coups de cœur en favoris et ajoutez-les à votre
          voyage.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <label htmlFor="activity-search" className="sr-only">
            Rechercher une activité
          </label>
          <input
            id="activity-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher (ex : hammam, désert, surf)"
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-600/30"
          />

          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            className="mt-3 w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 lg:hidden"
          >
            Filtres{activeFilters > 0 ? ` (${activeFilters})` : ""}
          </button>

          <div
            className={cn(
              "mt-3 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5 lg:sticky lg:top-24 lg:block",
              showFilters ? "block" : "hidden"
            )}
          >
            <FilterGroup title="Ville">
              {cities.map((c) => (
                <Chip key={c.id} active={selectedCities.includes(c.id)} onClick={() => setSelectedCities((l) => toggle(l, c.id))}>
                  {c.name}
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup title="Type d'activité">
              {CATEGORIES.map((cat) => (
                <Chip key={cat} active={selectedCategories.includes(cat)} onClick={() => setSelectedCategories((l) => toggle(l, cat))}>
                  {cat}
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup title="Prix par personne">
              {(Object.keys(PRICE_LABELS) as Exclude<PriceRange, "all">[]).map((key) => (
                <Chip key={key} active={price === key} onClick={() => setPrice(price === key ? "all" : key)}>
                  {PRICE_LABELS[key]}
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup title="Durée">
              {(Object.keys(DURATION_LABELS) as DurationBucket[]).map((key) => (
                <Chip key={key} active={duration === key} onClick={() => setDuration(duration === key ? "all" : key)}>
                  {DURATION_LABELS[key]}
                </Chip>
              ))}
            </FilterGroup>
            <FilterGroup title="Favoris">
              <Chip active={onlyFavorites} onClick={() => setOnlyFavorites((v) => !v)}>
                ♥ Mes favoris ({favorites.length})
              </Chip>
            </FilterGroup>

            {(activeFilters > 0 || query) && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 text-sm font-semibold text-amber-700 hover:text-amber-800"
              >
                Réinitialiser les filtres
              </button>
            )}
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p aria-live="polite" className="text-sm text-stone-500">
              {results.length} activité{results.length > 1 ? "s" : ""} sur {ROWS.length}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="activity-sort" className="text-sm text-stone-500">
                Trier par
              </label>
              <select
                id="activity-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
              >
                <option value="default">Par ville</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-stone-100 bg-white p-8 text-center shadow-sm shadow-stone-900/5">
              <p className="text-stone-600">
                {onlyFavorites && favorites.length === 0
                  ? "Vous n'avez pas encore de favori. Touchez le cœur d'une activité pour l'ajouter."
                  : "Aucune activité ne correspond à ces critères."}
              </p>
              <button type="button" onClick={resetFilters} className="mt-4 text-sm font-semibold text-amber-700 hover:text-amber-800">
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {results.map(({ id, city, activity }) => {
                const isFavorite = favorites.includes(id);
                const inTrip = stops.find((s) => s.cityId === city.id)?.activities.includes(activity.name) ?? false;
                return (
                  <li key={id} className="flex flex-col rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h2 className="font-serif text-lg font-bold leading-snug text-stone-900">{activity.name}</h2>
                        <p className="mt-0.5 text-sm text-stone-500">
                          <Link to={`/villes/${city.id}`} className="font-semibold text-amber-700 hover:text-amber-800">
                            {city.name}
                          </Link>{" "}
                          · {activity.category}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-pressed={isFavorite}
                        aria-label={isFavorite ? `Retirer ${activity.name} des favoris` : `Ajouter ${activity.name} aux favoris`}
                        onClick={() => toggleFavorite(id)}
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl transition hover:bg-stone-100",
                          isFavorite ? "text-red-600" : "text-stone-400"
                        )}
                      >
                        {isFavorite ? "♥" : "♡"}
                      </button>
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-600">{activity.description}</p>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm text-stone-500">
                        {activity.duration} ·{" "}
                        <span className="font-bold text-stone-800">
                          {activity.price > 0 ? `${activity.price} MAD/pers.` : "Gratuit"}
                        </span>
                      </p>
                      <button
                        type="button"
                        onClick={() => toggleInTrip(city, activity)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-bold transition",
                          inTrip
                            ? "bg-amber-50 text-amber-800 ring-1 ring-amber-200 hover:bg-amber-100"
                            : "bg-stone-900 text-white hover:bg-stone-700"
                        )}
                      >
                        {inTrip ? "Dans mon voyage ✓" : "Ajouter à mon voyage"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

          <p className="mt-8 text-xs text-stone-400">
            Prix indicatifs par personne, relevés auprès de guides et d'offres en ligne : ils varient selon la saison et le
            groupe. Les favoris sont enregistrés dans ce navigateur.
          </p>
        </section>
      </div>
    </div>
  );
}
