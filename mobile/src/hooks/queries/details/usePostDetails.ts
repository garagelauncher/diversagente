import { useQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const usePostDetails = <GenericIncluded extends object = object>(
  id: string,
  options: QueryOptions = {},
) =>
  useQuery(['diversagente@post', id], () =>
    diversaGenteServices.findPostById<GenericIncluded>(id, options),
  );
