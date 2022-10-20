import { AntDesign } from '@expo/vector-icons';
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
} from 'native-base';
import React from 'react';

import { Header } from '@src/components/Header';
import { useSubcategoryDetails } from '@src/hooks/queries/details/useSubcategoryDetails';
import { useAuth } from '@src/hooks/useAuth';
import { Post, UserHasInteracted } from '@src/components/Post';
import { PER_PAGE_ITEMS, userIdHelper } from '@src/configs';
import { usePosts } from '@src/hooks/queries/usePosts';
import { LoadingFallback } from '@src/components/LoadingFallback';

type SubcategoriesNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'Subcategory'
>;

export const Subcategory = () => {
  const route =
    useRoute<RouteProp<StackForumNavigatorParamList, 'Subcategory'>>();
  const { subcategoryId } = route.params;
  const { user } = useAuth();

  const { result, isLoading, isError } = useSubcategoryDetails(subcategoryId);

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
    navigation.navigate('FormCreatePost');
  };



  const skeletonsPosts = new Array(2).fill(0);

  const navigation = useNavigation<SubcategoriesNavigationProps>();

  return (
    <>
      <Box bgColor={'darkBlue.700'} height={390} mb={10}>
        <Box marginBottom={4}>
          <Header
            avatar={user?.picture}
            screenName={`${result?.title}`}
            subtitle={`${result?.description}`}
          ></Header>
        </Box>
      </Box>

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
                fallback={<Spinner color="orange.500" size="md" />}
                isLoading={isFetchingNextPage}
              >
                <Flex width="100%" alignItems="center" justifyContent="center">
                  <Text color="gray.500">
                    Não há mais postagens nessa subcategoria.
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
    </>
  );
};
