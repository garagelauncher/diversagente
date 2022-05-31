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
  Text,
  VStack,
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AirbnbRating } from 'react-native-ratings';

import { Review } from '@src/contracts/Review';
import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { formatDate } from '@src/utils/formatDate';

type ReviewsScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'Reviews'
>;

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>([]);

  const navigation = useNavigation<ReviewsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackLocationNavigatorParamList, 'Reviews'>>();
  const { locationId } = route.params;

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const fetchAllReviewsFromLocation = useCallback(
    async (locationId: string) => {
      try {
        const reviewsFromApi =
          await diversaGenteServices.getReviewsByLocationId(locationId);
        setReviews(reviewsFromApi);
      } catch (error) {
        console.info('Error while fetching all reviews', error);
      }
    },
    [],
  );

  useEffect(() => {
    fetchAllReviewsFromLocation(locationId);
  }, [fetchAllReviewsFromLocation, locationId]);

  const statusBarHeight = getStatusBarHeight();

  return (
    <VStack p={4} flex={1} mt={statusBarHeight}>
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
      <Heading fontSize={30} alignSelf={'center'} mt={3}>
        Reviews
      </Heading>

      <ScrollView mt={6}>
        {reviews?.map((item, index) => {
          return (
            <Box
              key={index}
              size="md"
              borderRadius={20}
              _text={{
                color: 'amber.50',
              }}
              w={'100%'}
              h={'auto'}
              mt={10}
              px={4}
              py={8}
              bg={'warning.300'}
            >
              <Fontisto name="quote-a-right" size={28} color="black" />
              <Text mb={5} mt={4} fontSize={20}>
                {item.text}
                lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              </Text>
              <Divider my={5} bg={'muted.800'} />
              <HStack
                bottom={0}
                alignItems="center"
                justifyContent="space-evenly"
              >
                <HStack alignItems="center">
                  {item.owner.picture ? (
                    <Avatar
                      size="md"
                      source={{
                        uri: item.owner.picture,
                      }}
                    ></Avatar>
                  ) : (
                    <Avatar size="md" bg={'info.600'}></Avatar>
                  )}

                  <VStack pl={2} pr={5}>
                    <Text fontSize={16} color={'muted.800'}>
                      {item.owner.name}
                    </Text>
                    <Text fontSize={16} color={'muted.500'}>
                      {formatDate(item.updatedAt)}
                    </Text>
                  </VStack>
                </HStack>
                <Box>
                  <AirbnbRating
                    isDisabled={true}
                    selectedColor="#d6c103"
                    size={22}
                    defaultRating={item.stars}
                    showRating={false}
                  />
                </Box>
              </HStack>
            </Box>
          );
        })}
      </ScrollView>
    </VStack>
  );
};
