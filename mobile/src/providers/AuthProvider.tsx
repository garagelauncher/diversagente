import { ReactNode, useState } from 'react';

import { AuthContext } from '@src/contexts/AuthContext';

type AuthProvidersProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProvidersProps) => {
  const mutationCreateDevice = useMutation(diversaGenteServices.createDevice, {
    onSuccess: () => {
      console.log('Device created');
    },
  });

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

  useEffect(() => {
    async function getUser() {
      const user = await AsyncStorage.getItem('diversagente@user');
      if (user) {
        setUser(JSON.parse(user));
        setLoggedIn(true);
      }
    }

    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
