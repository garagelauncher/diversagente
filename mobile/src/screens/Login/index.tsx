import { AntDesign } from '@expo/vector-icons';
import { Button, Flex, Heading, Icon, Text } from 'native-base';

import { apiBaseUrl } from '@src/configs';
import { useAuth } from '@src/hooks/useAuth';

export const Login = () => {
  const { signInWithGoogle } = useAuth();

  async function handleLogin() {
    console.log('Login');
    await signInWithGoogle();
  }
  console.log(apiBaseUrl);
  return (
    <Flex
      flex={1}
      justifyContent="space-evenly"
      padding={4}
      alignItems="center"
      backgroundColor="blue.100"
    >
      <Heading>diversagente</Heading>
      <Button
        leftIcon={<Icon as={AntDesign} name="google" />}
        colorScheme="red"
        borderRadius={4}
        onPress={handleLogin}
        size="sm"
      >
        <Text color="white">Entrar com o Google</Text>
      </Button>
    </Flex>
  );
};
