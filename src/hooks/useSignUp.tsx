import { useState } from 'react';

export const useSignUp = () => {
  const [error, setError] = useState<string>('');

  const signUp = async (email: string, password: string) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });

    const responseData = await response.json();
    if (!response.ok) {
      if (response.status === 400) {
        setError(`Error 400: ${responseData.error.message}`);
        throw new Error();
      } else {
        setError('Unknown error occurred');
      }
    }
    return responseData;
  };

  return { signUp, error };
};
