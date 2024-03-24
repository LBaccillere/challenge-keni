import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  SKU: string;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;
}
