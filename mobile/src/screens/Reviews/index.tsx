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
} from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { AirbnbRating } from 'react-native-ratings';

import { RatePeriod, Review } from '@src/contracts/Review';
import { StackLocationNavigatorParamList } from '@src/routes/stacks/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';
import { formatDate } from '@src/utils/formatDate';

type ReviewsScreenNavigationProps = NavigationProp<
  StackLocationNavigatorParamList,
  'Reviews'
>;

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ratePeriod, setRatePeriod] = useState<RatePeriod>('week');

  const navigation = useNavigation<ReviewsScreenNavigationProps>();
  const route =
    useRoute<RouteProp<StackLocationNavigatorParamList, 'Reviews'>>();
  const { locationId } = route.params;

  const handleNavigateGoBack = () => {
    navigation.goBack();
  };

  const fetchAllReviewsFromLocation = useCallback(
    async (locationId: string, ratePeriod: RatePeriod) => {
      try {
        setIsLoading(true);
        const reviewsFromApi =
          await diversaGenteServices.getReviewsByLocationId(
            locationId,
            ratePeriod,
          );
        setReviews(reviewsFromApi);
      } catch (error) {
        console.info('Error while fetching all reviews', error);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    fetchAllReviewsFromLocation(locationId, ratePeriod);
  }, [fetchAllReviewsFromLocation, locationId, ratePeriod]);

  const statusBarHeight = getStatusBarHeight();

  return (
    <VStack px={4} flex={1} mt={statusBarHeight}>
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

      <ScrollView mt={6}>
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
        {reviews?.map((item, index) => {
          return (
            <Box
              key={index}
              size="md"
              borderRadius={20}
              borderColor={'warning.300'}
              borderWidth={1}
              _text={{
                color: 'amber.50',
              }}
              w={'100%'}
              h={'auto'}
              mt={10}
              px={4}
              py={8}
              bg={'warning.100'}
            >
              <Fontisto name="quote-a-right" size={28} color="black" />
              <Text mb={5} mt={4} fontSize={20}>
                {item.text}
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
                    >
                      {item.owner.name}
                    </Avatar>
                  ) : (
                    <Avatar size="md" bg={'info.600'}>
                      {item.owner.name[0]}
                    </Avatar>
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
                  {isLoading && (
                    <Spinner
                      size={'lg'}
                      position="absolute"
                      left={'50%'}
                      top={'50%'}
                      zIndex={4}
                    />
                  )}
                  {
                    <AirbnbRating
                      isDisabled={true}
                      selectedColor="#d6c103"
                      size={22}
                      defaultRating={item.stars}
                      showRating={false}
                    />
                  }
                </Box>
              </HStack>
            </Box>
          );
        })}
      </ScrollView>
    </VStack>
  );
};
