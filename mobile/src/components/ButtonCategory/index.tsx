// eslint-disable-next-line import/no-unresolved
import { HStack, Flex, Button, Stack } from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

import { theme } from '@src/styles/theme';

export const ButtonCategory = () => {
  return (
    <Stack
      direction={{
        base: 'row',
        md: 'row',
      }}
      space={10}
      alignItems={{
        base: 'center',
        md: 'flex-start',
      }}
    >
      {['POPULAR', 'RECOMENDADO'].map((size) => (
        <Button
          key={size}
          size={'lg'}
          marginTop={0}
          variant={'solid'}
          colorScheme="primary"
        >
          {size}
        </Button>
      ))}
    </Stack>
  );
};
