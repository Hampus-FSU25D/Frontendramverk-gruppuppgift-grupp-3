import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function shuffleRecipes(recipes) {
  const nextRecipes = [...recipes];

  // Fisher-Yates gives us a fair client-side random subset when Supabase
  // random ordering is not part of the current query.
  for (let index = nextRecipes.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [nextRecipes[index], nextRecipes[swapIndex]] = [
      nextRecipes[swapIndex],
      nextRecipes[index],
    ];
  }

  return nextRecipes;
}

function normalizeRecipe(recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    description: recipe.description ?? "",
    image: recipe.image_url ?? undefined,
  };
}

export function useRandomRecipes(limit = 3) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function fetchRandomRecipes() {
      setLoading(true);
      setError("");

      const fetchSize = Math.max(limit * 4, 12);
      const { data, error: fetchError } = await supabase
        .from("recipes")
        .select("id, title, description, image_url")
        .order("created_at", { ascending: false })
        .limit(fetchSize);

      // Guards against setting state if the component unmounts mid-request.
      if (ignore) {
        return;
      }

      if (fetchError) {
        setRecipes([]);
        setError(fetchError.message);
        setLoading(false);
        return;
      }

      const normalizedRecipes = (data ?? []).map(normalizeRecipe);
      // Pull a slightly larger slice, then randomize down to the requested count.
      const selectedRecipes = shuffleRecipes(normalizedRecipes).slice(0, limit);

      setRecipes(selectedRecipes);
      setLoading(false);
    }

    fetchRandomRecipes();

    return () => {
      ignore = true;
    };
  }, [limit]);

  return {
    recipes,
    loading,
    error,
  };
}
