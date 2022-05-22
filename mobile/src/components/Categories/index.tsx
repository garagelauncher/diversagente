import { Button, ScrollView, HStack } from 'native-base';
import React from 'react';

import { Category } from '@src/contracts/Category';

type Props = {
  titles: Category[];
};
export const Categories = ({ titles }: Props) => {
  return (
    <ScrollView horizontal={true}>
      <HStack mt={4}>
        {titles.map((item, index) => {
          return (
            <Button
              size="md"
              _text={{
                color: 'amber.50',
              }}
              marginTop={2}
              marginLeft={2}
              key={index}
              w={140}
              bg={'darkBlue.700'}
            >
              {item.title}
            </Button>
          );
        })}
      </HStack>
    </ScrollView>
  );
};
