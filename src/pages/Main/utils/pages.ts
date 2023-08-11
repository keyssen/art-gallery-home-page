import { LIMIT } from '../Consts';

export const getPageCount = (totalCount: number): number =>
  Math.ceil(totalCount / LIMIT);
