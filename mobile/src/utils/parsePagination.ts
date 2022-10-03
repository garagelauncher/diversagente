import { PaginateOptions } from '@src/contracts/PaginateOptions';

export const parsePagination = (options: PaginateOptions = {}) => {
  const parsedOptions: Record<keyof PaginateOptions, string | undefined> = {
    filter: options ? JSON.stringify(options.filter) : undefined,
    sort: options ? JSON.stringify(options.sort) : undefined,
    range: options ? JSON.stringify(options.range) : undefined,
  };

  return parsedOptions;
};
