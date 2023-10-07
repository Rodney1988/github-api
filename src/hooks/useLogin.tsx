import { useState } from 'react';

export const useLogin = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_API_KEY}`;

    setIsloading(true);
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    setIsloading(false);
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(
        `Log In failed with an error code ${responseData.error.code}, ${responseData.error.message}`
      );
    }

    return responseData;
  };

  return { login, isLoading };
};
