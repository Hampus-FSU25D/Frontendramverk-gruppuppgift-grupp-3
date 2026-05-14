import { createContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    async function loadSession() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        setAuthError(error.message);
      }

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setAuthLoading(false);
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setAuthLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, password) {
    setAuthError("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setAuthError(error.message);
      return { success: false, error };
    }

    setSession(data.session);
    setUser(data.user);

    return { success: true, data };
  }

  async function signUp(email, password, displayName) {
    setAuthError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      setAuthError(error.message);
      return { success: false, error };
    }

    return { success: true, data };
  }

  async function signOut() {
    setAuthError("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setAuthError(error.message);
      return { success: false, error };
    }

    setUser(null);
    setSession(null);

    return { success: true };
  }

  const value = {
    user,
    session,
    isAuthenticated: Boolean(user),
    authLoading,
    authError,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
