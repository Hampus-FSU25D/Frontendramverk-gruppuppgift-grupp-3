import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

import FavoriteButton from "../components/recipes/FavoriteButton";
import DeleteButton from "../components/recipes/DeleteButton";
import EditButton from "../components/recipes/EditButton";

import styles from "./RecipeDetailsPage.module.css";


export default function RecipeDetailsPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("recipes")
          .select(`
            *,
            categories (name),
            ingredients (*),
            instructions (*)
          `)
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data.ingredients) {
          data.ingredients.sort((a, b) => a.sort_order - b.sort_order);
        }
        if (data.instructions) {
          data.instructions.sort((a, b) => a.step_number - b.step_number);
        }

        setRecipe(data);
      } catch (err) {
        console.error(err);
        setError("Kunde inte ladda receptet.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <p className={`${styles.stateMessage} ${styles.loading}`}>Laddar det goda...</p>;
  }

  if (error || !recipe) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.error}>{error || "Receptet hittades inte."}</p>
        <Link to="/" className={styles.backButton}>Tillbaka till alla efterrätter</Link>
      </div>
    );
  }

  return (
    <main className={styles.detailsPage}>
      <Link to="/recept" className={styles.backLink}>← Tillbaka till alla efterrätter</Link>

      <header className={styles.recipeHeader}>
        <div className={styles.titleRow}>
          <h1>{recipe.title}</h1>

          <div className={styles.actionButtons}> 
          <FavoriteButton recipeId={recipe.id} />
          
  </div>
</div>
        
        {recipe.categories?.name && (
          <span className={styles.categoryTag}>{recipe.categories.name}</span>
        )}
        
        <p className={styles.description}>{recipe.description}</p>
      </header>

      <div className={styles.mainLayoutGrid}>
        
        <div className={styles.imageWrapper}>
          <img src={recipe.image_url} alt={recipe.title} className={styles.recipeImage} />
        </div>

        <section className={styles.section}>
          <h2>Ingredienser</h2>
          {recipe.ingredients && recipe.ingredients.length > 0 ? (
            <ul className={styles.ingredientsList}>
              {recipe.ingredients.map((ing) => (
                <li key={ing.id} className={styles.ingredientItem}>
                  {ing.amount && <span className={styles.amount}>{ing.amount} </span>}
                  <span className={styles.ingredientName}>{ing.name}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Ingredienser saknas för detta recept.</p>
          )}
        </section>

        <section className={`${styles.section} ${styles.instructionsSection}`}>
          <h2>Gör så här</h2>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            <ol className={styles.instructionsList}>
              {recipe.instructions.map((step) => (
                <li key={step.id} className={styles.instructionItem}>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p>Instruktioner saknas för detta recept.</p>
          )}
        </section>

      </div>
      <div className={styles.actionButtons}>
      <EditButton recipeId={recipe.id} recipeOwnerId={recipe.created_by }/>
      <DeleteButton recipeId={recipe.id} recipeOwnerId={recipe.created_by} /></div>
    </main>
  );
}