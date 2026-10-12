import { useMemo, useState } from "react";
import { cities } from "../data/morocco";
import CityCard from "../components/CityCard";

export default function Cities() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("Toutes");

  const regions = useMemo(() => ["Toutes", ...Array.from(new Set(cities.map((c) => c.region)))], []);

  const filtered = cities.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.highlights.some((h) => h.toLowerCase().includes(query.toLowerCase()));
    const matchesRegion = region === "Toutes" || c.region === region;
    return matchesQuery && matchesRegion;
  });

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Destinations</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">
          Toutes les villes touristiques du Maroc
        </h1>
        <p className="mt-4 text-stone-500">
          Des médinas impériales aux dunes du Sahara, en passant par les plages atlantiques : trouvez la
          destination qui correspond à votre prochain voyage.
        </p>
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une ville ou un site (ex: désert, médina...)"
            className="w-full rounded-full border border-stone-200 bg-white py-3 pl-11 pr-4 text-sm text-stone-800 shadow-sm outline-none ring-amber-600/30 placeholder:text-stone-400 focus:ring-2"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 shadow-sm outline-none focus:ring-2 focus:ring-amber-600/30"
        >
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-center text-sm text-stone-400">
        {filtered.length} destination{filtered.length > 1 ? "s" : ""} trouvée{filtered.length > 1 ? "s" : ""}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CityCard key={c.id} city={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-stone-400">
          <p className="text-4xl">🧭</p>
          <p className="mt-3">Aucune ville ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
