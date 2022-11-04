import { Feather } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';
import { Flex, Heading, Icon, StatusBar } from 'native-base';

import { ConditionallyRender } from '../ConditionallyRender';
import { TimeoutRender } from '../TimeoutRender';

export const AppBar = () => {
  const netInfo = useNetInfo();

  return (
    <Flex>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <TimeoutRender timeoutInSeconds={20} shoudlRenderInitially>
        <ConditionallyRender
          condition={Boolean(netInfo.isConnected)}
          trueComponent={
            <Flex
              bg="green.500"
              alignItems="center"
              justifyContent="center"
              direction="row"
              h={25}
            >
              <Icon as={Feather} name="wifi" size="sm" color="white" />
              <Heading marginLeft={4} color="white" size="md">
                Conectado
              </Heading>
            </Flex>
          }
          falseComponent={
            <Flex
              bg="red.500"
              alignItems="center"
              justifyContent="center"
              direction="row"
              h={25}
            >
              <Icon as={Feather} name="wifi-off" size="sm" color="white" />
              <Heading marginLeft={4} color="white" size="md">
                Sem conexão
              </Heading>
            </Flex>
          }
        />
      </TimeoutRender>
      <Heading>diversaGente</Heading>
    </Flex>
  );
};
