import { Avatar, Flex, Text } from 'native-base';
import { FunctionComponent } from 'react';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { Comment, CommentOwner } from '@src/contracts/Comment';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { formatDateSocialMedia } from '@src/utils/time';

export type UserCommentProps = {
  comment: IncludeInto<Comment, { owner: CommentOwner }>;
};

export const UserComment: FunctionComponent<UserCommentProps> = ({
  comment: { owner, text, createdAt },
}) => {
  const userInitials = getUsernameInitials(owner.name);
  const formattedCreatedAtDate = formatDateSocialMedia(createdAt);

  return (
    <Flex
      backgroundColor="white"
      borderRadius={6}
      paddingX={6}
      paddingY={5}
      width="100%"
    >
      <Flex direction="row">
        <Avatar
          borderRadius={6}
          backgroundColor={owner.picture ? 'transparent' : 'primary.500'}
          source={{
            uri: String(owner.picture),
          }}
        >
          {userInitials}
        </Avatar>
        <Flex marginLeft={5}>
          <Text fontWeight={'bold'}>{owner.name}</Text>
          <Text color="gray.500">{formattedCreatedAtDate}</Text>
        </Flex>
      </Flex>

      <Text color="gray.500" marginTop={4} fontSize={'md'}>
        {text}
      </Text>
    </Flex>
  );
};
