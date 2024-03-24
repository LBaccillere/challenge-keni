export class PaginatedResult<T> {
  page: number;
  pageLength: number;
  totalItems: number;
  totalPages: number;
  data: T[];

  constructor(
    page: number,
    pageLength: number,
    totalItems: number,
    totalPages: number,
    data: T[],
  ) {
    (this.page = page),
      (this.pageLength = pageLength),
      (this.totalItems = totalItems),
      (this.totalPages = totalPages),
      (this.data = data);
  }
}
