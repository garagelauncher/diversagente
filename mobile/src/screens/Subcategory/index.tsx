import { AntDesign, Feather } from '@expo/vector-icons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  Box,
  Flex,
  Button,
  FlatList,
  Skeleton,
  Text,
  Spinner,
  HStack,
  Icon,
  Input,
  VStack,
  Heading,
  IconButton,
} from 'native-base';
import React, { useCallback, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { SubcategoryHeader } from './SubcategoryHeader';

import { Header } from '@src/components/Header';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { Post, UserHasInteracted } from '@src/components/Post';
import { PER_PAGE_ITEMS, userIdHelper } from '@src/configs';
import { useSubcategoryDetails } from '@src/hooks/queries/details/useSubcategoryDetails';
import { usePosts } from '@src/hooks/queries/usePosts';
import { useAuth } from '@src/hooks/useAuth';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

type SubcategoriesNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'Subcategory',
  'FormCreatePost'
>;

export const Subcategory = () => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'Subcategory'>>();
  const { subcategoryId, categoryId } = route.params;
  const { user } = useAuth();

  const toggleReadingMode = useCallback(() => {
    setIsReadingModeActive(
      (previousIsReadingModeActive) => !previousIsReadingModeActive,
    );
  }, []);

  const postFilters = {
    subcategoryId: subcategoryId,
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
    range: [0, PER_PAGE_ITEMS],
    sort: ['createdAt', 'DESC'],
    filter: {
      ...(postFilters.subcategoryId ? postFilters : {}),
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

  const handleLoadMorePosts = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const handlePullPostListToRefresh = () => {
    refetch();
  };

  const handleNavigateToFormCreatePost = () => {
    navigation.navigate('FormCreatePost', {
      subcategoryId,
      categoryId,
    });
  };

  const [isReadingModeActive, setIsReadingModeActive] = useState(false);

  const skeletonsPosts = new Array(2).fill(0);

  const navigation = useNavigation<SubcategoriesNavigationProps>();

  return (
    <>
      <Flex
        backgroundColor="gray.50"
        width="100%"
        marginTop={[isReadingModeActive ? 6 : 0]}
      >
        {!isReadingModeActive && (
          <>
            <SubcategoryHeader />
          </>
        )}

        <Flex
          width="100%"
          padding={6}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading>Postagens</Heading>
          <Flex direction="row" alignItems="center">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleNavigateToFormCreatePost}
            >
              <Icon
                mr={4}
                as={AntDesign}
                name="plussquareo"
                size={'xl'}
                color={'darkBlue.800'}
              />
            </TouchableOpacity>

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
        </Flex>

        <LoadingFallback
          isLoading={isLoading}
          fallback={
            <VStack space={4}>
              <Skeleton width="100%" height={200} />
              <Skeleton width="100%" height={200} />
              <Skeleton width="100%" height={200} />
            </VStack>
          }
        >
          <FlatList
            width={'100%'}
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
                    Não há mais postagens nessa categoria.
                  </Text>
                  <Text
                    color="blue.500"
                    onPress={handleNavigateToFormCreatePost}
                  >
                    Você pode clicar aqui para criar um novo post!
                  </Text>
                </Flex>
              </LoadingFallback>
            }
          />
        </LoadingFallback>
      </Flex>
    </>
  );
};
