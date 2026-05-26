import React, { useState } from 'react'; // 1. Importera useState
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; 
import styles from './Navbar.module.css';
import homeIcon from '../../assets/home.png';
import cookBook from '../../assets/cookbook.png';
import add from '../../assets/add.png';
import favorite from '../../assets/favorite.png';

export default function Navbar({ onLogin }) {
  const { isAuthenticated } = useAuth(); 

  // 2. Skapa states för din lokala Navbar-toast
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleProtectedClick = (e, message) => {
    if (!isAuthenticated) {
      e.preventDefault(); // Stoppa länken från att hoppa till en annan sida
      
      // 3. Sätt meddelandet och aktivera toasten
      setToastMessage(message);
      setShowToast(true);

      // 4. Stäng av toasten automatiskt efter 3 sekunder
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      
      setTimeout(() => {
        if (onLogin) {
          onLogin(); 
        }
      }, 800); // <-- Ändra denna siffra för att göra fördröjningen längre eller kortare
    }
  };

  return (
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        <li>
          <Link to="/"><img src={homeIcon} width='30px' alt="Start" />Start</Link>
        </li>
        <li>
          <Link to="/recept"><img src={cookBook} width='35px' alt="Recept" />Recept</Link>
        </li>

        {/* LÄGG TILL (Skyddad) */}
        <li className={!isAuthenticated ? styles.disabledListItem : ''}>
          <Link 
            to="/lagg-till" 
            onClick={(e) => handleProtectedClick(e, 'Du måste vara inloggad för att lägga till recept! 🔒')}
            className={!isAuthenticated ? styles.disabledLink : ''}
          >
            <img src={add} width='35px' alt="Lägg till" />
            Lägg till
          </Link>
        </li>

        {/* FAVORITER (Skyddad) */}
        <li className={!isAuthenticated ? styles.disabledListItem : ''}>
          <Link 
            to="/favoriter" 
            onClick={(e) => handleProtectedClick(e, 'Du måste vara inloggad för att se dina favoriter! 🔒')}
            className={!isAuthenticated ? styles.disabledLink : ''}
          >
            <img src={favorite} width='35px' alt="Favoriter" />
            Favoriter
          </Link>
        </li>
      </ul>

      {/* 5. DIN TOAST: Denna ritas bara ut om showToast är true */}
      {showToast && (
        <div className={`${styles.toast} ${styles.toastError}`}>
          {toastMessage}
        </div>
      )}
    </nav>
  );
}