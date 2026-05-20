import { useCallback, useEffect, useReducer } from "react";
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

const initialState = {
  recipes: [],
  loading: true,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "fetch_start":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "fetch_success":
      return {
        recipes: action.recipes,
        loading: false,
        error: "",
      };
    case "fetch_error":
      return {
        recipes: [],
        loading: false,
        error: action.message,
      };
    default:
      return state;
  }
}

export function useRandomRecipes(limit = 3) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchRandomRecipes = useCallback(
    async (ignoreRef) => {
      dispatch({ type: "fetch_start" });

      const fetchSize = Math.max(limit * 4, 12);
      const { data, error: fetchError } = await supabase
        .from("recipes")
        .select("id, title, description, image_url")
        .order("created_at", { ascending: false })
        .limit(fetchSize);

      // Guards against setting state if the component unmounts mid-request.
      if (ignoreRef?.current) {
        return;
      }

      if (fetchError) {
        dispatch({ type: "fetch_error", message: fetchError.message });
        return;
      }

      const normalizedRecipes = (data ?? []).map(normalizeRecipe);
      // Pull a slightly larger slice, then randomize down to the requested count.
      const selectedRecipes = shuffleRecipes(normalizedRecipes).slice(0, limit);

      dispatch({ type: "fetch_success", recipes: selectedRecipes });
    },
    [limit]
  );

  useEffect(() => {
    const ignoreRef = { current: false };

    fetchRandomRecipes(ignoreRef);

    return () => {
      ignoreRef.current = true;
    };
  }, [fetchRandomRecipes]);

  const refresh = useCallback(() => {
    fetchRandomRecipes();
  }, [fetchRandomRecipes]);

  return {
    recipes: state.recipes,
    loading: state.loading,
    error: state.error,
    refresh,
  };
}
