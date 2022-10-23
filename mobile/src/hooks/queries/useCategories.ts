import { useInfiniteQuery } from 'react-query';

import { PER_PAGE_ITEMS } from '@src/configs';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const useCategories = (options: QueryOptions = {}) =>
  useInfiniteQuery(
    ['diversagente@categories', options.cursor, options.range, options.filter],
    ({ pageParam = {} }) =>
      diversaGenteServices.findAllCategories({
        ...options,
        cursor: pageParam.cursor,
        range: pageParam.range ?? options.range,
      }),
    {
      getNextPageParam: (lastPage) => {
        const lastPageLength = lastPage.results.length;
        const cursor =
          lastPage.results.length > 0
            ? lastPage.results[lastPageLength - 1].id
            : undefined;

        if (cursor) {
          const newPageParam = {
            cursor: {
              id: cursor,
            },
            range: [1, PER_PAGE_ITEMS],
          };

          return newPageParam;
        }

        return cursor;
      },
    },
  );
