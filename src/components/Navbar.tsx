import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/villes", label: "Villes" },
  { to: "/carte", label: "Carte" },
  { to: "/planner", label: "Mon voyage" },
  { to: "/mes-voyages", label: "Mes voyages" },
  { to: "/budget", label: "Budget" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-amber-900/10 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-lg font-bold text-white shadow-md shadow-orange-900/20">
            🧭
          </span>
          <div className="leading-tight">
            <p className="font-serif text-lg font-bold tracking-tight text-stone-900">Sahara&amp;Co</p>
            <p className="-mt-1 text-[11px] font-medium uppercase tracking-widest text-amber-700">
              Travel Planner Morocco
            </p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-amber-700 text-white shadow-sm"
                    : "text-stone-700 hover:bg-amber-50 hover:text-amber-800"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <NavLink
            to="/planner"
            className="hidden rounded-full bg-gradient-to-r from-orange-600 to-red-700 px-4 py-2 text-sm font-bold text-white shadow-md shadow-orange-900/20 transition hover:brightness-110 xl:inline-block"
          >
            Planifier mon voyage
          </NavLink>
          <button
            onClick={() => setOpen((o) => !o)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 text-stone-700 lg:hidden"
            aria-label="Menu"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-stone-100 bg-white px-5 py-3 lg:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-4 py-2.5 text-sm font-semibold",
                  isActive ? "bg-amber-700 text-white" : "text-stone-700 hover:bg-amber-50"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
