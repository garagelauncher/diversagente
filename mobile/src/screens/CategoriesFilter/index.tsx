import { Box, Flex, Text, VStack, InfoIcon, HStack, Button } from 'native-base';
import React, { useState } from 'react';

import { PopularCategories } from './PopularCategories';
import { RecommendedCategories } from './RecommendedCategories';

import { useAuth } from '@src/hooks/useAuth';
import { Header } from '@src/screens/Home/Header';
import { theme } from '@src/styles/theme';

enum CategoriesFilterEnum {
  POPULAR = 'POPULARES',
  RECOMMENDED = 'RECOMENDADAS',
}

export const CategoriesFilter = () => {
  const [selectedCategoryFilterOption, setSelectedCategoryFilterOption] =
    useState<string>(CategoriesFilterEnum.POPULAR);
  const filterCategoryOptions = [
    {
      id: 1,
      singularName: CategoriesFilterEnum.POPULAR,
    },
    {
      id: 2,
      singularName: CategoriesFilterEnum.RECOMMENDED,
    },
  ];

  const { user } = useAuth();

  const changeCategoryFilterOption = (categoryFilterOption: string) => {
    console.log(categoryFilterOption);
    setSelectedCategoryFilterOption(categoryFilterOption);
  };

  return (
    <>
      <Header
        username={String(user?.name)}
        avatar={user?.picture}
        subtitle="Procure por mais categorias de seu interesse"
      />

      <Box
        width="100%"
        flex={1}
        marginTop={-3}
        backgroundColor={theme.colors.light50}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius={14}
        borderTopRightRadius={14}
      >
        <Flex
          paddingY={8}
          direction={'row'}
          width={'90%'}
          justifyContent="space-between"
        >
          {filterCategoryOptions.map((currentCategoryOption, index) => (
            <Button
              key={index}
              id={currentCategoryOption.id}
              variant={[
                currentCategoryOption.singularName ===
                selectedCategoryFilterOption
                  ? 'solid'
                  : 'outline',
              ]}
              height={12}
              width={40}
              colorScheme={[
                currentCategoryOption.singularName ===
                selectedCategoryFilterOption
                  ? 'blue'
                  : 'gray',
              ]}
              onPress={() =>
                changeCategoryFilterOption(currentCategoryOption.singularName)
              }
              size={'lg'}
            >
              {currentCategoryOption.singularName}
            </Button>
          ))}
        </Flex>
        <HStack width="90%" height={50} backgroundColor={theme.colors.light50}>
          <Flex direction="row">
            <Text fontSize="2xl" bold>
              Categorias {selectedCategoryFilterOption.toLowerCase()}
            </Text>
            <VStack py="2" mx={4} boxSize="30" alignItems="center">
              <InfoIcon color={theme.colors.darkBlue700} />
            </VStack>
          </Flex>
        </HStack>
        {selectedCategoryFilterOption === CategoriesFilterEnum.POPULAR ? (
          <PopularCategories />
        ) : (
          <RecommendedCategories />
        )}
      </Box>
    </>
  );
};
