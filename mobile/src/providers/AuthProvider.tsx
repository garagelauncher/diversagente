import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import { ReactNode, useState } from 'react';
import { Alert } from 'react-native';

import { Oauth2 } from '@src/configs';
import {
  AuthContext,
  GoogleUserData,
  UserData,
} from '@src/contexts/AuthContext';

type AuthProvidersProps = {
  children: ReactNode;
};

type AuthResponse = {
  params: {
    access_token: string;
  };
  type: string;
};

export const AuthProvider = ({ children }: AuthProvidersProps) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData>();

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = Oauth2.CLIENT_ID;
      const REDIRECT_URI = Oauth2.REDIRECT_URI;

      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;
      console.log('type', type);

      if (type === 'success') {
        console.log('fetching user data');
        const response = await axios.get<GoogleUserData>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );
        console.log('sucesss');
        console.log(JSON.stringify(response.data));
        const googleUserData = response.data;
        setUser({
          googleUserData,
          email: googleUserData.email,
          name: googleUserData.name,
          picture: googleUserData.picture,
        });
        setLoggedIn(true);
      }
      console.log('Sign in with Google'); // TODO: Make login
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Falha no login',
        'Não foi possível fazer login com o Google, tente novamente mais tarde.',
      );
    }
  }

  async function signOut() {
    console.log('Sign out'); // TODO: Make logout
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, signInWithGoogle, signOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
