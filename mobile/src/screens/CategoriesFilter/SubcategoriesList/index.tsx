import { AntDesign } from '@expo/vector-icons';
import {
  Box,
  HStack,
  Flex,
  Icon,
  Input,
  ScrollView,
  Button,
} from 'native-base';
import React from 'react';

import { HeaderSubcategories } from '@src/components/HeaderSubcategories';
import { Subcategory } from '@src/components/Subcategory';
import { theme } from '@src/styles/theme';

export const SubcategoriesList = () => {
  return (
    <>
      <HeaderSubcategories
        title={'Saúde'}
        description={
          'Aqui você pode visualizar todas as subcategorias que\nse relacionam com a categoria Saúde.\nVocê pode criar novas subcategorias para esse tema \ne dentro delas criar, curtir e comentar post.'
        }
      ></HeaderSubcategories>
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
                  width={'65%'}
                  borderColor={theme.colors.warmGray700}
                  InputRightElement={
                    <Icon
                      as={AntDesign}
                      name="search1"
                      size={4}
                      marginRight={3}
                      color={theme.colors.warmGray700}
                    />
                  }
                />
                <Button
                  size={'sm'}
                  variant={'solid'}
                  width={35}
                  height={35}
                  marginLeft={2}
                  backgroundColor={theme.colors.primaryColor}
                >
                  <Icon
                    as={AntDesign}
                    name="plussquareo"
                    size={8}
                    color={theme.colors.warmGray700}
                  />
                </Button>
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
