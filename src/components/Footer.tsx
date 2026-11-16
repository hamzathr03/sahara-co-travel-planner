import { Link } from "react-router-dom";
import { siteConfig } from "../config/site";
import { cities } from "../data/morocco";
import { useLang } from "../context/LanguageContext";

const linkClass = "text-stone-400 transition hover:text-amber-400";

export default function Footer() {
  const { t } = useLang();

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
          <p className="text-sm leading-relaxed text-stone-400">{t.footer.about}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-500">{t.footer.popularCities}</p>
          <ul className="space-y-2 text-sm">
            {cities.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/villes/${c.id}`} className={linkClass}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-500">{t.footer.navigation}</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className={linkClass}>{t.footer.home}</Link></li>
            <li><Link to="/villes" className={linkClass}>{t.footer.allCities}</Link></li>
            <li><Link to="/planner" className={linkClass}>{t.footer.tripPlanner}</Link></li>
            <li><Link to="/budget" className={linkClass}>{t.footer.budgetPlanner}</Link></li>
            <li><Link to="/contact" className={linkClass}>{t.footer.contact}</Link></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-amber-500">{t.footer.contact}</p>
          <ul className="space-y-2 text-sm text-stone-400">
            {siteConfig.address && <li>📍 {siteConfig.address}</li>}
            {siteConfig.email && <li>✉️ {siteConfig.email}</li>}
            {siteConfig.phone && <li>📞 {siteConfig.phone}</li>}
            <li>
              <Link to="/contact" className="transition hover:text-amber-400">{t.footer.contactForm}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-stone-500">
        {t.footer.copyright(new Date().getFullYear())}
      </div>
    </footer>
  );
}
