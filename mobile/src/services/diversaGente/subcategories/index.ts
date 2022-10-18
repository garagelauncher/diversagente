import { diversagenteBaseApi } from '../baseUrl';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { Subcategory } from '@src/contracts/Subcategory';
import { parseQueryOptions } from '@src/utils/parseQuery';

export type FilterSubcategory = {
  categoriesIds: {
    hasSome: [categoryId: string];
  };
};

export const findAllSubcategories = async (options: QueryOptions = {}) => {
  try {
    const response = await diversagenteBaseApi.get<Subcategory[]>(
      '/subcategories',
      { params: parseQueryOptions(options) },
    );
    const subcategories = response.data;
    console.info('SUBCATEGORIES!', response.data);
    return { results: subcategories };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getSubcategoryById = async (subcategoryId: string) => {
  try {
    const response = await diversagenteBaseApi.get<Subcategory>(
      `/subcategories/${subcategoryId}`,
    );
    const subcategory = response.data;
    console.info('subcategory!', response.data);
    return { results: subcategory };
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
