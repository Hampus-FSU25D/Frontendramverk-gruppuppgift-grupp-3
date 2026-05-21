import RecipeList from "../components/recipes/RecipeList";
import styles from "./FavoritesPage.module.css";

export default function FavoritesPage() {
  const favoriteRecepies = [];

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