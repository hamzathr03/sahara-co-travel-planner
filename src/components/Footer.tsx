import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { cities } from "../data/morocco";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-red-700 text-white">
              🧭
            </span>
            <p className="font-serif text-lg font-bold text-white">Sahara&amp;Co</p>
          </div>
          <p className="text-sm leading-relaxed text-stone-400">
            Votre compagnon de voyage pour explorer le Maroc : villes, hôtels, activités et
            planification de budget, tout en un seul endroit.
          </p>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-500">Villes populaires</p>
          <ul className="space-y-2 text-sm">
            {cities.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/villes/${c.id}`} className="text-stone-400 transition hover:text-amber-400">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-500">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-stone-400 transition hover:text-amber-400">Accueil</Link></li>
            <li><Link to="/villes" className="text-stone-400 transition hover:text-amber-400">Toutes les villes</Link></li>
            <li><Link to="/planner" className="text-stone-400 transition hover:text-amber-400">Planificateur de voyage</Link></li>
            <li><Link to="/budget" className="text-stone-400 transition hover:text-amber-400">Planificateur de budget</Link></li>
            <li><Link to="/contact" className="text-stone-400 transition hover:text-amber-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-500">Contact</p>
          <ul className="space-y-2 text-sm text-stone-400">
            {siteConfig.address && <li>📍 {siteConfig.address}</li>}
            {siteConfig.email && <li>✉️ {siteConfig.email}</li>}
            {siteConfig.phone && <li>📞 {siteConfig.phone}</li>}
            <li>
              <Link to="/contact" className="transition hover:text-amber-400">Formulaire de contact</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-stone-500">
        © {new Date().getFullYear()} Sahara&amp;Co Travel Planner — Fait avec ❤️ pour les voyageurs du Maroc.
      </div>
    </footer>
  );
}
