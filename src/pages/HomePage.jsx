import { Link } from "react-router-dom";
import RecipeList from "../components/recipes/RecipeList";
import { useRandomRecipes } from "../hooks/useRandomRecipes";
import styles from "./HomePage.module.css";

const HERO_COPY = {
  title: "Dessertboken",
  subtitle:
    "Samla, hitta och spara dina favoritdesserter i en vacker digital kokbok skapad för livsnjutare.",
};

export default function HomePage() {
  const {
    recipes: featuredRecipes,
    loading,
    error,
  } = useRandomRecipes(3);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <h1 id="home-title" className={styles.title}>
              {HERO_COPY.title}
            </h1>

            <p className={styles.subtitle}>{HERO_COPY.subtitle}</p>

            <div className={styles.heroActions}>
              <Link className={styles.primaryAction} to="/recept">
                Utforska recept
              </Link>

              <Link className={styles.secondaryAction} to="/lagg-till">
                Lägg till recept
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.featured} aria-labelledby="featured-heading">
        <div className={styles.featuredHeader}>
          <div>
            <h2 id="featured-heading" className={styles.featuredTitle}>
              Utvalda godbitar
            </h2>
          </div>

          <Link className={styles.allLink} to="/recept">
            Se alla
          </Link>
        </div>

        {loading ? (
          <div className={styles.stateGrid} aria-live="polite">
            {Array.from({ length: 3 }).map((_, index) => (
              <article key={index} className={styles.skeletonCard}>
                <div className={styles.skeletonImage} />
                <div className={styles.skeletonBody}>
                  <div className={styles.skeletonTitle} />
                  <div className={styles.skeletonText} />
                  <div className={styles.skeletonTextShort} />
                </div>
              </article>
            ))}
          </div>
        ) : error ? (
          <div className={styles.messageCard} role="alert">
            <h3>Kunde inte hämta recept</h3>
            <p>{error}</p>
          </div>
        ) : featuredRecipes.length === 0 ? (
          <div className={styles.messageCard}>
            <h3>Inga recept ännu</h3>
            <p>
              Lägg till det första dessertreceptet så visas det här bland
              utvalda godbitar.
            </p>
          </div>
        ) : (
          <RecipeList recipes={featuredRecipes} />
        )}
      </section>
    </div>
  );
}
