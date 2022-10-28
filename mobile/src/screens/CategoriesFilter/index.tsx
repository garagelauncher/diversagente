import {
  Box,
  Flex,
  Text,
  VStack,
  InfoIcon,
  Button,
  Popover,
} from 'native-base';
import React, { useState } from 'react';

import { FavoriteCategories } from './FavoriteCategories';
import { PopularCategories } from './PopularCategories';

import { Header } from '@src/components/Header';
import { useAuth } from '@src/hooks/useAuth';
import { theme } from '@src/styles/theme';

enum CategoriesFilterEnum {
  POPULAR = 'POPULARES',
  FAVORITE = 'FAVORITAS',
}

export const CategoriesFilter = () => {
  const [selectedCategoryFilterOption, setSelectedCategoryFilterOption] =
    useState<string>(CategoriesFilterEnum.POPULAR);
  const filterCategoryOptions = [
    {
      id: 1,
      name: CategoriesFilterEnum.POPULAR,
      description:
        'Categorias com maior quantidade de postagens na última semana.',
    },
    {
      id: 2,
      name: CategoriesFilterEnum.FAVORITE,
      description:
        'Categorias que você cadastrou como favoritas no seu perfil.',
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
        backgroundColor={'gray.50'}
        alignItems="center"
        justifyContent="center"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
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
                currentCategoryOption.name === selectedCategoryFilterOption
                  ? 'solid'
                  : 'outline',
              ]}
              height={12}
              width={40}
              colorScheme={[
                currentCategoryOption.name === selectedCategoryFilterOption
                  ? 'blue'
                  : 'gray',
              ]}
              onPress={() =>
                changeCategoryFilterOption(currentCategoryOption.name)
              }
              size={'lg'}
            >
              {currentCategoryOption.name}
            </Button>
          ))}
        </Flex>

        <Flex direction="row">
          <Text fontSize="2xl" bold>
            Categorias {selectedCategoryFilterOption.toLowerCase()}
          </Text>
          <VStack py="2" boxSize="30" alignItems="center">
            <Popover
              trigger={(triggerProps) => {
                return (
                  <Button {...triggerProps} bgColor={'transparent'} mx={-1}>
                    <InfoIcon color={theme.colors.darkBlue700} />
                  </Button>
                );
              }}
            >
              <Popover.Content
                accessibilityLabel={`Detalhes sobre as categorias ${selectedCategoryFilterOption}`}
                w={56}
              >
                <Popover.Arrow />
                <Popover.Body paddingY={6}>
                  {filterCategoryOptions.map((categoryOption) => {
                    if (categoryOption.name === selectedCategoryFilterOption) {
                      return (
                        <Text key={categoryOption.id} fontSize="sm">
                          {categoryOption.description}
                        </Text>
                      );
                    }
                  })}
                </Popover.Body>
              </Popover.Content>
            </Popover>
          </VStack>
        </Flex>

        {selectedCategoryFilterOption === CategoriesFilterEnum.POPULAR ? (
          <PopularCategories />
        ) : (
          <FavoriteCategories />
        )}
      </Box>
    </>
  );
};
