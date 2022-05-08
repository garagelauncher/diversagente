import { createContext } from 'react';

export type AuthContextProps = {
  isLoggedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
