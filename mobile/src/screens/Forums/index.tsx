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
} from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

export const Forums = () => {
  return (
    <>
      <Header
        title={'Olá, Katarina'}
        description={'Encontre mais categorias de seu interesse'}
      ></Header>
      <ScrollView backgroundColor={theme.colors.primaryColor} height={'100%'}>
        <Box
          width="100%"
          flex={1}
          marginTop={-3}
          backgroundColor={theme.colors.primaryColor}
          alignItems="center"
          justifyContent="center"
          borderTopLeftRadius={14}
          borderTopRightRadius={14}
        >
          <Box
            width="85%"
            height={70}
            backgroundColor={theme.colors.infoBoxColor}
            borderRadius={4}
            marginTop={10}
          >
            <Flex direction="row">
              <VStack py="3" my={3} mx={3} boxSize="30" alignItems="center">
                <InfoIcon color={theme.colors.orange} />
              </VStack>
              <Text paddingTop={3} fontSize="sm" paddingLeft={0}>
                Caso tenha uma sugestão de uma nova categoria,
                <Text color={theme.colors.headerColor} bold underline>
                  {' '}
                  nos enviei um e-mail!
                </Text>
                :)
              </Text>
            </Flex>
          </Box>
          <HStack
            width="100%"
            height={100}
            backgroundColor={theme.colors.primaryColor}
          >
            <Flex direction="row" marginTop={5} paddingLeft={10}>
              <ButtonCategory></ButtonCategory>
            </Flex>
          </HStack>
          <HStack
            width="100%"
            height={50}
            backgroundColor={theme.colors.primaryColor}
            marginTop={0}
          >
            <Flex direction="row">
              <Text fontSize="xl" paddingLeft={8} paddingTop={2} bold>
                Categorias Populares
              </Text>
              <VStack py="2" my={2} mx={2} boxSize="30" alignItems="center">
                <InfoIcon color={theme.colors.headerColor} />
              </VStack>
            </Flex>
          </HStack>
          <Categories></Categories>
        </Box>
      </ScrollView>
    </>
  );
};
