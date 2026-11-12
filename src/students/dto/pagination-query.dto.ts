import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  // @Type(() => Number) => removed after adding enableImplicitConversion in main.ts
  @IsPositive()
  @IsOptional()
  limit: number;

  // @Type(() => Number)
  @IsPositive()
  @IsOptional()
  offset: number;
}
