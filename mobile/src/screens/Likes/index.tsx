import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {
  Box,
  FlatList,
  Flex,
  Icon,
  IconButton,
  Spinner,
  Text,
} from 'native-base';
import React from 'react';

import { AppBar } from '@src/components/AppBar';
import { LoadingFallback } from '@src/components/LoadingFallback';
import { UserLike } from '@src/components/UserLike';
import { PER_PAGE_ITEMS } from '@src/configs';
import { LikeOwner } from '@src/contracts/Like';
import { useLikes } from '@src/hooks/queries/useLikes';
import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';

export type LikesScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'Likes'
>;

export const Likes = () => {
  const navigation = useNavigation<LikesScreenNavigationProps>();
  const route = useRoute<RouteProp<StackForumNavigatorParamList, 'Likes'>>();
  const { postId } = route.params;

  const {
    data,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useLikes<{
    owner: LikeOwner;
  }>({
    postId,
    range: [0, PER_PAGE_ITEMS],
    sort: ['createdAt', 'DESC'],
    filter: {
      postId,
    },
    include: {
      owner: true,
    },
  });

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const handlePullLikeListToRefresh = () => {
    refetch();
  };

  const handleLoadMoreLikes = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Flex px={4} flex={1}>
      <AppBar />
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={4}
        zIndex={1}
      />
      <FlatList
        mt={12}
        width={'100%'}
        data={data?.pages.map((page) => page.results).flat()}
        renderItem={({ item }) => (
          <Box marginBottom={4}>
            <UserLike like={item} />
          </Box>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 350 }}
        onEndReached={handleLoadMoreLikes}
        onEndReachedThreshold={0.85}
        refreshing={isRefetching && !isFetchingNextPage}
        onRefresh={handlePullLikeListToRefresh}
        ListFooterComponent={
          <LoadingFallback
            fallback={<Spinner color="orange.500" size="lg" />}
            isLoading={isFetchingNextPage}
          >
            <Flex width="100%" alignItems="center" justifyContent="center">
              <Text color="gray.500">Esses foram os likes desse post.</Text>
            </Flex>
          </LoadingFallback>
        }
        ListEmptyComponent={
          <Flex width="100%" alignItems="center" justifyContent="center">
            <Text color="gray.500">Ninguém curtiu esse post ainda.</Text>
          </Flex>
        }
      />
    </Flex>
  );
};
