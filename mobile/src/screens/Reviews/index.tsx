import { Feather } from '@expo/vector-icons';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { Review } from '@src/contracts/Reviews';
import { Box, HStack, Icon, IconButton } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

import { StackLocationNavigatorParamList } from '@src/routes/locationStack.routes';
import { diversaGenteServices } from '@src/services/diversaGente';

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
    console.log('id in use effect', locationId);
    fetchAllReviewsFromLocation(locationId);
  }, [fetchAllReviewsFromLocation, locationId]);

  return (
    <HStack>
      <IconButton
        colorScheme="gray"
        variant={'solid'}
        icon={<Icon as={<Feather name="arrow-left" />} />}
        onPress={handleNavigateGoBack}
        position="absolute"
        top={10}
        left={10}
        zIndex={1}
      />
      {reviews?.map((item, index) => {
        return (
          <Box
            key={index}
            size="md"
            _text={{
              color: 'amber.50',
            }}
            marginTop={2}
            marginLeft={2}
            w={140}
            bg={'darkBlue.700'}
          >
            {item.text}
          </Box>
        );
      })}
    </HStack>
  );
};
