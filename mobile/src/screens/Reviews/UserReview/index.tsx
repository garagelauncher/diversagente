import { Review, ReviewOwner } from '@src/contracts/Review';
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
  import { AirbnbRating } from 'react-native-ratings';
import { FunctionComponent } from 'react';

  export type UserReviewProps = {
    review: Review;
  };


export const UserReview: FunctionComponent<UserReviewProps> = ({
    review
}) => {

    return (
        <Box
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
          {review.text}
        </Text>
        <Divider my={5} bg={'muted.800'} />
        <HStack
          bottom={0}
          alignItems="center"
          justifyContent="space-evenly"
        >
          <HStack alignItems="center">
            {review.owner.picture ? (
              <Avatar
                size="md"
                source={{
                  uri: review.owner.picture,
                }}
              >
                {review.owner.name}
              </Avatar>
            ) : (
              <Avatar size="md" bg={'info.600'}>
                {review.owner.name[0]}
              </Avatar>
            )}

            <VStack pl={2} pr={5}>
              <Text fontSize={16} color={'muted.800'}>
                {review.owner.name}
              </Text>
              <Text fontSize={16} color={'muted.500'}>
                {formatDate(review.updatedAt)}
              </Text>
            </VStack>
          </HStack>
          <Box>


              <AirbnbRating
                isDisabled={true}
                selectedColor="#d6c103"
                size={22}
                defaultRating={review.stars}
                showRating={false}
              />

          </Box>
        </HStack>
      </Box>
    )
}