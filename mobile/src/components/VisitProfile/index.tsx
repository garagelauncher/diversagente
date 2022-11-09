/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-no-duplicate-props */
import { Feather, Ionicons } from '@expo/vector-icons';
import { useLinkTo } from '@react-navigation/native';
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
  IconButton,
} from 'native-base';
import React, { useState, FunctionComponent } from 'react';
import { FlatList, Pressable } from 'react-native';

import { ConditionallyRender } from '../ConditionallyRender';
import { ModalConfirmAction } from '../ModalConfirmAction';

import { AppBar } from '@src/components/AppBar';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { LoadingScreen } from '@src/components/LoadingScreen';
import { Post, UserHasInteracted } from '@src/components/Post';
import { PER_PAGE_ITEMS, userIdHelper } from '@src/configs';
import { usePosts } from '@src/hooks/queries/usePosts';
import { useProfile } from '@src/hooks/queries/useProfile';
import { useAuth } from '@src/hooks/useAuth';
import { StackProfileNavigatorParamList } from '@src/routes/stacks/profileStack.routes';

export type VisitProfileProps = {
  username: string;
};

export interface CountUser {
  _count: Count;
}

export interface Count {
  Comment: number;
  Complaint: number;
  Like: number;
  Location: number;
  Post: number;
  Review: number;
}

export const VisitProfile: FunctionComponent<VisitProfileProps> = ({
  username,
}) => {
  const { data: user, isLoading: isUserLoading } = useProfile<CountUser>(
    username,
    {
      include: {
        _count: {
          select: {
            Comment: true,
            Like: true,
            Post: true,
            Review: true,
            Location: true,
            Complaint: true,
          },
        },
      },
    },
  );

  const { signOut, user: loggedUser } = useAuth();
  const [isVisibleModalSignOut, setIsVisibleModalSignOut] = useState(false);
  const [isReadingModeActive, setIsReadingModeActive] = useState(true);
  const linkTo = useLinkTo();

  const userFirstname = user?.name?.split(' ')[0];

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

  function handleNavigateToEditProfileInfo() {
    linkTo('/profile/edit');
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

  const toggleReadingMode = () => {
    setIsReadingModeActive(
      (previousIsReadingModeActive) => !previousIsReadingModeActive,
    );
  };

  if (isUserLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Flex>
        <AppBar />
        <ModalConfirmAction
          isOpen={isVisibleModalSignOut}
          onClose={() => setIsVisibleModalSignOut(false)}
          onConfirm={handleLogout}
          title="Sair da conta"
          description="Você tem certeza que deseja sair da sua conta?"
          confirmText="Sim, tenho certeza"
          confirmColor="red"
        />
        <Flex alignItems="center" mt={5}>
          <ConditionallyRender
            condition={user?.id === loggedUser?.id}
            trueComponent={
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
                        <Ionicons
                          name="settings-outline"
                          size={32}
                          color="black"
                        />
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

                  <Menu.Item onPress={() => setIsVisibleModalSignOut(true)}>
                    <Flex flexDir={'row'} justifyContent={'space-between'}>
                      <Feather name="log-out" size={22} color="gray" />
                      <Text fontSize={14} fontWeight={'bold'}>
                        Sair da conta
                      </Text>
                    </Flex>
                  </Menu.Item>
                </Menu>
              </Flex>
            }
            falseComponent={null}
          />

          <Flex flexDir={'row'} px={4}>
            <Box px={2}>
              <Avatar
                alignSelf="center"
                size="xl"
                source={{
                  uri: String(user?.picture),
                }}
              />
            </Box>
            <Box px={2} mt={2} w={'70%'}>
              <Heading>{user?.name}</Heading>
              <Text>{user?.biograph === '' ? '🙂' : user?.biograph}</Text>
            </Box>
          </Flex>

          <ConditionallyRender
            condition={isReadingModeActive}
            trueComponent={null}
            falseComponent={
              <>
                <Box
                  w={'85%'}
                  mt={10}
                  mb={4}
                  py={4}
                  borderRadius={10}
                  borderWidth={2}
                  borderColor={'darkBlue.600'}
                  padding={1}
                >
                  <SimpleGrid
                    ml={3}
                    columns={3}
                    space={4}
                    w={'100%'}
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
                        {user?._count.Post}
                      </Text>
                      <Text
                        mt={2}
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={16}
                      >
                        posts
                      </Text>
                    </Flex>
                    <Flex flexDir={'column'} alignItems={'center'}>
                      <Text
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={18}
                        opacity={1}
                        zIndex={1}
                      >
                        {user?._count.Like}
                      </Text>
                      <Text
                        mt={2}
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={16}
                      >
                        likes
                      </Text>
                    </Flex>
                    <Flex flexDir={'column'} alignItems={'center'}>
                      <Text
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={18}
                        opacity={1}
                        zIndex={1}
                      >
                        {user?._count.Comment}
                      </Text>
                      <Text
                        mt={2}
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={16}
                      >
                        comentários
                      </Text>
                    </Flex>
                  </SimpleGrid>
                </Box>

                <Box
                  w={'85%'}
                  mb={4}
                  py={4}
                  borderRadius={10}
                  borderWidth={2}
                  borderColor={'darkBlue.600'}
                  padding={1}
                >
                  <SimpleGrid
                    ml={3}
                    columns={3}
                    space={4}
                    w={'100%'}
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
                        {user?._count.Review}
                      </Text>
                      <Text
                        mt={2}
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={16}
                      >
                        reviews
                      </Text>
                    </Flex>
                    <Flex flexDir={'column'} alignItems={'center'}>
                      <Text
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={18}
                        opacity={1}
                        zIndex={1}
                      >
                        {user?._count.Location}
                      </Text>
                      <Text
                        mt={2}
                        color={'darkBlue.600'}
                        fontWeight={'bold'}
                        fontSize={16}
                      >
                        locais
                      </Text>
                    </Flex>
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
                        dias membro
                      </Text>
                    </Flex>
                  </SimpleGrid>
                </Box>
              </>
            }
          />
        </Flex>
      </Flex>

      <Flex
        width="100%"
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Heading fontSize={20} px={8} py={6} pt={4} fontWeight="medium">
          Postagens de {userFirstname}
        </Heading>
        <IconButton
          colorScheme={isReadingModeActive ? 'orange' : 'coolGray'}
          variant={'ghost'}
          size={'lg'}
          _icon={{
            as: Feather,
            name: isReadingModeActive ? 'list' : 'grid',
          }}
          onPress={toggleReadingMode}
        />
      </Flex>
      <Flex paddingBottom={20}>
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
            contentContainerStyle={{ paddingBottom: 450 }}
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
