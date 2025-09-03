import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  stock?: number = 0;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;
}
