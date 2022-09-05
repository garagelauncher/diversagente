// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/styles/theme';
import { VStack, Text, Button, Stack, Center } from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

export const Subcategory = () => {
  return (
    <>
      {[
        'Alimentação',
        'Esporte',
        'Alergias',
        'Saúde Mental',
        'Medicação',
        'Terapias',
      ].map((size) => (
        <VStack
          key={size}
          space={3}
          h="51"
          w="303"
          bg={theme.colors.blue200}
          rounded="md"
          marginTop={2}
          marginLeft={2}
          justifyContent="center"
        >
          <Text
            key={size}
            fontSize="lg"
            justifyContent="center"
            py={2}
            px={2}
            paddingLeft={4}
            bold
          >
            {size}
          </Text>
        </VStack>
      ))}
    </>
  );
};
