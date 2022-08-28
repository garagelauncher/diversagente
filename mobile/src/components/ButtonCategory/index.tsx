// eslint-disable-next-line import/no-unresolved
import { theme } from '@src/styles/theme';
import { HStack, Flex, Button } from 'native-base';
import React from 'react';

type ButtonCategoryProps = {
  title: string;
};

export const ButtonCategory = ({ title }: ButtonCategoryProps) => {
  const myRef = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      backgroundColor: '#facc15',
      borderColor: '#CA8A04',
      borderWidth: 1,
      borderRadius: 4,
    };
  }, [myRef]);
  return (
    <HStack space={4}>
      <Button
        size="sm"
        variant={'solid'}
        _text={{
          color: '#1F2937',
        }}
        ref={myRef}
        px="3"
      >
        {title}
      </Button>
    </HStack>
  );
};
