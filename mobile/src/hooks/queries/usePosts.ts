import { useQuery } from 'react-query';

import { PaginateOptions } from '@src/contracts/PaginateOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const usePosts = (options: PaginateOptions = {}) =>
  useQuery('diversagente@posts', () =>
    diversaGenteServices.findAllPosts(options),
  );
