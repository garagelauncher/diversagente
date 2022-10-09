export type QueryOptions = {
  range?: [number, number];
  sort?: [string, 'ASC' | 'DESC' | object];
  filter?: Record<string, any>;
  include?: Record<string, any>;
  cursor?: Record<string, any>;
};
