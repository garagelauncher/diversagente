import { Box, Spinner } from 'native-base';

export const LoadingScreen = () => {
  return (
    <Box
      width="100%"
      backgroundColor="blue.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner size={'large'} />
    </Box>
  );
};
