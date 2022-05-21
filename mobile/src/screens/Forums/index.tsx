import { Sucess } from '@src/components/Sucess';
import { UserAvatar } from '@src/components/UserAvatar';
import { Avatar, Box, Heading, Text, View, HStack } from 'native-base';

import { theme } from '../../styles/theme';

export const Forums = () => {
  return (
    <Box
      backgroundColor={theme.colors.bluePrimary}
      flex={1}
    >
      <UserAvatar picture={'https://github.com/bertiGrazi.png'}   />
    </Box>
  );
};
