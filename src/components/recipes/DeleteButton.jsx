import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { deleteService } from '../../services/deleteService'; // Justera sökvägen till din tjänst
import styles from './DeleteButton.module.css';

const DeleteButton = ({ recipeId, recipeOwnerId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user || user.id !== recipeOwnerId) {
    return null;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Är du säker på att du vill radera detta recept? Detta går inte att ångra. 🗑️");
    
    if (!confirmDelete) return;

    try {
      setIsDeleting(true);
      await deleteService.deleteRecipe(recipeId);
      
    /* Send user back to recipelist after delete if sucessfull. */
      navigate('/');
    } catch (error) {
      alert("Kunde inte radera receptet. Försök igen.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      className={styles.deleteBtn} 
      onClick={handleDelete}
      disabled={isDeleting}
    >
      {isDeleting ? 'Raderar...' : '🗑️ Radera recept'}
    </button>
  );
};

export default DeleteButton;