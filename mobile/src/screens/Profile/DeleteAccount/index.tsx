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
} from 'native-base';
import React from 'react';

import { theme } from '@src/styles/theme';

export const DeleteAccount = () => (
  <ScrollView>
    <VStack width={'100%'} height={500} marginTop={70}>
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
          marginLeft={10}
          marginRight={10}
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
      <Flex direction="row" marginTop={10} marginLeft={30} marginRight={30}>
        <Button
          background={theme.colors.primaryColor}
          width={150}
          borderColor={theme.colors.blue700}
          borderWidth={1}
        >
          <Text bold color={theme.colors.blue700}>
            Excluir
          </Text>
        </Button>
        <Button background={theme.colors.blue700} marginLeft={30} width={150}>
          <Text bold color={theme.colors.primaryColor}>
            Desativar
          </Text>
        </Button>
      </Flex>
    </VStack>
  </ScrollView>
);
