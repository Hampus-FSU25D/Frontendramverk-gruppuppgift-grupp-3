import { useState } from "react";
import styles from "../../styles/AddRecipeForm.module.css";

const AddRecipeForm = ({ onSubmit, initialData = null, isSaving = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    ingredients: initialData?.ingredients || [""],
    instructions: initialData?.instructions || [""], // Changed to array
    tags: initialData?.tags || [],
    imageUrl: initialData?.imageUrl || "",
  });

  const [tagInput, setTagInput] = useState("");

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle ingredients array
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  // Handle instructions array (SAME PATTERN AS INGREDIENTS)
  const handleInstructionChange = (index, value) => {
    const newInstructions = [...formData.instructions];
    newInstructions[index] = value;
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  const addInstruction = () => {
    setFormData((prev) => ({
      ...prev,
      instructions: [...prev.instructions, ""],
    }));
  };

  const removeInstruction = (index) => {
    const newInstructions = formData.instructions.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, instructions: newInstructions }));
  };

  // Handle tags
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty instructions before submitting
    const filteredInstructions = formData.instructions.filter(
      (step) => step.trim() !== "",
    );
    onSubmit?.({ ...formData, instructions: filteredInstructions });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
<h2 className={styles.title}>
  {initialData ? "✏️ Redigera recept" : "✨ Lägg till nytt recept"}
</h2>
      {/* Title */}
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Receptets namn *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          disabled={isSaving}
          className={styles.input}
          placeholder="T.ex. Klassisk chokladkaka"
        />
      </div>

      {/* Description */}
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Beskrivning
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          disabled={isSaving}
          className={styles.textarea}
          placeholder="Kort beskrivning av receptet..."
        />
      </div>

      {/* Ingredients */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Ingredienser *</label>
        {formData.ingredients.map((ingredient, index) => (
          <div key={index} className={styles.dynamicRow}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
              disabled={isSaving}
              className={styles.dynamicInput}
              placeholder={`Ingrediens ${index + 1}`}
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                disabled={isSaving}
                className={styles.removeBtn}
                aria-label="Ta bort ingrediens"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          disabled={isSaving}
          className={styles.addBtn}
        >
          + Lägg till ingrediens
        </button>
      </div>

      {/* Instructions - NOW DYNAMIC like ingredients */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Instruktioner *</label>
        {formData.instructions.map((instruction, index) => (
          <div key={index} className={styles.dynamicRow}>
            <textarea
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
              disabled={isSaving}
              className={styles.dynamicTextarea}
              placeholder={`Steg ${index + 1}`}
              rows={2}
            />
            {formData.instructions.length > 1 && (
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                disabled={isSaving}
                className={styles.removeBtn}
                aria-label="Ta bort steg"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addInstruction}
          disabled={isSaving}
          className={styles.addBtn}
        >
          + Lägg till steg
        </button>
      </div>

      {/* Tags */}
      <div className={styles.formGroup}>
        <label className={styles.label}>Taggar</label>
        <div className={styles.tagInputWrapper}>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isSaving}
            className={styles.tagInput}
            placeholder="T.ex. Choklad, Glutenfri, Snabbt"
          />
          <button
            type="button"
            onClick={addTag}
            disabled={isSaving}
            className={styles.addTagBtn}
          >
            Lägg till
          </button>
        </div>
        <div className={styles.tagsList}>
          {formData.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={isSaving}
                className={styles.removeTagBtn}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Image URL */}
      <div className={styles.formGroup}>
        <label htmlFor="imageUrl" className={styles.label}>
          Bild-URL (valfritt)
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          disabled={isSaving}
          className={styles.input}
          placeholder="https://example.com/din-bild.jpg"
        />
      </div>

      {/* Submit */}
      <button type="submit" disabled={isSaving} className={styles.submitBtn}>
        {isSaving ? "Sparar..." : "📖 Publicera recept"}
      </button>
    </form>
  );
};

export default AddRecipeForm;
