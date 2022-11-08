/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import { Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as ExpoLocation from 'expo-location';
import {
  Avatar,
  Box,
  Heading,
  VStack,
  Flex,
  SimpleGrid,
  Text,
  Skeleton,
  Spinner,
  Menu,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Pressable } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { AppBar } from '@src/components/AppBar';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { Post, UserHasInteracted } from '@src/components/Post';
import { PER_PAGE_ITEMS, userIdHelper } from '@src/configs';
import { usePosts } from '@src/hooks/queries/usePosts';
import { useAuth } from '@src/hooks/useAuth';
import { StackProfileNavigatorParamList } from '@src/routes/stacks/profileStack.routes';

type ProfileScreenNavigationProps = NavigationProp<
  StackProfileNavigatorParamList,
  'EditProfile'
>;

export const Profile = () => {
  const { signOut, user, setUser } = useAuth();

  const [bio, setBio] = useState<string>();
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [_location, setLocation] = useState<ExpoLocation.LocationObject>(
    null as unknown as ExpoLocation.LocationObject,
  );
  const statusBarHeight = getStatusBarHeight();

  const userFirstname = user?.name?.split(' ')[0];

  useEffect(() => {
    setBio(user?.biograph ?? '');
    setName(user?.name);
    setPicture(user?.picture ?? '');
    setUsername(user?.username ?? '');
  }, [user]);
  {
    /*
  async function askUserToUpdateLocation() {
    const { status } = await ExpoLocation.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert(
        'Você negou a permissão de localização',
        'Precisamos de sua permissão para obter a localização.',
      );
      return;
    }

    const location = await ExpoLocation.getCurrentPositionAsync();

    console.info('location', location);
    setLocation(location);
  }
*/
  }

  async function handleLogout() {
    console.log('Login');
    await signOut();
  }

  const handleLoadMorePosts = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handlePullPostListToRefresh = () => {
    refetch();
  };

  const verifyDateSinceMember = () => {
    const currentISODate = new Date().toISOString();
    const creationISODate = new Date(user?.createdAt?.toLocaleString() ?? '');

    const dayUnitInMilliseconds = 1000 * 60 * 60 * 24;
    const monthUnitInMilliseconds = dayUnitInMilliseconds * 30;
    const yearsUnitInMilliseconds = monthUnitInMilliseconds * 12;

    const diffInMilliseconds =
      new Date(currentISODate).getTime() - new Date(creationISODate).getTime();

    let diffInDays = Math.round(diffInMilliseconds / dayUnitInMilliseconds);
    const diffInMonths = Math.round(
      diffInMilliseconds / monthUnitInMilliseconds,
    );
    const diffInYears = Math.round(
      diffInMilliseconds / yearsUnitInMilliseconds,
    );

    if (diffInDays <= 0) {
      diffInDays = 1;
    }

    return diffInDays;
  };

  const navigation = useNavigation<ProfileScreenNavigationProps>();

  function handleNavigateToEditProfileInfo() {
    navigation.navigate('EditProfile');
  }

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = usePosts<UserHasInteracted>({
    sort: ['createdAt', 'DESC'],
    range: [0, PER_PAGE_ITEMS],
    filter: {
      isActive: true,
      ownerId: user?.id ?? userIdHelper,
    },
    include: {
      likes: {
        select: { id: true },
        where: { ownerId: user?.id ?? userIdHelper },
      },
      comments: {
        select: { id: true },
        where: { ownerId: user?.id ?? userIdHelper },
      },
    },
  });

  return (
    <>
      <Flex>
        <AppBar />
        <Flex alignItems="center" mt={5}>
          <Flex flexDir={'row'} justifyContent={'flex-end'} w={'90%'}>
            <Menu
              mt={1}
              mx={4}
              trigger={(triggerProps) => {
                return (
                  <Pressable
                    accessibilityLabel="Opções do perfil"
                    {...triggerProps}
                  >
                    <Ionicons name="settings-outline" size={32} color="black" />
                  </Pressable>
                );
              }}
            >
              <Menu.Item onPress={handleNavigateToEditProfileInfo}>
                <Flex flexDir={'row'} justifyContent={'space-between'}>
                  <Feather name="edit" size={22} color="gray" />
                  <Text ml={4} fontSize={14} fontWeight={'bold'}>
                    Editar perfil
                  </Text>
                </Flex>
              </Menu.Item>

              <Menu.Item onPress={handleLogout}>
                <Flex flexDir={'row'} justifyContent={'space-between'}>
                  <Feather name="log-out" size={22} color="gray" />
                  <Text fontSize={14} fontWeight={'bold'}>
                    Sair da conta
                  </Text>
                </Flex>
              </Menu.Item>
            </Menu>
          </Flex>

          <Flex flexDir={'row'} px={4}>
            <Box px={2}>
              <Avatar
                alignSelf="center"
                size="xl"
                source={{
                  uri: picture,
                }}
              />
            </Box>
            <Box px={2} mt={2} w={'70%'}>
              <Heading>{user?.name}</Heading>
              <Text>{user?.biograph === '' ? '🙂' : user?.biograph}</Text>
            </Box>
          </Flex>

          <Box
            w={'85%'}
            mt={10}
            mb={4}
            py={4}
            h={24}
            borderRadius={10}
            borderWidth={2}
            borderColor={'darkBlue.600'}
            padding={1}
          >
            <SimpleGrid
              ml={3}
              columns={3}
              space={4}
              w={'90%'}
              alignItems={'center'}
            >
              <Flex flexDir={'column'} alignItems={'center'}>
                <Text
                  color={'darkBlue.600'}
                  fontWeight={'bold'}
                  fontSize={18}
                  opacity={1}
                  zIndex={1}
                >
                  {verifyDateSinceMember()}
                </Text>
                <Text
                  mt={2}
                  color={'darkBlue.600'}
                  fontWeight={'bold'}
                  fontSize={16}
                >
                  dias como membro do diversaGente 🎉
                </Text>
              </Flex>
            </SimpleGrid>
          </Box>
        </Flex>
      </Flex>

      <Heading fontSize={20} px={8} py={6} pt={4} fontWeight="medium">
        Postagens de {userFirstname}
      </Heading>
      <Flex mb={20}>
        <LoadingFallback
          isLoading={isLoading}
          fallback={
            <VStack space={6}>
              <Skeleton width="100%" height={200} />
              <Skeleton width="100%" height={200} />
              <Skeleton width="100%" height={200} />
            </VStack>
          }
        >
          <FlatList
            data={data?.pages.map((page) => page.results).flat()}
            renderItem={({ item }) => (
              <Box marginBottom={4}>
                <Post post={item} isPreview />
              </Box>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 350 }}
            onEndReached={handleLoadMorePosts}
            onEndReachedThreshold={0.85}
            refreshing={isRefetching && !isFetchingNextPage}
            onRefresh={handlePullPostListToRefresh}
            ListFooterComponent={
              <LoadingFallback
                fallback={<Spinner color="orange.500" size="lg" />}
                isLoading={isFetchingNextPage}
              >
                <Flex width="100%" alignItems="center" justifyContent="center">
                  <Text color="gray.500">
                    Não há mais postagens para esse usuário.
                  </Text>
                </Flex>
              </LoadingFallback>
            }
            ListEmptyComponent={
              <Flex width="100%" alignItems="center" justifyContent="center">
                <Text color="gray.500">Nenhum post encontrado.</Text>
              </Flex>
            }
          />
        </LoadingFallback>
      </Flex>
    </>
  );
};
