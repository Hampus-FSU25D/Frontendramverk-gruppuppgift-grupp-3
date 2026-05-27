import { supabase } from "../lib/supabaseClient.js"

export const favoritesService = {
    /** Get all favorites from  
        @param {string} userId
        @returns {Promise<string[]>}
     */
    getFavorites: async (userId) => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .select('recipe_id')
                .eq('user_id', userId)

            if (error) throw error;

            return data.map(fav => fav.recipe_id)
        } catch (error) {
            console.error("Error getting favorites", error.message);
            throw error;
        }
    },
    /** Adds favorite to favorites
    @param {string} userId
    @param {string} recipeId
     */
    addFavorite: async (userId, recipeId) => {
        try {
            const { data, error } = await supabase
                .from('favorites')
                .insert([
                    { user_id: userId, recipe_id: recipeId }
                ])
                .select();

            if (error) throw error;
            return data;

        } catch (error) {
            console.error('Error adding favorite', error.message);
            throw error;

        }
    },
    /**
       * Removes recipe from favorites
       * @param {string} userId
       * @param {string} recipeId 
       */
    removeFavorite: async (userId, recipeId) => {
        try {
            const { error } = await supabase
                .from('favorites')
                .delete()
                .eq('user_id', userId)
                .eq('recipe_id', recipeId);

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('Fel vid borttagning av favorit:', error.message);
            throw error;
        }
    }
};

