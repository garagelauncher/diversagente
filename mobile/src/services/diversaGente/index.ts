import { diversagenteBaseApi } from './baseUrl';
import * as categoriesMethods from './categories';
import * as locationsMethods from './locations';

export const diversaGenteServices = {
  diversagenteBaseApi,
  ...locationsMethods,
  ...categoriesMethods,
};
