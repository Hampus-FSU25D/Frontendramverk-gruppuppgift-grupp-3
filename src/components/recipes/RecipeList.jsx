import RecipeCard from './RecipeCard';

export default function RecipeList() {
   const recipes = [
  {
    id: 1,
    title: "Chokladtårta",
    description: "Läcker chokladtårta med grädde.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587",
  },
  {
    id: 2,
    title: "Äppelpaj",
    description: "En klassisk äppelpaj med kanel.",
    image:
      "https://plus.unsplash.com/premium_photo-1694336203192-c9e7f2891b95?q=80&w=930&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Pannkakor",
    description: "Tunna och fluffiga pannkakor.",
    image:
      "https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];
    return (
        <section>
            {recipes.map((recipe) => (
             <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </section>      
    );
}