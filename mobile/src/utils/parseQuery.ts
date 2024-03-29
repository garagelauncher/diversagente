import { QueryOptions } from '@src/contracts/QueryOptions';

export const parseQueryOptions = (options: QueryOptions = {}) => {
  const parsedOptions: Record<keyof QueryOptions, string | undefined> = {
    filter: options ? JSON.stringify(options.filter) : undefined,
    include: options ? JSON.stringify(options.include) : undefined,
    sort: options ? JSON.stringify(options.sort) : undefined,
    range: options ? JSON.stringify(options.range) : undefined,
    cursor: undefined,
  };

  if (options.cursor && Object.keys(options.cursor).length > 0) {
    Object.assign(parsedOptions, {
      cursor: JSON.stringify(options.cursor),
    });
  }

  return parsedOptions;
};
