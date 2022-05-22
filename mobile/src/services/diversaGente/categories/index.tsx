import { diversagenteBaseApi } from '../baseUrl';

import { Category } from '@src/contracts/Category';

export const findAllCategories = async () => {
  try {
    const response = await diversagenteBaseApi.get<Category[]>('/categories');
    const categories = response.data;
    console.info('CATEGORIES', categories);
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
