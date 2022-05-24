import { Center, Button, HStack, VStack, Text } from 'native-base';
import React from 'react';

import { Category } from '@src/contracts/Category';

type Props = {
  titles: Category[];
};

export function Subcategories({ titles }: Props) {
  return (
    <Center mt={6}>
      <VStack alignItems="center" justifyContent="center">
        <HStack space={8} flexWrap="wrap" alignItems="center">
          {titles.map((item, index) => {
            return (
              <Center
                bgColor={'amber.400'}
                w={150}
                h={120}
                mb={4}
                key={index}
                borderRadius="xl"
              >
                <Center borderRadius="md">
                  <Button
                    bg={'amber.600'}
                    w={100}
                    p={1.5}
                    //onPress={() => handleSelectedSubcategory(item.id)}
                  >
                    <Text textAlign="center" color={'amber.50'}>
                      {item.title}
                    </Text>
                  </Button>
                </Center>
              </Center>
            );
          })}
        </HStack>
      </VStack>
    </Center>
  );
}
