// eslint-disable-next-line import/no-unresolved
import { AntDesign } from '@expo/vector-icons';
import {
  VStack,
  Text,
  Button,
  Flex,
  HStack,
  ArrowForwardIcon,
  Icon,
} from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

import { theme } from '@src/styles/theme';

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
          borderRadius={16}
        >
          <Flex direction="row" grow={4} justify={'space-around'}>
            <HStack width={140} justifyContent={'left'}>
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
            </HStack>
            <HStack width={100} justifyContent={'center'}>
              <Button
                size={'sm'}
                variant={'solid'}
                width={35}
                height={35}
                marginTop={2}
                marginLeft={39}
                backgroundColor={theme.colors.darkBlue700}
              >
                <Icon
                  as={AntDesign}
                  name="arrowright"
                  color={theme.colors.light50}
                />
              </Button>
            </HStack>
          </Flex>
        </VStack>
      ))}
    </>
  );
};
