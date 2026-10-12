import { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Contact</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Une question sur votre voyage ?</h1>
        <p className="mt-4 text-stone-500">
          Notre équipe de spécialistes du Maroc vous répond rapidement pour vous aider à organiser le
          séjour parfait.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
            <p className="text-2xl">📍</p>
            <p className="mt-2 font-bold text-stone-900">Bureau</p>
            <p className="text-sm text-stone-500">Avenue Mohammed VI, Marrakech, Maroc</p>
          </div>
          <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
            <p className="text-2xl">✉️</p>
            <p className="mt-2 font-bold text-stone-900">Email</p>
            <p className="text-sm text-stone-500">contact@saharaco-travel.ma</p>
          </div>
          <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
            <p className="text-2xl">📞</p>
            <p className="mt-2 font-bold text-stone-900">Téléphone / WhatsApp</p>
            <p className="text-sm text-stone-500">+212 5 24 00 00 00</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5 md:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-stone-600">Nom complet</label>
              <input required className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600/30" placeholder="Votre nom" />
            </div>
            <div>
              <label className="text-sm font-semibold text-stone-600">Email</label>
              <input required type="email" className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600/30" placeholder="vous@email.com" />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold text-stone-600">Destination(s) souhaitée(s)</label>
            <input className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600/30" placeholder="Ex: Marrakech, Chefchaouen, Sahara..." />
          </div>
          <div>
            <label className="text-sm font-semibold text-stone-600">Message</label>
            <textarea required rows={4} className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600/30" placeholder="Parlez-nous de votre projet de voyage..." />
          </div>
          <button type="submit" className="w-full rounded-full bg-gradient-to-r from-amber-500 to-red-600 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110">
            Envoyer le message
          </button>
          {sent && (
            <p className="rounded-lg bg-emerald-50 p-3 text-center text-sm font-semibold text-emerald-700">
              Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h. ✅
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
