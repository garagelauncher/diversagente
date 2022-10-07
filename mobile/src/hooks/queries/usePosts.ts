import { useInfiniteQuery } from 'react-query';

import { PER_PAGE_ITEMS } from '@src/configs';
import { PaginateOptions } from '@src/contracts/PaginateOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

export const usePosts = <GenericIncluded extends object = object>(
  options: PaginateOptions = {},
) =>
  useInfiniteQuery(
    ['diversagente@posts', options.cursor, options.range, options.filter],
    ({ pageParam = {} }) =>
      diversaGenteServices.findAllPosts<GenericIncluded>({
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
