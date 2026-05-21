import React from 'react'
import { useFavorite } from '../../hooks/useFavorite'
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ recipeId }) => {

  const { isFavorited, isLoading, showMessage, toggleFavorites } = useFavorite(recipeId);
  return (
    <div className={styles.favoriteWrapper}>
      <button 
      className={isFavorited ? styles.heartFull : styles.heartEmpty}
      onClick={toggleFavorites}
      disabled={isLoading}>
        {isFavorited ? '❤️ Favorit' : '🤍 Spara'}
      </button>

      {showMessage && (
        <div className={styles.toast}>
          {isFavorited ? "Tillagd i mina favoriter! ❤️" : "Borttagen från favoriter 🗑️"}
        </div>
      )}
    </div>
  );
};

export default FavoriteButton