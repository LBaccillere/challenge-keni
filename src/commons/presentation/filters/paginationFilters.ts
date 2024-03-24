import { Transform } from 'class-transformer';

export class PaginationFilters {
  @Transform(({ value }) => {
    return parseInt(value);
  })
  page: number;
  @Transform(({ value }) => parseInt(value))
  pageLength: number;
}
