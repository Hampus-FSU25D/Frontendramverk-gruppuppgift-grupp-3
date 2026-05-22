export const deleteService = {
  /**
   * Will delete one specific recipe only if the userId and the created_by is matching. **
   * @param {string} recipeId 
   * @returns {Promise<boolean>}
   */
  deleteRecipe: async (recipeId) => {
    try {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', recipeId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Fel vid borttagning av recept:', error.message);
      throw error;
    }
  }
};