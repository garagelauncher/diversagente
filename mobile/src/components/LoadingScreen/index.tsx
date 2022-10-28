import { Box, Spinner } from 'native-base';

export const LoadingScreen = () => {
  return (
    <Box
      width="100%"
      backgroundColor="gray.100"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        size={'lg'}
        position="absolute"
        alignSelf="center"
        justifyContent="center"
        color="orange.500"
        zIndex={1}
      />
    </Box>
  );
};
