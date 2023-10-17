import { useState } from 'react';
import { baseUrl } from '../urls';
import { SignUpResponse } from '../types/signUpType';

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(baseUrl + '/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, returnSecureToken: true }),
      });
      const responseData = await response.json();
      setIsLoading(false);
      if (!response.ok) {
        setError(
          responseData?.error?.message || 'Something went wrong signing up'
        );
        throw new Error(error);
      }
      setError('');
      return responseData as SignUpResponse;
    } catch (error: unknown) {
      setIsLoading(false);
      setError('Something went wrong signing up');
      throw error;
    }
  };

  return { signUp, isLoading, error };
};
