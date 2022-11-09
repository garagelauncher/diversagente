import { useQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const useProfile = <GenericIncluded extends object = object>(
  username: string,
  options: QueryOptions = {},
) =>
  useQuery(['diversagente@profile', username], () =>
    diversaGenteServices.findUserByUsername<GenericIncluded>(username, options),
  );
