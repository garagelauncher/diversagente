import { AntDesign } from '@expo/vector-icons';
import { VStack, Text, Button, Flex, HStack, Icon } from 'native-base';
import React from 'react';

import { theme } from '@src/styles/theme';

export const Subcategory = () => {
  const subcategories = [
    'Alimentação',
    'Esporte',
    'Alergias',
    'Saúde Mental',
    'Medicação',
    'Terapias',
  ];

  return (
    <>
      {subcategories.map((subcategory) => (
        <VStack
          key={subcategory}
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
                key={subcategory}
                fontSize="lg"
                justifyContent="center"
                py={2}
                px={2}
                paddingLeft={4}
                bold
              >
                {subcategory}
              </Text>
            </HStack>
            <HStack width={100} justifyContent={'center'}>
              <Button
                subcategory={'sm'}
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
