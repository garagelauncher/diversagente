import { diversagenteBaseApi, setAuthToken, clearAuthToken } from './baseUrl';
import * as categoriesMethods from './categories';
import * as likesMethods from './likes';
import * as locationsMethods from './locations';
import * as postsMethods from './posts';
import * as subcategoriesMethods from './subcategories';

export const diversaGenteServices = {
  diversagenteBaseApi,
  setAuthToken,
  clearAuthToken,
  ...categoriesMethods,
  ...locationsMethods,
  ...subcategoriesMethods,
  ...postsMethods,
  ...likesMethods,
};
