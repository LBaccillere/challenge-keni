import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { UUID } from 'crypto';

export class UpdateOrderProductProductsDto {
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
