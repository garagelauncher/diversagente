export type PaginateOptions = {
  range?: [number, number];
  sort?: [string, 'ASC' | 'DESC'];
  filter?: Record<string, any>;
  include?: Record<string, any>;
};
