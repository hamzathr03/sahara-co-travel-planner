import { useState } from "react";
import { supabase } from "../lib/supabase";

type Status = "idle" | "loading" | "ok" | "error";

// Temporary page used once to check that Supabase is correctly set up.
export default function SupabaseCheck() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function runCheck() {
    if (!supabase) return;
    setStatus("loading");
    try {
      const { data: current } = await supabase.auth.getSession();
      if (!current.session) {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) {
          setStatus("error");
          setMessage(`Connexion anonyme impossible : ${error.message}. Vérifiez que « Anonymous sign-ins » est activé.`);
          return;
        }
      }

      const { count, error } = await supabase.from("trips").select("id", { count: "exact", head: true });
      if (error) {
        setStatus("error");
        setMessage(`Table « trips » inaccessible : ${error.message}`);
        return;
      }

      setStatus("ok");
      setMessage(`Tout fonctionne. Voyages enregistrés dans ce navigateur : ${count ?? 0}.`);
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Erreur inconnue.");
    }
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
        <h1 className="font-serif text-2xl font-bold text-stone-900">Test de connexion Supabase</h1>
        <p className="mt-2 text-sm text-stone-500">
          Page temporaire : elle vérifie que les clés, la connexion anonyme et la table « trips » fonctionnent.
        </p>

        {!supabase ? (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            Variables manquantes. Vérifiez <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_PUBLISHABLE_KEY</code>{" "}
            dans le fichier <code>.env.local</code>, puis relancez <code>npm run dev</code>.
          </p>
        ) : (
          <button
            type="button"
            onClick={runCheck}
            disabled={status === "loading"}
            className="mt-5 rounded-full bg-stone-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-stone-700 disabled:opacity-50"
          >
            {status === "loading" ? "Test en cours…" : "Lancer le test"}
          </button>
        )}

        {status === "ok" && <p className="mt-5 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800">✅ {message}</p>}
        {status === "error" && <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">❌ {message}</p>}
      </div>
    </div>
  );
}
