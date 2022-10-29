/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from 'react-query';

import { PER_PAGE_ITEMS } from '@src/configs';
import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

type InfinityQueryOptions = {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export const usePosts = <GenericIncluded extends object = object>(
  options: QueryOptions = {},
  infinityQueryOptions = {} as InfinityQueryOptions,
) =>
  useInfiniteQuery(
    ['diversagente@posts', options.cursor, options.range, options.filter],
    ({ pageParam = {} }) =>
      diversaGenteServices.findAllPosts<GenericIncluded>({
        ...options,
        cursor: pageParam.cursor,
        range: pageParam.range ?? options.range,
        filter: {
          ...(options.filter ?? {}),
          isActive: true,
        },
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
      onSuccess: infinityQueryOptions.onSuccess,
      onError: infinityQueryOptions.onError,
    },
  );
