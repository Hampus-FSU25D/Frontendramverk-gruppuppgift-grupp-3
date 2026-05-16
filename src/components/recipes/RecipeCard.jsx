export default function RecipeCard({ recipe }) {
  return (
    <article>
      <img
        src={recipe.image}
        alt={recipe.title}
        width="250"
      />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <button>Läs recept</button>
    </article>
  );
}