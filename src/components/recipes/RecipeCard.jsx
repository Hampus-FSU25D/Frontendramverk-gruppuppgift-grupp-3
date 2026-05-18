import { Link } from "react-router-dom";
import styles from "./RecipeCard.module.css";

export default function RecipeCard({ recipe }) {
  return (
    <article className={styles.recipeCard}>
      <img
        className={styles.recipeImage}
        src={recipe.image}
        alt={recipe.title}
      />

      <div className={styles.recipeContent}>
        <h2>{recipe.title}</h2>

        <p>{recipe.description}</p>

        <Link 
            className={styles.recipeButton}
            to={`/recept /${recipe.id}`}>Visa recept</Link>
      </div>
    </article>
  );
}