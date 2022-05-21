import { Sucess } from '@src/components/Sucess';
import { Box, Heading, Text, View } from 'native-base';

import { theme } from '../../styles/theme';

export const Forums = () => {
  return (
    <Box
      width="100%"
      backgroundColor={theme.colors.pastelPrimary}
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>FORUMS PAGE</Heading>
      <Text>Work In progress...</Text>
    </Box>
  );
};
