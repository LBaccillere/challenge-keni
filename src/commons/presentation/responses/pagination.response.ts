import { PaginatedResult } from 'src/commons/types/paginatedResult';
import { PaginationResponse } from 'src/commons/types/paginationResponse';

export const mapToResponse = (
  paginatedResult: PaginatedResult<any>,
): PaginationResponse => {
  return {
    page: paginatedResult.page,
    pageLength: paginatedResult.pageLength,
    totalItems: paginatedResult.totalItems,
    totalPages: Math.ceil(
      paginatedResult.totalItems / paginatedResult.pageLength,
    ),
  };
};
