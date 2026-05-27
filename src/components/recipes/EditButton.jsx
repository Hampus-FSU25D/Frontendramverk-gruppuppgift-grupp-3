import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import styles from './EditButton.module.css'; 

const EditButton = ({ recipeId, recipeOwnerId }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user || user.id !== recipeOwnerId) {
    return null;
  }

  const handleEditClick = () => {
    navigate(`/recept/${recipeId}/redigera`); 
  };

  return (
    <button className={styles.editBtn} onClick={handleEditClick}>
      ✏️ Redigera recept
    </button>
  );
};

export default EditButton;