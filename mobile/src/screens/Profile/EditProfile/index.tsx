import { Avatar, Box, ScrollView, Flex, Button, Text } from 'native-base';
import React from 'react';

import { theme } from '@src/styles/theme';

export const EditProfile = () => {
  return (
    <ScrollView>
      <Avatar marginTop={150} size={'2xl'} alignSelf={'center'}>
        GB
      </Avatar>
      <Flex direction="column" marginTop={10}>
        <Button
          marginTop={0}
          marginLeft={30}
          marginRight={30}
          backgroundColor={theme.colors.blue200}
          height={51}
          borderRadius={16}
        >
          <Text color={theme.colors.warmGray700} bold>
            Informações Pessoais
          </Text>
        </Button>
        <Button
          marginTop={5}
          marginLeft={30}
          marginRight={30}
          backgroundColor={theme.colors.blue200}
          height={51}
          borderRadius={16}
        >
          <Text color={theme.colors.warmGray700} bold>
            Notificações
          </Text>
        </Button>
        <Button
          marginTop={5}
          marginLeft={30}
          marginRight={30}
          backgroundColor={theme.colors.blue200}
          height={51}
          borderRadius={16}
        >
          <Text color={theme.colors.warmGray700} bold>
            Localização
          </Text>
        </Button>
        <Button
          marginTop={5}
          marginLeft={30}
          marginRight={30}
          backgroundColor={theme.colors.blue200}
          height={51}
          borderRadius={16}
        >
          <Text color={theme.colors.warmGray700} bold>
            Excluir minha conta
          </Text>
        </Button>
      </Flex>
    </ScrollView>
  );
};
