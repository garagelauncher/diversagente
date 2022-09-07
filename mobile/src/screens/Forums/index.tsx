import { Box, Heading, ScrollView, Text } from 'native-base';

import { logger } from '@src/utils/logger';

export const Forums = () => {
  logger.success('Forums');

  return (
    <Box
      width="100%"
      backgroundColor="yellow.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Em breve</Heading>
      <Text>Para Dezembro de 2022</Text>
    </Box>
  );
};
