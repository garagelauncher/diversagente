import React from 'react';
import { Box, Text, Button, VStack } from 'native-base';

import { theme } from '../../../global/styles/theme';

type TextSucessPops = {
  title: string;
  subtitle: string;
};

export const Sucess = ({ title, subtitle}: TextSucessPops) => {
  const buttonOkRef = React.useRef({});

  React.useEffect(() => {
    const buttonStyle = {
      backgroundColor: theme.colors.orangePrimary,
      borderColor: theme.colors.textColorWhite,
      borderWidth: 1,
      borderRadius: 8,
      width: 80,
      color: theme.colors.textColorWhite
    }; //@ts-ignore

    buttonOkRef.current.setNativeProps({
      style: buttonStyle
    });
  }, [buttonOkRef]);

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
              onPress={() => console.log("Ok")}
              ref={buttonOkRef}>
                OK
            </Button>
        </VStack>
     </Box>
  );
};
