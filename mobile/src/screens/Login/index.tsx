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
  StatusBar,
} from 'native-base';
import React from 'react';

import DiversagenteLogo from '@src/assets/logo.png';
import { apiBaseUrl, Oauth2 } from '@src/configs';
import { useAuth } from '@src/hooks/useAuth';

export const Login = () => {
  const { signInWithGoogle, isLoading } = useAuth();
  // const [isActiveDeveloperHelper, setIsActiveDeveloperHelper] = useState(false);

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

  // function handleDeveloperHelper() {
  //   setIsActiveDeveloperHelper(!isActiveDeveloperHelper);
  // }

  return (
    <NativeBaseProvider config={config} theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" />
      <Flex flex={1} justifyContent="space-evenly">
        <Box bg={'yellow.200'} width={'100%'} height={'100%'}>
          <Flex alignItems="center">
            <Image
              source={DiversagenteLogo}
              alt="Diversagente"
              height={400}
              width={360}
              alignItems="center"
              marginLeft={5}
            />
            <Flex direction="row">
              <Text color={'blue.600'} fontSize="4xl">
                DIVERSA
              </Text>
              <Text color={'amber.500'} fontSize="4xl">
                GENTE
              </Text>
            </Flex>
          </Flex>
          <Flex direction="column">
            <Center
              bg="lime.50"
              marginLeft={12}
              shadow={4}
              width={{
                base: 310,
                lg: 250,
              }}
              borderWidth={4}
              borderColor="info.200"
              background="info.200"
              borderRadius={10}
              padding={4}
            >
              <Text color="muted.600" fontFamily={'Roboto'} bold fontSize="lg">
                Venha fazer parte da
              </Text>
              <Text color="muted.600" fontFamily={'Roboto'} bold fontSize="lg">
                comunidade neurodiversa!
              </Text>
              <Button
                leftIcon={<Icon as={AntDesign} name="google" size={5} />}
                colorScheme="red"
                borderRadius={4}
                onPress={handleLogin}
                size="sm"
                isLoading={isLoading}
                marginTop={5}
                height={16}
                width={225}
              >
                <Text color="white" fontSize="md" fontFamily={'Roboto'} bold>
                  Entrar com o Google
                </Text>
              </Button>
            </Center>
          </Flex>
        </Box>
      </Flex>
    </NativeBaseProvider>
  );
};
