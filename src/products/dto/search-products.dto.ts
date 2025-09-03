import { Type } from 'class-transformer';
import { IsIn, IsInt, IsObject, IsOptional, IsString, Max, Min, ValidateNested } from 'class-validator';

export class ProductFiltersDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  nombre?: string; // LIKE

  @IsOptional()
  @IsString()
  descripcion?: string; // LIKE

  @IsOptional()
  @IsString()
  sku?: string; // exacto
}

export class SearchProductsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  @IsIn(['id', 'nombre', 'precio', 'stock', 'sku', 'createdAt', 'updatedAt'])
  sortBy?: string = 'id';

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC', 'asc', 'desc'])
  order?: 'ASC' | 'DESC' | 'asc' | 'desc' = 'ASC';

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProductFiltersDto)
  filters?: ProductFiltersDto = {} as ProductFiltersDto;
}
