import { useState } from 'react';
import { Alert } from '@mui/material';

import { signUp } from '../../Api';
import * as S from './SignUp.styled';

export const SignUp = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await signUp(userEmail, userPassword);
      console.log('finalres', response);
      localStorage.setItem('token', response.idToken);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

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
        >
          Sign Up
        </S.SubmitButton>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </div>
  );
};
