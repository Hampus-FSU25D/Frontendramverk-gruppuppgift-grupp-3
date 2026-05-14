import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  const content = children ?? <Outlet />;

  return (
    <div>
      <Header />
      <main>{content}</main>
      <Navbar />
      <Footer />
    </div>
  );
}
