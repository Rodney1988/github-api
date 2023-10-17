import { useState } from 'react';
import { Alert, CircularProgress } from '@mui/material';

import * as S from './Login.styled';
import { useAuthContext } from '../../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin';

export const Login = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const { login, isLoading, error } = useLogin();

  const context = useAuthContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await login(userEmail, userPassword);
      if (!isLoading && response) {
        const idToken = response._tokenResponse.idToken;
        localStorage.setItem('token', idToken);
        context?.dispatch({
          type: 'SET_USER_TOKEN',
          payload: idToken,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '300px',
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <h1>Log In</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <S.Label aria-label="User Email Label">
          Email:
          <S.InputField
            type="email"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </S.Label>
        <S.Label aria-label="User Password Label">
          Password:
          <S.InputField
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
          Log In
        </S.SubmitButton>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
      <S.ExtraTextDiv>
        <Link to={'/signup'}>Sign Up Here!</Link>
      </S.ExtraTextDiv>
    </div>
  );
};
