import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import AddRecipeForm from "../components/form/AddRecipeForm";
import styles from "../styles/AddRecipeForm.module.css";
const EditRecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  console.log("EditRecipePage rendering with ID:", id);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      console.log("Fetching recipe for edit:", id);

      const { data, error } = await supabase
        .from("recipes")
        .select(
          `
          *,
          categories (name),
          ingredients (name, amount, sort_order),
          instructions (step_number, description)
        `,
        )
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching recipe:", error);
        alert("Kunde inte hitta receptet");
        navigate("/recept");
      } else {
        console.log("Recipe loaded for edit:", data);

        const formattedRecipe = {
          title: data.title,
          description: data.description || "",
          ingredients: data.ingredients?.map((i) => i.name).filter(Boolean) || [
            "",
          ],
          instructions: data.instructions
            ?.sort((a, b) => a.step_number - b.step_number)
            .map((i) => i.description)
            .filter(Boolean) || [""],
          tags: data.categories?.name ? [data.categories.name] : [],
          imageUrl: data.image_url || "",
        };

        setRecipe(formattedRecipe);
      }
    } catch (err) {
      console.error("Error in fetchRecipe:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (recipeData) => {
    console.log("Updating recipe:", recipeData);
    setIsSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Du måste vara inloggad!");
      setIsSaving(false);
      return;
    }

    try {
      // Update category
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

      // Update recipe
      const { error: updateError } = await supabase
        .from("recipes")
        .update({
          title: recipeData.title,
          description: recipeData.description || null,
          category_id: categoryId,
          image_url: recipeData.imageUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (updateError) throw updateError;

      // Delete and re-insert ingredients
      await supabase.from("ingredients").delete().eq("recipe_id", id);
      const validIngredients = recipeData.ingredients
        .filter((ing) => ing && ing.trim())
        .map((ing, idx) => ({
          recipe_id: id,
          name: ing,
          amount: "",
          sort_order: idx,
        }));
      if (validIngredients.length) {
        await supabase.from("ingredients").insert(validIngredients);
      }

      // Delete and re-insert instructions
      await supabase.from("instructions").delete().eq("recipe_id", id);
      const steps = recipeData.instructions
        .filter((step) => step && step.trim())
        .map((step, idx) => ({
          recipe_id: id,
          step_number: idx + 1,
          description: step.trim(),
        }));
      if (steps.length) {
        await supabase.from("instructions").insert(steps);
      }

      setShowSuccess(true);
      setTimeout(() => navigate("/recept"), 1500);
    } catch (error) {
      console.error("Error updating recipe:", error);
      alert(`Fel: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Laddar recept...
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Recept hittades inte</h2>
        <button onClick={() => navigate("/recept")}>Tillbaka</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", background: "#f9f9f9" }}>
      {/* BACK LINK */}
      <Link to={`/recept/${id}`} className={styles.backLink}>
        ← Tillbaka till receptet
      </Link>
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
          <h3>🎉 Recept uppdaterat!</h3>
          <p>Omdirigerar...</p>
        </div>
      )}

      <AddRecipeForm
        onSubmit={handleUpdate}
        initialData={recipe}
        isSaving={isSaving}
      />
    </div>
  );
};

export default EditRecipePage;
