import { NativeBaseProvider } from 'native-base';
import React from 'react';

import { Login } from '@src/screens/Login';

export default function App() {
  return (
    <NativeBaseProvider>
      <Login />
    </NativeBaseProvider>
  );
}
