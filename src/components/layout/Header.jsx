import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header({
  isLoggedIn = false,
  onLogin,
  onLogout,
  isAuthBusy = false,
}) {
  const buttonLabel = isAuthBusy
    ? "Laddar..."
    : isLoggedIn
      ? "Logga ut"
      : "Logga in";

  function handleAuthClick() {
    if (isAuthBusy) {
      return;
    }

    if (isLoggedIn) {
      onLogout?.();
      return;
    }

    onLogin?.();
  }

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brandWrap}>
          <Link
            to="/"
            className={styles.brandLink}
            aria-label="Dessertboken startsida"
          >
            <span className={styles.brand}>Dessertboken</span>
          </Link>
        </div>

        <div className={styles.authSide}>
          <button
            type="button"
            className={styles.authButton}
            onClick={handleAuthClick}
            disabled={isAuthBusy}
            aria-label={buttonLabel}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </header>
  );
}
