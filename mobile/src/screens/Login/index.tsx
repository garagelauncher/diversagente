import { AntDesign } from '@expo/vector-icons';
import { Button, Flex, Heading, Icon, Text } from 'native-base';
import { useState } from 'react';

import { apiBaseUrl, Oauth2 } from '@src/configs';
import { useAuth } from '@src/hooks/useAuth';

export const Login = () => {
  const { signInWithGoogle, isLoading } = useAuth();
  const [isActiveDeveloperHelper, setIsActiveDeveloperHelper] = useState(false);

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
    <Flex
      flex={1}
      justifyContent="space-evenly"
      padding={4}
      alignItems="center"
      backgroundColor="blue.100"
    >
      <Heading>DiversaGente</Heading>
      <Button
        leftIcon={<Icon as={AntDesign} name="google" size={5} />}
        colorScheme="red"
        borderRadius={4}
        onPress={handleLogin}
        size="sm"
        isLoading={isLoading}
      >
        <Text color="white">Entrar com o Google</Text>
      </Button>
      <Button
        size={'lg'}
        backgroundColor={isActiveDeveloperHelper ? 'pink.600' : 'transparent'}
        onPress={handleDeveloperHelper}
        alignSelf={'flex-end'}
      />
      {isActiveDeveloperHelper && <Text>{JSON.stringify(Oauth2)}</Text>}
    </Flex>
  );
};
