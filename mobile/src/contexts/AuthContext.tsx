import { createContext } from 'react';

import { User } from '@src/contracts/User';

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

export type UserData = {
  googleUserData: GoogleUserData;
} & User;

export type AuthContextProps = {
  isLoggedIn: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  user: UserData | undefined;
  setUser: (user: UserData | undefined) => void;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
  isLoadingDisablingAccount: boolean;
  disableAccount: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
