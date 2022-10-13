import { diversagenteBaseApi } from '../baseUrl';

import { Subcategory } from '@src/contracts/Subcategory';

export type FilterSubcategory = {
  categoriesIds: {
    hasSome: [categoryId: string];
  };
};

export const findAllSubcategories = async () => {
  try {
    const response = await diversagenteBaseApi.get<Subcategory[]>(
      '/subcategories',
    );
    const categories = response.data;
    console.info('SUBCATEGORIES!', response.data);
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const findRelatedSubcategoriesToCategory = async (
  categoryId: string,
  filterParams: FilterSubcategory,
) => {
  console.log('categoryId in service', categoryId);
  console.log('filter in service', filterParams);
  try {
    const response = await diversagenteBaseApi.get<Subcategory[]>(
      `/subcategories`,
      { params: { filter: filterParams } },
    );
    const relatedSubcategoriesToCategory = response.data;
    console.info('SUBCATEGORIES FILTERED BY CATEGORY', response.data);
    return relatedSubcategoriesToCategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
