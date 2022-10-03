import { diversagenteBaseApi } from '../baseUrl';

import { Category } from '@src/contracts/Category';

export const findAllCategories = async () => {
  try {
    const response = await diversagenteBaseApi.get<Category[]>('/categories');
    const categories = response.data;
    console.info('CATEGORIES', categories);
    return categories;
  } catch (error: any) {
    console.error('error when fetchin all categories');

    if (error.isAxiosError) {
      console.error(error.response);
    }

    throw error;
  }
};
