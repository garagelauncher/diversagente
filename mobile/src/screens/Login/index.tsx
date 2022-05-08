import { AntDesign } from '@expo/vector-icons';
import { Box, Button, Icon, Text } from 'native-base';

import { TextPink } from '@components/TextPink';

export const Login = () => {
  function handleLogin() {
    console.log('Login');
  }

  return (
    <Box flex={1} justifyContent="center" padding={4}>
      <TextPink>Garage Launcher pink</TextPink>
      <Button
        leftIcon={<Icon as={AntDesign} name="google" />}
        colorScheme="red"
        borderRadius={4}
      >
        <Text fontWeight={'bold'} color="white" onPress={handleLogin}>
          Login with Google
        </Text>
      </Button>
    </Box>
  );
};
