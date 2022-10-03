import { Avatar, Flex, Heading, Text } from 'native-base';
import { FunctionComponent } from 'react';

import { getUsernameInitials } from '@src/utils/getUsernameInitials';

type HeaderProps = {
  username: string;
  avatar?: string | null;
  subtitle: string;
};

export const Header: FunctionComponent<HeaderProps> = ({
  username,
  subtitle,
  avatar,
}) => {
  const userInitials = getUsernameInitials(username);

  const avatarUri = String(avatar);

  return (
    <Flex
      paddingTop={12}
      paddingX={4}
      paddingBottom={9}
      backgroundColor="darkBlue.700"
      width="100%"
      direction="row"
      justifyContent="space-between"
    >
      <Flex>
        <Heading color="white">Olá, {username}</Heading>
        <Text color="gray.400" marginTop={3}>
          {subtitle}
        </Text>
      </Flex>
      <Avatar
        backgroundColor={'orange.500'}
        alignSelf="center"
        source={{
          uri: avatarUri,
        }}
      >
        {userInitials}
      </Avatar>
    </Flex>
  );
};
