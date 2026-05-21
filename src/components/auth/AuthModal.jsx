import { useEffect, useId, useReducer, useRef } from "react";
import { useAuth } from "../../hooks/useAuth";
import styles from "./AuthModal.module.css";

const initialFormValues = {
  displayName: "",
  email: "",
  password: "",
};

const initialState = {
  mode: "login",
  formValues: initialFormValues,
  validationError: "",
  isSubmitting: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return initialState;
    case "change_field":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: action.value,
        },
      };
    case "toggle_mode":
      return {
        ...state,
        mode: state.mode === "login" ? "register" : "login",
        validationError: "",
      };
    case "set_validation_error":
      return {
        ...state,
        validationError: action.message,
        isSubmitting: false,
      };
    case "start_submitting":
      return {
        ...state,
        validationError: "",
        isSubmitting: true,
      };
    case "stop_submitting":
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}

export default function AuthModal({ isOpen, onClose }) {
  const { authError, signIn, signUp, user } = useAuth();
  const [state, dispatch] = useReducer(reducer, initialState);
  const titleId = useId();
  const messageId = useId();
  const displayNameInputRef = useRef(null);
  const emailInputRef = useRef(null);

  const { mode, formValues, validationError, isSubmitting } = state;

  useEffect(() => {
    if (!isOpen) {
      dispatch({ type: "reset" });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && user) {
      onClose();
    }
  }, [isOpen, onClose, user]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const focusTarget =
      mode === "register" ? displayNameInputRef.current : emailInputRef.current;

    focusTarget?.focus();
  }, [isOpen, mode]);

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    dispatch({ type: "change_field", name, value });
  }

  function handleModeToggle() {
    dispatch({ type: "toggle_mode" });
  }

  function validateForm() {
    const displayName = formValues.displayName.trim();
    const email = formValues.email.trim();
    const password = formValues.password.trim();

    if (mode === "register" && !displayName) {
      return "Namn är obligatoriskt.";
    }

    if (!email) {
      return "E-post är obligatorisk.";
    }

    if (!password) {
      return "Lösenord är obligatoriskt.";
    }

    if (password.length < 6) {
      return "Lösenordet måste vara minst 6 tecken.";
    }

    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errorMessage = validateForm();

    if (errorMessage) {
      dispatch({ type: "set_validation_error", message: errorMessage });
      return;
    }

    dispatch({ type: "start_submitting" });

    const displayName = formValues.displayName.trim();
    const email = formValues.email.trim();
    const password = formValues.password.trim();
    const result =
      mode === "login"
        ? await signIn(email, password)
        : await signUp(email, password, displayName);

    dispatch({ type: "stop_submitting" });

    if (result.success && mode === "login") {
      onClose();
    }
  }

  const title = mode === "login" ? "Logga in" : "Skapa konto";
  const submitLabel = isSubmitting
    ? "Vänta..."
    : mode === "login"
      ? "Logga in"
      : "Registrera";
  const switchLabel =
    mode === "login"
      ? "Har du inget konto? Registrera dig"
      : "Har du redan ett konto? Logga in";
  const message = validationError || authError;
  const hasError = Boolean(message);

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={hasError ? messageId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Stäng modal"
        >
          ×
        </button>

        <div className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === "register" ? (
            <div className={styles.field}>
              <label className={styles.label} htmlFor="auth-display-name">
                Namn
              </label>
              <input
                id="auth-display-name"
                ref={displayNameInputRef}
                className={styles.input}
                type="text"
                name="displayName"
                value={formValues.displayName}
                onChange={handleChange}
                autoComplete="nickname"
                aria-invalid={hasError && !formValues.displayName.trim()}
              />
            </div>
          ) : null}

          <div className={styles.field}>
            <label className={styles.label} htmlFor="auth-email">
              E-post
            </label>
            <input
              id="auth-email"
              ref={emailInputRef}
              className={styles.input}
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              autoComplete="email"
              aria-invalid={hasError && !formValues.email.trim()}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="auth-password">
              Lösenord
            </label>
            <input
              id="auth-password"
              className={styles.input}
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              aria-invalid={hasError && !formValues.password.trim()}
            />
          </div>

          {message ? (
            <p id={messageId} className={styles.error} role="alert">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {submitLabel}
          </button>
        </form>

        <button
          type="button"
          className={styles.switchModeButton}
          onClick={handleModeToggle}
        >
          {switchLabel}
        </button>
      </div>
    </div>
  );
}
