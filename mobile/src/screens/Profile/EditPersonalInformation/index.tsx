import {
  ScrollView,
  VStack,
  Button,
  Text,
  FormControl,
  Input,
} from 'native-base';
import React from 'react';

import { theme } from '@src/styles/theme';

export const EditPersonalInformation = () => {
  return (
    <ScrollView>
      <VStack width={'100%'} height={500} marginTop={100}>
        <Text fontSize={'2xl'} textAlign={'center'} marginTop={100} bold>
          {'Editar informações\npessoais'}
        </Text>
        <FormControl mb={5}>
          <Input
            placeholder="Fulano"
            marginLeft={30}
            marginRight={30}
            marginTop={30}
            height={50}
          ></Input>
          <Input
            placeholder="da Silva Santos"
            marginLeft={30}
            marginRight={30}
            marginTop={30}
            height={50}
          ></Input>
          <Input
            placeholder="Masculino"
            marginLeft={30}
            marginRight={30}
            marginTop={30}
            height={50}
          ></Input>
        </FormControl>
      </VStack>
      <Button
        marginTop={10}
        marginLeft={30}
        marginRight={30}
        background={theme.colors.blue700}
      >
        Salvar escolha
      </Button>
    </ScrollView>
  );
};
