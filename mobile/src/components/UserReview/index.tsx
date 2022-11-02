import { Avatar, Divider, Flex, Text } from 'native-base';
import { FunctionComponent, useState } from 'react';
import { AirbnbRating } from 'react-native-ratings';

import { ReviewMoreActions } from './ReviewMoreActions';

import { Review } from '@src/contracts/Review';
import { useAuth } from '@src/hooks/useAuth';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { formatDateSocialMedia } from '@src/utils/time';

export type UserReviewProps = {
  review: Review;
};

export const UserReview: FunctionComponent<UserReviewProps> = ({ review }) => {
  const { user } = useAuth();
  const [isEditModeActive, setIsEditModeActive] = useState(false);

  const isOwner = user?.id === review.owner.id;
  const userInitials = getUsernameInitials(review.owner.name);
  const formattedCreatedAtDate = formatDateSocialMedia(review.createdAt);

  return (
    <Flex
      backgroundColor="white"
      borderRadius={6}
      paddingX={6}
      paddingY={5}
      width="100%"
    >
      <Flex
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Flex direction="row" alignItems="center">
          <Avatar
            borderRadius={6}
            backgroundColor={
              review.owner.picture ? 'transparent' : 'primary.500'
            }
            source={{
              uri: String(review.owner.picture),
            }}
          >
            {userInitials}
          </Avatar>
          <Flex marginLeft={5}>
            <Text fontWeight={'bold'}>{review.owner.name}</Text>
            <Text color="gray.500">{formattedCreatedAtDate}</Text>
          </Flex>
        </Flex>
        <Flex>
          <ReviewMoreActions
            isOwner={isOwner}
            locationId={review.locationId}
            reviewId={review.id}
          />
        </Flex>
      </Flex>
      <Text mt={4} fontSize={20}>
        {review.text}
      </Text>
      <Divider my={5} bg={'muted.300'} />
      <AirbnbRating
        isDisabled={true}
        selectedColor="#d6c103"
        size={22}
        defaultRating={review.stars}
        showRating={false}
      />
    </Flex>
  );
};
