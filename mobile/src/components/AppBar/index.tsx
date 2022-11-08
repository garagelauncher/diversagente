import { Flex, IFlexProps, Image, StatusBar, Text } from 'native-base';
import { ColorType } from 'native-base/lib/typescript/components/types';
import { FunctionComponent } from 'react';

import DiversagenteLogo from '@src/assets/logo.png';

export type AppBarProps = {
  fontcolor?: ColorType;
} & IFlexProps;

export const AppBar: FunctionComponent<AppBarProps> = ({
  fontcolor,
  ...rest
}) => {
  return (
    <Flex width="100%" {...rest}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Flex
        direction="row"
        width="100%"
        fontFamily="CarterOne_400Regular"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Flex>
          <Image
            source={DiversagenteLogo}
            alt="Logomarca diversagente"
            height={35}
            width={35}
          />
        </Flex>
        <Flex direction="row">
          <Text
            color={fontcolor ?? 'blue.600'}
            fontSize="sm"
            fontFamily="CarterOne_400Regular"
          >
            DIVERSA
          </Text>
          <Text
            color={fontcolor ?? 'amber.500'}
            fontSize="sm"
            fontFamily="CarterOne_400Regular"
          >
            GENTE
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
