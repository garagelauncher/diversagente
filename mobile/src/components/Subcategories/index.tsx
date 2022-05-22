import {
  Center,
  Button,
  HStack,
  VStack,
  Text,
  ScrollView,
  Box,
} from 'native-base';
import React from 'react';

export interface Titles {
  id: number;
  text: string;
}

type Props = {
  titles: Titles[];
};

export function Subcategories({ titles }: Props) {
  return (
    <Box mt={10} ml="5">
      <ScrollView>
        <VStack alignItems="center" justifyContent="center">
          <HStack space={6} flexWrap="wrap" alignItems="center">
            {titles.map((item, index) => {
              return (
                <Button
                  bgColor={'gray.50'}
                  borderRadius="md"
                  mb={4}
                  key={index}
                >
                  <Center bgColor={'gray.50'} w={120} h={120} borderRadius="xl">
                    <Center borderRadius="md">
                      <Button bg={'gray.300'} w={100} p={1.5}>
                        <Text textAlign="center" color={'gray.900'}>
                          {item.text}
                        </Text>
                      </Button>
                    </Center>
                  </Center>
                </Button>
              );
            })}
          </HStack>
        </VStack>
      </ScrollView>
    </Box>
  );
}
