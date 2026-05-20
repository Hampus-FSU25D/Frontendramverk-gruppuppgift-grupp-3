import { useState } from 'react';
import styles from '../../styles/AddRecipeForm.module.css';

const AddRecipeForm = ({ onSubmit, initialData = null, isSaving = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    ingredients: initialData?.ingredients || [''],
    instructions: initialData?.instructions || '',
    tags: initialData?.tags || [],
    imageUrl: initialData?.imageUrl || '',
  });

  const [tagInput, setTagInput] = useState('');

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle ingredients array
  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = formData.ingredients.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ingredients: newIngredients }));
  };

  // Handle tags
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>✨ Lägg till nytt recept</h2>

      {/* Title */}
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Receptets namn *</label>
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
        <label htmlFor="description" className={styles.label}>Beskrivning</label>
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
          <div key={index} className={styles.ingredientRow}>
            <input
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
              disabled={isSaving}
              className={styles.ingredientInput}
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

      {/* Instructions */}
      <div className={styles.formGroup}>
        <label htmlFor="instructions" className={styles.label}>Instruktioner *</label>
        <textarea
          id="instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          rows={6}
          required
          disabled={isSaving}
          className={styles.textarea}
          placeholder="Steg för steg hur man lagar receptet...&#10;1. Gör så här&#10;2. Gör så här&#10;3. Gör så här"
        />
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
        <label htmlFor="imageUrl" className={styles.label}>Bild-URL (valfritt)</label>
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
      <button 
        type="submit" 
        disabled={isSaving}
        className={styles.submitBtn}
      >
        {isSaving ? "Sparar..." : "📖 Publicera recept"}
      </button>
    </form>
  );
};

export default AddRecipeForm;