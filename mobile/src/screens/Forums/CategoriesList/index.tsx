/* eslint-disable import/no-unresolved */
import { ButtonCategory } from '@src/components/ButtonCategory/index';
import { Categories } from '@src/components/Categories';
import { Header } from '@src/components/Header/index';
import { theme } from '@src/styles/theme';
import {
  Box,
  Flex,
  Text,
  VStack,
  InfoIcon,
  HStack,
  ScrollView,
  Alert,
  Stack,
  IconButton,
} from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

export const CategoriesList = () => {
  const statusArray = [
    {
      status: 'warning',
      title:
        'Caso tenha uma sugestão de uma nova categoria, nos enviei um e-mail!',
    },
  ];
  return (
    <>
      <Header
        title={'Olá, Katarina'}
        description={'Encontre mais categorias de seu interesse'}
      ></Header>
      <ScrollView backgroundColor={theme.colors.blue50} height={'100%'}>
        <Box
          width="100%"
          flex={1}
          marginTop={-3}
          backgroundColor={theme.colors.blue50}
          alignItems="center"
          justifyContent="center"
          borderTopLeftRadius={14}
          borderTopRightRadius={14}
        >
          <Stack space={3} w="95%" maxW="600" marginTop={8}>
            {statusArray.map((status) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <Alert w="100%" status={status.status}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="4" />
                        <Text fontSize="md" color="coolGray.800">
                          {status.title}
                        </Text>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        _focus={{
                          borderWidth: 0,
                        }}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              );
            })}
          </Stack>
          ;
          <HStack
            width="100%"
            height={60}
            backgroundColor={theme.colors.blue50}
          >
            <Flex direction="row" paddingLeft={10}>
              <ButtonCategory></ButtonCategory>
            </Flex>
          </HStack>
          <HStack
            width="100%"
            height={50}
            backgroundColor={theme.colors.blue50}
            marginTop={0}
          >
            <Flex direction="row">
              <Text fontSize="xl" paddingLeft={8} paddingTop={2} bold>
                Categorias Populares
              </Text>
              <VStack py="2" my={2} mx={2} boxSize="30" alignItems="center">
                <InfoIcon color={theme.colors.darkBlue700} />
              </VStack>
            </Flex>
          </HStack>
          <Categories></Categories>
        </Box>
      </ScrollView>
    </>
  );
};
