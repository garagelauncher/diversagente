import {
  ScrollView,
  Button,
  Text,
  VStack,
  Box,
  Flex,
  Switch,
} from 'native-base';
import React from 'react';

import { theme } from '@src/styles/theme';

export const AllowLocation = () => {
  return (
    <ScrollView>
      <VStack width={'100%'} height={500} marginTop={180}>
        <Text
          fontSize={'2xl'}
          textAlign={'center'}
          marginTop={55}
          bold
          color={theme.colors.warmGray700}
        >
          Localização
        </Text>
        <Box
          backgroundColor={theme.colors.warmGray200}
          height={50}
          marginLeft={30}
          marginRight={30}
          marginTop={50}
          borderRadius={16}
        >
          <Flex direction="row">
            <Text
              fontSize={'sm'}
              backgroundColor={theme.colors.warmGray200}
              bold
              marginTop={4}
              marginLeft={2}
            >
              Permitir Localização
            </Text>
            <Switch size={'sm'} marginTop={3} marginLeft={120}></Switch>
          </Flex>
        </Box>
        <Button
          marginTop={10}
          marginLeft={30}
          marginRight={30}
          background={theme.colors.blue700}
        >
          Salvar escolha
        </Button>
      </VStack>
    </ScrollView>
  );
};
