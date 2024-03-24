import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { UUID } from 'crypto';

export class CreateOrderProductProductsDto {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  productUUID: UUID;

  @IsDefined()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  quantity: number;
}
