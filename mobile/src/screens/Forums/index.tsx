/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
import { EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Header } from '@src/components/Header/index';
import { Subcategory } from '@src/components/Subcategory';
import { theme } from '@src/styles/theme';
import {
  Box,
  HStack,
  Flex,
  Icon,
  Input,
  ScrollView,
  IconButton,
  Button,
} from 'native-base';
// eslint-disable-next-line import/default
import React from 'react';

export const SubcategoriesList = () => {
  return (
    <>
      <Header
        title={'Olá, Katarina'}
        description={'Encontre mais categorias de seu interesse'}
      ></Header>
      <ScrollView backgroundColor={theme.colors.light50} height={'100%'}>
        <HStack
          backgroundColor={theme.colors.light50}
          width={'100%'}
          height={70}
        >
          <Box marginTop={8} width={'100%'} marginLeft={4}>
            <HStack space={4} alignItems="center" width={'100%'}>
              <Flex direction="row" width={'100%'}>
                <Input
                  mx="3"
                  placeholder="Pesquise uma subcategoria"
                  borderRadius={90}
                  width={'60%'}
                  borderColor={theme.colors.warmGray700}
                  InputRightElement={
                    <Icon
                      as={<EvilIcons name="search" />}
                      size={5}
                      mr="2"
                      color={theme.colors.warmGray700}
                    />
                  }
                />
              </Flex>
            </HStack>
          </Box>
        </HStack>
        <Box marginTop={4} width={'100%'} marginLeft={4}>
          <Subcategory></Subcategory>
        </Box>
      </ScrollView>
    </>
  );
};
