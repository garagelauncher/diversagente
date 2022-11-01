import { Feather, Fontisto } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {
  Avatar,
  Box,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Select,
  Spinner,
  Text,
  VStack,
  FlatList,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AirbnbRating } from 'react-native-ratings';

import { RatePeriod, Review } from '@src/contracts/Review';
import { StackLocationNavigatorParamList } from '@src/routes/stacks/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { formatDate } from '@src/utils/formatDate';
import { useReviews } from '@src/hooks/queries/useReviews';
import { subtractDate } from '@src/utils/time';
import { PER_PAGE_ITEMS } from '@src/configs';
import { UserReview } from './UserReview';

export type ReviewsScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'Reviews'
>;

export const Reviews = () => {
  const [ratePeriod, setRatePeriod] = useState<RatePeriod>('week');

  const navigation = useNavigation<ReviewsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackLocationNavigatorParamList, 'Reviews'>>();
  const { locationId } = route.params;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    isRefetching,
    hasNextPage,
    refetch,
    fetchNextPage,
  } = useReviews({
    locationId,
    perPage: PER_PAGE_ITEMS,
    range: [0, PER_PAGE_ITEMS],
    sort: ['createdAt', 'DESC'],
    filter: {
      locationId,
      createdAt: {
        gt: subtractDate(1, ratePeriod)
      }
    }
  });

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const statusBarHeight = getStatusBarHeight();

  const handlePullReviewListToRefresh = () => {
    refetch();
  };

  const handleLoadMoreReviews = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };


  return (
    <VStack px={4} pt={6} flex={1} mt={statusBarHeight}>
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={6}
        ml={4}
        mb={2}
        zIndex={1}
      />
      <Heading fontSize={30} alignSelf={'center'} mt={6}>
        Avaliações
      </Heading>

        <Text
          fontSize={16}
          color={'gray.800'}
          fontWeight={'bold'}
          flex={1}
          py={2}
        >
          Escolha um período:
        </Text>
        <Select
          accessibilityLabel="Escolha um período para as avaliações"
          flex={1}
          selectedValue={ratePeriod}
          onValueChange={(value) => setRatePeriod(value as RatePeriod)}
        >
          <Select.Item label="Dia" value="day" />
          <Select.Item label="Semana" value="week" />
          <Select.Item label="Mês" value="month" />
          <Select.Item label="Ano" value="year" />
        </Select>
        <FlatList
          width={'100%'}
          data={data?.pages.map((page) => page.results).flat()}
          renderItem={({ item }) => (
            <Box marginBottom={4}>
              <UserReview comment={item} />
            </Box>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 350 }}
          onEndReached={handleLoadMoreReviews}
          onEndReachedThreshold={0.85}
          refreshing={isRefetching && !isFetchingNextPage}
          onRefresh={handlePullReviewListToRefresh}
          ListFooterComponent={
            <LoadingFallback
              fallback={<Spinner color="orange.500" size="lg" />}
              isLoading={isFetchingNextPage}
            >
              <Flex width="100%" alignItems="center" justifyContent="center">
                <Text color="gray.500">
                  Esses foram os reviews desse local.
                </Text>
              </Flex>
            </LoadingFallback>
          }
        />
    </VStack>
  );
};
