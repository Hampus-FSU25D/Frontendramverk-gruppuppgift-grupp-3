import { useState } from "react";
import { favoritesService } from "../services/favoritesService";

const [isFavorited, setIsFavorited] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [showMessage, setShowMessage] = useState(false);

const toggleFavorites = async () => {
    if(!userId) return;

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
    }}




//  ** Detta tipsar AI om att det kan användas.
// className={isFavorited ? styles.heartFull : styles.heartEmpty}
