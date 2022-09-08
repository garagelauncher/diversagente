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

  function handleNavigateToCreatePost() {
    navigation.navigate('FormCreatePost');
  }
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  // const fetchAllCategories = useCallback(async () => {
  //   try {
  //     const categoriesFromApi = await diversaGenteServices.findAllCategories();
  //     setCategories(categoriesFromApi);
  //   } catch (error) {
  //     console.info('Error while fetching all categories', error);
  //   }
  // }, []);

  // const fetchAllSubcategories = useCallback(async () => {
  //   try {
  //     const subcategoriesFromApi =
  //       await diversaGenteServices.findAllSubcategories();
  //     setSubcategories(subcategoriesFromApi);
  //   } catch (error) {
  //     console.info('Error while fetching all subcategories', error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchAllCategories();
  //   fetchAllSubcategories();
  // }, [fetchAllCategories, fetchAllSubcategories]);

  // return (
  //   <ScrollView>
  //     {/* {/* <Box backgroundColor={theme.colors.lightGray} flex={1}>
  //       <UserAvatar picture={'https://github.com/bertiGrazi.png'} />
  //       <Category />
  //       <Subcategories titles={titles}></Subcategories>
  //     </Box>
  //   </ScrollView>
  //   <AddSubCategories /> */}
  //     {/* <Box backgroundColor={theme.colors.lightGray} flex={1}>
  //       <UserAvatar />
  //       <Categories titles={categories} />
  //       <Subcategories titles={subcategories}></Subcategories>
  //     </Box> */}
  //     <AddSubCategories />
  //   </ScrollView>
  // );
  logger.success('Forum');

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
      <Button onPress={handleNavigateToCreatePost}>Criar post</Button>
    </Box>
  );
};
