import { AntDesign } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';

import { TextPink } from '@components/TextPink';
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
    <Box flex={1} justifyContent="center" padding={4}>
      <TextPink>Garage Launcher pink</TextPink>
      <Button
        leftIcon={<Icon as={AntDesign} name="google" />}
        colorScheme="red"
        borderRadius={4}
        onPress={handleLogin}
      >
        <Text fontWeight={'bold'} color="white">
          Login with Google
        </Text>
      </Button>
    </Box>
  );
};
