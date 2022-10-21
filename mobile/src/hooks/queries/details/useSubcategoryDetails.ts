import { useQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const useSubcategoryDetails = <GenericIncluded extends object = object>(
  subcategoryId: string,
  options: QueryOptions = {},
) =>
  useQuery(['diversagente@subcategorydetails', subcategoryId], () =>
    diversaGenteServices.findSubcategoryById<GenericIncluded>(
      subcategoryId,
      options,
    ),
  );
