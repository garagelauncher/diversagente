import { Logger } from '@nestjs/common';

export type PaginateOptions = {
  range?: string;
  sort?: string;
  filter?: string;
};

const parseSortToOrderBy = (sort: string[]) => {
  const isValidSort = Array.isArray(sort) && sort.length === 2;

  if (!isValidSort) {
    return {};
  }

  const [sorteableProperty, sorteableValue] = sort;

  const sortParsed = {
    [sorteableProperty]: String(sorteableValue).toLowerCase() as 'asc' | 'desc',
  };

  return sortParsed;
};

const parseRange = (range: number[]) => {
  const isValidRange = Array.isArray(range) && range.length === 2;

  if (!isValidRange) {
    return {
      skip: undefined,
      take: undefined,
    };
  }

  const [skip, take] = range;
  // console.info(`skip is ${skip} and take is ${take}`);
  return {
    skip: skip,
    take: take - skip + 1,
    originalTake: take,
  };
};

export const parseFilterToWhere = (
  filter: Record<string, any>,
): Record<string, any> => {
  const where = Object.keys(filter).reduce((previousValue, currentKey) => {
    const value = filter[currentKey];
    if (Array.isArray(value)) {
      return {
        ...previousValue,
        [currentKey]: {
          in: value,
        },
      };
    }

    return {
      ...previousValue,
      [currentKey]: value,
    };
  }, {});

  return where;
};

export const parsePaginationToPrisma = <GenericFilter extends object = object>(
  paginateOptions: PaginateOptions,
) => {
  Logger.debug(`paginateOptions is ${JSON.stringify(paginateOptions)}`);

  const [range, sort, filter] = [
    JSON.parse(paginateOptions.range ?? '[]') as [number, number] | [],
    JSON.parse(paginateOptions.sort ?? '[]') as [string, string],
    JSON.parse(paginateOptions.filter ?? '{}') as GenericFilter,
  ];

  const { skip, take, originalTake } = parseRange(range);

  return {
    skip,
    take,
    originalTake,
    where: parseFilterToWhere(filter),
    orderBy: parseSortToOrderBy(sort),
  };
};