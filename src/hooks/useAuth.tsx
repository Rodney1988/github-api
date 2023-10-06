import { useContext } from 'react';
import { AuthContext } from '../authContext/AuthProvider';

export const useAuth = () => {
  const userToken = useContext(AuthContext);
  if (userToken === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return userToken;
};
