import AddRecipePage from "../pages/AddRecipePage";
import FavoritesPage from "../pages/FavoritesPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import RecipeDetailsPage from "../pages/RecipeDetailsPage";
import RecipesPage from "../pages/RecipesPage";

const routes = [
  {
    path: "/",
    element: HomePage,
    label: "Start",
    showInNav: true,
    requiresAuth: false,
  },
  {
    path: "/recept",
    element: RecipesPage,
    label: "Recept",
    showInNav: true,
    requiresAuth: false,
  },
  {
    path: "/recept/:id",
    element: RecipeDetailsPage,
    label: "Receptdetaljer",
    showInNav: false,
    requiresAuth: false,
  },
  {
    path: "/favoriter",
    element: FavoritesPage,
    label: "Favoriter",
    showInNav: true,
    requiresAuth: true,
  },
  {
    path: "/lagg-till",
    element: AddRecipePage,
    label: "Lägg till recept",
    showInNav: true,
    requiresAuth: true,
  },
  {
    path: "*",
    element: NotFoundPage,
    label: "Inte hittad",
    showInNav: false,
    requiresAuth: false,
  },
];

export default routes;