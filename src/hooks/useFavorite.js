import { useState } from "react";
import { favoritesService } from "../services/favoritesService";
import { useAuth } from "../context/AuthContext";


export const useFavorite = (recipeId) => {
    const userId

    const [isFavorited, setIsFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const checkFavoriteStatus = async () => {
            if (!userId || !recipeId) return;

            try {
                const userFavorites = await favoritesService.getFavorites(userId);

                setIsFavorited(userFavorites.includes(recipeId));
            } catch (error) {
                console.error("Couldn't check initial favorite status", error)
            }
        };
        checkInitialFavoriteStatus();
    }, [userId, recipeId]);


    const toggleFavorites = async () => {
        if (!userId) return;

        try {
            setIsLoading(true);

            await (isFavorited
                ? favoritesService.removeFavorite(userId, recipeId)
                : favoritesService.addFavorite(userId, recipeId));

            setIsFavorited(!isFavorited)
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 4000);

        } catch (error) {
            console.error("Couldn't update favorite status", error)
        } finally {
            setIsLoading(false);
        };

        return {
            isFavorited,
            isLoading,
            showMessage,
            toggleGavorites
        }
    };
};




