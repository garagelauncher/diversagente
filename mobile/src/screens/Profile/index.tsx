import { Box, Button, Text } from 'native-base';

import { useAuth } from '@src/hooks/useAuth';

export const Profile = () => {
  const { signOut, user } = useAuth();
  async function handleLogout() {
    console.log('Login');
    await signOut();
  }

  return (
    <Box flex={1} justifyContent="center" padding={4}>
      <Text fontWeight={'bold'} color="black" fontSize={60}>
        Profile
      </Text>
      <Text>{user?.name}</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};
