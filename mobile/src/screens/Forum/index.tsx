import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Button, Heading, ScrollView, Text } from 'native-base';

import { StackForumNavigatorParamList } from '@src/routes/stacks/forumStack.routes';
import { logger } from '@src/utils/logger';
// import React, { useCallback, useEffect, useState } from 'react';

// import { theme } from '../../styles/theme';
// import { AddSubCategories } from './AddSubCategories';

// import { Categories } from '@src/components/Categories';
// import { Subcategories } from '@src/components/Subcategories';
// import { UserAvatar } from '@src/components/UserAvatar';
// import { Category } from '@src/contracts/Category';
// import { Subcategory } from '@src/contracts/Subcategory';
// import { diversaGenteServices } from '@src/services/diversaGente';
type ForumScreenNavigationProps = NavigationProp<
  StackForumNavigatorParamList,
  'Forum'
>;

export const Forum = () => {
  const navigation = useNavigation<ForumScreenNavigationProps>();

export const Forums = () => {
  logger.success('Forums');

  return (
    <Box
      width="100%"
      backgroundColor="yellow.200"
      flex={1}
      alignItems="center"
      justifyContent="center"
    >
      <Heading>Forum</Heading>
      <Heading>Em breve</Heading>
      <Text>Para Dezembro de 2022</Text>
      <Button onPress={handleNavigateToSelectLocationMap}>
        Criar categoria
      </Button>
    </Box>
  );
};
