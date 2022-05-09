import { Avatar, Box, Button, Text } from 'native-base';

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
      <Avatar
        size={100}
        borderRadius={50}
        source={{
          uri: user?.picture
            ? user.picture
            : 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
        }}
      />
      <Text>{user?.name}</Text>
      <Button onPress={handleLogout}>Logout</Button>
    </Box>
  );
};
