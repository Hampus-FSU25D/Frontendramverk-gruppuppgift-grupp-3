import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import RecipeList from "../components/recipes/RecipeList";
import styles from "./RecipesPage.module.css";

export default function RecipesPage() {
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  
  useEffect(() => {
    async function fetchRecipes() {
      const { data, error } = await supabase
      .from("recipes")
      .select(`*, categories (name)`);
      
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
      return <p className={`${styles.stateMessage} ${styles.loading}`}>Laddar recept...</p>;
    }

    if (error) {
      return <p className={`${styles.stateMessage} ${styles.error}`}>{error}</p>;
    }

    if (recipes.length === 0) {
      return <p className={`${styles.stateMessage} ${styles.empty}`}>Inga recept hittades.</p>;
    }
  
  const filteredRecipes = recipes.filter((recipe) =>
  recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <main className={styles.recipesPage}>
      <h1 className={styles.title}>Alla efterrätter</h1>
      <p className={styles.description}>Utforska läckra dessertrecept från vår kokbok.</p>   
      <input className={styles.searchInput}
        type="text"
        placeholder="Sök efter dessert..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      {filteredRecipes.length === 0 ? (
        <p className={styles.searchMessage}>Inga recept matchade din sökning.</p>
      ) : (
        <RecipeList recipes={filteredRecipes} />
      )}
    </main>
  );
}
