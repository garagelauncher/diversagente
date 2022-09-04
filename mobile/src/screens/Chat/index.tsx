import { Box, Heading, Text } from 'native-base';

export const Chat = () => {
  return (
    <Box
      width="100%"
      backgroundColor="blue.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Chat</Heading>
      <Heading>Em breve</Heading>
      <Text>Para Dezembro de 2022</Text>
    </Box>
  );
};
