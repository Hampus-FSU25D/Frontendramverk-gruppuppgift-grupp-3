import { Link, useLocation } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <div className={styles.card}>
        <p className={styles.eyebrow}>404</p>
        <h1 id="not-found-title" className={styles.title}>
          Sidan finns inte
        </h1>
        <p className={styles.message}>
          Sidan <span className={styles.path}>{location.pathname}</span> kunde
          inte hittas. Gå tillbaka till startsidan för att fortsätta.
        </p>
        <Link className={styles.action} to="/">
          Till startsidan
        </Link>
      </div>
    </section>
  );
}
