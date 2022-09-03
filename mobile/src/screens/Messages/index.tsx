import { Box, Heading, Text } from 'native-base';

export const Messages = () => {
  return (
    <Box
      width="100%"
      backgroundColor="blue.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Em breve</Heading>
      <Text>Para Dezembro de 2022</Text>
    </Box>
  );
};
