import { Box, ScrollView } from 'native-base';
import React, { useCallback, useEffect, useState } from 'react';

import { SubcategoryForum } from '../SubcategoryForum';

import { Category } from '@src/contracts/Category';
import { Subcategory } from '@src/contracts/Subcategory';
import { diversaGenteServices } from '@src/services/diversaGente';

export const Forums = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const fetchAllCategories = useCallback(async () => {
    try {
      const categoriesFromApi = await diversaGenteServices.findAllCategories();
      setCategories(categoriesFromApi);
    } catch (error) {
      console.info('Error while fetching all categories', error);
    }
  }, []);

  const fetchAllSubcategories = useCallback(async () => {
    try {
      const subcategoriesFromApi =
        await diversaGenteServices.findAllSubcategories();
      setSubcategories(subcategoriesFromApi);
    } catch (error) {
      console.info('Error while fetching all subcategories', error);
    }
  }, []);

  useEffect(() => {
    fetchAllCategories();
    fetchAllSubcategories();
  }, [fetchAllCategories, fetchAllSubcategories]);

  return (
    <ScrollView>
      {/* <Box backgroundColor={theme.colors.lightGray} flex={1}>
        <UserAvatar />
        <Categories titles={categories} />
        <Subcategories titles={subcategories}></Subcategories>
      </Box> */}
      <SubcategoryForum
        subcategories={subcategories}
        id={'62891790b046d56cd0cc6ea5'}
      ></SubcategoryForum>
    </ScrollView>
  );
};
