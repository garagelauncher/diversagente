import { diversagenteBaseApi } from './baseUrl';
import * as methods from './methods';

export const diversaGenteServices = {
  diversagenteBaseApi,
  ...methods,
};
