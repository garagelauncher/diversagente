import { useLinkTo } from '@react-navigation/native';
import { Avatar, Flex, Text } from 'native-base';
import { FunctionComponent } from 'react';
import { TouchableOpacity } from 'react-native';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { Like, LikeOwner } from '@src/contracts/Like';
import { getUsernameInitials } from '@src/utils/getUsernameInitials';

export type UserLikeProps = {
  like: IncludeInto<Like, { owner: LikeOwner }>;
};

export const UserLike: FunctionComponent<UserLikeProps> = ({
  like: { owner },
}) => {
  const linkTo = useLinkTo();
  const userInitials = getUsernameInitials(owner.name);

  const handleNavigateToProfileDetails = () => {
    linkTo(`/profile/${owner.username}`);
  };

  return (
    <Flex
      backgroundColor="white"
      borderRadius={6}
      paddingX={3}
      paddingY={4}
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
    >
      <TouchableOpacity onPress={handleNavigateToProfileDetails}>
        <Avatar
          borderRadius={6}
          backgroundColor={owner.picture ? 'transparent' : 'primary.500'}
          source={{
            uri: String(owner.picture),
          }}
        >
          {userInitials}
        </Avatar>
      </TouchableOpacity>
      <Text fontWeight={'bold'} marginLeft={5}>
        {owner.name}
      </Text>
    </Flex>
  );
};
