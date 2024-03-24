export type PaginationResponse = {
  page: number;
  pageLength: number;
  totalItems: number;
  totalPages: number;
  next?: string;
  prev?: string;
};
