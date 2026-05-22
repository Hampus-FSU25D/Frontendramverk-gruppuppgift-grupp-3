import React from 'react'
import { useFavorite } from '../../hooks/useFavorite'
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ recipeId }) => {
  /* Hämta ut errorMessage från din hook */
  const { isFavorited, isLoading, showMessage, errorMessage, toggleFavorites } = useFavorite(recipeId);

  return (
    <div className={styles.favoriteWrapper}>
      <button 
        className={isFavorited ? styles.heartFull : styles.heartEmpty}
        onClick={toggleFavorites}
        disabled={isLoading}
      >
        {isFavorited ? '❤︎' : '❤︎⁠'}
      </button>

      {errorMessage && (
        <div className={`${styles.toast} ${styles.toastError}`}>
          {errorMessage}
        </div>
      )}

      {showMessage && !errorMessage && (
        <div className={styles.toast}>
          {isFavorited ? "Tillagd i mina favoriter! ❤️" : "Borttagen från favoriter 🗑️"}
        </div>
      )}
    </div>
  );
};

export default FavoriteButton;