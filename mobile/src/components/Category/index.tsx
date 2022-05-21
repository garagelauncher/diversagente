import { Button, Box } from 'native-base';
import React from 'react';

import { theme } from '../../styles/theme';

export const Category = () => {
  const categoryButton = React.useRef({});
  React.useEffect(() => {
    const styleObj = {
      backgroundColor: theme.colors.navyPrimary,
      borderColor: theme.colors.navyPrimary,
      borderWidth: 1,
      borderRadius: 12,
    }; //@ts-ignore

    categoryButton.current.setNativeProps({
      style: styleObj,
    });
  }, [categoryButton]);
  return (
    <Box flexDirection={'row'}>
      <Button
        size="md"
        variant={'subtle'}
        _text={{
          color: '#FFFFFF',
        }}
        ref={categoryButton}
        marginTop={2}
        marginLeft={2}
      >
        Lazer
      </Button>
    </Box>
  );
};
