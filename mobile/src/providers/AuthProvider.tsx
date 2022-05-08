import { ReactNode, useState } from 'react';

import { AuthContext } from '@src/contexts/AuthContext';

type AuthProvidersProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProvidersProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  async function signInWithGoogle() {
    try {
      console.log('Sign in with Google'); // TODO: Make login
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function signOut() {
    console.log('Sign out'); // TODO: Make logout
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
