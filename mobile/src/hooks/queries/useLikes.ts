import { useInfiniteQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';
import { PER_PAGE_ITEMS } from '@src/configs';

type UseLikesParams = {
  postId: string;
} & QueryOptions;

export const useLikes= <GenericIncluded extends object = object>({
  postId,
  ...options
}: UseLikesParams) =>
  useInfiniteQuery(
    [
      'diversagente@likes',
      postId,
      options.cursor,
      options.range,
      options.filter,
    ],
    ({ pageParam = {} }) =>
      diversaGenteServices.findAllLikes<GenericIncluded>(postId, {
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
