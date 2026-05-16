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
        <button className={styles.recipeButton}>Visa recept</button>
      </div>
    </article>
  );
}