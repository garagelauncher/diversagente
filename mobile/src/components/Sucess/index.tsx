import { Box, Text, Button, VStack } from 'native-base';

import { theme } from '../../../global/styles/theme';

type TextSucessPops = {
  title: string;
  subtitle: string;
};

export const Sucess = ({ title, subtitle}: TextSucessPops) => {
  return (
      <Box 
        width="100%"
        flex={1}
        backgroundColor={theme.colors.blueSecondary}
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color={theme.colors.textColorWhite}
          fontSize={40}
          fontWeight={800}
          textAlign="center"
          >
          {title}
        </Text>
        
        <Text
          color={theme.colors.textColorWhite}
          fontSize={20}
          fontWeight={600}
          textAlign="center"
        >
          {subtitle}
        </Text>
        <VStack 
          w="100%" 
          space={4} 
          px="2" 
          mt="4" 
          alignItems="center" 
          justifyContent="center"
          >
            <Button 
              size="lg" 
              colorScheme="primary"
              variant="solid"
              onPress={() => console.log("Ok")}>
                OK
            </Button>
        </VStack>

     </Box>
  );
};
