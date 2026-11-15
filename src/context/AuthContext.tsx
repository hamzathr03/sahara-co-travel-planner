import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { AuthError, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import { useTrip } from "./TripContext";

export type AuthResult = { ok: true; needsConfirmation: boolean } | { ok: false; message: string };

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  available: boolean; // false when Supabase is not configured
  recovery: boolean; // true after the user opened a password-reset link
  signUp: (email: string, password: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  setNewPassword: (password: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const UNAVAILABLE: AuthResult = { ok: false, message: "Les comptes ne sont pas disponibles pour le moment." };

function frenchError(error: AuthError): string {
  switch (error.code) {
    case "invalid_credentials":
      return "Email ou mot de passe incorrect.";
    case "email_not_confirmed":
      return "Confirmez d'abord votre adresse email avec le lien que nous vous avons envoyé.";
    case "user_already_exists":
    case "email_exists":
      return "Un compte existe déjà avec cet email. Connectez-vous.";
    case "weak_password":
      return "Mot de passe trop faible. Choisissez-en un plus long ou plus varié.";
    case "same_password":
      return "Le nouveau mot de passe doit être différent de l'ancien.";
    case "over_email_send_rate_limit":
    case "over_request_rate_limit":
      return "Trop de demandes. Réessayez dans un moment.";
    case "email_address_not_authorized":
      return "Cette adresse email ne peut pas recevoir de message pour le moment.";
    case "signup_disabled":
      return "Les inscriptions sont désactivées pour le moment.";
    default:
      console.error("Auth error:", error.code, error.message);
      return "Une erreur est survenue. Réessayez dans un instant.";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const { currentTrip, setCurrentTrip, resetTrip } = useTrip();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [recovery, setRecovery] = useState(false);
  const lastUserId = useRef<string | null>(null);

  useEffect(() => {
    const client = supabase;
    if (!client) return undefined;
    client.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    const { data } = client.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "PASSWORD_RECOVERY") setRecovery(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  // A different person is now signed in: the trip being edited no longer belongs to this account.
  useEffect(() => {
    const id = user?.id ?? null;
    if (lastUserId.current && id !== lastUserId.current && currentTrip.id !== null) {
      setCurrentTrip({ id: null, name: currentTrip.name });
    }
    lastUserId.current = id;
  }, [user?.id]);

  async function signUp(email: string, password: string): Promise<AuthResult> {
    const client = supabase;
    if (!client) return UNAVAILABLE;
    const redirectTo = `${window.location.origin}/compte`;

    // Visitor with an anonymous session (saved trips): upgrade it, the trips stay linked to the same user.
    if (user?.is_anonymous) {
      const { error } = await client.auth.updateUser({ email, password }, { emailRedirectTo: redirectTo });
      return error ? { ok: false, message: frenchError(error) } : { ok: true, needsConfirmation: true };
    }

    const { data, error } = await client.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } });
    if (error) return { ok: false, message: frenchError(error) };
    return { ok: true, needsConfirmation: !data.session };
  }

  async function signIn(email: string, password: string): Promise<AuthResult> {
    const client = supabase;
    if (!client) return UNAVAILABLE;
    const { error } = await client.auth.signInWithPassword({ email, password });
    return error ? { ok: false, message: frenchError(error) } : { ok: true, needsConfirmation: false };
  }

  async function signOut() {
    const client = supabase;
    if (!client) return;
    await client.auth.signOut();
    resetTrip();
    setRecovery(false);
  }

  async function requestPasswordReset(email: string): Promise<AuthResult> {
    const client = supabase;
    if (!client) return UNAVAILABLE;
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/compte` });
    return error ? { ok: false, message: frenchError(error) } : { ok: true, needsConfirmation: false };
  }

  async function setNewPassword(password: string): Promise<AuthResult> {
    const client = supabase;
    if (!client) return UNAVAILABLE;
    const { error } = await client.auth.updateUser({ password });
    if (error) return { ok: false, message: frenchError(error) };
    setRecovery(false);
    return { ok: true, needsConfirmation: false };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        available: supabase !== null,
        recovery,
        signUp,
        signIn,
        signOut,
        requestPasswordReset,
        setNewPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
