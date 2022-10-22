import { useInfiniteQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

type UseCommentsParams = {
  postId: string;
  perPage: number;
} & QueryOptions;

export const useComments = <GenericIncluded extends object = object>({
  postId,
  perPage,
  ...options
}: UseCommentsParams) =>
  useInfiniteQuery(
    [
      'diversagente@comments',
      postId,
      options.cursor,
      options.range,
      options.filter,
    ],
    ({ pageParam = {} }) =>
      diversaGenteServices.findAllComments<GenericIncluded>(postId, {
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
            range: [1, perPage],
          };

          return newPageParam;
        }

        return cursor;
      },
    },
  );
