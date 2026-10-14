import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;

// The site keeps working without Supabase: saving trips is simply unavailable until these
// two variables are set (in .env.local locally, or in the host's settings once deployed).
export const supabase: SupabaseClient | null = url && key ? createClient(url, key) : null;
