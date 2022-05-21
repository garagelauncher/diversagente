import { Box } from 'native-base';

import { Category } from '@src/components/Category';
import { UserAvatar } from '@src/components/UserAvatar';

export const Forums = () => {
  return (
    <Box backgroundColor={'#FFFFFF'} flex={1}>
      <UserAvatar picture={'https://github.com/bertiGrazi.png'} />
      <Category />
    </Box>
  );
};
