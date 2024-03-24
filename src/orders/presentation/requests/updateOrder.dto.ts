import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateOrderProductProductsDto } from './updateOrderProduct.dto';
import { Type } from 'class-transformer';

export class UpdateOrderDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  clientName: string;

  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateOrderProductProductsDto)
  @ApiProperty({
    type: [UpdateOrderProductProductsDto],
    description: 'Array of products',
  })
  products: UpdateOrderProductProductsDto[];
}
