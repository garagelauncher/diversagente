import { diversagenteBaseApi } from './baseUrl';
import * as categoriesMethods from './categories';
import * as locationsMethods from './locations';
import * as subcategoriesMethods from './subcategories';

export const diversaGenteServices = {
  diversagenteBaseApi,
  ...categoriesMethods,
  ...locationsMethods,
  ...subcategoriesMethods,
};
