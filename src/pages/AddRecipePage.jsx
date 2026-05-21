import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AddRecipeForm from "../components/form/AddRecipeForm";

const AddRecipePage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [savedTitle, setSavedTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (recipeData) => {
    console.log("Nytt recept:", recipeData);
    setIsSaving(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Du måste vara inloggad för att lägga till recept!");
      setIsSaving(false);
      return;
    }

    try {
      // Category handling
      let categoryId = null;
      if (recipeData.tags && recipeData.tags.length > 0) {
        const firstTag = recipeData.tags[0];
        const { data: existingCat } = await supabase
          .from("categories")
          .select("id")
          .eq("name", firstTag)
          .maybeSingle();

        if (existingCat) {
          categoryId = existingCat.id;
        } else {
          const { data: newCat } = await supabase
            .from("categories")
            .insert({ name: firstTag })
            .select()
            .single();
          if (newCat) categoryId = newCat.id;
        }
      }

      // Save recipe
      const { data: recipe, error: recipeError } = await supabase
        .from("recipes")
        .insert({
          title: recipeData.title,
          description: recipeData.description || null,
          category_id: categoryId,
          difficulty: "Medel",
          time_minutes: 30,
          image_url: recipeData.imageUrl || null,
          created_by: user.id,
        })
        .select()
        .single();

      if (recipeError) throw recipeError;

      // Save ingredients
      const validIngredients = recipeData.ingredients
        .filter((ing) => ing && ing.trim())
        .map((ing, idx) => ({
          recipe_id: recipe.id,
          name: ing,
          amount: "",
          sort_order: idx,
        }));

      if (validIngredients.length) {
        await supabase.from("ingredients").insert(validIngredients);
      }

      //instructions is already an array
      const steps = recipeData.instructions
        .filter((step) => step && step.trim() !== "")
        .map((step, idx) => ({
          recipe_id: recipe.id,
          step_number: idx + 1,
          description: step.trim(),
        }));

      if (steps.length) {
        await supabase.from("instructions").insert(steps);
      }

      // Show success and redirect
      setSavedTitle(recipeData.title);
      setShowSuccess(true);
      setTimeout(() => navigate("/recept"), 1500);
    } catch (error) {
      console.error("Error:", error);
      alert(`Fel: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", background: "#f9f9f9" }}>
      {showSuccess && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "1rem 2rem",
            borderRadius: "8px",
            zIndex: 1000,
            textAlign: "center",
          }}
        >
          <h3>🎉 Recept sparat!</h3>
          <p>"{savedTitle}" har lagts till i receptboken.</p>
        </div>
      )}
      <AddRecipeForm onSubmit={handleSubmit} isSaving={isSaving} />
    </div>
  );
};

export default AddRecipePage;
