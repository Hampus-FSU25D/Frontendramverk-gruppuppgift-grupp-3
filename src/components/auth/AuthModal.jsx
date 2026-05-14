import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/useAuth";

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgb(18 18 24 / 60%);
`;

const ModalCard = styled.div`
  position: relative;
  width: min(100%, 28rem);
  padding: 2rem;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: 0;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
`;

const Title = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.9rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  background: var(--color-surface-alt);

  &:focus {
    outline: 2px solid var(--color-secondary);
    outline-offset: 2px;
  }
`;

const Message = styled.p`
  margin: 0;
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  font-size: 0.95rem;
  background: ${({ $variant }) =>
    $variant === "error" ? "var(--color-error-bg)" : "var(--color-info-bg)"};
  color: ${({ $variant }) =>
    $variant === "error" ? "var(--color-error)" : "var(--color-text)"};
`;

const SubmitButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 0.85rem 1rem;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  background: var(--color-primary);
  color: #fff;
  box-shadow: var(--shadow-button);
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const SwitchButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  border: 0;
  border-radius: var(--radius-pill);
  padding: 0.85rem 1rem;
  background: var(--color-secondary-light);
  color: var(--color-text);
  cursor: pointer;
`;

const initialFormValues = {
  displayName: "",
  email: "",
  password: "",
};

export default function AuthModal({ isOpen, onClose }) {
  const { authError, signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState("login");
  const [formValues, setFormValues] = useState(initialFormValues);
  const [validationError, setValidationError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setMode("login");
      setFormValues(initialFormValues);
      setValidationError("");
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && user) {
      onClose();
    }
  }, [isOpen, onClose, user]);

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  }

  function handleModeToggle() {
    setMode((currentMode) =>
      currentMode === "login" ? "register" : "login"
    );
    setValidationError("");
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
      setValidationError(errorMessage);
      return;
    }

    setValidationError("");
    setIsSubmitting(true);

    const displayName = formValues.displayName.trim();
    const email = formValues.email.trim();
    const password = formValues.password.trim();
    const result =
      mode === "login"
        ? await signIn(email, password)
        : await signUp(email, password, displayName);

    setIsSubmitting(false);

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

  return (
    <Overlay onClick={onClose} role="presentation">
      <ModalCard
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseButton
          type="button"
          onClick={onClose}
          aria-label="Stäng modal"
        >
          x
        </CloseButton>

        <Title id="auth-modal-title">{title}</Title>

        <Form onSubmit={handleSubmit}>
          {mode === "register" ? (
            <>
              <Label htmlFor="auth-display-name">Namn</Label>
              <Input
                id="auth-display-name"
                type="text"
                name="displayName"
                value={formValues.displayName}
                onChange={handleChange}
                autoComplete="nickname"
              />
            </>
          ) : null}

          <Label htmlFor="auth-email">E-post</Label>
          <Input
            id="auth-email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <Label htmlFor="auth-password">Lösenord</Label>
          <Input
            id="auth-password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
          />

          {validationError ? (
            <Message $variant="error">{validationError}</Message>
          ) : null}

          {!validationError && authError ? (
            <Message $variant="error">{authError}</Message>
          ) : null}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {submitLabel}
          </SubmitButton>
        </Form>

        <SwitchButton type="button" onClick={handleModeToggle}>
          {switchLabel}
        </SwitchButton>
      </ModalCard>
    </Overlay>
  );
}
