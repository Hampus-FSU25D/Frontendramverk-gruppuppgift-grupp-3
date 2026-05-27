import { useState, useEffect, useContext } from "react";
import { favoritesService } from "../services/favoritesService";
import { AuthContext } from "../context/AuthContext";

export const useFavorite = (recipeId) => {
    const { user } = useContext(AuthContext);
    const userId = user?.id;

    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    /* ÄNDRING: Ändrad till sträng eller null för att hantera olika meddelandetyper */
    const [errorMessage, setErrorMessage] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);

    // Typ-säkra ID:t om det råkar vara en sträng från URL:en
    const targetRecipeId = typeof recipeId === 'string' && !isNaN(recipeId) ? Number(recipeId) : recipeId;

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!userId || !targetRecipeId) return;

            try {
                const userFavorites = await favoritesService.getFavorites(userId);
                setIsFavorited(userFavorites.includes(targetRecipeId));
            } catch (error) {
                console.error("Couldn't check initial favorite status", error);
            }
        };
        checkFavoriteStatus();
    }, [userId, targetRecipeId]);


    const toggleFavorites = async () => {
        /* FIX: Om användaren inte är inloggad, trigga felmeddelandet! */
        if (!userId) {
            setErrorMessage("Du måste vara inloggad för att spara favoriter! 🔒");
            // Stäng av felmeddelandet automatiskt efter 3 sekunder
            setTimeout(() => setErrorMessage(null), 3000);
            return;
        }

        try {
            setIsLoading(true);

            if (isFavorited) {
                await favoritesService.removeFavorite(userId, targetRecipeId);
                setIsFavorited(false);
            } else {
                await favoritesService.addFavorite(userId, targetRecipeId);
                setIsFavorited(true);
            }

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);

        } catch (error) {
            console.error("Couldn't update favorite status", error);
            setErrorMessage("Kunde inte spara. Försök igen!");
            setTimeout(() => setErrorMessage(null), 3000);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isFavorited,
        isLoading,
        showMessage: showSuccess,
        errorMessage,             
        toggleFavorites
    };
};