import { IsNotEmpty, IsDecimal, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  priceBDT: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  itemCode: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

}
