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
