// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/styles/theme';
import { HStack, Flex, Button, Stack } from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

export const ButtonCategory = () => {
  const myRef = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      borderWidth: 1,
      borderRadius: 4,
    };
  }, [myRef]);
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
        <Button key={size} size={'lg'} marginTop={0}>
          {size}
        </Button>
      ))}
    </Stack>
  );
};
