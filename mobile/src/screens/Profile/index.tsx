/* eslint-disable react/jsx-no-duplicate-props */
import { AntDesign, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { isLoading } from 'expo-font';
import * as ExpoLocation from 'expo-location';
import {
  Avatar,
  Box,
  Button,
  Heading,
  Icon,
  Input,
  VStack,
  Flex,
  SimpleGrid,
  Text,
  Divider,
  ScrollView,
  Skeleton,
  Spinner,
} from 'native-base';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, TouchableOpacity } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { LoadingFallback } from '@src/components/LoadingFallback';
import { Post, UserHasInteracted } from '@src/components/Post';
import { PER_PAGE_ITEMS, userIdHelper } from '@src/configs';
import { usePosts } from '@src/hooks/queries/usePosts';
import { useAuth } from '@src/hooks/useAuth';

export const Profile = () => {
  const { signOut, user, setUser } = useAuth();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const [bio, setBio] = useState<string>();
  const [name, setName] = useState<string>();
  const [picture, setPicture] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [location, setLocation] = useState<ExpoLocation.LocationObject>(
    null as unknown as ExpoLocation.LocationObject,
  );
  const statusBarHeight = getStatusBarHeight();

  const userFirstname = user?.name?.split(' ')[0];

  useEffect(() => {
    setBio(user?.bio ?? '');
    setName(user?.name);
    setPicture(user?.picture ?? '');
    setUsername(user?.username ?? '');
  }, [user]);

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

    const diffInDays = Math.round(diffInMilliseconds / dayUnitInMilliseconds);
    const diffInMonths = Math.round(
      diffInMilliseconds / monthUnitInMilliseconds,
    );
    const diffInYears = Math.round(
      diffInMilliseconds / yearsUnitInMilliseconds,
    );

    console.log('currentISODate', currentISODate);
    console.log('creationISODate', creationISODate);
    console.log('diffInDays', diffInDays);
    console.log('diffInMonths', diffInMonths);
    console.log('monthUnitInMilliseconds', diffInMonths);
    console.log('diffInYears', diffInYears);

    return diffInDays;
  };

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
    filter: { ownerId: user?.id ?? userIdHelper },
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
      <ScrollView>
        <Flex>
          <Flex alignItems="center" mt={statusBarHeight + 30}>
            <Flex flexDir={'row'} justifyContent={'flex-end'} w={'90%'}>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={32} color="black" />
              </TouchableOpacity>
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
                <Text>
                  {user?.bio}Lorem Ipsum is simply dummy text of the printing
                  and typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s,
                </Text>
              </Box>
            </Flex>

            <Box
              w={'85%'}
              mt={10}
              mb={8}
              h={24}
              borderRadius={10}
              bgColor={'darkBlue.600'}
              padding={4}
            >
              <SimpleGrid ml={3} columns={3} space={4} w={'90%'}>
                <Flex flexDir={'column'} alignItems={'center'}>
                  <Text
                    opacity={1}
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={18}
                  >
                    1548
                  </Text>
                  <Text
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={14}
                    mt={2}
                  >
                    postagens feitas
                  </Text>
                </Flex>
                <Divider
                  bg="white"
                  thickness="2"
                  mx="2"
                  orientation="vertical"
                />
                <Flex flexDir={'column'} alignItems={'center'}>
                  <Text
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={18}
                    opacity={1}
                    zIndex={1}
                  >
                    {verifyDateSinceMember()}
                  </Text>
                  <Text
                    mt={2}
                    color={'white'}
                    fontWeight={'bold'}
                    fontSize={14}
                  >
                    dias como membro
                  </Text>
                </Flex>
              </SimpleGrid>
            </Box>
          </Flex>
        </Flex>

        <Heading px={8} py={2}>
          Postagens de {userFirstname}
        </Heading>
        <Flex mb={-80}>
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
                  <Flex
                    width="100%"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text color="gray.500">
                      Não há mais postagens para esse usuário.
                    </Text>
                  </Flex>
                </LoadingFallback>
              }
            />
          </LoadingFallback>
        </Flex>
      </ScrollView>
    </>
  );
};
