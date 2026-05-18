import RecipeCard from './RecipeCard';
import styles from "./RecipeList.module.css";

export default function RecipeList({ recipes }) {
    return (
    <section className={styles.recipeList}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </section>
  );
}
