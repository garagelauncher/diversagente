import { Box, ScrollView } from 'native-base';
import React from 'react';

import { theme } from '../../styles/theme';
import { AddSubCategories } from './AddSubCategories';

import { Category } from '@src/components/Category';
import { Subcategories, Titles } from '@src/components/Subcategories';
import { UserAvatar } from '@src/components/UserAvatar';

const titles: Titles[] = [
  {
    id: 1,
    text: 'alergias',
  },
  {
    id: 2,
    text: 'terapias',
  },
  {
    id: 3,
    text: 'medicação',
  },
  {
    id: 4,
    text: 'atividades físicas',
  },
  {
    id: 5,
    text: 'sono',
  },
  {
    id: 6,
    text: 'hiperatividade',
  },
];

export const Forums = () => {
  return (
    // <ScrollView>
    //   <Box backgroundColor={theme.colors.lightGray} flex={1}>
    //     <UserAvatar picture={'https://github.com/bertiGrazi.png'} />
    //     <Category />
    //     <Subcategories titles={titles}></Subcategories>
    //   </Box>
    // </ScrollView>
    <AddSubCategories />
  );
};
