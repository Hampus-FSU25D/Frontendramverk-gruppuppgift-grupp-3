import { useState } from "react";
import { Outlet } from "react-router-dom";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "../../hooks/useAuth";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const { user, signOut, authLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const content = children ?? <Outlet />;

  return (
    <>
      <Header
        isLoggedIn={Boolean(user)}
        isAuthBusy={authLoading}
        onLogin={() => setIsLoginOpen(true)}
        onLogout={signOut}
      />
      <main>{content}</main>
      <Navbar 
      onLogin={() => setIsLoginOpen(true)}
      />
      <Footer />
      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}
