import { diversagenteBaseApi } from '../baseUrl';

import { Subcategory } from '@src/contracts/Subcategory';

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

export const findOneSubcategory = async (id: string) => {
  try {
    const response = await diversagenteBaseApi.get<Subcategory>(
      `/subcategories`,
      {
        params: {
          id,
        },
      },
    );
    const category = response.data.category;
    console.info('SUBCATEGORY!', category);
    return category;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
