import RecipeList from "../components/recipes/RecipeList";
import styles from "./RecipesPage.module.css";

export default function RecipesPage() {
  return (
    <main className={styles.recipesPage}>
      <h1 className={styles.title}>Alla efterrätter</h1>

      <p className={styles.description}>
        Utforska läckra dessertrecept från vår kokbok.
      </p>

      <RecipeList />
    </main>
  );
}