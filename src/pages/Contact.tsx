import { useState, type FormEvent, type ReactNode } from "react";
import { siteConfig } from "../config/site";
import { supabase } from "../lib/supabase";
import { cn } from "../utils/cn";

interface FormValues {
  name: string;
  email: string;
  destinations: string;
  message: string;
  website: string; // honeypot: real visitors never see or fill this field
}

type Errors = Partial<Record<"name" | "email" | "destinations" | "message", string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMPTY: FormValues = { name: "", email: "", destinations: "", message: "", website: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: FormValues): Errors {
  const errors: Errors = {};
  const name = v.name.trim();
  const message = v.message.trim();

  if (name.length < 2) errors.name = "Indiquez votre nom (2 caractères minimum).";
  else if (name.length > 100) errors.name = "100 caractères maximum.";

  const email = v.email.trim();
  if (!EMAIL_RE.test(email) || email.length > 254) errors.email = "Indiquez une adresse email valide.";

  if (v.destinations.trim().length > 150) errors.destinations = "150 caractères maximum.";

  if (message.length < 10) errors.message = "Votre message doit contenir au moins 10 caractères.";
  else if (message.length > 2000) errors.message = "2 000 caractères maximum.";

  return errors;
}

const inputBase =
  "mt-1 w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600/30";

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-stone-600">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const errors = submitted ? validate(values) : {};

  const contactItems = [
    { icon: "📍", label: "Adresse", value: siteConfig.address },
    { icon: "✉️", label: "Email", value: siteConfig.email },
    { icon: "📞", label: "Téléphone / WhatsApp", value: siteConfig.phone },
  ].filter((item) => item.value);

  function setField(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function inputClass(field: keyof Errors) {
    return cn(inputBase, errors[field] ? "border-red-400" : "border-stone-200");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // A bot filled the hidden field: pretend it worked, send nothing.
    if (values.website) {
      setStatus("sent");
      return;
    }

    setSubmitted(true);
    if (Object.keys(validate(values)).length > 0) return;

    if (!supabase) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const { error } = await supabase.from("contact_messages").insert({
        name: values.name.trim(),
        email: values.email.trim(),
        destinations: values.destinations.trim() || null,
        message: values.message.trim(),
      });
      if (error) {
        console.error("Contact form:", error.message);
        setStatus("error");
        return;
      }
      setValues(EMPTY);
      setSubmitted(false);
      setStatus("sent");
    } catch (err) {
      console.error("Contact form:", err);
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Contact</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Une question sur votre voyage ?</h1>
        <p className="mt-4 text-stone-500">
          Une question, une suggestion ou un projet de voyage ? Écrivez-nous.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-5">
        <div className="space-y-5 md:col-span-2">
          {contactItems.length > 0 ? (
            contactItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
                <p className="text-2xl">{item.icon}</p>
                <p className="mt-2 font-bold text-stone-900">{item.label}</p>
                <p className="text-sm text-stone-500">{item.value}</p>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
              <p className="text-2xl">✉️</p>
              <p className="mt-2 font-bold text-stone-900">Écrivez-nous</p>
              <p className="text-sm text-stone-500">Utilisez le formulaire pour nous envoyer votre message.</p>
            </div>
          )}
        </div>

        {status === "sent" ? (
          <div className="rounded-2xl border border-stone-100 bg-white p-8 text-center shadow-sm shadow-stone-900/5 md:col-span-3">
            <p className="text-4xl">✅</p>
            <h2 className="mt-3 font-serif text-xl font-bold text-stone-900">Message envoyé</h2>
            <p className="mt-2 text-sm text-stone-500">Merci, votre message a bien été envoyé.</p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-5 rounded-full border border-stone-200 px-5 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
            >
              Envoyer un autre message
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5 md:col-span-3"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field id="contact-name" label="Nom complet" error={errors.name}>
                <input
                  id="contact-name"
                  value={values.name}
                  onChange={(e) => setField("name", e.target.value)}
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "contact-name-error" : undefined}
                  className={inputClass("name")}
                  placeholder="Votre nom"
                />
              </Field>
              <Field id="contact-email" label="Email" error={errors.email}>
                <input
                  id="contact-email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setField("email", e.target.value)}
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "contact-email-error" : undefined}
                  className={inputClass("email")}
                  placeholder="vous@email.com"
                />
              </Field>
            </div>

            <Field id="contact-destinations" label="Destination(s) souhaitée(s) (facultatif)" error={errors.destinations}>
              <input
                id="contact-destinations"
                value={values.destinations}
                onChange={(e) => setField("destinations", e.target.value)}
                maxLength={150}
                aria-invalid={Boolean(errors.destinations)}
                aria-describedby={errors.destinations ? "contact-destinations-error" : undefined}
                className={inputClass("destinations")}
                placeholder="Ex: Marrakech, Chefchaouen, Sahara..."
              />
            </Field>

            <Field id="contact-message" label="Message" error={errors.message}>
              <textarea
                id="contact-message"
                rows={4}
                value={values.message}
                onChange={(e) => setField("message", e.target.value)}
                maxLength={2000}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className={inputClass("message")}
                placeholder="Parlez-nous de votre projet de voyage..."
              />
            </Field>

            {/* Honeypot: hidden from people, tempting for bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="contact-website">Ne pas remplir</label>
              <input
                id="contact-website"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => setField("website", e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-full bg-gradient-to-r from-amber-500 to-red-600 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110 disabled:opacity-60"
            >
              {status === "sending" ? "Envoi en cours…" : "Envoyer le message"}
            </button>

            {status === "error" && (
              <p role="alert" className="rounded-lg bg-red-50 p-3 text-center text-sm font-semibold text-red-700">
                Votre message n'a pas pu être envoyé. Vérifiez votre connexion et réessayez dans un instant.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
