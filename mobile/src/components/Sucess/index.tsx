import React from 'react';
import { Box, Text, Button, VStack } from 'native-base';

import { theme } from '../../styles/theme';

type TextSucessPops = {
  title: string;
  subtitle: string;
};

export const Sucess = ({ title, subtitle}: TextSucessPops) => {
  const buttonOkRef = React.useRef({});

  React.useEffect(() => {
    const buttonStyle = {
      backgroundColor: theme.colors.navyPrimary,
      borderColor: theme.colors.navyPrimary,
      borderWidth: 1,
      borderRadius: 8,
      width: 80,
      color: '#FFFFFF'
    }; //@ts-ignore

    buttonOkRef.current.setNativeProps({
      style: buttonStyle
    });
  }, [buttonOkRef]);

  return (
      <Box 
        width="100%"
        flex={1}
        backgroundColor={theme.colors.orangePrimary}
        alignItems="center"
        justifyContent="center"
      >
        <Text
          color={'#FFFFFF'}
          fontSize={40}
          fontWeight={800}
          textAlign="center"
          >
          {title}
        </Text>
        
        <Text
           color={'#FFFFFF'}
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
              ref={buttonOkRef}>
                OK
            </Button>
        </VStack>
     </Box>
  );
};
