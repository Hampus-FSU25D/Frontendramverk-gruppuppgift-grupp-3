import { createContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);

  const login = (nextUser) => {
    setUser(nextUser);
    setIsLoginPromptOpen(false);
  };

  const logout = () => setUser(null);
  const openLoginPrompt = () => setIsLoginPromptOpen(true);
  const closeLoginPrompt = () => setIsLoginPromptOpen(false);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoginPromptOpen,
      login,
      logout,
      openLoginPrompt,
      closeLoginPrompt,
    }),
    [user, isLoginPromptOpen]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
