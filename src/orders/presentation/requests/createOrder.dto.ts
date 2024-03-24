import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOrderProductProductsDto } from './createOrderProduct.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientName: string;

  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderProductProductsDto)
  @ApiProperty({
    type: [CreateOrderProductProductsDto],
    description: 'Array of products',
  })
  products: CreateOrderProductProductsDto[];
}
