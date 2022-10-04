import { Feather } from '@expo/vector-icons';
import { Avatar, Flex, Heading, HStack, Icon, Text } from 'native-base';
import { FunctionComponent } from 'react';

import type { Post as PostData } from '@src/contracts/Post';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { formatDateSocialMedia } from '@src/utils/time';

export type PostProps = {
  post: PostData;
  isPreview?: boolean;
};

export const Post: FunctionComponent<PostProps> = ({ post, isPreview }) => {
  const userInitials = getUsernameInitials(post.owner.username);
  const contentPreview = post.content.slice(0, 255);

  const formattedCreatedAtDate = formatDateSocialMedia(post.createdAt);

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
          <Icon
            as={Feather}
            name="heart"
            size={7}
            fill="red.500"
            color="blue"
            borderRadius={6}
          />
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
