import { useFonts, CarterOne_400Regular } from '@expo-google-fonts/carter-one';
import { AntDesign } from '@expo/vector-icons';
import {
  Button,
  Flex,
  Icon,
  Image,
  Text,
  Box,
  NativeBaseProvider,
  extendTheme,
  Center,
} from 'native-base';
import React, { useState } from 'react';

import DiversagenteLogo from '@src/assets/logo.png';
import { apiBaseUrl, Oauth2 } from '@src/configs';
import { useAuth } from '@src/hooks/useAuth';

export const Login = () => {
  const { signInWithGoogle, isLoading } = useAuth();
  const [isActiveDeveloperHelper, setIsActiveDeveloperHelper] = useState(false);

  const [fontsLoaded] = useFonts({
    CarterOne_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
  const config = {
    dependencies: {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
    },
  };

  const theme = extendTheme({
    fontConfig: {
      CarterOne: {
        400: {
          normal: 'CarterOne_400Regular',
        },
      },
    },
    fonts: {
      heading: 'CarterOne',
      body: 'CarterOne',
      mono: 'CarterOne',
    },
  });

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
    <NativeBaseProvider config={config} theme={theme}>
      <Flex flex={1} justifyContent="space-evenly">
        <Box
          bg={{
            linearGradient: {
              colors: ['amber.200', 'lime.400', 'cyan.300'],
              start: [0, 0],
              end: [1, 0],
            },
          }}
          width={'100%'}
          height={'100%'}
        >
          <Image
            source={DiversagenteLogo}
            alt="Diversagente"
            height={400}
            width={360}
            alignItems="center"
            marginLeft={5}
          />
          <Flex direction="column">
            <Box
              width="310"
              bg="yellow.400"
              p="4"
              marginLeft={12}
              borderColor={'orange.400'}
              borderLeftWidth={4}
              borderRightWidth={4}
              borderTopWidth={4}
            >
              <Box></Box>
            </Box>
            <Center
              bg="lime.50"
              _text={{
                color: 'info.500',
                fontSize: '30',
              }}
              marginLeft={12}
              height={250}
              shadow={4}
              width={{
                base: 310,
                lg: 250,
              }}
              borderColor={'orange.400'}
              borderWidth={4}
            >
              Bem-vindo ao
              <Flex direction="row">
                <Text color={'blue.600'} fontSize="4xl">
                  DIVERSA
                </Text>
                <Text color={'amber.500'} fontSize="4xl">
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
          </Flex>
        </Box>
      </Flex>
    </NativeBaseProvider>
  );
};
