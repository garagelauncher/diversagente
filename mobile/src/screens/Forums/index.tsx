import { Box, Heading, ScrollView, Text } from 'native-base';
import React from 'react';

import { theme } from '../../styles/theme';

import { Subcategories, Titles } from '@src/components/Subcategories';

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
    <ScrollView>
      <Box
        width="100%"
        backgroundColor={theme.colors.pastelPrimary}
        flex={1}
        alignItems="center"
        justifyContent="center"
      >
        <Box mt={100} alignItems="center" alignContent="center">
          <Heading>FORUMS PAGE</Heading>
          <Text>Work In progress...</Text>
        </Box>
        <Subcategories titles={titles}></Subcategories>
      </Box>
    </ScrollView>
  );
};
