/* eslint-disable @typescript-eslint/no-explicit-any */
import { diversagenteBaseApi } from '../baseUrl';

import { IncludeInto } from '@src/@types/generics/includeInto';
import { Category } from '@src/contracts/Category';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { parseQueryOptions } from '@src/utils/parseQuery';

export const findAllCategories = async (options: QueryOptions = {}) => {
  try {
    const response = await diversagenteBaseApi.get<Category[]>('/categories', {
      params: parseQueryOptions(options),
    });
    const categories = response.data;
    // console.debug('CATEGORIES', categories);
    return { results: categories };
  } catch (error: any) {
    console.error('error when fetchin all categories');

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};

export const findCategoryById = async <GenericIncluded extends object = object>(
  categoryId?: string,
  options: QueryOptions = {},
) => {
  try {
    const response = await diversagenteBaseApi.get<
      IncludeInto<Category, GenericIncluded>
    >(`/categories/${categoryId}`, {
      params: {
        ...parseQueryOptions(options),
      },
    });

    const category = response.data;
    console.info('CATEGORY!', response.data);
    return category;
  } catch (error: any) {
    console.error('error when fetching category info', categoryId);

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
