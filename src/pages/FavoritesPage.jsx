import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import RecipeList from "../components/recipes/RecipeList";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const [favoriteRecepies, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      const { data, error} = await supabase
        .from('favorites')
        .select(`recipes (id, title, description, image_url, categories (name))`);
        
  
      if(error) {
        console.error(error);
        setLoading(false);
        return;
      }  
      
      const recipes = data.map((favorite) => favorite.recipes);
      
      setFavoriteRecipes(recipes);
      setLoading(false);
    }
    fetchFavorites();
  }, []);
  
  if(loading) {
    return <p>Laddar favoriter...</p>
  }
  
  return (
    <main className={styles.favoritesPage}>
      <h1 className={styles.title}>Mina favoriter</h1>

      {favoriteRecepies.length === 0 ? (
        <div className={styles.emptyState}>
          <h2 className={styles.emptyText}>Du har inga favoritrecept ännu.</h2>
        </div>
      ) : (
        <RecipeList recipes={favoriteRecepies}/>
      )}
    </main>
  );
}