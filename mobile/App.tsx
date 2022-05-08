import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import React from 'react';

import { AuthProvider } from '@src/providers/AuthProvider';
import { Routes } from '@src/routes';

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
