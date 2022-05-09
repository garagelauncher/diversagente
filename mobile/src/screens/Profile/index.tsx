import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  FlatList,
  HStack,
  Icon,
  Stack,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
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

  const data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      fullName: 'Aafreen Khan',
      email: 'aafreen.khan@gmail.com',
      avatarUrl:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  ];
  return (
    <Box flex={1} justifyContent="center" padding={9}>
      <StatusBar barStyle="light-content" />

      <HStack flex={1} alignItems="center" flexDirection="column">
        <Box flex={1} alignContent="center">
          <Text color="muted.800" fontSize="30" fontWeight="bold" w="100%">
            Profile
          </Text>
        </Box>
      </HStack>
      <Stack mb={16} space={4} w="100%" alignItems="center">
        <Box flex={1} align-content="flex-start">
          <Box py={5} justifyContent="center">
            <Avatar
              alignSelf="center"
              size="xl"
              source={{
                uri: 'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2876&q=80',
              }}
            >
              GG
            </Avatar>
          </Box>
          <Box alignItems="flex-start">
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <HStack space={3}>
                  <VStack>
                    <Text color="muted.400" bold justifyContent="center">
                      <Icon
                        as={<AntDesign name="user" size={24} color="black" />}
                        size={5}
                        color="muted.400"
                        pr={2}
                      />
                      Name
                    </Text>
                    <Text color="muted.800" bold>
                      {item.fullName}
                    </Text>

                    <Text pt={4} color="muted.400" bold>
                      <Icon
                        as={
                          <MaterialCommunityIcons
                            name="email-outline"
                            size={24}
                            color="black"
                          />
                        }
                        size={5}
                        color="muted.400"
                        pr={2}
                      />
                      E-mail
                    </Text>
                    <Text color="muted.800" bold>
                      {item.email}
                    </Text>
                  </VStack>
                </HStack>
              )}
              keyExtractor={(item) => item.id}
            />
          </Box>
          <Text fontWeight="bold" color="muted.400" pt={4} pb={2}>
            <Icon
              as={<SimpleLineIcons name="pencil" size={24} color="muted.400" />}
              size={4}
              pr={2}
            />
            Biography
          </Text>

          <Box alignItems="center" w="100%">
            <Text h="10%" w="100%">
              Im a parent of two beautiful children and one of the boys was
              recently diagnosed with autism. Im here to share my family
              experience and help others too.
            </Text>
          </Box>

          <Text fontWeight="bold" color="muted.400" pt={4}>
            <Icon
              as={
                <MaterialCommunityIcons
                  name="brain"
                  size={24}
                  color="muted.200"
                />
              }
              size={6}
              pr={2}
            />
            Categories of interest
          </Text>
          <VStack>
            <Text>Health</Text>
            <Text>Education</Text>
          </VStack>
          <Button mt={4} onPress={handleLogout}>
            Logout
          </Button>
        </Box>
      </Stack>
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
    </Box>
  );
};
