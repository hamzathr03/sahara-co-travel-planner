import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTrip } from "../context/TripContext";
import { saveTrip } from "../lib/trips";
import { supabase } from "../lib/supabase";

type Feedback = { kind: "idle" } | { kind: "saving" } | { kind: "saved" } | { kind: "error"; message: string };

export default function SaveTrip() {
  const { stops, settings, currentTrip, setCurrentTrip, resetTrip } = useTrip();
  const [name, setName] = useState(currentTrip.name);
  const [feedback, setFeedback] = useState<Feedback>({ kind: "idle" });

  useEffect(() => {
    setName(currentTrip.name);
  }, [currentTrip.name]);

  if (stops.length === 0) {
    return (
      <div className="mt-6 border-t border-stone-100 pt-5 text-sm">
        <Link to="/mes-voyages" className="font-semibold text-amber-700 hover:text-amber-800">
          Ouvrir un voyage enregistré
        </Link>
      </div>
    );
  }

  const updating = currentTrip.id !== null;

  async function handleSave() {
    setFeedback({ kind: "saving" });
    try {
      const saved = await saveTrip({
        id: currentTrip.id,
        name: name.trim() || "Mon voyage",
        data: { stops, settings },
      });
      setCurrentTrip({ id: saved.id, name: saved.name });
      setFeedback({ kind: "saved" });
    } catch (e) {
      setFeedback({ kind: "error", message: e instanceof Error ? e.message : "Erreur inconnue." });
    }
  }

  function handleNewTrip() {
    if (!window.confirm("Commencer un nouveau voyage ? Les modifications non enregistrées seront perdues.")) return;
    resetTrip();
    setFeedback({ kind: "idle" });
  }

  return (
    <div className="mt-6 border-t border-stone-100 pt-5">
      <p className="text-sm font-semibold text-stone-800">{updating ? "Voyage enregistré" : "Enregistrer ce voyage"}</p>

      {!supabase ? (
        <p className="mt-2 text-xs text-stone-400">L'enregistrement n'est pas disponible pour le moment.</p>
      ) : (
        <>
          <label htmlFor="trip-name" className="sr-only">
            Nom du voyage
          </label>
          <input
            id="trip-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={80}
            placeholder="Nom du voyage"
            className="mt-2 w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-800"
          />
          <button
            type="button"
            onClick={handleSave}
            disabled={feedback.kind === "saving"}
            className="mt-2 w-full rounded-full bg-stone-900 py-2.5 text-sm font-bold text-white transition hover:bg-stone-700 disabled:opacity-50"
          >
            {feedback.kind === "saving" ? "Enregistrement…" : updating ? "Mettre à jour" : "Enregistrer"}
          </button>
          {feedback.kind === "saved" && <p className="mt-2 text-xs text-emerald-700">Voyage enregistré ✓</p>}
          {feedback.kind === "error" && <p className="mt-2 text-xs text-red-600">{feedback.message}</p>}
          <p className="mt-2 text-[11px] leading-relaxed text-stone-400">
            Votre voyage est lié à ce navigateur. Les comptes utilisateurs arriveront plus tard.
          </p>
        </>
      )}

      <div className="mt-3 flex items-center justify-between text-sm">
        <Link to="/mes-voyages" className="font-semibold text-amber-700 hover:text-amber-800">
          Mes voyages
        </Link>
        {updating && (
          <button type="button" onClick={handleNewTrip} className="font-semibold text-stone-500 hover:text-stone-700">
            Nouveau voyage
          </button>
        )}
      </div>
    </div>
  );
}
