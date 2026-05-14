import { useState } from "react";
import styled from "styled-components";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "../../hooks/useAuth";

const HeaderBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(255 253 247 / 92%);
  border-bottom: 1px solid var(--color-border);
  backdrop-filter: blur(12px);
`;

const HeaderInner = styled.div`
  width: min(calc(100% - 2rem), var(--max-width));
  margin: 0 auto;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const Eyebrow = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--color-text-muted);
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(1.5rem, 2vw, 2rem);
`;

const AuthSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const UserText = styled.span`
  max-width: min(40vw, 18rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-muted);
`;

const StatusText = styled.span`
  max-width: min(40vw, 18rem);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text-muted);
`;

const AuthButton = styled.button`
  border: 0;
  border-radius: var(--radius-pill);
  padding: 0.75rem 1.1rem;
  background: ${({ $secondary }) =>
    $secondary ? "var(--color-text)" : "var(--color-primary)"};
  color: #fff;
  cursor: pointer;
  box-shadow: ${({ $secondary }) =>
    $secondary ? "var(--shadow-card)" : "var(--shadow-button)"};
  transition: background-color 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ $secondary }) =>
      $secondary ? "#1f1f24" : "var(--color-primary-dark)"};
    transform: translateY(-1px);
  }
`;

export default function Header() {
  const { user, signOut, authLoading } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <HeaderBar>
        <HeaderInner>
          <Brand>
            <Title>Dessertboken</Title>
          </Brand>

          <AuthSection>
            {user?.email ? <UserText title={user.email}>{user.email}</UserText> : null}

            {authLoading ? (
              <StatusText>Laddar...</StatusText>
            ) : user ? (
              <AuthButton type="button" $secondary onClick={signOut}>
                Logga ut
              </AuthButton>
            ) : (
              <AuthButton type="button" onClick={() => setIsLoginOpen(true)}>
                Logga in
              </AuthButton>
            )}
          </AuthSection>
        </HeaderInner>
      </HeaderBar>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />
    </>
  );
}
