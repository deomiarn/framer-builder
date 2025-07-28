import { type ReactNode, useEffect, useState } from "react";
import { supabase } from "@/shared/lib/supabase";
import { AuthCtx } from "./AuthContext";

type Session = Awaited<
  ReturnType<typeof supabase.auth.getSession>
>["data"]["session"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // initial session fetch
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    // listen to future changes
    const { data: sub } = supabase.auth.onAuthStateChange((_e, sess) =>
      setSession(sess),
    );
    return () => sub.subscription.unsubscribe();
  }, []);

  async function signIn(email: string) {
    await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: location.origin },
    });
    alert("Magic link sent! Check your inbox.");
  }

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthCtx.Provider value={{ session, loading, signIn, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}
