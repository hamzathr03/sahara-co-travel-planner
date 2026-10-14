import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCityById, tierLabels } from "../data/morocco";
import { useTrip } from "../context/TripContext";
import { deleteTrip, listTrips, renameTrip, type SavedTrip } from "../lib/trips";
import { supabase } from "../lib/supabase";

export default function MyTrips() {
  const navigate = useNavigate();
  const { stops, currentTrip, setCurrentTrip, loadTrip } = useTrip();
  const [trips, setTrips] = useState<SavedTrip[] | null>(null);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    let cancelled = false;
    listTrips()
      .then((list) => {
        if (!cancelled) setTrips(list);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Erreur inconnue.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function open(trip: SavedTrip) {
    const replacing = stops.length > 0 && currentTrip.id !== trip.id;
    if (replacing && !window.confirm("Remplacer le voyage en cours ? Les modifications non enregistrées seront perdues.")) {
      return;
    }
    loadTrip({ id: trip.id, name: trip.name, stops: trip.data.stops, settings: trip.data.settings });
    navigate("/planner");
  }

  async function remove(trip: SavedTrip) {
    if (!window.confirm(`Supprimer « ${trip.name} » ? Cette action est définitive.`)) return;
    try {
      await deleteTrip(trip.id);
      setTrips((prev) => (prev ? prev.filter((t) => t.id !== trip.id) : prev));
      if (currentTrip.id === trip.id) setCurrentTrip({ id: null, name: currentTrip.name });
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  }

  async function saveName(trip: SavedTrip) {
    const name = editName.trim();
    if (!name) return;
    try {
      await renameTrip(trip.id, name);
      setTrips((prev) => (prev ? prev.map((t) => (t.id === trip.id ? { ...t, name } : t)) : prev));
      if (currentTrip.id === trip.id) setCurrentTrip({ id: trip.id, name });
      setEditingId(null);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Mes voyages</h1>
        <p className="mt-4 text-stone-500">
          Retrouvez les voyages enregistrés dans ce navigateur et ouvrez-les pour continuer à les planifier.
        </p>
      </div>

      {!supabase && (
        <p className="mt-10 rounded-xl bg-stone-50 p-4 text-center text-sm text-stone-500">
          L'enregistrement des voyages n'est pas disponible pour le moment.
        </p>
      )}
      {error && <p className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      {supabase && trips === null && !error && <p className="mt-10 text-center text-sm text-stone-400">Chargement…</p>}

      {supabase && trips && trips.length === 0 && (
        <div className="mt-10 rounded-2xl border border-stone-100 bg-white p-8 text-center shadow-sm shadow-stone-900/5">
          <p className="text-stone-600">Vous n'avez pas encore enregistré de voyage.</p>
          <Link
            to="/planner"
            className="mt-4 inline-block rounded-full bg-gradient-to-r from-amber-500 to-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:brightness-110"
          >
            Planifier un voyage
          </Link>
        </div>
      )}

      {trips && trips.length > 0 && (
        <ul className="mt-10 space-y-4">
          {trips.map((trip) => {
            const names = trip.data.stops.map((s) => getCityById(s.cityId)?.name ?? s.cityId);
            const days = trip.data.stops.reduce((n, s) => n + s.days, 0);
            const { travelers, tier } = trip.data.settings;
            const date = new Date(trip.updatedAt).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });

            return (
              <li key={trip.id} className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
                {editingId === trip.id ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      maxLength={80}
                      aria-label="Nouveau nom du voyage"
                      className="min-w-0 flex-1 rounded-lg border border-stone-200 px-3 py-1.5 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => saveName(trip)}
                      className="rounded-full bg-stone-900 px-3 py-1.5 text-xs font-bold text-white"
                    >
                      Valider
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="text-xs font-semibold text-stone-500"
                    >
                      Annuler
                    </button>
                  </div>
                ) : (
                  <h2 className="font-serif text-lg font-bold text-stone-900">
                    {trip.name}
                    {currentTrip.id === trip.id && (
                      <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 align-middle font-sans text-xs font-semibold text-amber-800">
                        En cours
                      </span>
                    )}
                  </h2>
                )}

                <p className="mt-1 text-sm text-stone-600">{names.length > 0 ? names.join(" → ") : "Aucune ville"}</p>
                <p className="mt-1 text-xs text-stone-400">
                  {days} jour{days > 1 ? "s" : ""} · {travelers} voyageur{travelers > 1 ? "s" : ""} · {tierLabels[tier]} ·
                  modifié le {date}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => open(trip)}
                    className="rounded-full bg-stone-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-stone-700"
                  >
                    Ouvrir
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(trip.id);
                      setEditName(trip.name);
                    }}
                    className="text-sm font-semibold text-stone-600 hover:text-stone-800"
                  >
                    Renommer
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(trip)}
                    className="text-sm font-semibold text-red-500 hover:text-red-600"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
