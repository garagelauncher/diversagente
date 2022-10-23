import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { Subcategory, SubcategoryForm } from '@src/contracts/Subcategory';
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

export const findSubcategoryById = async <
  GenericIncluded extends object = object,
>(
  subcategoryId: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.get<
      IncludeInto<Subcategory, GenericIncluded>
    >(`/subcategories/${subcategoryId}`, {
      params: {
        ...parseQueryOptions(options),
      },
    });

    const subcategory = response.data;
    console.info('SUBCATEGORY BY ID!', response.data);
    return subcategory;
  } catch (error: any) {
    console.error('error when fetching subcategory info', subcategoryId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const createSubcategory = async (data: SubcategoryForm) => {
  try {
    const response = await diversagenteBaseApi.post<Subcategory>(
      `/subcategories`,
      data,
    );

    const subcategory = response.data;
    console.info('SUBCATEGORY CREATION!', response.data);
    return subcategory;
  } catch (error: any) {
    console.error('error when creating new subcategory with:', data);

    if (error.isAxiosError) {
      console.error(error.response);
    }

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
