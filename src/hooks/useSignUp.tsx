import { useState } from 'react';

import { baseUrl } from '../urls';
import { SignUpResponse } from '../types/signUpType';

export const useSignUp = () => {
  const [isLoading, setIsloading] = useState<boolean>(false);

  const signUp = async (email: string, password: string) => {
    setIsloading(true);
    const response = await fetch(baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, returnSecureToken: true }),
    });
    const responseData = await response.json();
    setIsloading(false);
    return responseData as SignUpResponse;
  };

  return { signUp, isLoading };
};
