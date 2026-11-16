import { useState } from "react";
import { cities } from "../data/morocco";
import CityCard from "../components/CityCard";
import { useLang } from "../context/LanguageContext";

const normalize = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Regions are identified by their French name (the data); the label is translated.
const REGIONS = Array.from(new Set(cities.map((c) => c.region)));

export default function Cities() {
  const { t, localCity } = useLang();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");

  const q = normalize(query.trim());
  const filtered = cities.filter((c) => {
    const lc = localCity(c);
    const haystack = normalize([c.name, lc.name, ...c.highlights, ...lc.highlights].join(" "));
    return (!q || haystack.includes(q)) && (region === "all" || c.region === region);
  });

  const regionLabel = (r: string) => {
    const city = cities.find((c) => c.region === r);
    return city ? localCity(city).region : r;
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">{t.citiesPage.eyebrow}</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">{t.citiesPage.title}</h1>
        <p className="mt-4 text-stone-500">{t.citiesPage.intro}</p>
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.citiesPage.placeholder}
            aria-label={t.citiesPage.placeholder}
            className="w-full rounded-full border border-stone-200 bg-white py-3 ps-11 pe-4 text-sm text-stone-800 shadow-sm outline-none ring-amber-600/30 placeholder:text-stone-400 focus:ring-2"
          />
        </div>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          aria-label={t.citiesPage.allRegions}
          className="rounded-full border border-stone-200 bg-white px-4 py-3 text-sm font-semibold text-stone-700 shadow-sm outline-none focus:ring-2 focus:ring-amber-600/30"
        >
          <option value="all">{t.citiesPage.allRegions}</option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {regionLabel(r)}
            </option>
          ))}
        </select>
      </div>

      <p aria-live="polite" className="mt-6 text-center text-sm text-stone-400">
        {t.citiesPage.count(filtered.length)}
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <CityCard key={c.id} city={c} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 text-center text-stone-400">
          <p className="text-4xl">🧭</p>
          <p className="mt-3">{t.citiesPage.empty}</p>
        </div>
      )}
    </div>
  );
}
