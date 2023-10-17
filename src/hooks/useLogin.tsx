import { useState } from 'react';

import { baseUrl } from '../urls';
import { LoginResponse } from '../types/loginType';

export const useLogin = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    setIsloading(true);
    const response = await fetch(baseUrl + '/login', {
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
    return responseData as LoginResponse;
  };

  return { login, isLoading };
};
