import { useState } from 'react';

export const useSignUp = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    setIsloading(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    setIsloading(false);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(`Sign-up failed with an error code ${response.status}`);
    }

    return responseData;
  };

  return { signUp, isLoading };
};
