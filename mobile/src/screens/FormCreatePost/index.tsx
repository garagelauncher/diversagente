import { Box, Heading, Text } from 'native-base';

import { logger } from '@src/utils/logger';

export const FormCreatePost = () => {
  logger.success('FormCreatePost');

  return (
    <Box
      width="100%"
      backgroundColor="yellow.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>FormCreatePost</Heading>
      <Heading>Em breve</Heading>
      <Text>Para Dezembro de 2022</Text>
    </Box>
  );
};
