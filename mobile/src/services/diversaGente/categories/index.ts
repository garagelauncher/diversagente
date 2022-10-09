import { diversagenteBaseApi } from '../baseUrl';

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
