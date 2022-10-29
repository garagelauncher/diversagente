import { AntDesign } from '@expo/vector-icons';
import {
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  Box,
  NativeBaseProvider,
  Center,
} from 'native-base';
import React, { useState } from 'react';

import DiversagenteLogo from '@src/assets/logo.png';
import { apiBaseUrl, Oauth2 } from '@src/configs';
import { useAuth } from '@src/hooks/useAuth';

export const Login = () => {
  const { signInWithGoogle, isLoading } = useAuth();
  const [isActiveDeveloperHelper, setIsActiveDeveloperHelper] = useState(false);

  const config = {
    dependencies: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
    },
  };

  async function handleLogin() {
    console.log('Login');
    await signInWithGoogle();
  }
  console.info(Oauth2);
  console.log(apiBaseUrl);

  function handleDeveloperHelper() {
    setIsActiveDeveloperHelper(!isActiveDeveloperHelper);
  }

  return (
    <NativeBaseProvider config={config}>
      <Flex
        flex={1}
        justifyContent="space-evenly"
        padding={4}
        alignItems="center"
      >
        <Box
          bg={{
            linearGradient: {
              colors: ['amber.200', 'lime.400', 'cyan.300'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          width={'100%'}
          height={'90%'}
        >
          <Image
            source={DiversagenteLogo}
            alt="Diversagente"
            height={350}
            width={350}
            alignItems="center"
          />
          <Center
            bg="lime.50"
            _text={{
              color: 'info.500',
              fontWeight: 'bold',
              fontSize: '30',
              fontFamily: 'body',
            }}
            marginLeft={8}
            height={250}
            shadow={4}
            width={{
              base: 300,
              lg: 250,
            }}
          >
            Bem-vindo ao
            <Flex direction="row">
              <Text color={'blue.600'} fontSize="4xl" bold>
                DIVERSA
              </Text>
              <Text color={'amber.500'} fontSize="4xl" bold>
                GENTE
              </Text>
            </Flex>
            <Button
              leftIcon={<Icon as={AntDesign} name="google" size={5} />}
              colorScheme={'blue'}
              borderRadius={4}
              onPress={handleLogin}
              size="sm"
              isLoading={isLoading}
              marginTop={5}
              height={16}
              width={225}
            >
              <Text color="white" fontSize="md">
                Entrar com o Google
              </Text>
            </Button>
            <Button
              size={'lg'}
              backgroundColor={
                isActiveDeveloperHelper ? 'pink.600' : 'transparent'
              }
              onPress={handleDeveloperHelper}
              alignSelf={'flex-end'}
            />
            {isActiveDeveloperHelper && <Text>{JSON.stringify(Oauth2)}</Text>}
          </Center>
        </Box>
      </Flex>
    </NativeBaseProvider>
  );
};
