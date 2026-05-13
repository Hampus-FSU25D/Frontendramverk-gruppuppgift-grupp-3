import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Layout from "../components/layout/Layout";
import routes from "./routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => {
          const PageComponent = route.element;
          const pageElement = route.requiresAuth ? (
            <ProtectedRoute>
              <PageComponent />
            </ProtectedRoute>
          ) : (
            <PageComponent />
          );

          return <Route key={route.path} path={route.path} element={pageElement} />;
        })}
      </Route>
    </Routes>
  );
}
