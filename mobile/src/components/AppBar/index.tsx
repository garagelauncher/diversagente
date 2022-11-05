import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { Flex, Heading, Icon, StatusBar } from 'native-base';
import { useEffect, useState } from 'react';

import { ConditionallyRender } from '../ConditionallyRender';

export const AppBar = () => {
  const netInfo = useNetInfo();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timeoutClear = setTimeout(() => {
      setIsVisible(false);
    }, 10000);

    if (!netInfo.isConnected) {
      clearTimeout(timeoutClear);
    }

    return () => {
      if (timeoutClear && netInfo.isConnected) {
        clearTimeout(timeoutClear);
      }
    };
  }, [netInfo.isConnected]);

  return (
    <Flex>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ConditionallyRender
        condition={isVisible}
        trueComponent={
          <Flex
            bg={netInfo.isConnected ? 'green.500' : 'red.500'}
            alignItems="center"
            justifyContent="center"
            direction="row"
            h={25}
          >
            <Icon
              as={Feather}
              name={netInfo.isConnected ? 'wifi' : 'wifi-off'}
              size="sm"
              color="white"
            />
            <Heading
              marginLeft={4}
              color="white"
              size="sm"
              fontSize={14}
              fontWeight="medium"
            >
              {netInfo.isConnected
                ? `Conectado: ${netInfo.type.toString()}`
                : 'Sem conexão com a internet'}
            </Heading>
          </Flex>
        }
        falseComponent={null}
      />
      {/* <Heading>diversaGente</Heading> */}
    </Flex>
  );
};
