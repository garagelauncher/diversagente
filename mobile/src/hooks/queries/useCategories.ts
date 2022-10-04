import { useQuery } from 'react-query';

import { diversaGenteServices } from '@src/services/diversaGente';

export const useCategories = () =>
  useQuery('diversagente@categories', diversaGenteServices.findAllCategories);
