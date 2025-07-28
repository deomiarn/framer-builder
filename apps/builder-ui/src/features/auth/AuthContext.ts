import { createContext, useContext } from "react";
import type { AuthError, Session } from "@supabase/supabase-js";

interface Auth {
  session: Session | null;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

export const AuthCtx = createContext<Auth | null>(null);
export const useAuthCtx = () => useContext(AuthCtx)!;
