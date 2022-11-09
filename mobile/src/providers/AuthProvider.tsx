/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as AuthSession from 'expo-auth-session';
import { useToast } from 'native-base';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useMutation } from 'react-query';

import { Oauth2 } from '@src/configs';
import {
  AuthContext,
  GoogleUserData,
  UserData,
} from '@src/contexts/AuthContext';
import { User, UserPreferences } from '@src/contracts/User';
import { diversaGenteServices } from '@src/services/diversaGente';
import { getPushNotificationToken } from '@src/services/notifications';

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
  const toast = useToast();
  const mutationCreateDevice = useMutation(diversaGenteServices.createDevice, {
    onSuccess: () => {
      console.log('Device created');
    },
  });

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutationDisableAccount = useMutation(diversaGenteServices.deleteUser, {
    onSuccess: async () => {
      toast.show({
        description: 'Conta desativada!',
        bg: 'green.500',
      });
      console.log('disableAccount');
      await AsyncStorage.removeItem('diversagente@user');
      setLoggedIn(false);
      setUser(undefined as UserData | undefined);
      await AsyncStorage.clear();
    },
  });

  const storeUserDevice = useCallback(
    async (ownerId: string) => {
      try {
        const lastStoredToken = await AsyncStorage.getItem(
          'diversagente@deviceToken',
        );
        const actualToken = await getPushNotificationToken();
        // toast.show({
        //   title: 'Token',
        //   description: actualToken,
        //   bg: 'green.500',
        // });
        const token = actualToken ?? lastStoredToken;
        console.log('show device token', token);

        if (token) {
          await AsyncStorage.setItem('diversagente@deviceToken', token);
          await mutationCreateDevice.mutateAsync({ ownerId, token });
          console.log('Device stored');
        }
      } catch (err) {
        console.log(err);
        // toast.show({
        //   title: 'Error',
        //   description: err,
        //   bg: 'red.500',
        // });
      }
    },
    [mutationCreateDevice],
  );

  async function signInWithGoogle() {
    setIsLoading(true);
    try {
      const CLIENT_ID = Oauth2.CLIENT_ID;

      const REDIRECT_URI = Oauth2.REDIRECT_URI;
      console.debug('@REDIRECT_URI', REDIRECT_URI);
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      console.debug('authUrl:', authUrl);

      const authresult = (await AuthSession.startAsync({
        authUrl,
      })) as AuthResponse;
      console.debug('debug authresult', authresult);

      const { type, params } = authresult;
      console.debug('type', type);

      if (type === 'success') {
        console.log('fetching user data');
        const response = await axios.get<GoogleUserData>(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`,
        );

        console.log('sucesss');
        console.log(JSON.stringify(response.data));

        await diversaGenteServices.setAuthToken(params.access_token);

        const googleUserData = response.data;

        // const responseGet = await axios.get<UserData>(
        //   `https://dev-diversagente.herokuapp.com/users/${googleUserData.email}`,
        // );

        console.debug({
          email: googleUserData.email,
          name: googleUserData.name,
          username: googleUserData.email,
        });
        const responseCreateUser = await axios.post<{
          id: string;
          email: string;
          username?: string;
          name: string;
          biograph?: string;
          picture?: string;
          createdAt?: string;
          preferences: UserPreferences;
          lovelyCategoriesIds: string[];
          isActive: boolean;
        } | null>('https://dev-diversagente.herokuapp.com/users', {
          email: googleUserData.email,
          name: googleUserData.name,
          username: googleUserData.email,
          picture: googleUserData.picture ?? null,
        });

        console.debug(responseCreateUser);
        console.debug(responseCreateUser.data);
        console.debug(responseCreateUser.status);

        if (!responseCreateUser.data) {
          return;
        }

        if (responseCreateUser.data.isActive === false) {
          Alert.alert(
            'Conta desativada',
            'Entre em contato com a equipe do diversaGente para reativar sua conta garagelauncher@gmail.com para que seja feita uma análise do motivo da desativação da sua conta e se você está habilitado a voltar a fazer parte da comunidade neurodiversa',
          );
          return;
        }

        const userPayload: UserData = {
          id: responseCreateUser.data.id || '',
          googleUserData,
          email: googleUserData.email,
          name: googleUserData.name,
          picture:
            responseCreateUser.data?.picture ?? googleUserData.picture ?? '',
          username: responseCreateUser.data?.username ?? googleUserData.email,
          biograph: responseCreateUser.data?.biograph ?? '',
          createdAt: responseCreateUser.data?.createdAt ?? '',
          preferences: responseCreateUser.data?.preferences,
          lovelyCategoriesIds: responseCreateUser.data?.lovelyCategoriesIds,
          isActive: responseCreateUser.data.isActive,
        };
        setUser(userPayload);
        setLoggedIn(true);
        await AsyncStorage.setItem(
          'diversagente@user',
          JSON.stringify(userPayload),
        );
      }
      console.log('Sign in with Google');
    } catch (error: any) {
      console.error(error);
      console.error(error.name);
      console.error(error.message);

      console.log('Error', error);

      Alert.alert(
        'Falha no login',
        `Não foi possível fazer login com o Google, tente novamente mais tarde. ${error.message}`,
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut() {
    console.log('Sign out');
    setLoggedIn(false);
    setUser(undefined as UserData | undefined);
    await AsyncStorage.removeItem('diversagente@user');
  }

  async function disableAccount() {
    await mutationDisableAccount.mutateAsync(String(user?.id));
  }

  // async function checkFirstLogin() {}

  // async function finishFirstLogin() {}

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

  const refetchUser = useCallback(async () => {
    if (user) {
      const userResponse = await axios.get<User>(
        `https://dev-diversagente.herokuapp.com/users/${user.username}`,
      );

      const userPayload: UserData = {
        ...user,
        ...userResponse.data,
      };

      setUser(userPayload);
      await AsyncStorage.setItem(
        'diversagente@user',
        JSON.stringify(userPayload),
      );
    }
  }, [user]);

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      storeUserDevice(user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        signInWithGoogle,
        signOut,
        user,
        setUser,
        isLoading,
        refetchUser,
        isLoadingDisablingAccount: mutationDisableAccount.isLoading,
        disableAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
