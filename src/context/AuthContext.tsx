import { createContext, useReducer } from 'react';
import { AuthContextProps, AuthProviderProps } from '../types/authTypes';

const authReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SET_USER_TOKEN':
      return { ...state, userToken: action.payload };
    case 'LOG_OUT':
      return { ...state, userToken: '' };
    default:
      return state;
  }
};

//custom logic for the value

export const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {
    userToken: localStorage.getItem('token') || '',
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
