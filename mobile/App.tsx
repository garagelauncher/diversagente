import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import { AuthProvider } from '@src/providers/AuthProvider';
import { Routes } from '@src/routes';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { RootBottomTabParamList } from '@src/routes/tabs';
import { queryClient } from '@src/services/queryClient';

import './src/services/notifications/config';

const prefix = Linking.createURL('/');

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
