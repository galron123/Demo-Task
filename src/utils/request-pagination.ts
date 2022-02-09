import { ApiProperty } from "@nestjs/swagger";

export function paginationOptions(size = 20, page = 1) {
  const offset = page * size;

  return {
    limit: size,
    offset,
  };
}

export class PaginatedResults<T> {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  page: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  pageSize: number;

  @ApiProperty({
    type: Number,
    example: 20,
  })
  limit: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  totalPages = 0;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  currentPage = 1;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  totalResults = 0;

  @ApiProperty()
  results: T[];

  constructor(page: number, size: number, totalResults: number, results: T[]) {
    this.page = page;
    this.pageSize = size;
    this.limit = size;
    this.totalResults = totalResults;
    this.totalPages = Math.ceil(totalResults / size);
    this.results = results;
  }
}