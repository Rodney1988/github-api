import { ReactNode } from 'react';

export interface AuthContextProps {
  userToken: string;
  dispatch: React.Dispatch<any>;
}

export interface AuthProviderProps {
  children: ReactNode;
}
