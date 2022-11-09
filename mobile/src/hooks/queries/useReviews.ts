import { useInfiniteQuery } from 'react-query';

import { QueryOptions } from '@src/contracts/QueryOptions';
import { diversaGenteServices } from '@src/services/diversaGente';

type UseReviewsParams = {
  locationId: string;
  perPage: number;
} & QueryOptions;

export const useReviews = <GenericIncluded extends object = object>({
  locationId,
  perPage,
  ...options
}: UseReviewsParams) =>
  useInfiniteQuery(
    [
      'diversagente@reviews',
      locationId,
      options.filter,
      options.cursor,
      options.range,
    ],
    ({ pageParam = {} }) =>
      diversaGenteServices.getReviewsByLocationId<GenericIncluded>(locationId, {
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
