import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, openLoginPrompt } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      openLoginPrompt();
    }
  }, [isAuthenticated, openLoginPrompt]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location, loginRequired: true }} />;
  }

  return children;
}
