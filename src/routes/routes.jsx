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
  },
  {
    path: "/recept",
    element: RecipesPage,
    label: "Recept",
  },
  {
    path: "/recept/:id",
    element: RecipeDetailsPage,
    label: "Receptdetaljer",
  },
  {
    path: "/favoriter",
    element: FavoritesPage,
    label: "Favoriter",
    requiresAuth: true,
  },
  {
    path: "/lagg-till",
    element: AddRecipePage,
    label: "Lagg till recept",
    requiresAuth: true,
  },
  {
    path: "*",
    element: NotFoundPage,
    label: "Inte hittad",
  },
];

export default routes;
