import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import homeIcon from '../../assets/home.png' ;
import cookBook from '../../assets/cookBook.png'
import add from '../../assets/add.png'
import favorite from '../../assets/favorite.png'

export default function Navbar() {
  return (
    <nav className={styles.mainNav}>
            <ul className={styles.navList}>
                <li><Link to="/"><img src={homeIcon} width='35px'/>
                Start</Link></li>
                <li><Link to="/recept"><img src={cookBook} width='40px'/>
                Recept</Link></li>
                <li><Link to="/lagg-till"><img src={add} width='40px'/>Lägg till</Link></li>
                <li><Link to="/favoriter"><img src={favorite} width='40px'/>Favoriter</Link></li>
            </ul>
    </nav>
  );
}
