import { Box, Text } from 'native-base';

export const Profile = () => {
  function handleLogin() {
    console.log('Login');
  }

  return (
    <Box flex={1} justifyContent="center" padding={4}>
      <Text
        fontWeight={'bold'}
        color="black"
        onPress={handleLogin}
        fontSize={60}
      >
        Profile
      </Text>
    </Box>
  );
};
