import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";
import FavoriteButton from "./FavoriteButton" 

export default function RecipeCard({ recipe }) {
  return (
    <article className={styles.recipeCard}>
      <img
        className={styles.recipeImage}
        src={recipe.image_url}
        alt={recipe.title}
      />

      <div className={styles.recipeContent}>
        {recipe.categories?.name && (
            <span className={styles.categoryTag}>
                {recipe.categories.name}
            </span>
        )}
        <FavoriteButton recipeId={recipe.id} />
        <h2>{recipe.title}</h2>
        <p>{recipe.description}</p>

        <Link 
            className={styles.recipeButton}
            to={`/recept/${recipe.id}`}>Visa recept</Link>
      </div>
    </article>
  );
}