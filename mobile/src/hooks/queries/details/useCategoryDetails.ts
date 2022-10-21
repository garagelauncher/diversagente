import { useQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const useCategoryDetails = <GenericIncluded extends object = object>(
  categoryId: string,
  options: QueryOptions = {},
) =>
  useQuery(['diversagente@categorydetails', categoryId], () =>
    diversaGenteServices.findCategoryById<GenericIncluded>(
      categoryId,
      options,
    ),
  );