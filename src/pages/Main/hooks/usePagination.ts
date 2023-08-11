import { useMemo } from 'react';

export const usePagination = (
  totalPages: number,
  currentPage: number
): number[] =>
  useMemo(() => {
    const pageArray = [];
    if (totalPages > 3) {
      if (currentPage > 2) {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageArray.push(i);
          if (i === totalPages) break;
        }
      } else {
        for (let i = 1; i <= 3; i++) {
          pageArray.push(i);
          if (i === totalPages) break;
        }
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageArray.push(i);
      }
    }
    return pageArray;
  }, [totalPages, currentPage]);
