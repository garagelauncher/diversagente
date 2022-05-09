import axios from 'axios';
import { Avatar, Box, Button, Text } from 'native-base';
import { useEffect, useState } from 'react';

import { useAuth } from '@src/hooks/useAuth';

export const Profile = () => {
  const { signOut, user, setUser } = useAuth();

  const [bio, setBio] = useState<string>();
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const [username, setUsername] = useState<string>();

  useEffect(() => {
    setBio(user?.bio ?? '');
    setName(user?.name);
    setPicture(user?.picture ?? '');
    setUsername(user?.username ?? '');
  }, [user]);

  async function handleUpdateUser() {
    const response = await axios.patch(
      `https://dev-diversagente.herokuapp.com/users/${user?.email}`,
      {
        bio,
        name,
        picture,
        username,
      },
    );

    console.log(response.data);
    setUser({ ...response.data, googleUserData: user?.googleUserData });
  }

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
