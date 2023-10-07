import { useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';

import * as S from './SignUp.styled';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useSignUp } from '../../hooks/useSignUp';

export const SignUp = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { signUp, isLoading } = useSignUp();

  const context = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signUp(userEmail, userPassword);
      if (!isLoading) {
        localStorage.setItem('token', response.idToken);
        context?.dispatch({
          type: 'SET_USER_TOKEN',
          payload: response.idToken,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <S.Label aria-label="User Email Label">
          Email:
          <input type="email" onChange={(e) => setUserEmail(e.target.value)} />
        </S.Label>
        <S.Label aria-label="User Password Label">
          Password:
          <input
            type="password"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </S.Label>
        <S.SubmitButton
          type="submit"
          aria-label="Search Button"
          variant="contained"
          disabled={!userEmail || !userPassword || userPassword.length < 6}
        >
          Sign Up
        </S.SubmitButton>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};
