/* eslint-disable react/jsx-no-duplicate-props */
import { AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { Avatar, Box, Button, Heading, Icon, Input, VStack } from 'native-base';
import { useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { useAuth } from '@src/hooks/useAuth';

export const Profile = () => {
  const { signOut, user, setUser } = useAuth();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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
    try {
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
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditMode(false);
    }
  }

  async function handleLogout() {
    console.log('Login');
    await signOut();
  }

  async function toogleEditMode() {
    setIsEditMode(!isEditMode);
  }

  const statusBarHeight = getStatusBarHeight();

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Box
        width="100%"
        height={getStatusBarHeight() + 100}
        backgroundColor="blue.200"
        marginTop={-statusBarHeight}
      ></Box>
      <Avatar
        alignSelf="center"
        size="xl"
        source={{
          uri: picture,
        }}
        marginTop={-50}
      >
        {user?.name}
      </Avatar>

      <VStack space={4} width="100%" alignItems="center">
        <Heading>{user?.name}</Heading>

        {!isEditMode && (
          <Button
            backgroundColor="blue.500"
            w={{
              base: '75%',
              md: '25%',
            }}
            onPress={toogleEditMode}
          >
            Editar perfil
          </Button>
        )}

        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          InputLeftElement={
            <Icon
              as={<AntDesign name="user" size={24} color="muted.400" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder={'Name'}
          isDisabled={!isEditMode}
          value={name}
          onChangeText={setName}
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          InputLeftElement={
            <Icon
              as={<SimpleLineIcons name="pencil" size={24} color="muted.400" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder={'Bio'}
          isDisabled={!isEditMode}
          value={bio}
          onChangeText={setBio}
        />
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          InputLeftElement={
            <Icon
              as={<FontAwesome name="at" size={24} color="muted.400" />}
              size={5}
              ml="2"
              color="muted.400"
            />
          }
          placeholder={'Username'}
          isDisabled={!isEditMode}
          value={username}
          onChangeText={setUsername}
        />

        {isEditMode && (
          <Button
            backgroundColor="blue.500"
            w={{
              base: '75%',
              md: '25%',
            }}
            onPress={handleUpdateUser}
          >
            Salvar dados
          </Button>
        )}
      </VStack>
      <Button
        w={{
          base: '75%',
          md: '25%',
        }}
        marginTop={10}
        onPress={handleLogout}
        colorScheme="gray"
      >
        Sair
      </Button>
    </Box>
  );
};
