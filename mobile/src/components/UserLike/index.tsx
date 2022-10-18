import { Avatar, Flex, Text } from 'native-base';
import { FunctionComponent } from 'react';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';
import { Like, LikeOwner } from '@src/contracts/Like';

export type UserLikeProps = {
  like: IncludeInto<Like, { owner: LikeOwner }>;
};

export const UserLike: FunctionComponent<UserLikeProps> = ({
    like: { owner },
}) => {
  const userInitials = getUsernameInitials(owner.name);

  return (
    <Flex
      backgroundColor="white"
      borderRadius={6}
      paddingX={6}
      paddingY={5}
      width="100%"
    >
        <Avatar
          borderRadius={6}
          backgroundColor={'primary.500'}
          source={{
            uri: String(owner.picture),
          }}
        >
          {userInitials}
        </Avatar>
        <Text fontWeight={'bold'} marginLeft={5}>{owner.name}</Text>
    </Flex>
  );
};
