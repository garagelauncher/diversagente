import { Avatar, Flex, Text } from 'native-base';
import { FunctionComponent, useState } from 'react';

import { ConditionallyRender } from '../ConditionallyRender';
import { CommentEdit } from './CommentEdit';
import { CommentMoreActions } from './CommentMoreActions';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { Comment, CommentOwner } from '@src/contracts/Comment';
import { useAuth } from '@src/hooks/useAuth';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { formatDateSocialMedia } from '@src/utils/time';

export type UserCommentProps = {
  comment: IncludeInto<Comment, { owner: CommentOwner }>;
};

export const UserComment: FunctionComponent<UserCommentProps> = ({
  comment: { owner, text, createdAt, id, postId },
}) => {
  const { user } = useAuth();
  const [isEditModeActive, setIsEditModeActive] = useState(false);

  const isOwner = user?.id === owner.id;
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
      <Flex
        direction="row"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Flex direction="row" alignItems="center">
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
        <Flex>
          <CommentMoreActions
            isOwner={isOwner}
            onActivateCommentEditMode={() => setIsEditModeActive(true)}
            commentId={id}
          />
        </Flex>
      </Flex>

      <ConditionallyRender
        condition={isEditModeActive}
        trueComponent={
          <CommentEdit
            commentId={id}
            postId={postId}
            isEditModeActive={isEditModeActive}
            onDeactiveEditMode={() => setIsEditModeActive(false)}
            previousText={text}
          />
        }
        falseComponent={
          <Text color="gray.500" marginTop={4} fontSize={'md'}>
            {text}
          </Text>
        }
      />
    </Flex>
  );
};
