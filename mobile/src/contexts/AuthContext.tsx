import { createContext } from 'react';

export type GoogleUserData = {
  id: string;
  email: string;
  name: string;
  picture?: string;
  verified_email: boolean;
  locale: string;
  given_name: string;
  family_name?: string;
};

export type User = {
  email: string;
  name: string;
  username?: string;
  bio?: string | null;
  picture?: string | null;
  createdAt?: Date | string;
};

export type UserData = {
  googleUserData: GoogleUserData;
} & User;

export type AuthContextProps = {
  isLoggedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  user: UserData | undefined;
  setUser: (user: UserData | undefined) => void;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
