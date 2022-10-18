import {
  ScrollView,
  VStack,
  Button,
  Text,
  FormControl,
  Input,
  AlertDialog,
  CheckCircleIcon,
} from 'native-base';
import React from 'react';

import { theme } from '@src/styles/theme';

export const EditPersonalInformation = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);

  return (
    <ScrollView>
      <VStack width={'100%'} height={500}>
        <Text
          fontSize={'2xl'}
          textAlign={'center'}
          marginTop={20}
          bold
          color={theme.colors.warmGray700}
        >
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
        onPressIn={() => setIsOpen(!isOpen)}
      >
        Salvar escolha
      </Button>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <CheckCircleIcon
            color={theme.colors.success600}
            marginTop={4}
            alignItems="center"
            paddingRight={270}
          />
          <AlertDialog.Header>
            <Text bold>{'  Informações salvas com sucesso'}</Text>
            <Button
              variant="solid"
              colorScheme="emerald"
              onPress={onClose}
              ref={cancelRef}
              width={250}
              marginTop={8}
            >
              ok, entendi
            </Button>
          </AlertDialog.Header>
        </AlertDialog.Content>
      </AlertDialog>
    </ScrollView>
  );
};
