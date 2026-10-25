import { Link } from "react-router-dom";
import { cities, tierLabels } from "../data/morocco";
import CityCard from "../components/CityCard";

const steps = [
  {
    icon: "🗺️",
    title: "Choisissez vos villes",
    text: "Explorez Marrakech, Fès, Chefchaouen, le Sahara et bien d'autres destinations marocaines.",
  },
  {
    icon: "🏨",
    title: "Comparez les hôtels",
    text: "Du riad économique au palace de luxe, trouvez l'hébergement adapté à votre style de voyage.",
  },
  {
    icon: "🎒",
    title: "Choisissez vos activités",
    text: "Désert, surf, souks, randonnées... construisez un séjour sur-mesure selon vos envies.",
  },
  {
    icon: "💰",
    title: "Calculez votre budget",
    text: "Obtenez une estimation détaillée du coût total de votre voyage en quelques clics.",
  },
];

const stats = [
  { label: "Villes couvertes", value: String(cities.length) },
  { label: "Activités proposées", value: String(cities.reduce((n, c) => n + c.activities.length, 0)) },
  { label: "Niveaux de confort", value: String(Object.keys(tierLabels).length) },
  { label: "Régions traversées", value: String(new Set(cities.map((c) => c.region)).size) },
];

export default function Home() {
  const featured = cities.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${import.meta.env.BASE_URL}images/hero.jpg`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            alt="Paysage du Maroc"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/75 to-amber-900/60" />
        </div>
        <div className="relative mx-auto flex min-h-[640px] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber-200 ring-1 ring-white/20 backdrop-blur">
            ✨ Votre aventure marocaine commence ici
          </span>
          <h1 className="max-w-3xl font-serif text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            Planifiez votre voyage au <span className="text-amber-400">Maroc</span>, étape par étape
          </h1>
          <p className="mt-6 max-w-xl text-lg text-stone-200">
            Villes incontournables, meilleurs hôtels, activités authentiques et calcul précis de votre
            budget — tout ce qu'il faut pour organiser le séjour marocain parfait.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/villes"
              className="rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-orange-900/40 transition hover:brightness-110"
            >
              Explorer les villes
            </Link>
            <Link
              to="/budget"
              className="rounded-full bg-white/10 px-7 py-3.5 text-base font-bold text-white ring-1 ring-white/30 backdrop-blur transition hover:bg-white/20"
            >
              Estimer mon budget →
            </Link>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-xs font-medium uppercase tracking-wide text-stone-300">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Comment ça marche</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
            Un voyage organisé en 4 étapes simples
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className="relative rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5 transition hover:-translate-y-1 hover:shadow-md"
            >
              <span className="absolute -top-4 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="text-3xl">{s.icon}</span>
              <h3 className="mt-4 font-serif text-lg font-bold text-stone-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cities */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Destinations</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
                Villes incontournables du Maroc
              </h2>
            </div>
            <Link
              to="/villes"
              className="rounded-full border border-stone-300 px-5 py-2.5 text-sm font-bold text-stone-700 transition hover:border-amber-600 hover:text-amber-700"
            >
              Voir toutes les villes →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c) => (
              <CityCard key={c.id} city={c} />
            ))}
          </div>
        </div>
      </section>

      {/* Budget CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950 p-10 text-center shadow-xl sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-600/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-red-600/20 blur-3xl" />
          <p className="relative text-sm font-bold uppercase tracking-widest text-amber-400">
            Planificateur de budget
          </p>
          <h2 className="relative mx-auto mt-3 max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl">
            Combien coûte un voyage au Maroc ? Calculez-le en 2 minutes.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-stone-300">
            Sélectionnez vos villes, la durée du séjour, le nombre de voyageurs et votre niveau de confort :
            obtenez une estimation détaillée (hébergement, nourriture, activités, transport).
          </p>
          <Link
            to="/budget"
            className="relative mt-8 inline-flex rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-orange-900/40 transition hover:brightness-110"
          >
            Lancer le simulateur de budget 💰
          </Link>
        </div>
      </section>
    </div>
  );
}
