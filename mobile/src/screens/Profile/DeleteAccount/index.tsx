import {
  ScrollView,
  Button,
  Text,
  VStack,
  Box,
  Alert,
  Center,
  HStack,
  Flex,
  IconButton,
  AlertDialog,
} from 'native-base';
import React from 'react';

import { AlertDialogAlert } from '@src/components/AlertDialogAlert';
import { theme } from '@src/styles/theme';

export const DeleteAccount = () => {
  const [isDisableOpen, setDisableIsOpen] = React.useState(false);
  const [isDeleteOpen, setDeleteIsOpen] = React.useState(false);

  const onCloseDisable = () => setDisableIsOpen(false);
  const onCloseDelete = () => setDeleteIsOpen(false);

  const cancelRef = React.useRef(null);
  const cancelRefDelete = React.useRef(null);

  return (
    <ScrollView height={'100%'}>
      <VStack width={'100%'} height={500} marginTop={0}>
        <Text
          fontSize={'2xl'}
          textAlign={'center'}
          marginTop={55}
          bold
          color={theme.colors.warmGray700}
        >
          {'Desativar a sua conta em \nvez de excluir?'}
        </Text>
        <Center>
          <Alert
            status={'warning'}
            marginLeft={10}
            marginRight={10}
            marginTop={10}
          >
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                    {'A Desativação da sua conta é\n temporária'}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                />
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: 'coolGray.600',
                }}
              >
                {
                  'Seu perfil, fotos, comentários e curtidas ficarão ocultos até que você reative a conta fazendo login novamente.'
                }
              </Box>
            </VStack>
          </Alert>
        </Center>

        <Center>
          <Alert
            status={'warning'}
            marginLeft={5}
            marginRight={5}
            marginTop={5}
          >
            <VStack space={2} flexShrink={1} w="100%">
              <HStack
                flexShrink={1}
                space={2}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} space={2} alignItems="center">
                  <Alert.Icon />
                  <Text fontSize="md" fontWeight="medium" color="coolGray.800">
                    {'A exclusão da sua conta é\npermanente'}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  _focus={{
                    borderWidth: 0,
                  }}
                />
              </HStack>
              <Box
                pl="6"
                _text={{
                  color: 'coolGray.600',
                }}
              >
                {
                  'Seu perfil, fotos, comentários e curtidas  serão excluidos permanentemente.'
                }
              </Box>
            </VStack>
          </Alert>
        </Center>
        <Flex direction="row" marginTop={30} marginLeft={30} marginRight={30}>
          <Button
            background={theme.colors.primaryColor}
            width={150}
            borderColor={theme.colors.blue700}
            borderWidth={1}
            onPress={() => setDeleteIsOpen(!isDeleteOpen)}
          >
            <Text bold color={theme.colors.blue700}>
              Excluir
            </Text>
          </Button>
          <Button
            background={theme.colors.blue700}
            marginLeft={30}
            width={150}
            onPress={() => setDisableIsOpen(!isDisableOpen)}
          >
            <Text bold color={theme.colors.primaryColor}>
              Desativar
            </Text>
          </Button>

          <AlertDialog
            /*AlerDialog Desativar Temporáriamente*/
            leastDestructiveRef={cancelRef}
            isOpen={isDisableOpen}
            onClose={onCloseDisable}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Desativar temporáriamente</AlertDialog.Header>
              <AlertDialog.Body>
                Seu perfil, fotos, comentários e curtidas\nficarão ocultos até
                que você reative a\nconta fazendo login novamente.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onCloseDisable}
                    ref={cancelRef}
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme="danger" onPress={onCloseDisable}>
                    Desativar
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>

          <AlertDialog
            /*AlerDialog Excluir Conta*/
            leastDestructiveRef={cancelRefDelete}
            isOpen={isDeleteOpen}
            onClose={onCloseDelete}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>Excluir pernamentemente</AlertDialog.Header>
              <AlertDialog.Body>
                Seu perfil, fotos, comentários e curtidas\nserão excluidos
                permanentemente.
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onCloseDelete}
                    ref={cancelRef}
                  >
                    Cancelar
                  </Button>
                  <Button colorScheme="danger" onPress={onCloseDelete}>
                    Excluir
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Flex>
      </VStack>
    </ScrollView>
  );
};
