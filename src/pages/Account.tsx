import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { cn } from "../utils/cn";

type Mode = "signup" | "login" | "forgot";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

const inputClass =
  "mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-amber-600/30";

function Field({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-stone-600">
        {label}
      </label>
      {children}
    </div>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-md px-5 py-16 sm:px-8">
      <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">{children}</div>
    </div>
  );
}

export default function Account() {
  const { user, loading, available, recovery, signUp, signIn, signOut, requestPasswordReset, setNewPassword } =
    useAuth();
  const [mode, setMode] = useState<Mode>("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const isAnonymous = Boolean(user?.is_anonymous);
  const hasAccount = Boolean(user && !user.is_anonymous);

  function switchMode(next: Mode) {
    setMode(next);
    setError("");
    setNotice("");
    setPassword("");
    setConfirm("");
  }

  // Returns an error message, or "" when the checked fields are valid.
  function check(needsEmail: boolean, needsPassword: boolean, needsConfirm: boolean): string {
    if (needsEmail && !EMAIL_RE.test(email.trim())) return "Indiquez une adresse email valide.";
    if (needsPassword && password.length < MIN_PASSWORD) {
      return `Le mot de passe doit contenir au moins ${MIN_PASSWORD} caractères.`;
    }
    if (needsConfirm && password !== confirm) return "Les deux mots de passe ne sont pas identiques.";
    return "";
  }

  async function run(problem: string, action: () => Promise<void>) {
    setError("");
    setNotice("");
    if (problem) {
      setError(problem);
      return;
    }
    setBusy(true);
    try {
      await action();
    } finally {
      setBusy(false);
    }
  }

  function handleSignUp(e: FormEvent) {
    e.preventDefault();
    void run(check(true, true, true), async () => {
      const result = await signUp(email.trim(), password);
      if (!result.ok) return setError(result.message);
      if (result.needsConfirmation) {
        setNotice(
          `Un email de confirmation vient d'être envoyé à ${email.trim()}. Cliquez sur le lien qu'il contient pour activer votre compte${
            isAnonymous ? ". Vos voyages enregistrés seront conservés" : ""
          }.`
        );
        setPassword("");
        setConfirm("");
      }
    });
  }

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    void run(check(true, true, false), async () => {
      const result = await signIn(email.trim(), password);
      if (!result.ok) setError(result.message);
    });
  }

  function handleForgot(e: FormEvent) {
    e.preventDefault();
    void run(check(true, false, false), async () => {
      const result = await requestPasswordReset(email.trim());
      if (!result.ok) return setError(result.message);
      setNotice("Si un compte existe pour cet email, vous allez recevoir un lien pour choisir un nouveau mot de passe.");
    });
  }

  function handleNewPassword(e: FormEvent) {
    e.preventDefault();
    void run(check(false, true, true), async () => {
      const result = await setNewPassword(password);
      if (!result.ok) return setError(result.message);
      setPassword("");
      setConfirm("");
      setNotice("Votre mot de passe a été modifié.");
    });
  }

  if (loading) {
    return (
      <Card>
        <p className="text-center text-sm text-stone-400">Chargement…</p>
      </Card>
    );
  }

  if (!available) {
    return (
      <Card>
        <h1 className="font-serif text-2xl font-bold text-stone-900">Mon compte</h1>
        <p className="mt-3 text-sm text-stone-500">Les comptes ne sont pas disponibles pour le moment.</p>
      </Card>
    );
  }

  const messages = (
    <>
      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">
          {notice}
        </p>
      )}
    </>
  );

  // Opened from a password-reset email
  if (recovery) {
    return (
      <Card>
        <h1 className="font-serif text-2xl font-bold text-stone-900">Nouveau mot de passe</h1>
        <form onSubmit={handleNewPassword} noValidate className="mt-5 space-y-4">
          <Field id="new-password" label={`Nouveau mot de passe (${MIN_PASSWORD} caractères minimum)`}>
            <input id="new-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </Field>
          <Field id="new-password-confirm" label="Confirmez le mot de passe">
            <input id="new-password-confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} />
          </Field>
          <button type="submit" disabled={busy} className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-bold text-white transition hover:bg-stone-700 disabled:opacity-50">
            {busy ? "Enregistrement…" : "Enregistrer le mot de passe"}
          </button>
        </form>
        {messages}
      </Card>
    );
  }

  // Signed in with a real account
  if (hasAccount) {
    return (
      <Card>
        <h1 className="font-serif text-2xl font-bold text-stone-900">Mon compte</h1>
        <p className="mt-3 text-sm text-stone-500">Connecté avec</p>
        <p className="font-semibold text-stone-800">{user?.email}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link to="/mes-voyages" className="rounded-full bg-stone-900 py-2.5 text-center text-sm font-bold text-white transition hover:bg-stone-700">
            Mes voyages
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="rounded-full border border-stone-200 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
          >
            Se déconnecter
          </button>
        </div>
        {messages}
      </Card>
    );
  }

  // No account yet (or anonymous session)
  const heading = mode === "signup" ? "Créer un compte" : mode === "login" ? "Se connecter" : "Mot de passe oublié";

  return (
    <Card>
      <h1 className="font-serif text-2xl font-bold text-stone-900">{heading}</h1>

      {isAnonymous && mode === "signup" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          Vos voyages enregistrés sont pour l'instant liés à ce navigateur. Créez un compte pour les conserver et les
          retrouver partout.
        </p>
      )}
      {isAnonymous && mode === "login" && (
        <p className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          Attention : en vous connectant à un compte existant, les voyages enregistrés avant la connexion dans ce
          navigateur ne seront pas ajoutés à ce compte. Pour les conserver, créez plutôt un compte.
        </p>
      )}

      {mode === "signup" && (
        <form onSubmit={handleSignUp} noValidate className="mt-5 space-y-4">
          <Field id="signup-email" label="Email">
            <input id="signup-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </Field>
          <Field id="signup-password" label={`Mot de passe (${MIN_PASSWORD} caractères minimum)`}>
            <input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </Field>
          <Field id="signup-confirm" label="Confirmez le mot de passe">
            <input id="signup-confirm" type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputClass} />
          </Field>
          <button type="submit" disabled={busy} className="w-full rounded-full bg-gradient-to-r from-amber-500 to-red-600 py-2.5 text-sm font-bold text-white shadow-md transition hover:brightness-110 disabled:opacity-60">
            {busy ? "Création…" : "Créer mon compte"}
          </button>
        </form>
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} noValidate className="mt-5 space-y-4">
          <Field id="login-email" label="Email">
            <input id="login-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </Field>
          <Field id="login-password" label="Mot de passe">
            <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
          </Field>
          <button type="submit" disabled={busy} className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-bold text-white transition hover:bg-stone-700 disabled:opacity-50">
            {busy ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      )}

      {mode === "forgot" && (
        <form onSubmit={handleForgot} noValidate className="mt-5 space-y-4">
          <p className="text-sm text-stone-500">Indiquez votre email : nous vous enverrons un lien pour choisir un nouveau mot de passe.</p>
          <Field id="forgot-email" label="Email">
            <input id="forgot-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </Field>
          <button type="submit" disabled={busy} className="w-full rounded-full bg-stone-900 py-2.5 text-sm font-bold text-white transition hover:bg-stone-700 disabled:opacity-50">
            {busy ? "Envoi…" : "Envoyer le lien"}
          </button>
        </form>
      )}

      {messages}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-sm">
        {mode === "signup" && (
          <button type="button" onClick={() => switchMode("login")} className="font-semibold text-amber-700 hover:text-amber-800">
            J'ai déjà un compte
          </button>
        )}
        {mode === "login" && (
          <>
            <button type="button" onClick={() => switchMode("signup")} className="font-semibold text-amber-700 hover:text-amber-800">
              Créer un compte
            </button>
            <button type="button" onClick={() => switchMode("forgot")} className={cn("font-semibold text-stone-500 hover:text-stone-700")}>
              Mot de passe oublié
            </button>
          </>
        )}
        {mode === "forgot" && (
          <button type="button" onClick={() => switchMode("login")} className="font-semibold text-amber-700 hover:text-amber-800">
            Retour à la connexion
          </button>
        )}
      </div>
    </Card>
  );
}
