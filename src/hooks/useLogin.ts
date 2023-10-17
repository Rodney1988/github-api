import { useState } from 'react';
import { baseUrl } from '../urls';
import { LoginResponse } from '../types/loginType';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl + '/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
      const responseData = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        setError(
          responseData?.error?.message || 'Something went wrong logging in'
        );
        throw new Error(error);
      }
      setError('');
      return responseData as LoginResponse;
    } catch (error: unknown) {
      setIsLoading(false);
      setError('Something went wrong logging in');
      throw error;
    }
  };

  return { login, isLoading, error };
};
