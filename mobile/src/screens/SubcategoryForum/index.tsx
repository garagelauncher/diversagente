import { Box, Text, Heading, Avatar, HStack, VStack } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { FavoriteButtton } from '@src/components/FavoriteButton';
import { Category } from '@src/contracts/Category';

type Props = {
  subcategories: Category[];
  id: string;
};

const statusBarHeight = getStatusBarHeight();
export const SubcategoryForum = ({ subcategories, id }: Props) => {
  const [subcategory, setSubcategory] = useState<Category>();

  const fetchTargetSubcategory = useCallback(() => {
    try {
      subcategories.find((subcategory) => {
        if (subcategory.id === id) {
          setSubcategory(subcategory);
        }
      });
    } catch (error) {
      console.info('Error while fetching all categories', error);
    }
  }, [subcategories, id]);

  useEffect(() => {
    fetchTargetSubcategory();
  }, [fetchTargetSubcategory]);

  return (
    <Box>
      <Heading
        h={getStatusBarHeight() + 200}
        bg={'warning.500'}
        mt={-statusBarHeight}
      />
      <Box p={5}>
        <Avatar alignSelf="flex-start" size="xl" marginTop={-70} />
        <HStack justifyContent="space-between" width="100%" alignItems="center">
          <Text fontSize={'2xl'}>Saúde{subcategory?.title}</Text>
          <FavoriteButtton id={subcategory?.id} />
        </HStack>
        <VStack>
          <Box borderRadius="xl" bg={'warning.200'} mb={5} p={4}>
            Descrição da subcategoria Descrição da subcategoria Descrição da
            subcategoria Descrição da subcategoria Descrição da subcategoria
            Descrição da subcategoria
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};
