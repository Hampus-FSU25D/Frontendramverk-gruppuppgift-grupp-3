import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import RecipeList from "../components/recipes/RecipeList";
import styles from "./RecipesPage.module.css";

export default function RecipesPage() {
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase.from("recipes").select("*");

      if(error) {
        setError("Kunde inte hämta recept");
        setLoading(false);
        return;
      }
      setRecipes(data);

      setLoading(false);
    }
    fetchRecipes();
  }, []);

  if (loading) {
    return <p>Laddar recept...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  if (recipes.length === 0) {
    return <p>Inga recept hittades.</p>;
  }

  return (
    <main className={styles.recipesPage}>
      <h1 className={styles.title}>Alla efterrätter</h1>
      <p className={styles.description}>Utforska läckra dessertrecept från vår kokbok.</p>   
      <RecipeList recipes={recipes} />
    </main>
  );
}