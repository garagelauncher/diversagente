import { Feather } from '@expo/vector-icons';
import {
  Avatar,
  Flex,
  Heading,
  HStack,
  Icon,
  Text,
  FavouriteIcon,
  Pressable,
} from 'native-base';
import { FunctionComponent } from 'react';

import type { Post as PostData } from '@src/contracts/Post';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { formatDateSocialMedia } from '@src/utils/time';

export type PostProps = {
  post: PostData;
  isPreview?: boolean;
  hasLiked?: boolean;
};

export const Post: FunctionComponent<PostProps> = ({
  post,
  isPreview,
  hasLiked = false,
}) => {
  const userInitials = getUsernameInitials(post.owner.username);
  const contentPreview = post.content.slice(0, 255);

  const formattedCreatedAtDate = formatDateSocialMedia(post.createdAt);

  const handleTogglePostLike = () => {
    console.log('Like toggled');
  };

  return (
    <Flex backgroundColor="white" borderRadius={6} paddingX={6} paddingY={5}>
      <Flex direction="row">
        <Avatar borderRadius={6} backgroundColor="green.600">
          {userInitials}
        </Avatar>
        <Flex marginLeft={5}>
          <Text fontWeight={'bold'}>{post.owner.name}</Text>
          <Text color="gray.500">{formattedCreatedAtDate}</Text>
        </Flex>
      </Flex>

      <Flex marginTop={3}>
        <Heading>{post.title}</Heading>
        <Text color="gray.500" marginTop={7}>
          {isPreview ? contentPreview : post.content}
          {isPreview && (
            <Text color="blue.500" marginTop={7} underline>
              ...Ver mais
            </Text>
          )}
        </Text>
      </Flex>

      <HStack direction="row" space={5} marginTop={3}>
        <Flex direction="row" alignItems="center">
          {hasLiked ? (
            <Pressable
              onPress={handleTogglePostLike}
              _pressed={{ backgroundColor: 'gray.100' }}
              borderRadius={6}
            >
              <FavouriteIcon size={7} color="red.500" />
            </Pressable>
          ) : (
            <Pressable
              onPress={handleTogglePostLike}
              _pressed={{ backgroundColor: 'gray.100' }}
              borderRadius={6}
            >
              <Icon
                as={Feather}
                name="heart"
                size={7}
                color="muted.400"
                borderRadius={6}
              />
            </Pressable>
          )}
          <Text marginLeft={2} fontSize={18}>
            {post._count.likes}
          </Text>
        </Flex>
        <Flex direction="row" alignItems="center">
          <Icon as={Feather} name="message-circle" size={7} />
          <Text marginLeft={2} fontSize={18}>
            {post._count.comments}
          </Text>
        </Flex>
      </HStack>
    </Flex>
  );
};
