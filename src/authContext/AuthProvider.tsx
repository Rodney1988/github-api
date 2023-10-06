import { useEffect, useState } from 'react';
import { AuthContextProps } from '../types/componentPropTypes';
import { createContext } from 'react';
import { AuthContextType } from '../types/authTypes';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const authenticatedUser = localStorage.getItem('token');
    if (authenticatedUser) {
      setUserToken(authenticatedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userToken }}>
      {children}
    </AuthContext.Provider>
  );
};
